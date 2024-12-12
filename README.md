# wojo-interview

Welcome to the EF World Journeys technical interview! We're excited for the opportunity to learn from you and to share with you a bit about how we conduct code reviews on our team. If you have any questions at all please don't hestitate to reach out and ask!

## Overview

In this project you'll find a mock problem that mirrors a real-life user story completed by an EF World Journeys Engineer in the past. In this repo, you can find both the UI and API under the `/apps` folder.

Feel free to solve this problem in whatever language/platform/stack you'd prefer or use this repo as a base.

This project is a set up as a turborepo that contains all the pieces that make up the wojo interview rooming problem.

This service uses:

-   Apollo GraphQL
-   NodeJS
-   TypeScript
-   MongoDB
-   Prettier
-   Jest
-   Docker
-   Next.js
-   Expo
-   Xcode Simulator
-   Turbo

## The problem

_User story:_

As a user, I'd like to be able to book more than 5 travelers at checkout.

_Description_

Today in checkout users are able to book at most 5 people. As a result, the existing implementations have simple hard coded values to represent all possible room combinations.

_Acceptance Criteria_

-   Dynamically generate all possible combinations of rooms a group of X travelers could have. (You can find the hardcoded config in `./api/schema.ts`)
-   Refactor the components to clean up any loose types, poorly structured components, etc
-   Write a test to cover the combination generation, using the provided Jest configuration or your testing framework of choice

## Follow up

In the next phase of the interview, you will be expected to walk a senior engineer through your code in a mock Code Review.

## Getting Started

This repo uses Turborepo and has a few aliased commands in the root package.json

1. Run `npm i` in the root of the project
2. Run `npm run generate` for code/type generation
3. Run `docker-compose up` to create a running local mongo instance
4. Run `sudo bash add-mongo-host.sh` to connect the mongo replica
5. Run `npm run seed:db` to seed the database with some initial sample data
6. Run `npm run dev` to start developing the web, app and GraphQL Service in parallel or run one of the below dev commands individually:
    1. Web: `npm run dev:web`
    2. iOS: `npm run dev:ios`
    3. API: `npm run dev:api`

### Additional commands

See the package.json for additional commands such as linting, formatting, testing, etc.

### Development Env

All infrastructure can be run locally via docker. (Download docker for desktop here: https://www.docker.com/products/docker-desktop/)
Once you have docker running locally, at the root of the repo run `docker-compose up` This will:

1. Create running local mongo instance of a single node replica set. (Needed for DB transactions.)

### Mongo

To connect to the mongo replica we need to add the host entry for the single node to the `/etc/hosts` file.
You can edit the file directly or you can run this convience script in the root of the repo:
`sudo bash add-mongo-host.sh` (updating this file may prompt for your user password)

Once successful you can connect to the replica set with this connection string:
`mongodb://localhost:27017/?replicaSet=rs0`

### Seeding data

Once you've succesfully connected to mongo locally, run `npm run seed:db` to intialize the db with some seed data.
To reset the data, run `npm run reset:db`.
