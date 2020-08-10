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

    async findProblems(text: string): Promise<DiagnosticError[]> {
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
    async findProblems(text: string): Promise<DiagnosticError[]> {
        return new Promise<DiagnosticError[]>(res => {
            
            this.getRulesFromExtension().then((resolve) => {
                let errors = [];
                resolve.forEach(rule => {
                    rule.findProblems(text).then(problems => {
                        errors = errors.concat(problems);
                    });
                });
                res(errors);
            });
    
            // this.getRulesFromLocalConfig().then((resolve) => {
            //     resolve.forEach(async rule => {
            //         rule.findProblems(text).then(problems => {
            //             errors = errors.concat(problems);
            //         });
            //     });
            //     res(errors);
            // });
        });
    }

    async getRulesFromExtension(): Promise<Rule[]> {
        return parseRules(path.join(__dirname, 'rules.json'));
    }

    async getRulesFromLocalConfig(): Promise<Rule[]> {
        const userRuleFile = vscode.workspace.findFiles('**/lit-code/rules.json');
        let rules = [];
        userRuleFile.then(uris => {
            uris.forEach(uri => rules.concat(parseRules(uri)));
        });

        return rules;
    }
}

async function parseRules(filePath: string | vscode.Uri): Promise<Rule[]> {
    let rules = [];

    let path;
    if (typeof filePath === 'string') {
        path = filePath;
    } else {
        path = filePath.path;
    }

    let jsonRules = JSON.parse(fs.readFileSync(path, 'utf8'));

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