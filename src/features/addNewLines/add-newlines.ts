import * as fs from "fs";
import { spaceParagraphs } from './space-out-paragraphs';
import { readLines } from '../../utils/read-lines';
import { writeLines } from '../../utils/write-lines';

export function addNewlines(fromFile, toFile) {
  return new Promise((resolve, reject) => {
    if (!fs.existsSync(fromFile)) {
      reject(`Unable to read file ${fromFile}`);
    }

    let lines = readLines(fromFile);
    let spacedParagraphs = spaceParagraphs(lines);

    writeLines(toFile, spacedParagraphs)
      .then(r => resolve(r))
      .catch(r => reject(r));
  });
}