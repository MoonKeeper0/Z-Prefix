/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('class_offering', table => {
      table.increments('id');
      table.integer('id_class');
      table.integer('id_shift').notNullable();
      table.foreign('id_class').references('class.id')
      .deferrable('deferred')
      .onDelete('SET NULL');;
      table.foreign('id_shift').references('shift.id');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('class_offering', table => {
        table.dropForeign('id_class');
    })
    .then(() => {
        return knex.schema.alterTable('class_offering', table => {
            table.dropForeign('id_shift');
        })
    })
    .then(() => {
        return knex.schema.dropTableIfExists('class_offering');
    })
    
};
