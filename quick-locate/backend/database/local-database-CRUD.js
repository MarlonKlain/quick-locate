import { useSQLiteContext } from 'expo-sqlite';

export function useLocalDatabase(){

    const database = useSQLiteContext();

    async function storeDataLocally(rows) {
        //fazer o camando correto
        const statementInsertLocation  = await database.prepareAsync(`
            INSERT INTO item_location (location)
            SELECT $location
            WHERE NOT EXISTS (SELECT 1 FROM item_location WHERE location = $location);
            `)
        const statementInsertItem = await database.prepareAsync(`
            INSERT INTO item (code, partnumber, description, location)
            VALUES ($code, $partnumber, $description, $location); 
            `)
            try {
                for (const item of rows.items) {
                const resultLocation  = await statementInsertLocation.executeAsync({
                    $location: item.location
                })

                const resultItem  = await statementInsertItem.executeAsync({
                    $code: item.code,
                    $partnumber: item.partnumber,
                    $description: item.description,
                    $location: item.location
                })
                console.log(resultLocation);
                console.log(resultItem);
                }
            } catch (error) {
                console.error("Insert error:" , error);
            } finally {
                await statement.finalizeAsync()
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

    async function getAllLocalDataLocation() {
        try {
            const query = "SELECT * FROM item_location"
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

    async function deleteTableDatabase() {
        try {
            const query = `
            DROP TABLE items
            `
            const response = await database.runAsync(query)
            console("Database deleted!")
        } catch (error) {
            console.log(error);
            
        }
    }

    async function deleteContentDabase(params) {
        try {
            const query = `
            DELETE FROM item
            `
            const response = await database.runAsync(query)
            console.log("Data has been deleted!")
            return response
        } catch (error) {
            console.log(error);
        }
    }
    return {storeDataLocally, getAllLocalData, filter, getAllLocalData, getItemInformationByCode, modifyLocation, getAllItemsByLocation, listOfLocations, deleteContentDabase, deleteContentDabase, getAllLocalDataLocation, deleteTableDatabase}
}


