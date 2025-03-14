import * as SQLite from 'expo-sqlite'

export async function createLocalDatabase(){
    const db = await SQLite.openDatabaseAsync('items-local-database.db');
    try {
        await db.execAsync(`
            PRAGMA foreign_keys = ON;
    
            CREATE TABLE IF NOT EXISTS item ( 
                code TEXT PRIMARY KEY, 
                partnumber TEXT, 
                description TEXT,
                location text, 
                FOREIGN KEY (location) REFERENCES item_location(location)
            );
    
            CREATE TABLE IF NOT EXISTS item_location (
                location TEXT PRIMARY KEY
            );
    
            CREATE TABLE IF NOT EXISTS item_location_history (
                id INTEGER PRIMARY KEY ,
                item_code TEXT,
                location TEXT,
                moved_at DATETIME DEFAULT CURRENT_TIMESTAMP,
                FOREIGN KEY (item_code) REFERENCES item(code),
                FOREIGN KEY (location) REFERENCES location(location)
            );
                `);
        
    } catch (error) {
        console.log(error);
        
    }    
    console.log("Local database created successfully");
    
    }

