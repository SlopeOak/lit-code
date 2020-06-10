import * as vscode from 'vscode';

export class DiagnosticError {
    index: number;
    offset: number;
    suggestion: string;
    rule: string;
    severity: vscode.DiagnosticSeverity;

    constructor(index: number, offset: number, suggestion: string, rule: string, severity: string | vscode.DiagnosticSeverity) {
        this.index = index;
        this.offset = offset;
        this.suggestion = suggestion;
        this.rule = rule;
        if (typeof severity === "string") {
            this.severity = this.mapErrorConfigToSeverity(severity);
        } else {
            this.severity = severity;
        }
    }

    toDiagnostic(diagnosticError: DiagnosticError, lineNumber: number): vscode.Diagnostic {
        let startPos = new vscode.Position(lineNumber, diagnosticError.index);
        let endPos = new vscode.Position(lineNumber, diagnosticError.offset);
        let range = new vscode.Range(startPos, endPos);
        return new vscode.Diagnostic(range, diagnosticError.suggestion, this.severity);
    }

    private mapErrorConfigToSeverity(severity: string): vscode.DiagnosticSeverity {
        switch (severity) {
            case 'error':
                return vscode.DiagnosticSeverity.Error;
            case 'warning':
                return vscode.DiagnosticSeverity.Warning;
            case 'info':
                return vscode.DiagnosticSeverity.Information;
            case 'hint':
                return vscode.DiagnosticSeverity.Hint;
            default:
                return vscode.DiagnosticSeverity.Error;
        }
    }
}