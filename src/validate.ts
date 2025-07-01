import { promptSchemas } from './schemas';

export function validatePrompt(prompt: unknown): { valid: boolean; errors?: string[] } {
  const result = promptSchemas.full.safeParse(prompt);
  if (result.success) {
    return { valid: true };
  } else {
    return {
      valid: false,
      errors: result.error.errors.map(e => `${e.path.join('.')}: ${e.message}`),
    };
  }
} 