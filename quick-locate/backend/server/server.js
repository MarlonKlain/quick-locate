import {fastify} from "fastify";
import cors from "@fastify/cors"
import dotenv from "dotenv";
import { neon } from '@neondatabase/serverless';
import bcrypt from "bcryptjs";
import {ImportTtems} from "../class/import-items.js"
import multer from "multer";


//The folder where the uploads will be stored
const upload = multer({dest: 'uploads/'})

const server = fastify()
dotenv.config()

server.register(cors, {
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
});

server.listen({ host:'0.0.0.0', port: process.env.PORT ?? 3000}, () => {
    
    console.log(`Server running!`);
});

server.post('/register', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    
    //When destructuring, the name of the variable must match the name of variable at the front end
    const { firstName, lastName, username, email, password} = request.body;

    if(!firstName || !lastName || !username || !email || !password){
        return reply.status(400).send({ error: "All fields are required" });     
    }

    if ((firstName || lastName).match(/\d/)){
        return reply.status(400).send({ error: "First and Last name must not have any number" });
        
    }
    if((password.length < 8)){
        return reply.status(400).send({ error: "Your password must have above 8 characteres" });
    }

    if(!password.match(/\d/)){
        return reply.status(400).send({ error: "Your password must be alphanumeric (Use letters and numbers)" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    try {
        const [user] = await sql `
        INSERT INTO user_profile (
        user_first_name, 
        user_last_name, 
        user_username, 
        user_email, 
        user_password
        )
        VALUES (
        ${firstName},
        ${lastName},
        ${username},
        ${email},
        ${hashedPassword}
        )
        `
        return reply.status(201).send({message: "User registraded sucessfull: ", user })
        
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Database error" });
    }
})

server.post('/login', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    
    const {username, password} = request.body;
    
    if (!username || !password) {
        return reply.status(400).send({ error: "All fields are required" });
    }
    
    try {
        const [user] = await sql`
            SELECT * FROM user_profile
            WHERE user_username = ${username}
        `
        const validation = await bcrypt.compare(password, user.user_password); 

        if (user && validation) { 
            return reply.status(200).send({ message: "User found", user });
        } else {
        }
    } catch (error) {
        console.error(error);
        return reply.status(404).send({ message: "User not found"});
    }
});

server.get('/import', async (request, reply) => {
    // Create a validation that will check if the product already exists in the database
    const sql = neon(process.env.DATABASE_URL);
    
    
    let sheet = new ImportTtems();

    const itemsList = await sheet.storeData()
    console.log(itemsList);
    try {
        await sql`BEGIN;`;

        for (const item of itemsList) {
            await sql`
            INSERT INTO item_location (location)
            SELECT ${item['location']}
            WHERE NOT EXISTS (SELECT 1 FROM item_location WHERE location = ${item['location']});
            `;

            await sql`
            INSERT INTO item (code, partnumber, description, location)
            VALUES (${item['code']}, ${item['partnumber']}, ${item['description']}, ${item['location']});
            `;
        }

        await sql`COMMIT;`;

        return reply.status(200).send({ message: "Import completed successfully" });

    } catch (error) {
        
        await sql`ROLLBACK;`;
        console.error(error);
        return reply.status(500).send({ error: "Import failed" });
    }
});

server.get('/items', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    try {
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

server.get('/items/:code', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    const code = request.query.code;
    try {
        const items = await sql`
        SELECT * FROM item 
        WHERE code = ${code}
        `
        return reply.status(200).send({messsage: "All products returned", items})
    } catch (error) {
        return reply.status(400).send({ message: "Failed to get the items", error: error.message});
    }
})

server.get('/locations', async (request, reply) => {
    const sql = neon (process.env.DATABASE_URL);
    try {
        const locations = await sql`
        SELECT DISTINCT LEFT(location, 1) AS first_character
        FROM item
        ORDER BY first_character;
        `
        return reply.status(200).send({messsage: "All locations returned", locations})
    } catch (error) {
        return reply.status(400).send({ message: "Failed to get the locations", error: error.message});
    }
})

server.get('/locations/:location', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL)
    const location = request.query.location;
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

server.post('/register-new-location', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    const {item_location} = request.body;

    try {
        const [location] = await sql`
        INSERT INTO locations(item_location) VALUES (${item_location})
        `
        return reply.status(200).send({message: "New locations registered!", location})
    } catch (error) {
        return reply.status(400).send({message: "Something went wrong on registering new location!", error: error.message})  
    } 
})

server.post('/delete-location', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL);
    const {item_location} = request.body;

    try {
        const [location] = await sql`
        DELETE FROM locations 
        WHERE item_location=${item_location}
        `
        return reply.status(200).send({message: "Location deleted", location})
    } catch (error) {
        return reply.status(400).send({message: "Something went wrong on deleting new location!", error: error.message})  
    } 
})

server.put('/modify-location', async(request, reply) =>{
    const sql = neon(process.env.DATABASE_URL);
    const {code, location} = request.body
    try {
        await sql`BEGIN;`;
            await sql`
            INSERT INTO item_location (location)
            SELECT ${location}
            WHERE NOT EXISTS (SELECT 1 FROM item_location WHERE location = ${location});
            `;

            await sql`
            UPDATE item 
            SET location = ${location}
            WHERE code = ${code}
            `;
        await sql`COMMIT;`;

        reply.status(200).send({message: "Location updated!"})
    } catch (error) {
        reply.status(400).send({message: "Something went wrong when updating location", error: error.message})
    }

})

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
        return reply.status(400).send({message: "Something went wrong searching for free locations", error: error.message})
    }
})

server.get('/filter', async (request, reply) => {
    const sql = neon(process.env.DATABASE_URL)
    const filter = request.query.filter
    const column = request.query.column
    try {
        const filterResult = await sql`
        SELECT * FROM item i
        RIGHT JOIN item_location il
        ON i.location = il.item_location
        WHERE i.${column} LIKE ${filter + "%"}
        `
        return reply.status(200).send({message: "Filter been aplied!", filterResult})
    } catch (error) {
        return reply.status(400).send({message: "Filter was not aplied!", error:error.message})
    }
})