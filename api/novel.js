module.exports = app => {

    const save = (req, res) => {
        const novel = { ...req.body }

        if (!novel.name) return res.status(400).send('Enter the novel name')
        if (!novel.description) return res.status(400).send('Enter the description')

        app.db('novels')
            .insert(novel)
            .then( _ => res.status(204).send())
            .catch( err => res.status(500).send(err))
    }

    const get = (req, res) => {
        app.db('novels')
            .select('id', 'name', 'description', 'user_id')
            .then( novels => res.json(novels))
            .catch( err => res.status(500).send(err))
    }

    const getById = (req, res) => {

    }

    const getByUserId = (req, res) => {

    }

    const remove = (req, res) => {

    }

    return { save, get, getById, getByUserId, remove }
}