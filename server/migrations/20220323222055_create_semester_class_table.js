/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('semester_class', table => {
      table.increments('id');
      table.integer('id_semester').notNullable();
      table.integer('id_class_offering').notNullable();
      table.foreign('id_semester').references('semester.id');
      table.foreign('id_class_offering').references('class_offering.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('semester_class', table => {
        table.dropForeign('id_semester');
    })
    .then(() => {
        return knex.schema.alterTable('semester_class', table => {
            table.dropForeign('id_class_offering');
        })
    })
    .then(() => {
        return knex.schema.dropTableIfExists('semester_class');
    })
};
