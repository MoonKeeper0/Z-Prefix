/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  await knex.schema.raw('TRUNCATE semester_class CASCADE');
  // Deletes ALL existing entries
  await knex('semester_class').del()
  await knex('semester_class').insert([
    {id: 1, id_semester: 1, id_class_offering: 1},
    {id: 2, id_semester: 1, id_class_offering: 2},
    {id: 3, id_semester: 1, id_class_offering: 3},
    {id: 4, id_semester: 1, id_class_offering: 4},
    {id: 5, id_semester: 1, id_class_offering: 5},
    {id: 6, id_semester: 1, id_class_offering: 6},
    {id: 7, id_semester: 1, id_class_offering: 7},
    {id: 8, id_semester: 1, id_class_offering: 8},
    {id: 9, id_semester: 1, id_class_offering: 9},
    {id: 10, id_semester: 1, id_class_offering: 10},
    {id: 11, id_semester: 1, id_class_offering: 11},
    {id: 12, id_semester: 1, id_class_offering: 12},
    {id: 13, id_semester: 1, id_class_offering: 13},
    {id: 14, id_semester: 1, id_class_offering: 14},
    {id: 15, id_semester: 1, id_class_offering: 15},
    {id: 16, id_semester: 1, id_class_offering: 16},
    {id: 17, id_semester: 1, id_class_offering: 17},
    {id: 18, id_semester: 1, id_class_offering: 18},
    {id: 19, id_semester: 1, id_class_offering: 19},
    {id: 20, id_semester: 1, id_class_offering: 20},
    {id: 21, id_semester: 1, id_class_offering: 21},
    {id: 22, id_semester: 1, id_class_offering: 22},
    {id: 23, id_semester: 1, id_class_offering: 23},
    {id: 24, id_semester: 1, id_class_offering: 24},
    {id: 25, id_semester: 1, id_class_offering: 25},
    {id: 26, id_semester: 1, id_class_offering: 26},
    {id: 27, id_semester: 1, id_class_offering: 27},
    {id: 28, id_semester: 1, id_class_offering: 28},
    {id: 29, id_semester: 1, id_class_offering: 29},
    {id: 30, id_semester: 1, id_class_offering: 30},
    {id: 31, id_semester: 1, id_class_offering: 31},
    {id: 32, id_semester: 1, id_class_offering: 32},
    {id: 33, id_semester: 1, id_class_offering: 33},
    {id: 34, id_semester: 1, id_class_offering: 34},
    {id: 35, id_semester: 1, id_class_offering: 35},
    {id: 36, id_semester: 1, id_class_offering: 36},
    {id: 37, id_semester: 1, id_class_offering: 37},
    {id: 38, id_semester: 1, id_class_offering: 38},
    {id: 39, id_semester: 1, id_class_offering: 39},
    {id: 40, id_semester: 1, id_class_offering: 40},
    {id: 41, id_semester: 1, id_class_offering: 41},
    {id: 42, id_semester: 1, id_class_offering: 42},
    {id: 43, id_semester: 1, id_class_offering: 43},
    {id: 44, id_semester: 1, id_class_offering: 44},
    {id: 45, id_semester: 1, id_class_offering: 45},
    {id: 46, id_semester: 1, id_class_offering: 46},
    {id: 47, id_semester: 1, id_class_offering: 47},
    {id: 48, id_semester: 1, id_class_offering: 48},
    {id: 49, id_semester: 1, id_class_offering: 49},
    {id: 50, id_semester: 1, id_class_offering: 50},
    {id: 51, id_semester: 1, id_class_offering: 51},
    {id: 52, id_semester: 1, id_class_offering: 52},
    {id: 53, id_semester: 1, id_class_offering: 53},
    {id: 54, id_semester: 1, id_class_offering: 54},
    {id: 55, id_semester: 1, id_class_offering: 55},
    {id: 56, id_semester: 1, id_class_offering: 56},
    {id: 57, id_semester: 1, id_class_offering: 57},
    {id: 58, id_semester: 1, id_class_offering: 58},
    {id: 59, id_semester: 1, id_class_offering: 59},
    {id: 60, id_semester: 1, id_class_offering: 60},
    {id: 61, id_semester: 1, id_class_offering: 61},
    {id: 62, id_semester: 1, id_class_offering: 62},
    {id: 63, id_semester: 1, id_class_offering: 63},
    {id: 64, id_semester: 1, id_class_offering: 64},
    {id: 65, id_semester: 1, id_class_offering: 65},
    {id: 66, id_semester: 1, id_class_offering: 66},
    {id: 67, id_semester: 1, id_class_offering: 67},
    {id: 68, id_semester: 1, id_class_offering: 68}
  ]);
};


/*
SELECT semester.id AS semester, co.id, c.dept, c.number, s.day, s.start, s.end
  FROM semester_class sc
  LEFT JOIN semester on sc.id_semester = semester.id
  LEFT JOIN class_offering co ON sc.id_class_offering = co.id
  LEFT JOIN class c ON co.id_class = c.id 
  LEFT JOIN shift s ON co.id_shift = s.id;
*/