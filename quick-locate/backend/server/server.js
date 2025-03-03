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

server.register(cors, {
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
});
dotenv.config()

server.listen({ host:'0.0.0.0', port: process.env.PORT ?? 3000}, () => {
    
    console.log("Server running on http://localhost:3000");
});


server.post('/register', async (request, reply) => {
    const sql = neon();
    
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
    const sql = neon();
    
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
        return reply.status(404).send({ message: "User not found" });
    }
});

server.post('/import', async (request, reply) => {
    // Create a validation that will check if the product already exists in the database
    const sql = neon();
    
    
    let sheet = new ImportTtems();

    const listItems = await sheet.storeData()
    console.log(listItems);
    
    for(const item of listItems){
        try {
            const [items] = await sql `
            INSERT INTO items(
            code, 
            partnumber, 
            description, 
            item_location
            )
            VALUES (
            ${item['Código']},
            ${item['Partnumber']},
            ${item['Descrição']},
            ${item['Localização']}
            )
            `
    } catch (error) {
        console.error(error);
    }
}   
    return reply.status(200).send({ message: "Product not registered", items});
})

server.get('/items', async (request, reply) => {
    const sql = neon();
    try {
        const items = await sql`SELECT * FROM items`
        return reply.status(200).send({messsage: "All products returned", items})
    } catch (error) {
        return reply.status(400).send({ message: "Failed to get the items", error: error.message});
    }
})

server.get('/locations', async (request, reply) => {
    const sql = neon ("postgresql://neondb_owner:npg_rCl4Iz3iWLaN@ep-jolly-truth-a82hil10-pooler.eastus2.azure.neon.tech/neondb?sslmode=require");
    try {
        const locations = await sql `SELECT * FROM locations`
        return reply.status(200).send({messsage: "All locations returned", locations})
    } catch (error) {
        return reply.status(400).send({ message: "Failed to get the locations", error: error.message});
    }
})