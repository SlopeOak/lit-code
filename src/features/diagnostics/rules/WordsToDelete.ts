import * as vscode from 'vscode';
import { DiagnosticError } from './DiagnosticError';
import * as fs from 'fs';

class Rule {
    rule: string;
    suggestion: string;
    severity: string | vscode.DiagnosticSeverity;
    code: string;

    constructor(rule: string, suggestion: string, severity: string | vscode.DiagnosticSeverity, code: string) {
        this.rule = rule;
        this.suggestion = suggestion;
        this.severity = severity;
        this.code = code;
    }

    findProblems(text: string): DiagnosticError[] {
        let problems = [];
        let regexp = new RegExp(`${this.rule}`, 'gmi');
        let match;
        while ((match = regexp.exec(text))) {
            let index = match.index;
            let offset = match.index + match[0].length;           
            problems.push(new DiagnosticError(index, offset, `"${match[0]}" ${this.suggestion}`, this.code, this.severity));
        }
        return problems;
    }
}

export class WordsToDelete {
    rules = [
        new DeleteThat()
    ].concat(parseRules());

    findProblems(text: string): DiagnosticError[] {
        let errors = [];
        this.rules.forEach(rule => {
            errors = errors.concat(rule.findProblems(text));
        });
        return errors;
    }
}

abstract class WordsToDeleteRule extends Rule {
    constructor(rule: string, suggestion: string, severity: string | vscode.DiagnosticSeverity) {
        super(rule, suggestion, severity, 'wordsToDelete');
    }
}

class DeleteThat extends WordsToDeleteRule {
    constructor() {
        let rule = 'that';
        let suggestion = 'is often unnecessary, check if the sentence makes sense after removing it.';
        super(rule, suggestion, vscode.DiagnosticSeverity.Warning);
    }
}

function parseRules(): Rule[] {
    let rules = [];
    fs.readFile('./rules.json', 'utf8', (err, data) => {
        if (err) {
            throw err;
        }
        var rulesMap = JSON.parse(data);
        rulesMap.forEach(entry => {
            rules.push(new Rule(entry.match, entry.description, entry.severity, entry.code));
        });
    });
    return rules;
}