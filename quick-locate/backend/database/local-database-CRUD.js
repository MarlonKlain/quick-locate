import { useSQLiteContext } from 'expo-sqlite';

export function useLocalDatabase(){
    const database = useSQLiteContext();
    async function storeDataLocally(rows) {
        const query = `
        INSERT INTO items (
        code, 
        partnumber, 
        description, 
        item_location, 
        date_lastRecord
        ) 
        VALUES (?, ?, ?, ?, ?);
        `
        for (const item of rows.items) {      
            try {
                const localResult = await database.runAsync(query, item.code, item.partnumber, item.description, item.item_location, item.date_lastrecord)
                // console.log("Stored: ", localResult);
                return localResult
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function getAllLocalData() {
        try {
            const query = "SELECT * FROM items"
            const response = await database.getAllAsync(query)
            console.log("Items List: ", response);
            
            return response
        } catch (error) {
            console.log("getAllLocalData: ", error)
        }
    }

    async function filter(name, column) {
        try {
          const query = `SELECT * FROM items WHERE ${column} LIKE ?`
          const response = await database.getAllAsync(query, `%${name}%`)
          return response
      } catch (error) {
          console.log("filter: ", error)
        }
    }

    async function getItemInformationByCode(code) {
        try {
            const query = `SELECT * FROM items where code = ?`
            const response = await database.getAllAsync(query, `${code}`)
            return response
        } catch (error) {
            console.log("Item by code ", error)
        }
    }

    async function modifyLocation(code, newLocation) {
        try {
            const query = `UPDATE items
            SET item_location = ?
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
            const query = `SELECT code, partnumber, description, item_location FROM items where item_location LIKE ?`
            const response = await database.getAllAsync(query, `${location}%`)
            return response
        } catch (error) {
            console.error(error);
        }
    }
    return {storeDataLocally, getAllLocalData, filter, getAllLocalData, getItemInformationByCode, modifyLocation, getAllItemsByLocation}
}

