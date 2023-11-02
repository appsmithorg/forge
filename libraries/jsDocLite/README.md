# jsDocLite

This module provides functionality to parse JSDoc comments from JavaScript code.

## Usage

You can use the JSDelivr CDN to import this custom library into Appsmith.
```sh
https://cdn.jsdelivr.net/gh/appsmithorg/forge@main/dist/jsDocLite.umd.js
```

## Methods

### jsDocLite.parseFromUrl()

Asynchronously fetches JavaScript content from a URL and parses the JSDoc comments.

- async

- parameters
  - `url`: The URL to fetch the JavaScript content from. 

### jsDocLite.parse()

Parses the provided JavaScript code to extract JSDoc comments.

- parameters
  - `code`: The JavaScript code to parse. 

### jsDocLite.parseComment()

Parses a single JSDoc comment block to extract information.

- parameters
  - `comment`: The JSDoc comment block to parse. 

### jsDocLite.cleanCommentBlock()

@function cleanCommentBlock Cleans a JSDoc comment block by removing the commenting marks from each line.

- parameters
  - `commentBlock`: The JSDoc comment block to clean. 

### jsDocLite.fetchJsContent()

Asynchronously fetches JavaScript content from a URL.

- async

- parameters
  - `url`: The URL to fetch the JavaScript content from. 

-----
 ## Constants

### entryRegex

An object of regex to help identify entries for documentation (functions, constants, and modules).

### tagRegex

An object of regex to help identify tags for identified entries.

### jsdocRegex

Regex to help identify JS Doc blocks in code.

## Contributing

Contributions are always welcome!

## License

[MIT](https://choosealicense.com/licenses/mit/)
