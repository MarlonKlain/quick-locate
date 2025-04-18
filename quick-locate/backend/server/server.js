import { fastify } from "fastify";
import cors from "@fastify/cors";
import dotenv from "dotenv";
import { neon } from "@neondatabase/serverless";
import bcrypt from "bcryptjs";
import { ImportTtems } from "../class/import-items.js";


// Creates a new Fastify web server instance
const server = fastify()

// Loads environment variables from .env file
// Makes variables available via process.env
dotenv.config()

// Security mechanism for cross-domain requests
server.register(cors, {
    // Allows requests from any domain
    // origin: "*",
    // List specific allowed domains
    origin: ["https://your-frontend.com", "http://localhost:3000", "http://localhost:8081"],
    // Specifies allowed HTTP verbs
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
});

// This starts the Fastify server and makes it listen for incoming requests
// Configuration object (where/how to listen)
// Callback function (what to do when server starts)
// server.listen(configuration, callback)

try {
    server.listen({ host: '0.0.0.0', port: process.env.PORT ?? 3000 }, () => {
        // host: '0.0.0.0'
        // Makes the server available on all network interfaces
        console.log(`Server running!`);
    });    
} catch (error) {
    console.log(error);
    
}

// This request will attempt to register the user
server.post('/register', async (request, reply) => {

    // Creates a connection pool/client for interacting with a PostgreSQL database
    const sql = neon(process.env.DATABASE_URL);
    
    // Gets the information provided by the user
    // When destructuring, the variable names must match those from the client-side
    const { firstName, lastName, username, email, password } = request.body;

    // Checks if any required field was not provided
    if(!firstName || !lastName || !username || !email || !password){
        return reply.status(400).send({ error: "All fields are required" });     
    }

    // Checks if first name or last name contain numbers
    if ((firstName || lastName).match(/\d/)){
        return reply.status(400).send({ error: "First and Last name must not have any number" });
    }

    // Sets a minimum of at least 8 characters for the password
    if((password.length < 8)){
        return reply.status(400).send({ error: "Your password must have at least 8 characters" });
    }

    // For security purposes, requires the password to be alphanumeric
    if(!password.match(/\d/)){
        return reply.status(400).send({ error: "Your password must be alphanumeric (use letters and numbers)" });
    }

    // Transforms the password into a hash for secure database storage
    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        // Using array destructuring [user] because:
        // SQL queries return results as an array of rows
        // INSERT operations typically return one row (the created record)
        // [user] extracts the first (and only) element from the results array
        const [user] = await sql `
        INSERT INTO users(
        first_name,
        last_name,
        username,
        email,
        user_password
        )
        VALUES (
        -- Parameterized values prevent SQL injection
        ${firstName},
        ${lastName},
        ${username},
        ${email},
        ${hashedPassword}
        )
        `
        return reply.status(201).send({message: "User registration successful: ", user })
        
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Database error" });
    }
})

// This request will attempt to log in the user
server.post('/login', async (request, reply) => {

    const sql = neon(process.env.DATABASE_URL);
    
    const { username, password } = request.body;
    
    // Checking if the user filled in all required fields
    if (!username || !password) {
        return reply.status(400).send({ error: "All fields are required" });
    }
    
    try {
        const [user] = await sql`
            SELECT * FROM users
            WHERE username = ${username}
        `
        // Verifying if the entered password matches the stored hash
        const validation = await bcrypt.compare(password, user.user_password); 

        // Successful login if username exists and password is correct
        if (user && validation) { 
            return reply.status(200).send({ message: "User found", user });
        } else {
            return reply.status(400).send({ error: "Username or password is incorrect" });
        }
    } catch (error) {
        console.error(error);
        return reply.status(404).send({ error: "User not found" });
    }
});

//this request will import the external data into the database
server.get('/import', async (request, reply) => {

    const sql = neon(process.env.DATABASE_URL);

    //instigating the ImportTtems class 
    let sheet = new ImportTtems();
    
    //importing the external data, in xlsx, provided by the user
    const itemsList = await sheet.storeData()


    try {
        // Start a database transaction - all following operations must succeed or all will be rolled back
        //Ensures atomicity - either all inserts succeed or none do
        await sql`BEGIN;`;
    
        // Process each item in the import list
        for (const item of itemsList) {
            // First: Ensure location exists in item_location table
            // This uses "WHERE NOT EXISTS" to prevent duplicate locations
            await sql`
            INSERT INTO item_location (location)
            SELECT ${item['location']}
            WHERE NOT EXISTS (
                SELECT 1 FROM item_location 
                WHERE location = ${item['location']}
            );
            `;
    
            // Second: Insert the actual item record
            // Uses parameterized queries (${}) to prevent SQL injection
            await sql`
            INSERT INTO item (code, partnumber, description, location)
            VALUES (
                ${item['code']},         
                ${item['partnumber']},    
                ${item['description']},   
                ${item['location']}       
            );
            `;
        }
    
        // Finalize transaction if all operations succeeded
        await sql`COMMIT;`;
    
        // Return success response
        return reply.status(200).send({ message: "Import completed successfully" });
    
    } catch (error) {
        // Critical: Rollback transaction on any error to maintain data consistency
        await sql`ROLLBACK;`;
        
        // Log full error for debugging (never expose details to client)
        console.error("Import error:", error);
        
        // Generic error message protects system information
        return reply.status(500).send({ 
            error: "Import failed - no changes were saved" 
        });
    }
});

// This request will retrieve all items and their respective information
server.get('/items', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    try {
        // Retrieve all items in the database and all free locations
        const items = await sql`
        SELECT * FROM item i
        RIGHT JOIN item_location il
        ON i.location = il.location;
        `
        return reply.status(200).send({messsage: "All products returned", items})
    } catch (error) {
        return reply.status(400).send({ message: "Failed to get the items", error: error.message});
    }
})
// This will retrive all the information about a specif item
server.get('/items/:code', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    const {code} = request.params;
    try {
        const items = await sql`
        SELECT * FROM item 
        WHERE code = ${code}
        `
        const itemLocationHistory = await sql`
        SELECT location, moved_at
        FROM item_location_history
        WHERE item_code = ${code}
        ORDER BY moved_at
        `
        return reply.status(200).send({messsage: "All products returned", items, itemLocationHistory})
    } catch (error) {
        return reply.status(400).send({ message: "Failed to get the items", error: error.message});
    }
})

// This request will retrieve all locations and return only the first letter of each one without duplicates
server.get('/locations', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    try {
        const locations = await sql`
        SELECT DISTINCT LEFT(location, 1) AS first_character
        FROM item
        ORDER BY first_character;
        `
        return reply.status(200).send({message: "All locations returned", locations})
    } catch (error) {
        return reply.status(400).send({ message: "Failed to get the locations", error: error.message});
    }
})
//arrumar isso aqui v
server.get('/locations/:location', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL)
    const {location} = request.params;
    try {
        const itemsByLocation = await sql`
        SELECT * FROM item i
        RIGHT JOIN item_location il
        ON i.location = il.location
        WHERE il.location LIKE ${location + '%'}
        `;
        return reply.status(200).send({message: "All items of the select location were returned", itemsByLocation})
    } catch (error) {
        return reply.status(400).send({message: "Something went wrong tryng to get the items of the select location", error: error.message })
    }
})

// server.post('/register-new-location', async (request, reply) => {
//     const sql = neon(process.env.DATABASE_URL);
//     const {item_location} = request.body;

//     try {
//         const [location] = await sql`
//         INSERT INTO locations(item_location) VALUES (${item_location})
//         `
//         return reply.status(200).send({message: "New locations registered!", location})
//     } catch (error) {
//         return reply.status(400).send({message: "Something went wrong on registering new location!", error: error.message})  
//     } 
// })

// server.post('/delete-location', async (request, reply) => {
//     const sql = neon(process.env.DATABASE_URL);
//     const {item_location} = request.body;

//     try {
//         const [location] = await sql`
//         DELETE FROM locations 
//         WHERE item_location=${item_location}
//         `
//         return reply.status(200).send({message: "Location deleted", location})
//     } catch (error) {
//         return reply.status(400).send({message: "Something went wrong on deleting new location!", error: error.message})  
//     } 
// })

// This request will update the item location
server.put('/modify-location', async(request, reply) =>{
    const sql = neon(process.env.DATABASE_URL);
    const {code, location} = request.body
    try {
        // Starting the transaction
        await sql`BEGIN;`;
        // Checking if the provided location doesn't already exist in the database
            await sql`
            INSERT INTO item_location (location)
            SELECT ${location}
            WHERE NOT EXISTS (SELECT 1 FROM item_location WHERE location = ${location});
            `;
            // Updating the item location
            await sql`
            UPDATE item 
            SET location = ${location}
            WHERE code = ${code}
            `;

            // Creating a record in the history table of the location change
            await sql(`
            INSERT INTO item_location_history (item_code, location)
            VALUES ($1, $2)
            `, [code, location]) 
        await sql`COMMIT;`;

        reply.status(200).send({message: "Location updated!"})
    } catch (error) {
        await sql`ROLLBACK`
        reply.status(400).send({message: "Something went wrong when updating location", error: error.message})
    }
})

// This request will retrieve all available free locations
server.get('/all-free-locations', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL)
    try {
        const freeLocations = await sql`
        SELECT il.location from 
        item_location il
        LEFT JOIN item i
        ON il.location = i.location
        WHERE i.location is null;
        `
        return reply.status(200).send({message: "All free locations returned", freeLocations})
    } catch (error) {
        return reply.status(400).send({message: "Something went wrong while searching for free locations", error: error.message})
    }
})

server.get('/filter', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    const filter = request.query.filter;
    const column = request.query.column;

    // Validate column name to prevent SQL injection
    const allowedColumns = ['code', 'partnumber', 'description', 'location']; 
    if (!allowedColumns.includes(column)) {
        return reply.status(400).send({ message: "Invalid column name" });
    }

    try {
        const filterResult = await sql(`
            SELECT * FROM item i
            RIGHT JOIN item_location il
            ON i.location = il.location
            WHERE i.${column} LIKE $1
        `, [filter + "%"]);

        return reply.status(200).send({ message: "Filter has been applied!", filterResult });
    } catch (error) {
        return reply.status(400).send({ message: "Filter was not applied!", error: error.message });
    }
});
// server.put('/delete-free-location', async (request, reply) => {
//     const sql = neon(process.env.DATABASE_URL);
//     const location = request.body
//     try {
//         const deleteResponse = await sql`
//         DELETE FROM item_location
//         WHERE location = ${location}
//         `
//         return reply.status(200).send({message: "Location deleted!", deleteResponse})
//     } catch (error) {
//         return reply.status(400).send({message: "Location not deleted, something went wrong!", error: error.message})
//     }
// })

// server.post('/upload', async (req, reply) => {
//     try {
//         const data = await req.file(); // Get the uploaded file

//         if (!data) {
//             return reply.status(400).send({ error: 'No file uploaded' });
//         }

//         console.log('Received file:', data.filename); // File name

//         // Save file to server (optional)
//         const uploadPath = path.join(__dirname, 'uploads', data.filename);
//         await pipeline(data.file, fs.createWriteStream(uploadPath));

//         reply.send({ message: 'File uploaded successfully', filename: data.filename });
//     } catch (error) {
//         console.error('Upload error:', error);
//         reply.status(500).send({ error: 'File upload failed' });
//     }
// });