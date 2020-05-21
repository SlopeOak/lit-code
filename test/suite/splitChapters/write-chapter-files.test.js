import * as fs from 'fs';
import {writeChapters} from '../../../src/features/splitChapters/write-chapter-files';

describe('write chapter files', () => {
  let array = [
    ['# The first chapter of the book', 'Paragraph one, a thing happens.'],
    ['# The second chapter of the book', 'Paragraph one, the start of chapter two.']
  ];
  let path = './test/suite/resources';
  let chapterOne = `${path}/001-the-first-chapter-of-the-book.md`;
  let chapterTwo = `${path}/002-the-second-chapter-of-the-book.md`;

  it('should contain the file name from the header', () => {
    writeChapters(path, array).then(
      expect(fs.existsSync(chapterOne)).toBe(true)
    );
  });

  it('should create a file for the second chapter', () => {
    writeChapters(path, array).then(
      expect(fs.existsSync(chapterTwo)).toBe(true)
    );
  });
});

const readLines = (path) => {
  return fs.readFileSync(path)
    .toString()
    .split('\n');
};