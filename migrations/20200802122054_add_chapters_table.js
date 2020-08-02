
exports.up = function(knex) {
    return knex.schema.createTable('chapters', table => {
        table.integer('number').notNull()
        table.integer('novel_id').unsigned()
        table.foreign('novel_id').references('id').inTable('novels')
        table.text('content').notNull()
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('chapters')
};
