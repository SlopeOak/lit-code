import * as vscode from 'vscode';
import { ProseDiagnostic } from './ProseDiagnostic';
import { WordsToDelete } from './rules/WordsToDelete';
import { DiagnosticError } from './rules/DiagnosticError';

/**
 * Rules based on the blog post https://dianaurban.com/words-you-should-cut-from-your-writing-immediately
 */
export class WordsToDeleteDiagnostics extends ProseDiagnostic {

    constructor() {
        super(true, vscode.DiagnosticSeverity.Error);
    }

    checkLine(lineOfText: vscode.TextLine, lineIndex: number, disabledRules?: string[]): vscode.Diagnostic[] {
        let diagnosticErrors = new WordsToDelete().findProblems(lineOfText.text);
        let diagnostic = [];
        diagnosticErrors.forEach(d => {
            diagnostic.push(d.toDiagnostic(d, lineIndex));
        });
        return diagnostic;
    }
}