import * as vscode from 'vscode';
import * as writeGood from 'write-good';
import { ProseDiagnostic } from './ProseDiagnostic';

export class WriteGoodDiagnostic extends ProseDiagnostic {

    constructor() {
        let writeGoodEnabled: boolean = vscode.workspace.getConfiguration().get('litcode.linting.write-good.enabled');
        let writeGoodSeverity: string = vscode.workspace.getConfiguration().get('litcode.linting.write-good.severity');

        super(writeGoodEnabled, writeGoodSeverity);
    }

    checkLine(lineOfText: vscode.TextLine, lineIndex: number, disabledRules?: string[]): vscode.Diagnostic[] {
        let diagnostics = [];
    
        if (this.enabled) {
            let suggestions = writeGood(lineOfText.text);
            if (suggestions) {
                suggestions.forEach(suggestion => {
                    let index = suggestion.index;
                    let range = new vscode.Range(lineIndex, index, lineIndex, index + suggestion.offset);
    
                    let diagnostic;
                    diagnostic = new vscode.Diagnostic(range, suggestion.reason, this.severity);
                    diagnostic.code = 'writeGood';
    
                    if (!disabledRules || !disabledRules.includes(diagnostic.code)) {
                        diagnostics.push(diagnostic);
                    }
                });
            }
        }
    
        return diagnostics;
    }
}