module.exports = app => {

    const save = async (req, res) => {
        const chapter = { ...req.body }
        const novel = await app.db('novels')
                        .where({ name: chapter.novelName })
                        .first()
                        .catch( err => res.status(400).send('The novel does not exist'))


        //erro com novel que não existe
        //proíba de gerar dois capítulos com o mesmo número em uma novel

        if (!chapter.novelName) return res.status(400).send('Enter the novel name')
        if(!chapter.number) return res.status(400).send('Enter the number')
        if(!chapter.content) return res.staus(400).send('Enter the content')

        delete chapter.novelName
        chapter.novel_id = novel.id

        app.db('chapters')
            .insert(chapter)
            .then( _ => res.status(204).send())
            .catch( err => res.status(500).send(err))

    }

    const getChapter = (req, res) => {
        app.db('chapters')
            .select('novel_id', 'number', 'content')
            .where({ novel_id: req.params.id, number: req.params.number })
            .first()
            .then( chapter => res.json(chapter))
            .catch( err => res.status(500).send())
    }

    const getByNovelId = (req, res) => {
        app.db('chapters')
            .select('number', 'novel_id')
            .where({ novel_id: req.params.id })
            .then( chapters => res.json(chapters))
            .catch( err => res.status(500).send(err))
    }

    const getNew = (req, res) => {
        //pegar os capítulos mais recentes para o home
    }

    const remove = (req, res) => {
        
    }

    return { save, getChapter, getByNovelId, getNew, remove }
}