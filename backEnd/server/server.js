import {fastify} from "fastify";
import cors from "@fastify/cors"
import dotenv from "dotenv";
import { neon } from '@neondatabase/serverless';

dotenv.config()
const server = fastify()


server.register(cors, {
    origin: "*", // Allows all origins
    methods: ["GET", "POST", "PUT", "DELETE"], // Allowed HTTP methods
});

server.listen({ port: 3000 }, () => {
    console.log("Server running on http://localhost:3000");
});

server.post('/register', async (request, reply) => {
    const sql = neon(###);
    
    //When destructuring, the name of the variable must match the name of variable at the front end
    const { firstName, lastName, username, email, password} = request.body;
    
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
        ${password}
        )
        `
        return reply.status(201).send({message: "User registraded sucessfull: ", user })
        
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Database error" });
    }
})

server.get('/login/:username', async (request, reply) => {
    const sql = neon(###);
    
    // Accessing the 'username' parameter from the route
    const { username } = request.params; // This is correct, no need for destructuring like above
    
    try {
        const [user] = await sql`
            SELECT * FROM user_profile
            WHERE user_username = ${username}
        `;
        
        if (user) {
            return reply.status(200).send({ message: "User found", user });
        } else {
            return reply.status(404).send({ message: "User not found" });
        }
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ error: "Database error" });
    }
});
