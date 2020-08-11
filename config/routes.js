module.exports = app => {
    app.post('/signin', app.api.auth.signin)
    app.post('/signup', app.api.user.save)
    app.post('/validateToken', app.api.auth.validateToken)
    app.get('/users', app.api.user.get)

    app.route('/users/:id')
        .all(app.config.passport.authenticate())
        .get(app.api.user.getById)
        .delete(app.api.user.remove)

    app.route('/novels')
        .all(app.config.passport.authenticate())
        .post(app.api.novel.save)
        .get(app.api.novel.get)
}