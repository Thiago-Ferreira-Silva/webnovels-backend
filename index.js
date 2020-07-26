const app = require('express')()
const db = require('./config/db.js')
const consign = require('consign')
const port = 8081

app.db = db

consign()
    .include('./config/passport.js')
    .then('./config/middlewares.js')
    .then('./api')
    .then('./config/routes.js')
    .into(app)

app.listen(port, () => {
    console.log(`Running on port ${port}`)
})