export function addNewLines(line1: string, line2: string) {
  if (line1 === undefined || line2 === undefined) { return false; }

  if (line1.match(/^#.*/)) {
    return false;
  }

  return true;
}