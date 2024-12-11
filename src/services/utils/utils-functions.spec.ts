
import { normalizeText } from '../../services/utils/utils-functions';


describe('normalizeText', () => {
  it('should normalize text by removing accents and converting to lowercase', () => {
    expect(normalizeText('ÁÉÍÓÚáéíóú')).toBe('aeiouaeiou');
    expect(normalizeText('ÇçÃãÕõ')).toBe('ccaaoo');
  });

  it('should return the same string for text without accents', () => {
    expect(normalizeText('abcDEF')).toBe('abcdef');
    expect(normalizeText('12345')).toBe('12345');
  });

  it('should handle empty strings', () => {
    expect(normalizeText('')).toBe('');
  });

  it('should handle text with spaces and special characters', () => {
    expect(normalizeText('Olá Mundo!')).toBe('ola mundo!');
    expect(normalizeText('Téxt@ wíth spécíal caractères.')).toBe(
      'text@ with special caracteres.'
    );
  });

  it('should not remove special characters or numbers', () => {
    expect(normalizeText('1234567890!@#$%^&*()')).toBe('1234567890!@#$%^&*()');
  });
});

