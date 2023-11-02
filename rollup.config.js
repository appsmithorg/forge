import resolve from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser'; // Ensure you're importing terser correctly
import path from 'path';
import fs from 'fs';

// Dynamically generate the Rollup configuration for each library
const libraryFolders = fs.readdirSync('libraries').filter(file => {
  return fs.statSync(path.join('libraries', file)).isDirectory();
});

const outputConfig = libraryFolders.map(folder => ({
  input: `libraries/${folder}/index.js`,
  output: {
    file: `dist/${folder}.umd.js`,
    format: 'umd',
    name: folder.replace(/-\w/g, m => m[1].toUpperCase()), // Convert kebab-case to CamelCase
    globals: {
      // Define globals here if your libraries depend on external modules
    }
  },
  plugins: [
    resolve(),
    terser(), // Use the terser plugin
  ],
  external: [
    // Add external dependencies here if needed
  ]
}));

export default outputConfig;
