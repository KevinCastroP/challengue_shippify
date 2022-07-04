const fs = require('fs');
const {
    v4: uuidv4
} = require('uuid');

const {
    calculateDistance
} = require('../../utils/utils');


const routeProcessor = async function (body) {
    try {
        // Extract data from request body
        const maxDistance = body.maximun_distance
        const traffic = body.considerer_traffic
        const plot = body.plot
        const maxDistBetweenPoints = body.maximun_distance_between_points

        // Get deliveries from payload json file
        const deliveries = await getData()
        // Filter deliveries by max distance between points
        let filteredDeliveries = await filterByDistanceBetweenPoints(deliveries, maxDistBetweenPoints)

        // Sort deliveries by traffic if is required
        if (traffic) {
            filteredDeliveries.sort((a, b) => {
                return a.traffic - b.traffic
            })
        }

        // Get all valid deliveries
        let pointsRoute = await getDeliveries(filteredDeliveries, maxDistance)

        // Create route
        const filterSteps = await createRoute(pointsRoute)

        // Validate amount of deliveries to create a route and send the response
        if (filterSteps.length >= 2) {
            const resultProcess = {
                routeId: uuidv4(),
                maximun_distance: pointsRoute.reduce((acc, cur) => acc + cur.distance, 0),
                considerer_traffic: traffic,
                number_of_steps: filterSteps.length,
                steps: filterSteps
            }
            return ({
                code: 200,
                result: resultProcess
            })
        } else {
            return ({
                code: 400,
                result: null
            })
        }
    } catch (error) {
        console.log(error)
    }
}


async function getData() {
    // Load deliveries from payload json file
    const payload = fs.readFileSync('././volume_data/payloadTest.json', 'utf8', function (err, data) {
        if (err) throw err
    })
    const deliveries = JSON.parse(payload)

    return deliveries
}


async function filterByDistanceBetweenPoints(deliveries, maxDistBetweenPoints) {
    // Create an array with all deliveries that don't exceed the max distance between points
    let filteredDeliveries
    if (maxDistBetweenPoints) {
        filteredDeliveries = deliveries.filter(delivery => {
            return delivery.distance <= maxDistBetweenPoints
        })
    } else {
        filteredDeliveries = deliveries
    }
    return filteredDeliveries
}


async function nextPosition(initPoint, filteredDeliveries) {
    // Calculate the next near position and distance
    let nextPosition = {
        distance: -1,
        nextDelivery: filteredDeliveries[0],
        index: 0 
    }

    for (let i = 0; i < filteredDeliveries.length; i++) {
        const nextDelivery = filteredDeliveries[i]
        let distance = calculateDistance(initPoint, nextDelivery.pickup_location)

        if (distance < nextPosition.distance || nextPosition.distance === -1) {
            nextPosition.distance = distance
            nextPosition.nextDelivery = nextDelivery
            nextPosition.index = i
        }
    }
    return nextPosition
}


async function getDeliveries(filteredDeliveries, maxDistance) {
    // Get valid deliveries per parameters
    let sumMaxDistance = 0

    let pointsRoute = []
    pointsRoute.push(filteredDeliveries.shift())
    sumMaxDistance += pointsRoute[0].distance

    let i = 0

    while (sumMaxDistance < maxDistance && i < pointsRoute.length) {
        const nextPos = await nextPosition(pointsRoute[i].delivery_location, filteredDeliveries)
        if (filteredDeliveries[nextPos.index].distance) {
            sumMaxDistance += filteredDeliveries[nextPos.index].distance
            if (sumMaxDistance <= maxDistance) {
                pointsRoute.push(nextPos.nextDelivery)
                i += 1
                filteredDeliveries.splice(nextPos.index, 1)
            }
        } else {
            break
        }
    }
    return pointsRoute
}


async function createRoute(pointsRoute) {
    // Create the route from valid deliveries per parameters
    let steps = []

    pointsRoute.forEach(delivery => {
        steps.push({
            point: delivery.pickup_location,
            id: delivery.id
        })
        steps.push({
            point: delivery.delivery_location,
            id: delivery.id
        })
    })

    // Delete duplicate steps
    const filterSteps = steps.filter((step, index) => {
        if (index > 0) {
            return JSON.stringify(step.point) !== JSON.stringify(steps[index - 1].point)
        } else {
            return true
        }
    })
    return filterSteps
}


module.exports = {
    routeProcessor
}