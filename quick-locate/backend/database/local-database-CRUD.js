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
                }
            } catch (error) {
                console.error("Insert error:" , error);
            } finally {
                await statementInsertLocation.finalizeAsync()
                await statementInsertItem.finalizeAsync()
            }

        }

    async function getAllLocalData() {
        try {
            const query = `
            SELECT * from 
                item i
                RIGHT JOIN 
                item_location il
                ON i.location = il.location
            `
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
        const query = `
            SELECT * from 
                item i
                RIGHT JOIN 
                item_location il
                ON i.location = il.location
                WHERE i.${column} like ?
            `
          const response = await database.getAllAsync(query, `%${name}%`)
        //   console.log("Filter: " ,response);
          
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

            const statementInsertLocation  = await database.prepareAsync(`
                INSERT INTO item_location (location)
                SELECT $location
                WHERE NOT EXISTS (SELECT 1 FROM item_location WHERE location = $location);
                `)
            const statementUpdateLocation = await database.prepareAsync( `UPDATE item
                SET location = $newLocation
                WHERE code = $code
                `)
            const resultInsertLocation = await statementInsertLocation.executeAsync({
                $location: newLocation
            })

            const resultUpdateNewLocation = await statementUpdateLocation.executeAsync({
                $newLocation: newLocation,
                $code: code
            })

            console.log("Endereço alterado com sucesso!");
        } catch (error) {
            console.log(error);
        } finally {
            await statementInsertLocation.finalizeAsync()
            await statementUpdateLocation.finalizeAsync()
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

    async function listOfLocations() {
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

    async function deleteContentDabase() {
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

    async function getAllFreeLocations() {
        try {
            const query = `
            SELECT * from 
                item i
                RIGHT JOIN 
                item_location il
                ON i.location = il.location
                WHERE i.location IS NULL;
            `
            const result = await database.getAllAsync(query)
            return result
        } catch (error) {
            console.log(error)
        }
    }
    return {storeDataLocally, getAllLocalData, filter, getAllLocalData, getItemInformationByCode, modifyLocation, getAllItemsByLocation, listOfLocations, deleteContentDabase, deleteContentDabase, getAllLocalDataLocation, deleteTableDatabase, getAllFreeLocations}
}


