# Node.js File System Utils

This is a collection of utility functions for working with files and directories in Node.js. The following functions are available:

- `readDirectory(dirPath: string): FileObject`: Recursively reads the contents of a directory, including any subdirectories and their contents, and returns the directory structure and file names in JSON format. If a file has the ".json" extension, an additional "content" property is added to the object, containing the parsed JSON data from the file. If the specified directory does not exist, the function returns `null`. Throws an error if there was an error reading the directory or one of its files.

- `createOrUpdateJsonFile(dirPath: string, fileName: string, data: object): boolean`: Writes data to a JSON file in a specified directory. If the file already exists, it is overwritten with the new data. If it does not exist, a new file is created.

- `createOrReplaceFile(filePath: string, content: string): boolean`: Writes content to a file in a specified directory. If the file already exists, its content is replaced with the new content. If it does not exist, a new file is created.

- `readFileContent(filePath: string): string | null`: Reads the contents of a file at the specified path. Returns `null` if the file does not exist. Throws an error if there was an error reading the file.

- `deleteFileOrFolder(filePath: string): boolean`: Deletes a file or a folder at the specified path. If the specified path does not exist, the function returns `true`. Throws an error if there was an error deleting the file or folder.

## Usage Examples

```javascript
const { readDirectory, createOrUpdateJsonFile, createOrReplaceFile, readFileContent, deleteFileOrFolder } = require('./fs-utils');

// Read directory
const dirPath = './test-dir';
const directoryStructure = readDirectory(dirPath);
console.log(directoryStructure);

// Create or update JSON file
const data = { name: 'John Doe', age: 30 };
const filePath = './test-dir/test.json';
createOrUpdateJsonFile(dirPath, 'test', data);

// Create or replace file
const filePath = './test-dir/test.txt';
const content = 'Hello, world!';
createOrReplaceFile(filePath, content);

// Read file content
const filePath = './test-dir/test.txt';
const fileContent = readFileContent(filePath);
console.log(fileContent);

// Delete file or folder
const filePath = './test-dir/test.txt';
deleteFileOrFolder(filePath);
```