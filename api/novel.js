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
        app.db('novels')
            .select('id', 'name', 'description', 'user_id')
            .where({ id: req.params.id })
            .first()
            .then( novel => res.json(novel))
            .catch( err => res.status(500).send(err))
    }

    const getByUserId = (req, res) => {
        app.db('novels')
            .select('id', 'name', 'description', 'user_id')
            .where({ user_id: req.params.id })
            .then( novels => res.json(novels))
            .catch( err => res.status(500).send(err))
    }

    const remove = async (req, res) => {
        const chapters = await app.db('chapters')
                            .select('novel_id')
                            .where({ novel_id: req.params.id })
                            .catch( err => res.status(500).send(err))

        if (chapters.length !== 0) return res.status(400).send('This novel has chapters')

        app.db('novels')
            .where({ id: req.params.id })
            .del()
            .then( _ => res.status(204).send())
            .catch( err => res.status(500).send(err))
    }

    return { save, get, getById, getByUserId, remove }
}