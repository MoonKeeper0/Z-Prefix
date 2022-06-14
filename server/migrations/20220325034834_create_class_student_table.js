/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('class_student', table => {
      table.increments('id');
      table.integer('id_semester_class').notNullable();
      table.integer('id_student');
      table.foreign('id_semester_class').references('semester_class.id');
      table.foreign('id_student').references('student.id')
      .deferrable('deferred')
      .onDelete('SET NULL');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.alterTable('class_student', table => {
        table.dropForeign('id_semester_class');
    })
    .then(() => {
        return knex.schema.alterTable('class_student', table => {
            table.dropForeign('id_student');
        })
    })
    .then(() => {
        return knex.schema.dropTableIfExists('class_student');
    })
};
