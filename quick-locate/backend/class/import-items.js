import { readFileSync } from "fs";
import * as XLSX from "xlsx/xlsx.mjs";

export class ImportTtems {
    async storeData(){
        // readFileSync uses the project root as reference for the path, not the file's location
        const buf = readFileSync("./uploads/items.xlsx");
        /* buf is a Buffer object */
        const workbook = XLSX.read(buf);
        // Select the first sheet
        const sheetName = workbook.SheetNames[0]; 
        // Get the first sheet's name
        const worksheet = workbook.Sheets[sheetName];
        // Convert the sheet data to a JSON object
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        return jsonData;
           
    }
}