import * as vscode from 'vscode';
import * as path from 'path';
import { addNewlines } from './features/addNewLines/add-newlines';
import { splitFile } from './features/splitChapters/split-chapters';

export function activate(context: vscode.ExtensionContext) {
	let currentFile = vscode.window.activeTextEditor.document.fileName;
	let parentDir = path.dirname(currentFile);

	let addNewLines = vscode.commands.registerCommand('lit-code.addNewLines', () => {
		addNewlines(currentFile, currentFile);
	});

	let splitChapters = vscode.commands.registerCommand('lit-code.splitChapters', () => {
		splitFile(currentFile, parentDir);
	});
	
	context.subscriptions.push(addNewLines);
	context.subscriptions.push(splitChapters);
}

export function deactivate() { }
