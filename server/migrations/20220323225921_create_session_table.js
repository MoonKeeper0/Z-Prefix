/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('session', table => {
      table.increments('id');
      table.date('date').notNullable();
      table.integer('id_semester_class').notNullable();
      table.integer('id_faculty');
      table.integer('id_room');
      table.foreign('id_semester_class').references('semester_class.id');
      table.foreign('id_faculty')
            .references('faculty.id')
            .deferrable('deferred')
            .onDelete('SET NULL');
      table.foreign('id_room')
           .references('room.id')
           .deferrable('deferred')
           .onDelete('SET NULL');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('session', table => {
        table.dropForeign('id_semester_class');
    })
    .then(() => {
        return knex.schema.alterTable('session', table => {
            table.dropForeign('id_faculty');
        })
    })
    .then(() => {
        return knex.schema.alterTable('session', table => {
            table.dropForeign('id_room');
        })
    })
    .then(() => {
        return knex.schema.dropTableIfExists('session');
    })
};
