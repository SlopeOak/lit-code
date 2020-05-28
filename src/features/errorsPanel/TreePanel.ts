import * as vscode from 'vscode';
import * as fs from 'fs';
import * as path from 'path';

export class LitCodeErrorProvider implements vscode.TreeDataProvider<Error> {
    getTreeItem(element: Error): vscode.TreeItem {
        return element;
    }

    getChildren(element?: Error): Thenable<Error[]> {
        return Promise.resolve([new Error('Test', vscode.TreeItemCollapsibleState.None)]);
    }
}

class Error extends vscode.TreeItem {
    get tooltip(): string {
        return `Hello, world`;
    }

    get description(): string {
        return `Hello, world, description!`;
    }
}