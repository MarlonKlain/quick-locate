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
                const localResult = await database.runAsync(query, [item.code, item.partnumber, item.description, item.item_location, item.date_lastrecord])
            } catch (error) {
                console.error(error);
            }
        }
    }

    async function getAllLocalData() {
        try {
            const query = "SELECT * FROM items"
            const response = await database.getAllAsync(query)
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
            return response
        } catch (error) {
            console.log(error);
        }
    }
    return {storeDataLocally, getAllLocalData, filter, getAllLocalData, getItemInformationByCode, modifyLocation}
}

