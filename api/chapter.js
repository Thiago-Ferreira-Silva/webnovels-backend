module.exports = app => {

    const save = async (req, res) => {
        const chapter = { ...req.body }
        const novel = await app.db('novels')
                        .where({ name: chapter.novelName })
                        .first()
                        .catch( err => res.status(400),send('The novel does not exist'))


        //erro con novel que não existe

        if (!chapter.novelName) return res.status(400).send('Enter the novel name')
        if(!chapter.number) return res.status(400).send('Enter the number')
        if(!chapter.content) return res.staus(400).send('Enter the content')

        delete chapter.novelName
        chapter.novel_id = novel.id

        app.db('chapters')
            .insert(chapter)
            .then( _ => res.status(204).send())
            .then(() => console.log('ok'))
            .catch( err => res.status(500).send(err))

    }

    const getChapter = (req, res) => {
        // verificar se vale a pena fazer um id para os capítulos
    }

    const getByNovelId = (req, res) => {
        app.db('chapters')
            .select('number', 'novel_id', 'content')
            .where({ novel_id: req.params.id })
            .then( chapter => res.json(chapter))
            .catch( err => res.status(500).send(err))
    }

    const remove = (req, res) => {

    }

    return { save, getChapter, getByNovelId, remove }
}