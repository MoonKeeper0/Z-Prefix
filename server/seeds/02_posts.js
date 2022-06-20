/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  // Deletes ALL existing entries
  //await knex.schema.raw('TRUNCATE post CASCADE');
  await knex('post').del()
  await knex('post').insert([
    {title: 'Post 1', body: 'Capt made this 1', id_user: 1},
    {title: 'Post 2', body: 'Capt made this 2', id_user: 1},
    {title: 'Post 3', body: 'Bob made this   ', id_user: 2},
    {title: 'Post 4', body: 'Capt made this 3', id_user: 1},
    {title: 'Post 5', body: 'Bob made this 2', id_user: 2} 
    
  ]);
};

/*
SELECT co.id, c.dept, c.number, s.day, s.start, s.end
  FROM class_offering co 
  LEFT JOIN class c ON co.id_class = c.id 
  LEFT JOIN shift s ON co.id_shift = s.id;
*/