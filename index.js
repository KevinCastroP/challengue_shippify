const {
    config
} = require('./src/config/index');

const fastify = require('fastify')();

fastify.register(require('fastify-cors'), {
    origin: ['*', 'http://127.0.0.1', 'http://127.0.0.1:80', 'http://127.0.0.1/#/', 'http://127.0.0.1:8080'],
    allowedHeaders: ['Origin', 'Content-Type', 'Authorization', 'Accept', 'x-api-key'],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    optionsSuccessStatus: 200,
    preflightContinue: true
});


const start = async () => {
    try {
        await fastify.listen(config.httpPort, config.host)
        fastify.log.info(`server listening on ${fastify.server.address().port}`)
        console.log(`server listening on ${fastify.server.address().port}`)
    } catch (err) {
        fastify.log.error(err)
        process.exit(1)
    }
}
start()