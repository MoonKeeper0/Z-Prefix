## Registrar Visualization System

## Table of Contents

1. [Overview](#overview)
     [Problem Statement](###Problem-Statement)
     [Minimum Viable Product](###minimum-viable-product) 
2. [Description](#description)
3. [Installation](#installation)
4. [Usage](#usage)
5. [Related Projects Optional](#related-projects-optional)
6. [Team Members Optional](#team-members-optional)
7. [Contributing Optional](#contributing-optional)
8. [Roadmap Optional](#roadmap-optional)
9. [License Optional](#license-optional)

# Overview

### Problem Statement
- Statement: As a User, I want to be able to visit a website in order to see what classes are being offered, on what days of the week, in what rooms, and being taught by which professors/instructors. Currently, there is no easy way to access this information, aside from contacting the registration department. Our squadron is a tech house, and we want to develop a pipeline-style (block class system).

- Scope: This project demonstrates our group's ability to develop a full stack application. We will be making a database with several tables to hold registrar data, an api to interact with the data tables, and a front end to visualize the data and grant users endpoints with relevant queries.

### User Profiles
- Specialist Snuffy
  - A new student who just wants to stay out of trouble
  - She needs to easily access her schedule and would prefer if the app emailed her the schedule every week so she never needed to visit the website
  - She would like an email if her schedule changes
  - She doesn't need to edit any of the information in the app
  - She sometimes needs to see a map to know where she's going
  - She might need her professor's phone number or email in case of emergency

- Technical Sergeant Newie
  - A new professor who needs to be prepared to teach
  - He needs to easily access his schedule and project out a few months into the future
  - He would like an email if any changes are made to his schedule, and a weekly email of his next week's responsibilities
  - He will need to know the names and contact information of everyone in each class he teaches
  - He sometimes needs to see a map to know where he's going
  - He doesn't need to edit any information in the app

- Captain Daniels
  - A department head who needs to be able to assign her people to tasks
  - She needs to be able to see what classes her are being taught in her department during a semester
  - She needs to know which classes do not have instructors assigned to them
  - She would like an easy method to assign her faculty to several classes at a time
  - She needs to know which rooms/facutly are available for each class
  - She needs to be able to place leave / appointments for her faculty into the schedule

- Colonel Walker
  - The commander of the squadron who needs situational awareness at all times
  - She needs to be able to click a single button and get a legible and easily understandable overview of all activities happening during the week

- Mr. Reggie
  - The registrar who doesn't want to spend his entire life adding information one line at a time
  - He needs to easily be able to audit the registry and determine if:
    - Every student is enrolled in their required classes
    - No instructors / rooms are double booked
    - He needs to be able to reserve rooms for administrative purposes

### Minimum Viable Product (MVP)

- As a non-admin User, when I visit the Registrar Visualization System web application, I want to be able to see the following on the screen:
  - [ ] The days of the week in a calendar timeline
  - [ ] A list of classes/faculty/room being used during each block of time
- As a non-admin User, when I search for a name, faculty, room, or class, the calendar view
  - [ ] Updates to show only filtered information based on the search
- As an admin User, using the web application interface (not the command line), I can add, update, remove, delete:
  - [ ] new classes
  - [ ] new faculty
  - [ ] new students
  - [ ] new rooms
  - [ ] student / faculty / room / class assignments

.... actual User personas
- as a student (name Specialist Snuffy) ....
- as a faculty member (name Capt Huf) ....
- as a registrar (name Mrs. Puff) ....

We also plan to use the USSF Styling Guide

![](https://github.com/bjhufstetler/sdi-blended-full-stack-project-scaffold/blob/master/Wireframe.PNG?raw=true)

# Description

This schoolhouse teaches hundreds of students per year.
- Each year consists of 7 semesters (7 weeks long)
- Each week consists of 4 shifts (Mon/Wed AM, Mon/Wed PM, Tues/Thur AM, Tues/Thur PM)
- Every student must take 4 classes per semester for 2 (Enlisted) or 3 (Officer) semesters
- Classes are assigned a shift, faculty member, and room
- Each class meets for 14 sessions per semester
- Every session that the class is taught may have a different faculty member or room assigned to it
- Students are assigned to classes
- During peak semesters, there may be up to 18 classes being taught every shift and some classes may have up to 9 offerings throughout the week

Semester 1 Courses:
 - OEW 101
 - SEW 101
 - FUN 101
 - SBM 101
Semester 2 Courses:
 - RED 101
 - RED 102
 - BLU 101
 - BLU 102
Semester 3 Courses:
 - OEW 201
 - SEW 201
 - FUN 201
 - SBM 201

Tools that can help you capture a screen recording include:

- [Recordit](https://recordit.co/) 
- [Asciinema](https://asciinema.org/) 
- [ttygif](https://github.com/icholy/ttygif) 

# Installation

How can another developer get your project up and running on their own? What dependencies are required? Are there environmental requirements? Be specific, and outline steps to take in order to get the project running.

### How to Install 
1. clone the repo
2. navigate to registrar-ui folder
3. npm install
4. navigate up and down into server folder
5. npm install

### How to Get Up and Running

#### Start Up the Front End
```
1. open a new terminal
2. navigate to registrar-ui folder
3. npm start
```

#### Start Up the Server
```
4. open a new terminal
5. navigate to server folder
6. nodemon app.js
```

#### Start Up the Postgres Database and Check Database Integrity
Note: On step 8, it is assumed you have navigated to the path sitting above server and registrar-ui and your OS system understands $PWD command (e.g. Linux or Mac OS). For Windows, likely need %cd%
```
7. open a new terminal
8. docker run --rm --name pg-docker -e POSTGRES_PASSWORD=docker -d -p 5432:5432 -v $PWD/server/postgres:/var/lib/postgressql/data postgres
9. docker ps -a  || note: take note of the CONTAINER ID, likely just the first 4 or 5 characters if you have multiple containers running and no compose file
10. docker exec -it 9263 bash  || note: my CONTAINER ID for this example was 9263f56f2d0f, so I took just the first four digits
11. psql -U postgres
12. Check to see if a database called registrar exists by typing: \list || If it doesn't then do line 13
13. CREATE DATABASE registrar; || note: (this should be in the postgres interactive shell from line 11)
17. After running steps 14-16 below, you can do the follow:
18. Connect to the registrar database -> \c registrar
19. And see if all datatables have been loaded -> \dt
20. You should see 12 rows
```

#### Prepare For the First Time (or update Migrations and Seeds)
```
14. Open a terminal and navigate to the server folder
15. Run migrations -> npx knex migrate:latest || should see: Batch 1 run: 5 migrations
16. Seeds the tables within the databse -> npx knex seed:run || should see: Ran 5 seed files
```

### Important Packages
- React
- React Router
- Cypress for E2E Testing
- User Event for RTL Unit Testing
- Astro Space UXDS
- Express
- Knex
- Supertest for backend testing
- Firebase

The following commands were run:
    npm init
    npx create-react-app registrar-ui
    npm install react-router (FRONTEND)
                react-router-dom (FRONTEND)
                cypress (FRONTEND)
                @astrouxds/react (FRONTEND)
                @testing-library/user-event (FRONTEND)
                @testing-library/dom (FRONTEND)
                firebase (FRONTEND)
                knex (BACKEND)
                express (BACKEND)
                supertest (BACKEND --save-dev)
                jest (BACKEND --save-dev)
                pg (BACKEND)

# API Endpoints

GET /api/roster/:id
GET /apr/rosters/:date

(GET/POST) /api/rooms
(GET/PATCH/DELETE) /api/rooms/:id

(GET/POST) /api/faculty
(GET/PATCH/DELETE) /api/faculty/:id

(GET/POST) /api/classes
(GET/PATCH/DELETE) /api/classes/:id

(GET/POST) /api/students
(GET/PATCH/DELETE) /api/students/:id

GET /api/week/:date

GET /api/schedule?

# Related Projects (Optional)

Links to other repositories that are related to the current one. Are there partner projects? Is there a newer version of this project elsewhere?

# Team Members

Tony Kelly, Jelani Washington, Brandon Hufstetler

# Dependencies
  react-router
  react-router-dom
  @astrouxds/react
  firebase
  knex
  express
  pg

