const bulletPointRegex = /^[-*].*/;
const headerRegex = /^#.*/;
const paragraphRegex = /^[\w\s"']*/;
const whitespaceLineRegex = /^\s*$/;

export function addNewLines(line1: string, line2: string): boolean {
  if (line1 === undefined || line2 === undefined) { return false; }

  let line1Trim = line1.trim();
  let line2Trim = line2.trim();

  if (line1Trim.match(headerRegex)) {
    return false;
  }

  if (line1Trim.match(whitespaceLineRegex) || line2Trim.match(whitespaceLineRegex)) {
    return false;
  }

  if (!bulletPoints(line1Trim, line2Trim)) {
    return false;
  }

  return true;
}

function bulletPoints(line1: string, line2: string): boolean {
  if (line1.match(bulletPointRegex) && line2.match(bulletPointRegex)) {
    return false;
  } else if (line1.match(paragraphRegex) && line2.match(bulletPointRegex)) {
    return false;
  } else if (line1.match(bulletPointRegex) && line2.match(paragraphRegex)) {
    return true;
  }

  return true;
}