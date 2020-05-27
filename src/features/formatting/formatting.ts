import * as vscode from 'vscode';
import { addNewlinesFormatter } from './add-newlines-formatter';

const formatters = [ addNewlinesFormatter ];

export function format(document: vscode.TextDocument): vscode.TextEdit[] {
    let edits = [];
    formatters.forEach(f => {
        edits = edits.concat(f(document));
    });   
    return edits;
}