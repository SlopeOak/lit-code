import * as vscode from 'vscode';
import * as path from 'path';
import { format } from './features/formatting/formatting';
import { splitFile } from './features/splitChapters/split-chapters';

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
}

export function deactivate() { }
