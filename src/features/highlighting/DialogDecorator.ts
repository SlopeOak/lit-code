import * as vscode from 'vscode';

const dialogRegex = /(".*?")|(“.*?”)|('.*?')/gi;
const dialogDecorationType = vscode.window.createTextEditorDecorationType({
    color: { id: 'litcode.prose.dialog' }
});

export class DialogDecorator {
    applyDecoration() {
        let activeEditor = vscode.window.activeTextEditor;

        let text = activeEditor.document.getText();
        let dialog = [];
        let match;
        while ((match = dialogRegex.exec(text))) {
            let startPos = activeEditor.document.positionAt(match.index);
            let endPos = activeEditor.document.positionAt(match.index + match[0].length);
            let decoration = { range: new vscode.Range(startPos, endPos) };

            dialog.push(decoration);
        }

        activeEditor.setDecorations(dialogDecorationType, dialog);
    }
}

export function applyDecorations() {
    new DialogDecorator().applyDecoration();
}