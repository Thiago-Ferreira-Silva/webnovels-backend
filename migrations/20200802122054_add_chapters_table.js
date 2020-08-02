
exports.up = function(knex) {
    return knex.schema.createTable('chapters', table => {

    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('chapters')
};
