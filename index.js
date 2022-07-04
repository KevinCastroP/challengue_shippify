const {
    config
} = require('./src/config/index');

const {
    routeProcessor
} = require('./src/routes/index');

const fastify = require('fastify')();


fastify.post('/generate_route', async (request, reply) => {
    const xApiKey = request.headers["x-api-key"]
    if (xApiKey !== config.xApiKey) {
        reply.statusCode = 401
        console.log("Authorization failed")
        reply.send({
            data: null,
            success: false,
            message: "Authorization failed"
        })
        return
    }

    const body = JSON.parse(request.body)
    const resultValidator = await routeProcessor(body)

    if (resultValidator.code === 200) {
        console.log("Route generated successfully")
        reply.send({
            data: resultValidator,
            success: true,
            message: "Route generated successfully"
        })
    } else {
        reply.statusCode = 400
        console.log("It's not possible to create a route with the parameters received")
        reply.send({
            data: null,
            success: false,
            message: "It's not possible to create a route with the parameters received"
        })
        return
    }
})


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
