require('dotenv').config();

const config = {
    httpPort: parseInt(process.env.HTTP_PORT),
    host: process.env.HOST,
    xApiKey: process.env.X_API_KEY,

};

module.exports = {
    config
}