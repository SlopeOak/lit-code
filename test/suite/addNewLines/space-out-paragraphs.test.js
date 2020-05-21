import { spaceParagraphs } from '../../../src/features/addNewLines/space-out-paragraphs';

describe('space out paragraphs', () => {
  it('should add a space between paragraphs', () => {
    let array = ['Paragraph 1', 'Paragraph 2'];
    let newArray = spaceParagraphs(array);

    expect(newArray).toStrictEqual(['Paragraph 1', '', 'Paragraph 2', '']);
  });
  
  it('should not change the spacing between headers and paragraphs', () => {
    let array = ['# Header 1', 'Paragraph 1'];
    let newArray = spaceParagraphs(array);

    expect(newArray).toStrictEqual(['# Header 1', 'Paragraph 1', '']);
  });
});