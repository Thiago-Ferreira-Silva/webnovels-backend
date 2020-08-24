module.exports = app => {
    app.post('/signin', app.api.user.signin)
    app.post('/signup', app.api.user.signup)
    app.post('/validateToken', app.api.user.validateToken)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getById)

    app.route('/novels')
        .all(app.config.passport.authenticate())
        .post(app.api.novel.save)
        .get(app.api.novel.get)

    app.route('/novels/user/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.novel.getByUserId)

    app.route('/novels/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.novel.getById)
        .delete(app.api.novel.remove)

    app.route('/chapters')
        .all(app.config.passport.authenticate())
        .post(app.api.chapter.save)

    app.route('/chapters/novel/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.chapter.getByNovelId)

    app.route('/chapter/:id/:number')
        .all(app.config.passport.authenticate())
        .get(app.api.chapter.getChapter)
        .delete(app.api.chapter.remove)
}