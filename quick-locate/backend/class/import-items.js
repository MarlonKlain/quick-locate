import { readFileSync } from "fs";
var XLSX = require("xlsx");
// import { } from "../../uploads/items.xlsx"

export class ImportTtems {
    async storeData(){
        var workbook = XLSX.readFile('./items.xlsx');
        // Select the first sheet
        const sheetName = workbook.SheetNames[0]; 
        // Get the first sheet name
        const worksheet = workbook.Sheets[sheetName];
        // Convert sheet data to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        console.log(jsonData);
        return jsonData;
           
    }

}
