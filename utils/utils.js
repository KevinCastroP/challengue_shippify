function calculateDistance(point1, point2) {
    return Math.abs(point1[0] - point2[0]) + Math.abs(point1[1] - point2[1]);
}


module.exports = {
    calculateDistance
}
