export function spaceParagraphs(array) {
  let newArray = [];

  array.forEach(e => {
    if (e.startsWith('#')) {
      newArray.push(e);
    } else {
      newArray.push(e);
      newArray.push('');
    }
  });
  
  return newArray;
}