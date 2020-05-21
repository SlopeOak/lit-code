import * as fs from 'fs';
import {paramCase} from 'change-case';

export function writeChapters(path, chaptersArray) {
  return new Promise((resolve, reject) => {
    let i = 1;
    chaptersArray.forEach(chapterArray => {
      let title = paramCase(chapterArray[0]);
      writeLines(`${path}/${pad(i, 3)}-${title}.md`, chapterArray)
        .catch(reject);
      i++;
    });
    resolve;
  });
};

function pad(number, amountToPad) {
  return String(number).padStart(amountToPad, '0');
};

function writeLines(path, array) {
  return new Promise((resolve, reject) => {
    let writeStream = fs.createWriteStream(path);

    array.forEach(element => {
      writeStream.write(element + '\n');
    });

    writeStream.end();
    writeStream.on('finish', () => resolve(array));
    writeStream.on('error', () => reject);
  });
};
