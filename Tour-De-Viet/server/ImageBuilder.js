import fs from 'fs/promises';
import path from 'path';

export async function createFolder(folderName, dir = './Tour-de-Viet/src/image') {
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

export async function storeImage(imageData, townID, tournament, fileName) {
    try {
        const baseDir = path.join(__dirname, '..', 'src', 'image'); 
        const townDir = path.join(baseDir, townID.toString()); 
        const tournamentDir = path.join(townDir, tournament.toString());

        await fs.mkdir(townDir, { recursive: true });
        await fs.mkdir(tournamentDir, { recursive: true });

        const newPath = path.join(tournamentDir, fileName);
        await fs.writeFile(newPath, imageData);

        console.log(`Image '${fileName}' stored successfully in '${tournamentDir}'.`);
    } catch (err) {
        console.error(`Error storing image: ${err}`);
    }
}
