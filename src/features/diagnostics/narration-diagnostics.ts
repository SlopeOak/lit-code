import * as vscode from 'vscode';
import * as writeGood from 'write-good';

export function refreshDiagnostics(doc: vscode.TextDocument, narrationDiagnostics: vscode.DiagnosticCollection): void {
    let diagnostics: vscode.Diagnostic[] = [];

    for (let lineIndex = 0; lineIndex < doc.lineCount; lineIndex++) {
        let ruleToggles = [];
        if (lineIndex - 1 >= 0) {
            const previousLine = doc.lineAt(lineIndex - 1);
            if (previousLine.text.trim().startsWith('<!--')) {
                ruleToggles = parseRuleToggles(previousLine);
            }
        }
        let lineOfText = doc.lineAt(lineIndex);

        diagnostics = diagnostics.concat(checkLine(lineOfText, lineIndex, ruleToggles));
    }

    narrationDiagnostics.set(doc.uri, diagnostics);
}

function parseRuleToggles(lineOfText: vscode.TextLine): string[] {
    let disabledRules = [];
    let commentLine = lineOfText.text.trim();

    const matches = [...commentLine.matchAll(/disableRule=(\w+)/gi)];
    matches.forEach(match => {
        disabledRules.push(match[1]);
    });

    return disabledRules;
}

function checkLine(lineOfText: vscode.TextLine, lineIndex: number, disabledRules?: string[]): vscode.Diagnostic[] {
    let diagnostics = [];

    let suggestions = writeGood(lineOfText.text);
    if (suggestions) {
        suggestions.forEach(suggestion => {
            let index = suggestion.index;
            let range = new vscode.Range(lineIndex, index, lineIndex, index + suggestion.offset);

            let category = suggestionCategory(suggestion);
            let diagnostic = new vscode.Diagnostic(range, suggestion.reason, category.severity);
            diagnostic.code = category.code;

            if (!disabledRules || !disabledRules.includes(category.code)) {
                diagnostics.push(diagnostic);
            }
        });
    }

    return diagnostics;
}

function suggestionCategory(suggestion) {
    const reason = suggestion.reason;
    if (reason.includes('passive')) {
        return { code: 'passiveVoice', severity: vscode.DiagnosticSeverity.Error };
    } else if (reason.includes('weasel')) {
        return { code: 'weaselWords', severity: vscode.DiagnosticSeverity.Error };
    }
    return { code: undefined, severity: vscode.DiagnosticSeverity.Error };
}

export function subscribeToDocumentChanges(context: vscode.ExtensionContext, narrationDiagnostics: vscode.DiagnosticCollection): void {
    if (vscode.window.activeTextEditor) {
        refreshDiagnostics(vscode.window.activeTextEditor.document, narrationDiagnostics);
    }

    context.subscriptions.push(
        vscode.window.onDidChangeActiveTextEditor(editor => {
            if (editor) {
                refreshDiagnostics(editor.document, narrationDiagnostics);
            }
        })
    );

    context.subscriptions.push(
        vscode.workspace.onDidChangeTextDocument(e => refreshDiagnostics(e.document, narrationDiagnostics))
    );

    context.subscriptions.push(
        vscode.workspace.onDidCloseTextDocument(doc => narrationDiagnostics.delete(doc.uri))
    );

}