import { WordsToDelete } from '../../../src/features/diagnostics/rules/WordsToDelete';
import { DiagnosticError } from '../../../src/features/diagnostics/rules/DiagnosticError';

const rule = new WordsToDelete();

describe('words to delete', () => {

    describe('error formatting', () => {
        it('should return a start index', () => {
            expect(rule.findProblems('Delete that')).toEqual([{
                index: 7,
                offset: 11,
                suggestion: `"that" is often unnecessary, check if the sentence makes sense after removing it.`,
                rule: 'deleteThat'
            }]);
        });

        it('should return an offset', () => { });
        it('should return a suggestion', () => { });
        it('should return a rule name', () => { });
    });

    describe('rules', () => {
        describe('delete that', () => {
            it('detects "that" at the start', () => {
                validateText('That is at the start and should be found.', 0, 4,
                    `"That" is often unnecessary, check if the sentence makes sense after removing it.`,
                );
            });

            it('detects "that" at the end', () => {
                validateText('That is at the start and should be found.', 34, 38,
                    `"that" is often unnecessary, check if the sentence makes sense after removing it.`,
                );
            });

            it('detects "that" in the middle', () => {
                validateText('I should find that in the middle.', 14, 18,
                    `"that" is often unnecessary, check if the sentence makes sense after removing it.`,
                );
            });
            
            it("detects that in various cases", () => {
                validateText("I should also find THAT even though it's capitalized.", 19, 23,
                    `"THAT" is often unnecessary, check if the sentence makes sense after removing it.`,
                );
            });
            
            it("detects that even though punctuation exists", () => {
                validateText("That! With punctuation.", 0, 4,
                    `"That" is often unnecessary, check if the sentence makes sense after removing it.`,
                );
                validateText("That? As a question.", 0, 4,
                    `"That" is often unnecessary, check if the sentence makes sense after removing it.`,
                );
            });

            it('does not detect "that" inside other words', () => {
                validateText("Andthat should not be detected");
                validateText("thatandThis should also not be detected");
            });

            // This and that, that and this.

        });
    });
});

function validateText(text: string, index?: number, offset?: number, suggestion?: string) {
    if (!index || !offset) {
        expect(rule.findProblems(text).length).toBe(0);
    } else {
        expect(rule.findProblems(text)).toEqual([
            error(index, offset, suggestion)
        ]);
    }
}

function error(index: number, offset: number, suggestion: string, rule?: string): DiagnosticError {
    if (!rule) {
        rule = 'deleteThat';
    }
    return new DiagnosticError(index, offset, suggestion, rule, 'warning');
}