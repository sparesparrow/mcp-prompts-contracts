import { CreatePromptArgs } from './schemas';

export interface ConvertOptions {
  name?: string;
  format?: string;
  replace?: Record<string, string>;
}

/**
 * Converts a raw prompt (string or object) to a normalized prompt object.
 * Supports { content }, { name, template }, { name, content }, string.
 * Optionally replaces placeholders with static values.
 */
export function convertToPrompt(raw: any, options: ConvertOptions = {}): CreatePromptArgs {
  let prompt: Partial<CreatePromptArgs> = {};

  if (typeof raw === 'string') {
    prompt.content = raw;
    if (options.name) prompt.name = options.name;
  } else if (raw && typeof raw === 'object') {
    if ('template' in raw) {
      prompt.content = raw.template;
      prompt.name = raw.name || options.name || 'unnamed';
      if (raw.description) prompt.description = raw.description;
      if (raw.tags) prompt.tags = raw.tags;
      if (raw.variables) prompt.variables = raw.variables;
    } else if ('content' in raw) {
      prompt.content = raw.content;
      prompt.name = raw.name || options.name || 'unnamed';
      if (raw.description) prompt.description = raw.description;
      if (raw.tags) prompt.tags = raw.tags;
      if (raw.variables) prompt.variables = raw.variables;
    } else {
      // fallback: try to stringify
      prompt.content = JSON.stringify(raw);
      prompt.name = options.name || 'unnamed';
    }
  } else {
    throw new Error('Unsupported prompt format');
  }

  // Replace placeholders if requested
  if (prompt.content && options.replace) {
    for (const [key, value] of Object.entries(options.replace)) {
      prompt.content = prompt.content.replace(new RegExp(`{{${key}}}`, 'g'), value);
    }
  }

  // Default name if missing
  if (!prompt.name) prompt.name = options.name || 'unnamed';

  return prompt as CreatePromptArgs;
} 