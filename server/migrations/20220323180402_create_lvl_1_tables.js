/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
  return knex.schema
    .createTable('faculty', table => {
      table.increments('id');
      table.string('rank', 255).notNullable();
      table.string('first', 255).notNullable();
      table.string('last', 255).notNullable();
      table.string('nickname', 255);
      table.string('email', 255).notNullable();
      table.string('phone_work', 255);
      table.string('phone_cell', 255);
    })
    .createTable('room', table => {
      table.increments('id');
      table.string('bldg', 255).notNullable();
      table.string('room', 255).notNullable();
      table.string('phone', 255);
      table.integer('capacity', 4);
    })
    .createTable('student', table => {
      table.increments('id');
      table.string('rank', 255).notNullable();
      table.string('first', 255).notNullable();
      table.string('last', 255).notNullable();
      table.string('email', 255).notNullable();
      table.string('phone_cell', 255);
    })
    .createTable('class', table => {
      table.increments('id');
      table.string('dept', 255).notNullable();
      table.string('number', 255).notNullable();
    })
    .createTable('shift', table => {
      table.increments('id');
      table.string('day', 255).notNullable();
      table.time('start', 255).notNullable();
      table.time('end', 255).notNullable();
    })
    .createTable('semester', table => {
      table.increments('id');
      table.date('start', 255).notNullable();
      table.date('end', 255).notNullable();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists('faculty')
    .dropTableIfExists('room')
    .dropTableIfExists('student')
    .dropTableIfExists('class')
    .dropTableIfExists('shift')
    .dropTableIfExists('semester');
};
