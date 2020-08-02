
exports.up = function(knex) {
    return knex.schema.createTable('novels', table => {

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('novels')
};
