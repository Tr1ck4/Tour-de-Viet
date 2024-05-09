import fs from 'fs/promises';
import path from 'path';

async function createFolder(folderName, dir = './Tour-de-Viet/src/image') {
    try {
        dir = path.normalize(dir);

        const currentDir = process.cwd();
        const folderPath = path.resolve(currentDir, dir, folderName);

        if (!await fs.access(folderPath).then(() => true).catch(() => false)) {
            await fs.mkdir(folderPath, { recursive: true });
            console.log(`Folder '${folderPath}' created successfully.`);
        } else {
            console.log(`Folder '${folderPath}' already exists.`);
        }
    } catch (err) {
        console.error(`Error creating folder: ${err}`);
    }
}

