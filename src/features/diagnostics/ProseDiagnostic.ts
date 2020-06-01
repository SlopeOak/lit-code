import * as vscode from 'vscode';

export abstract class ProseDiagnostic {
    protected enabled: boolean;
    protected severity: vscode.DiagnosticSeverity;
    constructor(enabled: boolean, severity: string | vscode.DiagnosticSeverity) {
        this.enabled = enabled;
        if (typeof severity === "string") {
            this.severity = this.mapErrorConfigToSeverity(severity);
        }
        else {
            this.severity = severity;
        }
    }
    abstract checkLine(lineOfText: vscode.TextLine, lineIndex: number, disabledRules?: string[]): vscode.Diagnostic[];
    protected mapErrorConfigToSeverity(config): vscode.DiagnosticSeverity {
        switch (config) {
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
