import * as fs from 'fs';
import { addNewlines } from '../../../src/features/addNewLines/add-newlines';

describe('add-newlines', () => {
  it('test can read the lines of the test files', () => {
    const lines = readLines('./test/suite/resources/test1.md');
    expect(lines).toStrictEqual(['# Header', 'Paragraph 1', 'Paragraph 2']);
  });

  it('should write a modified file', () => {
    let expected = ['# Header', 'Paragraph 1', '', 'Paragraph 2', ''];
    let inputFile = './test/suite/resources/test1.md';
    let outputFile = './test/suite/resources/test1output.md';

    return expect(addNewlines(inputFile, outputFile)).resolves.toStrictEqual(expected);
  });

  it('should fail gracefully if the provided file is not a file', () => {
    let outputFile = './test/suite/resources/test1output.md';
    return expect(addNewlines('notAFile', outputFile)).rejects.toMatch('Unable to read file notAFile');
  });
});

function readLines(path) {
  return fs.readFileSync(path)
    .toString()
    .split('\n');
}