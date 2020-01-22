const mongoose = require('mongoose')
const fastify = require('fastify')()
const routes = require('./routes')
const path = require('path')
const {parsed: {MONGO_ATLAS_PW}} = require('dotenv').config()
 
const DistPath = path.join(__dirname, '..', 'dist')

fastify.register(require('fastify-static'), {
    root: DistPath
})

mongoose.connect(`mongodb+srv://dpgian:${MONGO_ATLAS_PW}@listitemsdb-htxuk.mongodb.net/test?retryWrites=true&w=majority` , { useFindAndModify: false, useNewUrlParser: true })
    .then(() => console.log('MongoDB connected'))
    .catch((err) => console.log('MongoDB could not be connected, error: ' + err ))

fastify.get('/', async (req, res) => {
    try {
        return res.sendFile('index.html')
    }
    catch (err) {
        console.log('Error: ' + err)
    }
})

routes.forEach(route => fastify.route(route))

fastify.listen(process.env.PORT || 3000, '0.0.0.0', (err) => {
    if (err) {
        console.log(err)
        process.exit(1)
    }
    console.log('Server running on port: ' + fastify.server.address().port)
})