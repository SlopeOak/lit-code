import * as vscode from 'vscode';
import { DiagnosticError } from './DiagnosticError';
import * as fs from 'fs';
import * as path from 'path';
import * as rulesJson from './rules.json';

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
        let regexp = new RegExp(`\\b${this.rule}\\b`, 'gmi');
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
    let jsonRules = JSON.parse(fs.readFileSync(path.join(__dirname, 'rules.json'), 'utf8'));

    for (var key in jsonRules) {
        jsonRules[key].rules.forEach(rule => {
            rules.push(createRule(rule, key));
        });
    }

    return rules;
}

function createRule(jsonRule: { match: string, description: string, severity: string }, code: string): Rule {
    return new Rule(jsonRule.match, jsonRule.description, jsonRule.severity, code);
}