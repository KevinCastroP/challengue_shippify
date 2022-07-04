const fs = require('fs');
const {
    v4: uuidv4
} = require('uuid');

const {
    calculateDistance
} = require('../../utils/utils');


const validator = async function (body) {
    // Load deliveries from payload file
    const payload = fs.readFileSync('././volume_data/payloadTest.json', 'utf8', function (err, data) {
        if (err) throw err
    })

    const deliveries = JSON.parse(payload)

    try {
        const maxDistance = body.maximun_distance
        const traffic = body.considerer_traffic
        const plot = body.plot
        const maxDistBetweenPoints = body.maximun_distance_between_points

        // Create an array with all deliveries that don't exceed the max distance between points
        const filteredDeliveries = deliveries.filter(delivery => {
            return delivery.distance <= maxDistBetweenPoints
        })

        const pointsRoute = []
        const initPoint = filteredDeliveries[0]

        // const resultProcess = {
        //     routeId: uuidv4(),
        //     maximun_distance: ,
        //     number_of_steps: ,
        //     steps: []
        // }
        return ({
            code: 200,
            success: "OK",
            // result: resultProcess
        })
    } catch (error) {
        console.log(error)
    }
}

module.exports = {
    validator
}