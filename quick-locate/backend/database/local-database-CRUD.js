import { useSQLiteContext } from 'expo-sqlite';

export function useLocalDatabase(){
    const database = useSQLiteContext();
    async function storeDataLocally(rows) {
        // const query = `
        // INSERT OR IGNORE INTO item (
        // code, 
        // partnumber, 
        // description, 
        // location, 
        // ) 
        // VALUES (?, ?, ?, ?, ?);
        // `
        for (const item of rows.items) {      
            try {
                const localResult = await database.runAsync(query, item.code, item.partnumber, item.description, item.location, item.date_lastrecord)
                return localResult
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function getAllLocalData() {
        try {
            const query = "SELECT * FROM item"
            const response = await database.getAllAsync(query)
            return response
        } catch (error) {
            console.log("getAllLocalData: ", error)
        }
    }

    async function filter(name, column) {
        try {
          const query = `SELECT * FROM item WHERE ${column} LIKE ?`
          const response = await database.getAllAsync(query, `%${name}%`)
          return response
      } catch (error) {
          console.log("filter: ", error)
        }
    }

    async function getItemInformationByCode(code) {
        try {
            const query = `SELECT * FROM item where code = ?`
            const response = await database.getAllAsync(query, `${code}`)
            return response
        } catch (error) {
            console.log("Item by code ", error)
        }
    }

    async function modifyLocation(code, newLocation) {
        try {
            const query = `UPDATE item
            SET location = ?
            WHERE code = ?`
            const response = await database.runAsync(query, `${newLocation}`, `${code}`)
            console.log("Endereço alterado com sucesso!");
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async function getAllItemsByLocation(location) {
        try {
            const query = `SELECT code, partnumber, description, location FROM item where location LIKE ?`
            const response = await database.getAllAsync(query, `${location}%`)
            return response
        } catch (error) {
            console.error(error);
        }
    }

    async function  listOfLocations() {
        try {
            const query = `
            SELECT DISTINCT SUBSTR(location, 1, 1) AS first_caracter
            FROM item
            ORDER BY first_caracter
            `
            const response = await database.getAllAsync(query)
            return response
        } catch (error) {
            console.log(error);
        }
    }

    async function dropTable() {
        try {
            const query = `
            DROP TABLE items
            `
            const response = await database.execAsync(query)
            console.log(response);
            
        } catch (error) {
            console.error(error)
        }
    }
    return {storeDataLocally, getAllLocalData, filter, getAllLocalData, getItemInformationByCode, modifyLocation, getAllItemsByLocation, listOfLocations, dropTable}
}

