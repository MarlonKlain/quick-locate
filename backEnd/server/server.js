import { fastify } from 'fastify'

const server = fastify();

server.listen({
    port:3000
})

server.get('/', () => {
    return "Hello world";
})