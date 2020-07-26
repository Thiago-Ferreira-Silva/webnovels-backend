const { urlencoded } = require("body-parser")

module.exports = app => {
    app.use(urlencoded({ extended: true }))
}