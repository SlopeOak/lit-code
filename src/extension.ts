import * as vscode from 'vscode';
import * as path from 'path';
import { format } from './features/formatting/formatting';
import { splitFile } from './features/splitChapters/split-chapters';
import { subscribeToDocumentChanges } from './features/diagnostics/narration-diagnostics';
import { DocumentSemanticTokensProvider, legend } from './features/highlighting/highlighting';
import { DialogDecorator, applyDecorations } from './features/highlighting/DialogDecorator';

export function activate(context: vscode.ExtensionContext) {
	let currentFile = vscode.window.activeTextEditor.document.fileName;
	let parentDir = path.dirname(currentFile);

	let splitChapters = vscode.commands.registerCommand('lit-code.splitChapters', () => {
		splitFile(currentFile, parentDir);
	});
	
	context.subscriptions.push(splitChapters);

	vscode.languages.registerDocumentFormattingEditProvider('markdown', {
		provideDocumentFormattingEdits(document: vscode.TextDocument): vscode.TextEdit[] {
			return format(document);
		}
	});

	const narrationDiagnostics = vscode.languages.createDiagnosticCollection("Lit-code: narration");
	context.subscriptions.push(narrationDiagnostics);

    subscribeToDocumentChanges(context, narrationDiagnostics);
    
    context.subscriptions.push(vscode.languages.registerDocumentSemanticTokensProvider({ language: 'semanticLanguage'}, new DocumentSemanticTokensProvider(), legend));

    vscode.window.onDidChangeActiveTextEditor(editor => {
        applyDecorations();
    }, null, context.subscriptions);
}

export function deactivate() { }
