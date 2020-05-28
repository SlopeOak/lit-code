import * as vscode from 'vscode';
import { addNewLines } from '../addNewLines/add-newlines';

export function addNewlinesFormatter(document: vscode.TextDocument): vscode.TextEdit[] {
    let edits = [];
    for (var i = 0; i < document.lineCount - 1; i++) {
        let currentLine = document.lineAt(i);
        let currentLineText = currentLine.text;
        let nextLine = document.lineAt(i + 1).text;

        if (addNewLines(currentLineText, nextLine)) {
            const newLinePosition = new vscode.Position(i + 1, 0);
            edits.push(vscode.TextEdit.insert(newLinePosition, '\n'));
        }
    }

    return edits;
}