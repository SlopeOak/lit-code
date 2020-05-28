import { addNewLines } from '../../../src/features/addNewLines/add-newlines';

describe('add-newlines', () => {
  describe('with headers', () => {
    it('should return false when the line is a header', () => {
      expect(addNewLines('# This is a header', 'This is a paragraph')).toBe(false);
    });  
  });

  describe('with undefined inputs', () => {
    it('should return false when the second line is undefined', () => {
      expect(addNewLines('This is a paragraph', undefined)).toBe(false);
    });
  
    it('should return false when the first line is undefined', () => {
      expect(addNewLines(undefined, 'This is a paragraph')).toBe(false);
    });
  });
  
  it('should return true if the line needs to be spaced out', () => {
    expect(addNewLines('This is a test paragraph', 'This is another paragraph')).toBe(true);
  });

  describe('with bullet points', () => {
    it('should return false if line1 is a bulletpoint and line2 is a bulletpoint', () => {
      let result = addNewLines('- This is a bulletpoint', '- This is also a bullet point');
      expect(result).toBe(false);
    });

    it('should return true if line1 is a bulletpoint and line2 is not a bulletpoint', () => {
      let result = addNewLines('- This is a bulletpoint', 'This is not a bullet point');
      expect(result).toBe(true);
    });

    it('should return false if line1 is not a bullet point and line2 is a bulletpoint', () => {
      let result = addNewLines('This is not a bulletpoint', '- This is a bullet point');
      expect(result).toBe(false);
    });

    it('should return false if line1 is a bullet point with asterisks and line2 is a bulletpoint with asterisks', () => {
      let result = addNewLines('* This is a bulletpoint', '* This is a bullet point');
      expect(result).toBe(false);
    });

    it('should return true if line1 is a bullet point with asterisks and line2 is a not a bulletpoint', () => {
      let result = addNewLines('* This is a bulletpoint', 'This is not a bullet point');
      expect(result).toBe(true);
    });
  });

  describe('with whitespace', () => {
    it('should return false if line1 is only whitespace', () => {
      expect(addNewLines(' ', 'This is a paragraph')).toBe(false);
      expect(addNewLines('\t', 'This is a paragraph')).toBe(false);
      expect(addNewLines('\n', 'This is a paragraph')).toBe(false);
      expect(addNewLines('', 'This is a paragraph')).toBe(false);
    });

    it('should return false if line2 is only whitespace', () => {
      expect(addNewLines('This is a paragraph', ' ')).toBe(false);
      expect(addNewLines('This is a paragraph', '\t')).toBe(false);
      expect(addNewLines('This is a paragraph', '\n')).toBe(false);
      expect(addNewLines('This is a paragraph', '')).toBe(false);
    });
  });
});