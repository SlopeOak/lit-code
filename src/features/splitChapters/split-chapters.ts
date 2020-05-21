import { readLines } from '../../utils/read-lines';
import { writeChapters } from './write-chapter-files';

export function splitFile(file, folder) {
  let array = readLines(file);
  let chapters = splitChapters(array);
  writeChapters(folder, chapters);
}

export function splitChapters(array) {
  let chapters = [];
  let chapter = [];
  array.forEach(element => {
    let trimmedLine = element.trim();
    if (shouldSplit(trimmedLine)) {
      if (chapter.length === 0) {
        chapter.push(trimmedLine);
      } else {
        chapters.push(chapter);
        chapter = [];
        chapter.push(trimmedLine);
      }
    } else {
      chapter.push(trimmedLine);
    }
  });
  chapters.push(chapter);

  return chapters;
}

function shouldSplit(line) {
  return line.match(/^#\s+\w+/);
}