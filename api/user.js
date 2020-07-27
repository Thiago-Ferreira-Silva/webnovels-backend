const bcrypt = require('bcrypt')

module.exports = app => {

    const encriptPassword = password => {
        const salt = bcrypt.genSaltSync(10)
        return bcrypt.hashSync(password, salt)
    }

    const save = (req, res) => {
        const user = { ...req.body }

        if (!user.name ) return res.status(400).send('Enter the name')
        if (!user.username || !user.password) return res.status(400).send('Enter the username and password')
        if (!user.confirmPassword) return res.status(400).send('Confirm the password')

        user.password = encriptPassword(req.body.password)
        delete user.confirmPassword

        if(!user.id) {
            app.db('users')
                .insert(user)
                .then( _ => res.status(204).send())
                .catch( err => res.status(500).send(err))
        } else {
            app.db('users')
                .update(user)
                .where({ id: user.id })
                .then( _ => res.status(204).send())
                .catch( err => res.status(500).send(err))
        }
    }

    const get = (req, res) => {

    }

    const getById = (req, res) => {

    }

    const remove = (req, res) => {

    }

    return { save, get, getById, remove }
}