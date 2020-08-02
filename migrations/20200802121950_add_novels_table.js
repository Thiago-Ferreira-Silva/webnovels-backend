
exports.up = function(knex) {
    return knex.schema.createTable('novels', table => {
        table.increments('id').primary()
        table.string('name').notNull().unique()
        table.string('description').notNull()
        table.integer('user_id').unsigned()
        table.foreign('user_id').references('id').inTable('users')
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('novels')
};
