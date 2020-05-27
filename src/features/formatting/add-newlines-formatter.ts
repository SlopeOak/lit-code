import * as vscode from 'vscode';
import { addNewLines } from '../addNewLines/add-newlines';

export function addNewlinesFormatter(document: vscode.TextDocument): vscode.TextEdit[] {
    let edits = [];
    let lines = document.lineCount;
    for (let i = 0; i < lines; i++) {
        let line = document.lineAt(i).text;
        let line2 = i < lines ? document.lineAt(i + 1).text : undefined;
        
        if (addNewLines(line, line2)) {
            const newLine = new vscode.Position(i + 1, 0);
            edits.push(vscode.TextEdit.insert(newLine, '\n'));
        }
    }

    return edits;
}