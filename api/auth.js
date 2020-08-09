const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app => {

    const signin = async (req, res) => {
        const user = await app.db('users')
                        .where({ username: req.body.username })
                        .first()
    
    const isMatch = bcrypt.compareSync(req.body.password, user.password)  
    if(!isMatch) return res.status(401).send('Incorrect password')

    const now = Math.floor(Date.now()/1000)
    
    const payload = {
        id: user.id,
        name: user.name,
        username: user.username,
        iat: now,
        exp: now + (60*60)
    }

    res.json({
        ... payload,
        token: jwt.encode(payload, authSecret)
    })
    }

    const validateToken = async (req, res) => {
        const userData = req.body || null
        try {
            if(userData) {
                const token = jwt.decode(userData.token, authSecret)
                if(new Date(token.exp*1000) > new Date()) {
                    return res.send(true)
                }
            }
        } catch(e) {

        }

        res.send(false)
    }

    return { signin, validateToken }
}