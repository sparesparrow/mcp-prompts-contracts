import { convertToPrompt } from '../convert';
import { validatePrompt } from '../validate';

describe('convertToPrompt', () => {
  it('converts string to prompt', () => {
    const prompt = convertToPrompt('Hello world', { name: 'test' });
    expect(prompt.name).toBe('test');
    expect(prompt.content).toBe('Hello world');
  });

  it('converts {content} object', () => {
    const prompt = convertToPrompt({ content: 'Hi!' }, { name: 'obj' });
    expect(prompt.name).toBe('obj');
    expect(prompt.content).toBe('Hi!');
  });

  it('converts {template} object', () => {
    const prompt = convertToPrompt({ name: 'templ', template: 'Tmpl {{x}}' });
    expect(prompt.name).toBe('templ');
    expect(prompt.content).toBe('Tmpl {{x}}');
  });

  it('replaces placeholders', () => {
    const prompt = convertToPrompt('Hi {{name}}!', { name: 'p', replace: { name: 'Tom' } });
    expect(prompt.content).toBe('Hi Tom!');
  });
});

describe('validatePrompt', () => {
  it('validates correct prompt', () => {
    const prompt = convertToPrompt({ name: 'v', content: 'Ahoj' });
    // doplníme povinná pole pro validaci full schématu
    const fullPrompt = {
      ...prompt,
      id: 'id1',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      version: 1,
    };
    const result = validatePrompt(fullPrompt);
    expect(result.valid).toBe(true);
  });

  it('fails on missing fields', () => {
    const result = validatePrompt({});
    expect(result.valid).toBe(false);
    expect(result.errors?.length).toBeGreaterThan(0);
  });
}); 