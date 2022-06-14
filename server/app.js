
const express = require('express');
const app = express();
const knex = require('knex')(require('./knexfile.js')[process.env.NODE_ENV||'development']);
const PDFDocument = require('pdfkit');
const fs = require('fs');

app.use(express.json());
app.use(express.urlencoded({ extended: true, type: '*/x-www-form-urlencoded'}));

app.use((req, res, next) => {
    res.header({ 'Access-Control-Allow-Origin': 'http://localhost:3000' });
    res.header({
      'Access-Control-Allow-Headers':
        'Origin, X-Requested-With, Content-Type, Accept',
    });
    res.header({
      'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, PATCH, OPTIONS',
    });
    next();
  });

/*********************************************
*                 ROSTER                     *
*********************************************/

app.get('/api/roster/:id', (req, res) => {
  const id = req.params.id;
  knex('class_student')
    .leftJoin('student', 'student.id', 'class_student.id_student')
    .where('class_student.id_semester_class', id)
    .orderBy(['student.rank', 'student.last', 'student.first'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)});
})

/*
SELECT *
  FROM class_student cs
  LEFT JOIN student st ON cs.id_student = st.id
  WHERE cs.id_semester_class = 1
  ORDER BY st.rank, st.last, st.first;
*/

app.get('/api/rosters/:date', (req, res) => {
  const startDate = new Date(req.params.date);
  const endDate = new Date(req.params.date);
  endDate.setDate(endDate.getDate() + 6);
  knex
  .distinct(['class_student.id_semester_class AS id', 'student.id AS studentID', 'student.rank', 'student.first', 'student.last'])
    .from('session')
    .leftJoin('semester_class', 'semester_class.id', 'session.id_semester_class')
    .leftJoin('faculty', 'faculty.id', 'session.id_faculty')
    .leftJoin('room', 'room.id', 'session.id_room')
    .leftJoin('class_offering', 'class_offering.id', 'semester_class.id_class_offering')
    .leftJoin('class', 'class.id', 'class_offering.id_class')
    .leftJoin('shift', 'shift.id', 'class_offering.id_shift')
    .rightJoin('class_student', 'class_student.id_semester_class', 'semester_class.id')
    .leftJoin('student', 'student.id', 'class_student.id_student')
    .whereBetween('session.date', [startDate, endDate])
    .orderBy(['student.rank', 'student.last', 'student.first'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)});
})
/*
  SELECT DISTINCT cs.id_semester_class AS id, st.id AS studentid, st.rank, st.first, st.last
    FROM session s
    LEFT JOIN semester_class sc ON s.id_semester_class = sc.id
    LEFT JOIN faculty f ON s.id_faculty = f.id
    LEFT JOIN room r ON s.id_room = r.id
    LEFT JOIN class_offering co ON sc.id_class_offering = co.id
    LEFT JOIN class c ON co.id_class = c.id
    LEFT JOIN shift sh ON co.id_shift = sh.id
    RIGHT JOIN class_student cs ON sc.id = cs.id_semester_class
    LEFT JOIN student st ON cs.id_student = st.id
    WHERE s.date > '06-06-2022'
      AND s.date < '06-12-2022'
    ORDER BY st.rank, st.last, st.first;
*/

/*********************************************
*                 ROOMS                      *
*********************************************/

app.get('/api/rooms/:id', (req, res) => {
  knex
    .select('*')
    .from('room')
    .where({id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)}) 
});

/*
SELECT *
  FROM room r
  WHERE r.rid = 1;
*/

app.delete('/api/rooms/:id', (req, res) => {
console.log(req.params.id);
knex('room')
  .where('id',req.params.id)
  .del()
  .then(() => {
    knex('room')
      .then( (data) => {
        res.status(200).json(data);
      })
  })
  .catch(err => {throw Error(err)}) 
});

/*
DELETE
  FROM room r
  WHERE r.id = 1;

SELECT *
  FROM room;
*/

app.post('/api/rooms', (req, res) => {
const {bldg, room, capacity, phone} = req.body;
knex('room')
  .insert({
    bldg: bldg, 
    room: room, 
    capacity: capacity, 
    phone: phone
  })
  .then(() => {
    res.status(201).send({bldg: bldg, 
      room: room, 
      capacity: capacity, 
      phone: phone});
  })
  .catch((err) => {
    console.error(err);
    return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
  });
});

/*
INSERT
  INTO room (bldg, room, capacity, phone)
  VALUES ('1', '2', '3', '1234567890');
*/

app.get('/api/rooms', (req, res) => {
  knex('room')
    .orderBy(['bldg', 'room'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM room
  ORDER BY bldg, room;
*/

app.patch('/api/rooms/:id', (req, res) => {
  
  let key = (Object.keys(req.body))[0];
  let newValue = {};
  newValue[key] = req.body[key];
  
  console.log({newValue});
  knex('room')
    .where('id',req.params.id)
    .update(newValue)
    .then(() => {
      knex
        .select('*')
        .from('room')
        .then( (data) => {
          res.status(200).json(data);
        })
      console.log("sucess! Updated rooms")
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: `An error occurred, please try again later.`, error: err});
    });
});

/*
UPDATE room
  SET capacity = 1
  WHERE id = 1;
*/

/*********************************************
*                FACULTY                     *
*********************************************/

app.get('/api/faculty/:id', (req, res) => {
  console.log(req.params.id);
  knex('faculty')
    .where({id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)}) 
} )

/*
SELECT *
  FROM faculty f
  WHERE f.id = 1;
*/

app.get('/api/faculty', (req, res) => {
  knex('faculty')
    .orderBy(['rank', 'last', 'first'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM faculty
  ORDER BY rank, last, first;
*/

app.patch('/api/faculty/:id', (req, res) => {
  let key = (Object.keys(req.body))[0];
  let newValue = {};
  newValue[key] = req.body[key];
  
  console.log({newValue});
  knex('faculty')
    .where('id',req.params.id)
    .update(newValue)
    .then(() => {
      console.log("sucess!")
      res.status(201).send(
        newValue
      );
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: `An error occurred, please try again later.`, error: err});
    });
});

/*
UPDATE faculty
  SET nickname = 'Instructor 1'
  WHERE id = 1;
*/

app.delete('/api/faculty/:id', (req, res) => {
  console.log(req.params.id);
  knex('faculty')
    .where('id',req.params.id)
    .del()
    .then(() => {
      knex('faculty')
        .then( (data) => {
          res.status(200).json(data);
        })
    })
    .catch(err => {throw Error(err)}) 
});

/*
DELETE
  FROM faculty f
  WHERE f.id = 1;
*/

app.post('/api/faculty', (req, res) => {
  const {rank, first, last, nickname, email, phone_work, phone_cell} = req.body;
  knex('faculty')
    .insert({rank: rank, first: first, last: last, nickname: nickname, email: email, phone_work: phone_work, phone_cell: phone_cell})
    .then(() => {
      console.log("sucess!")
      res.status(201).send({rank: rank, first: first, last: last, nickname: nickname, email: email, phone_work: phone_work, phone_cell: phone_cell});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
});

/*********************************************
*                CLASSES                     *
*********************************************/

app.get('/api/classes', (req, res) => {
  knex('class')
    .orderBy(['dept', 'number'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM class
  ORDER BY dept, number;
*/

app.get('/api/classes/:id', (req, res) => {
  knex('class')
    .where('id', req.params.id)
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM class c
  WHERE c.id = 1;
*/

app.patch('/api/classes/:id', (req, res) => {
  
  let key = (Object.keys(req.body))[0];
  let newValue = {};
  newValue[key] = req.body[key];
  
  console.log({newValue});
  knex('class')
    .where('id',req.params.id)
    .update(newValue)
    .then(() => {
      console.log("sucess!")
      res.status(201).send(
        newValue
      );
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: `An error occurred, please try again later.`, error: err});
    });
});

/*
UPDATE class
  SET dept = 'NEW DEPT'
  WHERE id = 1;
*/

app.delete('/api/classes/:id', (req, res) => {
  console.log(req.params.id);
  knex('class')
    .where('id',req.params.id)
    .del()
    .then(() => {
      knex
        .select('*')
        .from('class')
        .then( (data) => {
          res.status(200).json(data);
        })
    })
    .catch(err => {throw Error(err)}) 
});

/*
DELETE
  FROM class c
  WHERE c.id = 1;
*/

app.post('/api/classes', (req, res) => {
  const {dept, number} = req.body;
  knex('class')
    .insert({dept: dept, number: number})
    .then(() => {
      console.log("sucess!")
      res.status(201).send({dept: dept, number: number});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
});

/*
INSERT
  INTO class (dept, number)
  VALUES ('NEW DEPT', 999);
*/

/*********************************************
*               STUDENTS                     *
*********************************************/

app.get('/api/students', (req, res) => {
  knex('student')
    .orderBy(['rank', 'last', 'first'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)})
})

/*
SELECT *
  FROM student
  ORDER BY rank, last, first;
*/

app.get('/api/students/:id', (req, res) => {
  console.log(req.params.id);
  knex('student')
    .where({id: req.params.id})
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)}) 
})

/*
SELECT *
  FROM student s
  WHERE s.id = 1;
*/

app.patch('/api/students/:id', (req, res) => {
  let key = (Object.keys(req.body))[0];
  let newValue = {};
  newValue[key] = req.body[key];
  
  console.log({newValue});
  knex('student')
    .where('id',req.params.id)
    .update(newValue)
    .then(() => {
      console.log("sucess!")
      res.status(201).send(
        newValue
      );
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: `An error occurred, please try again later.`, error: err});
    });
});

/*
UPDATE student
  SET last = 'LastName'
  WHERE id = 1;
*/

app.delete('/api/students/:id', (req, res) => {
  console.log(req.params.id);
  knex('student')
    .where('id',req.params.id)
    .del()
    .then(() => {
      knex('student')
        .then( (data) => {
          res.status(200).json(data);
        })
    })
    .catch(err => {throw Error(err)}) 
});

/*
DELETE
  FROM student s
  WHERE s.id = 1;
*/

app.post('/api/students', (req, res) => {
  const {rank, first, last, email, phone_cell} = req.body;
  knex('student')
    .insert({rank: rank, first: first, last: last, email: email, phone_cell: phone_cell})
    .then(() => {
      console.log("sucess!")
      res.status(201).send({rank: rank, first: first, last: last, email: email, phone_cell: phone_cell});
    })
    .catch((err) => {
      console.error(err);
      return res.json({success: false, message: 'An error occurred, please try again later.', error: err});
    });
});

/*
INSERT
  INTO student (rank, first, last, email, phone_cell)
  VALUES ('Spec', 'b', 'c', 'd@e.fg', 1234567890);
*/

/*********************************************
*                  WEEK                      *
*********************************************/

app.get('/api/week/:date', (req, res) => {
  const startDate = new Date(req.params.date);
  const endDate = new Date(req.params.date);
  endDate.setDate(endDate.getDate() + 6);
  knex
  .select(['semester_class.id AS id', 'session.date', 'faculty.rank', 'faculty.last', 'room.bldg', 'room.room', 'class.dept', 'class.number', 'shift.id AS shift', 'shift.start', 'shift.end', 'class_offering.id AS offering'])
    .from('session')
    .leftJoin('semester_class', 'semester_class.id', 'session.id_semester_class')
    .leftJoin('faculty', 'faculty.id', 'session.id_faculty')
    .leftJoin('room', 'room.id', 'session.id_room')
    .leftJoin('class_offering', 'class_offering.id', 'semester_class.id_class_offering')
    .leftJoin('class', 'class.id', 'class_offering.id_class')
    .leftJoin('shift', 'shift.id', 'class_offering.id_shift')
    .whereBetween('session.date', [startDate, endDate])
    .orderBy(['class.dept', 'shift.start', 'class.number'])
    .then(data => res.status(200).json(data))
    .catch(err => {throw Error(err)});
})

/*
SELECT sc.id AS id, s.date, f.rank, f.last, r.bldg, r.room, c.dept, c.number, sh.id AS shift, sh.start, sh.end, co.id AS offering
  FROM session s
  LEFT JOIN semester_class sc ON s.id_semester_class = sc.id
  LEFT JOIN faculty f ON s.id_faculty = f.id
  LEFT JOIN room r ON s.id_room = r.id
  LEFT JOIN class_offering co ON sc.id_class_offering = co.id
  LEFT JOIN class c ON co.id_class = c.id
  LEFT JOIN shift sh ON co.id_shift = sh.id
  WHERE s.date > '06-06-2022'
    AND s.date < '06-12-2022'
  ORDER BY c.dept, sh.start, c.number;
*/

/*********************************************
*                  UTIL                      *
*********************************************/

app.get('/util/print', (req, res) => {
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment;filename=schedule.pdf');
  const doc = new PDFDocument();
  doc
    .fontSize(12)
    .text('Some random text for the Registrar Visualization System', 100, 100);
  doc.end();
  doc.pipe(res);
  res.download('schedule.pdf');
})

/*********************************************
*         STUDENT SCHEDULE                   *
*********************************************/

app.get('/api/schedule/?', (req, res) => {
  const id = req.query.id;
  const startDate = new Date(req.query.date);
  const endDate = new Date(req.query.date);
  endDate.setDate(endDate.getDate() + 6);

  // PDF Documentation Variables and Headers
  let knexData = [];
  res.setHeader("Content-Type", "application/pdf");
  res.setHeader("Content-Disposition", 'attachment;filename=schedule.pdf');
  const doc = new PDFDocument({size: 'LETTER'});
  doc
    .fontSize(14)
    .moveUp()
    .moveUp()
    .moveUp()
    .text('Student Schedule',{align: 'center'})
    .text(`${startDate.getMonth()+1}/${startDate.getDate()}/${startDate.getFullYear()} to ${endDate.getMonth()+1}/${endDate.getDate()}/${endDate.getFullYear()}`,{align: 'center'})

  knex
    .select(['student.rank', 'student.first', 'student.last', 'class_offering.id AS classID', 'shift.day', 'session.date', 'shift.start', 'shift.end', 'class.dept', 'class.number', 'faculty.rank', 'faculty.last', 'room.bldg', 'room.room'])
      .from('semester_class')
      .leftJoin('class_offering', 'class_offering.id', 'semester_class.id_class_offering')
      .leftJoin('shift', 'shift.id', 'class_offering.id_shift')
      .leftJoin('class', 'class.id', 'class_offering.id_class')
      .rightJoin('class_student', 'semester_class.id', 'class_student.id_semester_class')
      .leftJoin('student', 'student.id', 'class_student.id_student')
      .rightJoin('session', 'session.id_semester_class', 'semester_class.id')
      .leftJoin('faculty', 'faculty.id', 'session.id_faculty')
      .leftJoin('room', 'room.id', 'session.id_room')
      .where('student.id', id)
      .whereBetween('session.date', [startDate, endDate])
      .orderBy(['session.date', 'shift.start'])
      .then(data => knexData = data)
      .catch(err => {throw Error(err)})
    .then( () => {
      knex
        .select(['rank','first','last'])
        .from('student')
        .where('id', id)
        .then(data => data[0])
        .catch(err => {throw Error(err)})
        .then( (currentStudent) => {
          console.log(currentStudent);
          let date;
          doc
            .moveDown()
            .fontSize(12)
            .text(`Student: ${currentStudent.rank} ${currentStudent.first} ${currentStudent.last} `)
            .moveDown()
            .fontSize(10)
            res.status(200);
            knexData.map( entry => {
              newDate = `${entry.date.getMonth()+1}/${entry.date.getDate()}/${entry.date.getFullYear()}`
              if(newDate != date) doc.text(newDate, {underline: 'true'})
              doc
                .text(`    ${entry.start.slice(0,5)} to ${entry.end.slice(0,5)}`)
                .text(`        ${entry.dept} ${entry.number}`)
                .text(`        Instructor: ${entry.rank} ${entry.last}`)
                .text(`        Bldg: ${entry.bldg} Room: ${entry.room}` )
                .moveDown()
              date = `${entry.date.getMonth()+1}/${entry.date.getDate()}/${entry.date.getFullYear()}`
            })
            doc
              .moveDown()
              .moveDown()
              .text(`Schedule Printed: ${new Date().toString()}`)
            doc.end();
            doc.pipe(res);
          })
    })

})

/* 
SELECT s.rank, s.first, s.last, co.id AS classid, sh.day, s.date, sh.start, sh.end, c.dept, c.number, f.rank, f.last, r.bldg, r.room
  FROM semester_class sc
  LEFT JOIN class_offering co ON sc.id_class_offering = co.id
  LEFT JOIN shift sh ON co.id_shift = sh.id
  LEFT JOIN class c ON co.id_class = c.id
  RIGHT JOIN class_student cs ON sc.id = cs.id_semester_class
  LEFT JOIN student st ON cs.id_student = st.id
  RIGHT JOIN session s ON sc.id = s.id_semester_class
  LEFT JOIN faculty f ON s.id_faculty = f.id
  LEFT JOIN room r ON s.id_room = r.id
  WHERE s.id = 1
  AND s.date > '06-06-2022'
  AND s.date < '06-12-2022'
  ORDER BY s.date, sh.start
;
*/

module.exports = app;

/*
Docker initialized, connected, opened with
    docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v <path>/sdi-blended-full-stack-project-scaffold/server/postrgres:/var/lib/postgressql/data postgres
    docker ps -a
    docker exec -it <container id> bash
    psql -U postgres
    CREATE DATABASE registrar;
*/