const fs = require('fs');
const path = require('path');


/**
* An interface representing a file or directory object in the directory structure returned by the readDirectory function.
* @property {string} name - The name of the file or directory.
* @property {boolean} isDirectory - A boolean indicating whether the object is a directory (true) or a file (false).
* @property {FileObject[]} children - An array of child objects. If the object is a file, this array is empty.
* @property {string | undefined} [createdAt] - The creation date and time of the file or directory, represented as a string.
* @property {unknown | undefined} [content] - The contents of a JSON file, if the object is a file with the ".json" extension.
*/
interface FileObject {
    name: string;
    isDirectory: boolean;
    children: FileObject[];
    createdAt?: string;
    content?: unknown;
    filePath: any;
}

/**
 * Recursively reads the contents of a directory, including any subdirectories and their contents,
 * and returns the directory structure and file names in JSON format.
 *
 * @param {string} dirPath - The path of the directory to read.
 * @returns {Object} The directory structure and file names in JSON format.
 * The returned object has the following properties:
 *   - name: The name of the directory.
 *   - isDirectory: A boolean indicating whether the object is a directory (true) or a file (false).
 *   - children: An array of child objects. If the object is a file, this array is empty.
 * If a file has the ".json" extension, an additional "content" property is added to the object,
 * containing the parsed JSON data from the file.
 *
 * @throws {Error} If there was an error reading the directory or one of its files.
 */
export const readDirectory = (dirPath: string): FileObject => {

    if (!fs.existsSync(dirPath)) {
        return null;
    }

    const normalizedPath = path.normalize(dirPath);

    const result: FileObject = { name: path.basename(normalizedPath), isDirectory: true, children: [], filePath: dirPath };

    const files = fs.readdirSync(dirPath);
    files.forEach((file) => {
        const filePath = path.join(dirPath, file);
        const stats = fs.statSync(filePath);
        const createdAt = stats.birthtime.toString();
        if (stats.isDirectory()) {
            result.children.push(readDirectory(filePath));
        } else {
            if (path.extname(file) === '.json') {
                try {
                    const content = fs.readFileSync(filePath, 'utf8');
                    result.children.push({
                        name: file, isDirectory: false, createdAt, content: JSON.parse(content), filePath,
                        children: []
                    });
                } catch (error) {
                    console.log(`Error reading ${filePath}: ${error}`);
                    result.children.push({
                        name: file, isDirectory: false, createdAt,
                        children: [], filePath
                    });
                }
            } else {
                result.children.push({
                    name: file, isDirectory: false, createdAt,
                    children: [] , filePath
                });
            }
        }
    });
    return result;
};

/**
 * Writes data to a JSON file in a specified directory. If the file already exists,
 * it is overwritten with the new data. If it does not exist, a new file is created.
 *
 * @param {string} dirPath - The path of the directory where the file should be written.
 * @param {string} fileName - The name of the JSON file, without the ".json" extension.
 * @param {Object} data - The data to be written to the file.
 *
 * @throws {Error} If there was an error writing the file.
 */
export const createOrUpdateJsonFile = (dirPath, fileName, data) => {
    const filePath = path.join(dirPath, fileName + '.json');
    try {
        fs.writeFileSync(filePath, JSON.stringify(data, null, 2));
        console.log(`File ${filePath} created or updated.`);

        return true;
    } catch (error) {
        console.log(`Error creating or updating ${filePath}: ${error}`);
        throw new Error(`Error creating or updating ${filePath}: ${error}`);
    }
}


/**
 * Writes content to a file in a specified directory. If the file already exists,
 * its content is replaced with the new content. If it does not exist, a new file is created.
 *
 * @param {string} filePath - The path and name of the file to be created or replaced.
 * The path can be in either Windows or Linux format.
 * @param {string} content - The content to be written to the file.
 *
 * @throws {Error} If there was an error creating or replacing the file.
 */
export const createOrReplaceFile = (filePath: string, content: string): boolean => {
    try {
        const normalizedPath = path.normalize(filePath);

        // Ensure the directory path exists
        const dirPath = path.dirname(normalizedPath);
        if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
            console.log(`Directory ${dirPath} created.`);
        }

        // Create or replace the file
        fs.writeFileSync(normalizedPath, content);
        console.log(`File ${normalizedPath} created or replaced.`);

        return true;
    } catch (error) {
        console.log(`Error creating or replacing file ${filePath}: ${error}`);
        throw new Error(`Error creating or replacing file ${filePath}: ${error}`);
    }

    return false
};

/**
* Reads the contents of a file at the specified path.
*
* @param {string} filePath - The path of the file to be read. The path can be in either Windows or Linux format.
* @returns {string|null} The contents of the file, as a string. Returns error if there was an error reading the file.
*
* @throws {Error} If there was an error reading the file.
*/
export const readFileContent = (filePath: string): string | null => {
    try {
        const normalizedPath = path.normalize(filePath);
        const content = fs.readFileSync(normalizedPath, 'utf8');
        return content;
    } catch (error) {
        console.log(`Error reading file ${filePath}: ${error}`);
        throw new Error(`Error reading file ${filePath}: ${error}`);
    }
};



/**
 * Deletes a file or a folder at the specified path.
 *
 * @param {string} filePath - The path of the file or folder to be deleted. The path can be in either Windows or Linux format.
 *
 * @throws {Error} If there was an error deleting the file or folder.
 */
export const deleteFileOrFolder = (filePath: string): boolean => {
    try {
        const normalizedPath = path.normalize(filePath);
        if (fs.existsSync(normalizedPath)) {
            if (fs.statSync(normalizedPath).isDirectory()) {
                fs.rmdirSync(normalizedPath, { recursive: true });
                console.log(`Folder ${normalizedPath} deleted.`);
            } else {
                fs.unlinkSync(normalizedPath);
                console.log(`File ${normalizedPath} deleted.`);
            }
            return true;
        }
        return true;
    } catch (error) {
        console.log(`Error deleting file or folder ${filePath}: ${error}`);
        throw new Error(`Error deleting file or folder ${filePath}: ${error}`);
    }
};