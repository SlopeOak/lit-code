import * as fs from 'fs';

export function readLines(path) {
    return fs.readFileSync(path)
      .toString()
      .split('\n');
  }