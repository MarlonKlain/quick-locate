import * as SQLite from 'expo-sqlite'

export async function createLocalDatabase(){
    const db = await SQLite.openDatabaseAsync('items-local-database.db');    
    await db.execAsync(`
        CREATE TABLE IF NOT EXISTS items(
            id_item INTEGER PRIMARY KEY AUTOINCREMENT, 
            code TEXT NOT NULL UNIQUE, 
            partnumber TEXT NOT NULL, 
            description TEXT NOT NULL, 
            item_location TEXT NOT NULL, 
            date_lastRecord TEXT NOT NULL
            )
            `);
    console.log("Local database created successfully");
    
    }

