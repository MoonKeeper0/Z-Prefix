## Z-prefix Test

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



# Installation

How can another developer get your project up and running on their own? What dependencies are required? Are there environmental requirements? Be specific, and outline steps to take in order to get the project running.

### How to Install 
1. clone the repo
2. navigate to ui folder
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

GET /api/users/posts/:id
GET /api/users/
GET /api/posts/
POST/PATCH /api/posts/


# Related Projects (Optional)

Links to other repositories that are related to the current one. Are there partner projects? Is there a newer version of this project elsewhere?

# Team Members

Jelani Washington

# Dependencies
  react-router
  react-router-dom
  @astrouxds/react
  
  knex
  express
  pg

