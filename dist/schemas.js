"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.workflowSchema = exports.workflowStepSchema = exports.promptSchemas = exports.templateVariableSchema = void 0;
const zod_1 = require("zod");
exports.templateVariableSchema = zod_1.z.object({
    name: zod_1.z.string(),
    description: zod_1.z.string().optional(),
    default: zod_1.z.string().optional(),
    required: zod_1.z.boolean().optional(),
    type: zod_1.z.enum(['string', 'number', 'boolean', 'array', 'object']).optional(),
    options: zod_1.z.array(zod_1.z.string()).optional(),
});
/**
 * Base schema for a prompt, containing all user-definable fields.
 * Server-generated fields like id, createdAt, and updatedAt are excluded.
 * This is used for creating new prompts.
 */
const createPromptSchema = zod_1.z
    .object({
    category: zod_1.z.string().optional(),
    content: zod_1.z
        .string({
        invalid_type_error: 'Content must be a string.',
        required_error: 'Content is required.',
    })
        .trim()
        .min(1, { message: 'Content cannot be empty or just whitespace.' }),
    description: zod_1.z
        .string()
        .trim()
        .max(500, { message: 'Description cannot be longer than 500 characters.' })
        .optional(),
    isTemplate: zod_1.z.boolean().optional().default(false),
    metadata: zod_1.z.record(zod_1.z.unknown()).nullish(),
    name: zod_1.z
        .string({
        invalid_type_error: 'Name must be a string.',
        required_error: 'Name is required.',
    })
        .trim()
        .min(1, { message: 'Name cannot be empty or just whitespace.' })
        .max(100, { message: 'Name cannot be longer than 100 characters.' }),
    tags: zod_1.z.array(zod_1.z.string().min(1, { message: 'Tags cannot be empty strings.' })).nullish(),
    variables: zod_1.z.array(zod_1.z.union([zod_1.z.string(), exports.templateVariableSchema])).nullish(),
})
    .strict();
/**
 * Schema for a complete prompt object, including server-generated fields.
 * This is used for validating prompts read from storage.
 */
const fullPromptSchema = createPromptSchema.extend({
    createdAt: zod_1.z.string().datetime(),
    id: zod_1.z.string().min(1),
    updatedAt: zod_1.z.string().datetime(),
    version: zod_1.z.number().int().positive(),
});
/**
 * Schemas for prompt-related API requests, derived from a base schema
 * to ensure consistency.
 */
exports.promptSchemas = {
    applyTemplate: zod_1.z.object({
        id: zod_1.z.string(),
        variables: zod_1.z.record(zod_1.z.string()),
    }),
    /**
     * Schema for creating a new prompt. All fields from the base schema are required.
     */
    create: createPromptSchema,
    delete: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    /**
     * Schema for a full prompt object, including server-side fields.
     */
    full: fullPromptSchema,
    get: zod_1.z.object({
        id: zod_1.z.string(),
    }),
    list: zod_1.z.object({
        category: zod_1.z.string().optional(),
        isTemplate: zod_1.z.boolean().optional(),
        tags: zod_1.z.array(zod_1.z.string()).optional(),
        search: zod_1.z.string().optional(),
        sort: zod_1.z.string().optional(),
        order: zod_1.z.enum(['asc', 'desc']).optional(),
        offset: zod_1.z.number().int().min(0).optional(),
        limit: zod_1.z.number().int().min(1).optional(),
    }),
    /**
     * Schema for updating an existing prompt. All fields are optional.
     */
    update: createPromptSchema.partial(),
    bulkCreate: zod_1.z.array(createPromptSchema),
    bulkDelete: zod_1.z.object({ ids: zod_1.z.array(zod_1.z.string().min(1)) }),
};
/**
 * Zod schema for Workflow definitions (MVP).
 *
 * Top-level fields:
 * - id: string (unique workflow ID)
 * - name: string (human-readable name)
 * - version: number (schema version)
 * - variables: object (optional, key-value pairs for workflow-wide variables)
 * - steps: array of step objects (see below)
 *
 * Step object (discriminated by 'type'):
 * - id: string (unique step ID)
 * - type: 'prompt' | 'shell' | 'http'
 * - prompt: { promptId, input, output } (for type 'prompt')
 * - shell: { command, output } (for type 'shell')
 * - http: { method, url, body?, output } (for type 'http')
 * - condition: string (optional, expression to determine if step runs)
 * - errorPolicy: string (optional, e.g., 'continue', 'abort', 'retry<n>')
 *
 * All step types support 'output', 'condition', and 'errorPolicy'.
 */
exports.workflowStepSchema = zod_1.z.lazy(() => zod_1.z.discriminatedUnion('type', [
    zod_1.z.object({
        condition: zod_1.z.string().optional(),
        errorPolicy: zod_1.z.string().optional(),
        id: zod_1.z.string(),
        input: zod_1.z.record(zod_1.z.string()),
        onFailure: zod_1.z.string().optional(),
        onSuccess: zod_1.z.string().optional(),
        output: zod_1.z.string().min(1),
        promptId: zod_1.z.string(),
        type: zod_1.z.literal('prompt'),
    }),
    zod_1.z.object({
        command: zod_1.z.string(),
        condition: zod_1.z.string().optional(),
        errorPolicy: zod_1.z.string().optional(),
        id: zod_1.z.string(),
        onFailure: zod_1.z.string().optional(),
        onSuccess: zod_1.z.string().optional(),
        output: zod_1.z.string().min(1),
        type: zod_1.z.literal('shell'),
    }),
    zod_1.z.object({
        body: zod_1.z.record(zod_1.z.any()).optional(),
        condition: zod_1.z.string().optional(),
        errorPolicy: zod_1.z.string().optional(),
        id: zod_1.z.string(),
        method: zod_1.z.enum(['GET', 'POST', 'PUT', 'DELETE', 'PATCH']),
        onFailure: zod_1.z.string().optional(),
        onSuccess: zod_1.z.string().optional(),
        output: zod_1.z.string().min(1),
        type: zod_1.z.literal('http'),
        url: zod_1.z.string().url(),
    }),
    zod_1.z.object({
        id: zod_1.z.string(),
        onFailure: zod_1.z.string().optional(),
        onSuccess: zod_1.z.string().optional(),
        steps: zod_1.z.array(zod_1.z.lazy(() => exports.workflowStepSchema)),
        type: zod_1.z.literal('parallel'),
    }),
    zod_1.z.object({
        condition: zod_1.z.string().optional(),
        errorPolicy: zod_1.z.string().optional(),
        id: zod_1.z.string(),
        onFailure: zod_1.z.string().optional(),
        onSuccess: zod_1.z.string().optional(),
        output: zod_1.z.string().min(1),
        prompt: zod_1.z.string(),
        timeout: zod_1.z.number().optional(),
        type: zod_1.z.literal('human-approval'),
    }),
]));
exports.workflowSchema = zod_1.z
    .object({
    id: zod_1.z.string(),
    name: zod_1.z.string(),
    steps: zod_1.z.array(exports.workflowStepSchema).nonempty({
        message: 'Workflow must have at least one step',
    }),
    variables: zod_1.z.record(zod_1.z.union([zod_1.z.string(), zod_1.z.number(), zod_1.z.boolean(), zod_1.z.null()])).optional(),
    version: zod_1.z.number(),
})
    .superRefine((workflow, ctx) => {
    const stepIds = new Set(workflow.steps.map(s => s.id));
    workflow.steps.forEach((step, index) => {
        if (step.onSuccess && !stepIds.has(step.onSuccess)) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: `Invalid onSuccess ID: '${step.onSuccess}' does not exist in this workflow.`,
                path: ['steps', index, 'onSuccess'],
            });
        }
        if (step.onFailure && !stepIds.has(step.onFailure)) {
            ctx.addIssue({
                code: zod_1.z.ZodIssueCode.custom,
                message: `Invalid onFailure ID: '${step.onFailure}' does not exist in this workflow.`,
                path: ['steps', index, 'onFailure'],
            });
        }
    });
});
