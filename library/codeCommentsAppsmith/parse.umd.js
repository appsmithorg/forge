(function (root, factory) {
    if (typeof define === 'function' && define.amd) {
        // AMD. Register as an anonymous module.
        define([], factory);
    } else if (typeof module === 'object' && module.exports) {
        // Node. Does not work with strict CommonJS, but
        // only CommonJS-like environments that support module.exports,
        // like Node.
        module.exports = factory();
    } else {
        // Browser globals (root is window)
        root.JSDocParser = factory();
    }
}(typeof self !== 'undefined' ? self : this, function () {
    'use strict';

    // Your module code
    var JSDocParser = {
        jsdocRegex: /\/\*\*([\s\S]*?)\*\//g,
        functionNameRegex: /\/\*\*([\s\S]*?)\*\/\s*([\w]+)\s*\(/g,
        descriptionRegex: /^[\s\S]*?(?=@)/,
        paramRegex: /@param\s+{([\s\S]*?)}\s+([a-zA-Z_$][0-9a-zA-Z_$]*)\s*-([\s\S]*?)(?=@|$)/g,
        returnRegex: /@returns?\s+{([\s\S]*?)}\s*-([\s\S]*?)(?=@|$)/g,
        parse: function(code) {
            const jsdocComments = code.match(this.jsdocRegex) || [];
            const parsedData = jsdocComments.map((comment) => this.parseComment(comment, code));
            return parsedData;
        },
        parseComment: function(comment, code) {
            const functionNameMatch = this.functionNameRegex.exec(code);
            const descriptionMatch = comment.match(this.descriptionRegex);
            const params = [...comment.matchAll(this.paramRegex)];
            const returns = [...comment.matchAll(this.returnRegex)];

            return {
                functionName: functionNameMatch ? functionNameMatch[2] : null,
                description: descriptionMatch ? this.cleanDescription(descriptionMatch[0]) : null,
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
        },
        cleanDescription: function(description) {
            return description
                .replace(/\/\*\*|\*\//g, "")
                .replace(/\n\s*\* ?/g, " ")
                .trim();
        },
        test: function() {
            return this.parse(SampleCode.body);
        }
    };

    return JSDocParser;
}));
