/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  await knex.schema.raw('TRUNCATE class_offering CASCADE');
  await knex('class_offering').del()
  await knex('class_offering').insert([
    {id: 1, id_class: 1, id_shift: 1},
    {id: 2, id_class: 1, id_shift: 1},
    {id: 3, id_class: 1, id_shift: 2},
    {id: 4, id_class: 1, id_shift: 3},
    {id: 5, id_class: 1, id_shift: 4},
    {id: 6, id_class: 2, id_shift: 1},
    {id: 7, id_class: 2, id_shift: 2},
    {id: 8, id_class: 2, id_shift: 2},
    {id: 9, id_class: 2, id_shift: 3},
    {id: 10, id_class: 2, id_shift: 3},
    {id: 11, id_class: 2, id_shift: 4},
    {id: 12, id_class: 3, id_shift: 1},
    {id: 13, id_class: 3, id_shift: 1},
    {id: 14, id_class: 3, id_shift: 2},
    {id: 15, id_class: 3, id_shift: 2},
    {id: 16, id_class: 3, id_shift: 3},
    {id: 17, id_class: 3, id_shift: 3},
    {id: 18, id_class: 3, id_shift: 4},
    {id: 19, id_class: 3, id_shift: 4},
    {id: 20, id_class: 3, id_shift: 4},
    {id: 21, id_class: 4, id_shift: 1},
    {id: 22, id_class: 4, id_shift: 2},
    {id: 23, id_class: 4, id_shift: 2},
    {id: 24, id_class: 4, id_shift: 3},
    {id: 25, id_class: 4, id_shift: 4},
    {id: 26, id_class: 4, id_shift: 4},
    {id: 27, id_class: 5, id_shift: 1},
    {id: 28, id_class: 5, id_shift: 2},
    {id: 29, id_class: 5, id_shift: 2},
    {id: 30, id_class: 5, id_shift: 3},
    {id: 31, id_class: 5, id_shift: 4},
    {id: 32, id_class: 6, id_shift: 1},
    {id: 33, id_class: 6, id_shift: 1},
    {id: 34, id_class: 6, id_shift: 2},
    {id: 35, id_class: 6, id_shift: 3},
    {id: 36, id_class: 6, id_shift: 3},
    {id: 37, id_class: 6, id_shift: 4},
    {id: 38, id_class: 7, id_shift: 1},
    {id: 39, id_class: 7, id_shift: 2},
    {id: 40, id_class: 7, id_shift: 3},
    {id: 41, id_class: 7, id_shift: 3},
    {id: 42, id_class: 7, id_shift: 4},
    {id: 43, id_class: 8, id_shift: 1},
    {id: 44, id_class: 8, id_shift: 1},
    {id: 45, id_class: 8, id_shift: 2},
    {id: 46, id_class: 8, id_shift: 3},
    {id: 47, id_class: 8, id_shift: 4},
    {id: 48, id_class: 8, id_shift: 4},
    {id: 49, id_class: 9, id_shift: 1},
    {id: 50, id_class: 9, id_shift: 1},
    {id: 51, id_class: 9, id_shift: 2},
    {id: 52, id_class: 9, id_shift: 3},
    {id: 53, id_class: 9, id_shift: 4},
    {id: 54, id_class: 10, id_shift: 1},
    {id: 55, id_class: 10, id_shift: 2},
    {id: 56, id_class: 10, id_shift: 2},
    {id: 57, id_class: 10, id_shift: 3},
    {id: 58, id_class: 10, id_shift: 4},
    {id: 59, id_class: 11, id_shift: 1},
    {id: 60, id_class: 11, id_shift: 2},
    {id: 61, id_class: 11, id_shift: 3},
    {id: 62, id_class: 11, id_shift: 3},
    {id: 63, id_class: 11, id_shift: 4},
    {id: 64, id_class: 12, id_shift: 1},
    {id: 65, id_class: 12, id_shift: 2},
    {id: 66, id_class: 12, id_shift: 3},
    {id: 67, id_class: 12, id_shift: 4},
    {id: 68, id_class: 12, id_shift: 4}
  ]);
};

/*
SELECT co.id, c.dept, c.number, s.day, s.start, s.end
  FROM class_offering co 
  LEFT JOIN class c ON co.id_class = c.id 
  LEFT JOIN shift s ON co.id_shift = s.id;
*/