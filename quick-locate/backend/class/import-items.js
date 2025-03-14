import { readFileSync } from "fs";
import * as XLSX from "xlsx/xlsx.mjs";
// import { } from "../../uploads/items.xlsx"

export class ImportTtems {
    async storeData(){
        const buf = readFileSync("../../uploads/items.xlsx");
        /* buf is a Buffer */
        const workbook = XLSX.read(buf);
    
        // Select the first sheet
        const sheetName = workbook.SheetNames[0]; 
        // Get the first sheet name
        const worksheet = workbook.Sheets[sheetName];
    
        // Convert sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        return jsonData;
           
    }

}
