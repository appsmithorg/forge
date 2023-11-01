/**
 * A utility module to parse JSDoc comments from JavaScript code.
 * @module JSDocParser
 */

/** Regular expression to match JSDoc comments. */
export const jsdocRegex = /\/\*\*([\s\S]*?)\*\//g;

/** Regular expression to match function or method names following a JSDoc comment. */
export const functionNameRegex = /\/\*\*([\s\S]*?)\*\/\s*([\w]+)\s*\(/g;

/** Regular expression to extract the description from a JSDoc comment. */
export const descriptionRegex = /^[\s\S]*?(?=@)/;

/** Regular expression to extract parameter details from a JSDoc comment. */
export const paramRegex = /@param\s+{([\s\S]*?)}\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*-([\s\S]*?)(?=@|$)/g;

/** Regular expression to extract return details from a JSDoc comment. */
export const returnRegex = /@returns?\s+{([\s\S]*?)}\s*-([\s\S]*?)(?=@|$)/g;

/**
 * Parses the provided code to extract JSDoc comments and associated function details.
 * @param {string} code - The JavaScript code to parse.
 * @returns {Array} An array of objects containing details of each function and its JSDoc comment.
 */
export function parse(code) {
  const jsdocComments = code.match(jsdocRegex) || [];
  const parsedData = jsdocComments.map((comment) => parseComment(comment, code));
  return parsedData;
}

/**
 * Parses a single JSDoc comment to extract details.
 * @param {string} comment - The JSDoc comment to parse.
 * @param {string} code - The JavaScript code containing the comment.
 * @returns {Object} An object containing details of the function and its JSDoc comment.
 */
export function parseComment(comment, code) {
  const functionNameMatch = functionNameRegex.exec(code);
  const descriptionMatch = comment.match(descriptionRegex);
  const params = [...comment.matchAll(paramRegex)];
  const returns = [...comment.matchAll(returnRegex)];

  return {
    functionName: functionNameMatch ? functionNameMatch[2] : null,
    description: descriptionMatch ? cleanDescription(descriptionMatch[0]) : null,
    parameters: params.map((param) => ({
      type: param[1].trim(),
      name: param[2].trim(),
      description: param[3].trim(),
    })),
    returns: returns.map((ret) => ({
      type: ret[1].trim(),
      description: ret[2].trim(),
    })),
  };
}

/**
 * Cleans up the extracted description by removing comment delimiters and unnecessary line breaks.
 * @param {string} description - The raw description extracted from the JSDoc comment.
 * @returns {string} The cleaned-up description.
 */
export function cleanDescription(description) {
  return description
    .replace(/\/\*\*|\*\//g, "") // Remove comment delimiters
    .replace(/\n\s*\* ?/g, " ") // Replace line breaks and leading asterisks with space
    .trim();
}

/**
 * Test function to parse a sample code and log the results.
 * @returns {Array} An array of objects containing details of each function and its JSDoc comment.
 */
export function test() {
  return parse(SampleCode.body);
}
