import { splitChapters } from '../../../src/features/splitChapters/split-chapters';

describe('split chapters', () => {
  it('should create a new file for each chapter heading', () => {
    let array = ['# Heading 1',
      'Paragraph 1.1',
      'Paragraph 1.2',
      '# Heading 2',
      'Paragraph 2.1'
    ];
    let newChapters = splitChapters(array);

    expect(newChapters).toStrictEqual([
      ['# Heading 1', 'Paragraph 1.1', 'Paragraph 1.2'],
      ['# Heading 2', 'Paragraph 2.1']
    ]);
  });

  it('should include subheadings in the chapter', () => {
    let array = ['# Heading 1', '## Heading 1.1', 'Paragraph 1', '# Heading 2', 'Paragraph 2'];
    let newChapters = splitChapters(array);

    expect(newChapters).toStrictEqual([
      ['# Heading 1', '## Heading 1.1', 'Paragraph 1'],
      ['# Heading 2', 'Paragraph 2']
    ]);
  });
});