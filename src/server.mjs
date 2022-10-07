import * as webLib from './web-lib.mjs';
import * as path from "path";
import * as fs from "fs";

import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename); 
const pathName = path.join(__dirname, 'config.json')
fs.readFile(pathName, "utf-8", (err, data) =>{
    if (err) {throw err;}
    const parsedData = JSON.parse(data);
    const fullPath = path.join(__dirname, "..", parsedData["root_directory"])
    const server = new webLib.HTTPServer(fullPath, parsedData["redirect_map"]);
    server.listen(3000);
})

// TODO: configure and start server