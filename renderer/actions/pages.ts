
import path from 'path';
import fs from 'fs';
import { ipcRenderer } from 'electron';
import { createOrReplaceFile } from 'utils/fs-utils';

const createWorkspace = async (basePath, workspaceName: string): any => {
    //let documentsFolder = getBasePath();
    try {
        //let documentsFolder = getBasePath();
        const budStudioFolder = path.join(basePath, "Bud-Studio", workspaceName);
        if (!fs.existsSync(budStudioFolder)) {
            fs.mkdirSync(budStudioFolder, { recursive: true });
        }

        return { budStudioFolder, basePath };
    } catch (error) {
        console.error(error);
        return null;
    }
}

const createProjectFolder = async (basePath, folder, workspaceName: string): any => {
    //let documentsFolder = getBasePath();
    try {
        //let documentsFolder = getBasePath();
        const budStudioFolder = path.join(basePath, "Bud-Studio", workspaceName, folder);
        if (!fs.existsSync(budStudioFolder)) {
            fs.mkdirSync(budStudioFolder, { recursive: true });
        }

        return { budStudioFolder, basePath };
    } catch (error) {
        console.error(error);
        return null;
    }
}

// create a new file named 'abc.json' in the user's documents folder

const createNewFile = async (documentsFolder, workspace = "default", project = "default"): Promise<any> => {
    try {

        const budStudioFolder = path.join(documentsFolder, "Bud-Studio", workspace, project);
        if (!fs.existsSync(budStudioFolder)) {
            fs.mkdirSync(budStudioFolder, { recursive: true });
        }
        let fileName = 'untitled.json';
        let filePath = path.join(budStudioFolder, fileName);
        let count = 0;
        while (fs.existsSync(filePath)) {
            count++;
            fileName = `untitled-${count}.json`;
            filePath = path.join(budStudioFolder, fileName);
        }

        const blankTemplate = {
            "time": Math.floor(Date.now() / 1000),
            "title": fileName.split('.')[0],
            "content_version": 1,
            "assets_path": budStudioFolder,
            "blocks": [
                {
                    "id": "MLMq0kvkBQ",
                    "type": "header",
                    "data": {
                        "text": fileName.split('.')[0].split('-').join(' '),
                        "level": 1
                    }
                }
            ],
            "version": "2.26.5"
        }

        fs.writeFileSync(filePath, JSON.stringify(blankTemplate));
        console.log(`New file created at ${filePath}`);
        return { filePath, fileName, blankTemplate };
    } catch (error) {
        console.error(error);
        return null;
    }
};


export { createNewFile, createWorkspace, createProjectFolder };
