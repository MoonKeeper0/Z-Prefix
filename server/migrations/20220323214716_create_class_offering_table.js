/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */

exports.up = function(knex) {
    return knex.schema
    .createTable('post', table => {
      table.increments('id');
      table.string('title', 255).notNullable();
      table.string('body', 255);
      table.integer('id_user');
      table.foreign('id_user').references('user.id')
      .deferrable('deferred')
      .onDelete('SET NULL');;
          })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('post', table => {
        table.dropForeign('id_user');
    })
        .then(() => {
        return knex.schema.dropTableIfExists('post');
    })
    
};
