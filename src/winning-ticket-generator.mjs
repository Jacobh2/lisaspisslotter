import path from 'path';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import fs from 'fs/promises';
import TicketGenerator from './TicketGenerator.js';


async function run() {
    //joining path of directory 
    const __dirname = dirname(fileURLToPath(import.meta.url));

    const iconsDirectory = path.join(__dirname, 'public/icons');

    const availableIcons = (await fs.readdir(iconsDirectory, 'utf-8'))
        .filter((name) => name.endsWith(".webp"))
        .map((name) => name.split(".")[0].replace('_', ''));

    const tile = process.argv[2];

    if (!availableIcons.includes(tile)){
        console.log(`\nLooks like '${tile}' doesn't have an icon!`);
        console.log("Start by adding a .webp icon in public/icons\n");
        return;
    }

    console.log("\n*** Will generate winning board with", tile, "as price ***\n");
    
    const ticketGenerator = new TicketGenerator();
    const gameBoard = ticketGenerator._generateBoard(true, ticketGenerator.getTile(tile));

    console.log(JSON.stringify(gameBoard));
}

run();




