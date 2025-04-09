import { readFileSync } from "fs";
import * as XLSX from "xlsx/xlsx.mjs";

export class ImportTtems {
    async storeData(){
        // The readFileSync use as reference the root of the project in the path and not where the file is at.
        const buf = readFileSync("./uploads/items.xlsx");
        /* buf is a Buffer */
        const workbook = XLSX.read(buf);
        // Select the first sheet
        const sheetName = workbook.SheetNames[0]; 
        // Get the first sheet name
        const worksheet = workbook.Sheets[sheetName];
        // Convert sheet data to a JSON object
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        return jsonData;
           
    }

}
