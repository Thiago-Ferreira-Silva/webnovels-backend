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

        //checar a unicidade de usuáro

        user.password = encriptPassword(req.body.password)
        delete user.confirmPassword

        app.db('users')
            .insert(user)
            .then( _ => res.status(204).send())
            .catch( err => res.status(500).send(err))
    }
    //remover o get
    const get = (req, res) => {
        app.db('users')
            .select('id', 'name', 'username', 'password') // lembre-se de remover a senha do get
            .then( users => res.json(users))
            .catch( err => res.status(500).send(err))
    } 

    const getById = (req, res) => {
        app.db('users')
            .select('id', 'name', 'username', 'password') // lembre-se de remover a senha do get
            .where({ id: req.params.id })
            .then( user => res.json(user))
            .catch( err => res.status(500).send(err))
    }

    const remove = (req, res) => {
        app.db('users')
            .where({ id: req.params.id })
            .del()
            .then( _ => res.status(204).send())
            .catch( err => res.status(500).send())
    }

    return { save, get, getById, remove }
}