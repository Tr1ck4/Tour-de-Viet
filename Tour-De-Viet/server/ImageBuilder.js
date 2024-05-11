import fs from 'fs/promises';
import path from 'path';

export async function createFolder(folderName, dir = './src/image') {
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

export async function storeImage(imageData, tourName, fileName) {
    try {
        const baseDir = `./src/image/${tourName}`;

        await fs.mkdir(baseDir, { recursive: true });

        const newPath = path.join(baseDir, fileName);

        await fs.writeFile(newPath, imageData);

        console.log(`Image '${fileName}' stored successfully in '${baseDir}'.`);
    } catch (err) {
        console.error(`Error storing image: ${err}`);
    }
}
