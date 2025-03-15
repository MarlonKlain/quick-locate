import * as XLSX from "xlsx/xlsx.mjs";
import { readFileSync } from "fs";

export class ImportTtems {
    async storeData(){
        const buf = readFileSync("items.xlsx");
        /* buf is a Buffer */
        const workbook = read(buf);
        // Select the first sheet
        const sheetName = workbook.SheetNames[0]; 
        // Get the first sheet name
        const worksheet = workbook.Sheets[sheetName];
        // Convert sheet data to JSOksN
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        return jsonData;
           
    }

}
