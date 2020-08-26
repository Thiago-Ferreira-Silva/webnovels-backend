const { authSecret } = require('../.env')
const jwt = require('jwt-simple')
const bcrypt = require('bcrypt')

module.exports = app => {

    const encriptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const signup = async (req, res) => {
        const user = { ...req.body }

        const users = await app.db('users')
                                .where({ username: req.body.username })
                                .first()

        if (users) return res.status(400).send('User already exists')
        if (!user.name ) return res.status(400).send('Enter the name')
        if (!user.username || !user.password) return res.status(400).send('Enter the username and password')
        if (!user.confirmPassword) return res.status(400).send('Confirm the password')

        user.password = encriptPassword(req.body.password)
        delete user.confirmPassword

        app.db('users')
            .insert(user)
            .then( _ => res.status(204).send())
            .catch( err => res.status(500).send(err))
    }

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'username')
            .where({ id: req.params.id })
            .first()
            .then( user => res.json(user))
            .catch( err => res.status(500).send(err))
    }

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

    return { signup, getById, signin, validateToken }
    //corrija os bugs e remova tudo que for desnecessário
}