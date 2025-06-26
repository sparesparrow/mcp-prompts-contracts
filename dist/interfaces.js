"use strict";
/**
 * Unified Interface Definitions
 * Contains all interface definitions for the MCP Prompts Server
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.PromptFormat = void 0;
/**
 * Format options for MutablePrompt conversion
 */
var PromptFormat;
(function (PromptFormat) {
    /** Standard JSON format */
    PromptFormat["JSON"] = "json";
    /** Cursor Rules MDC format */
    PromptFormat["MDC"] = "mdc";
    /** PGAI format with embeddings support */
    PromptFormat["PGAI"] = "pgai";
    /** Dynamic template with variable placeholders */
    PromptFormat["TEMPLATE"] = "template";
})(PromptFormat || (exports.PromptFormat = PromptFormat = {}));
