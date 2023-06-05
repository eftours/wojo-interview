# wojo-interview

Welcome to the EF World Journeys interview! We're excited for the opportunity to learn from you and to share with you a bit about how we conduct code reviews on our team. If you have any questions at all please don't hestitate to reach out and ask!

## Instructions

In this project you'll find an open PR [here](https://github.com/eftours/wojo-interview/pulls) that mirrors a potential feature request from our Operations team.

#### User story:

As a user, I'd like to search for rooms that only have available inventory.

#### Description

During the checkout process, users currently select a rooming preference without having any knowledge of the hotel inventory. Consequently, this leads to additional operational work in the future, as we need to ask the booked traveler for their preferred room if their initial preference is unavailable and update their preferences accordingly. In this case, we can assume rooming inventory is stored per tour.

## Overview

Turborepo that contains all the pieces that make up the wojo interview including a graphql service and the web app

This service uses:

-   Apollo GraphQL
-   NodeJS
-   TypeScript
-   MongoDB
-   Prettier
-   Jest
-   Docker
-   Next.js
-   Turbo

#### Getting Started

This repo uses Turborepo and has a few aliased commands in the root package.json

1. Run `npm i` in the root of the project
2. Run `npm run generate` for code/type generation
3. Run `docker-compose up` to create a running local mongo instance
4. Run `sudo bash add-mongo-host.sh` to connect the mongo replica
5. Run `npm run seed:db` to seed the database with some initial sample data
6. Run `npm run dev` to start developing the UI and GraphQL Service in parallel or run one of the below dev commands individually:
    1. GraphQL Service: `npm run dev:api`
    1. UI `npm run dev:ui`

#### Additional commands

See the package.json for additional commands such as linting, formatting, testing, etc.

#### Development Env

All infrastructure can be run locally via docker. (Download docker for desktop here:)
Once you have docker running locally, at the root of the repo run `docker-compose up` This will:

1. Create running local mongo instance of a single node replica set. (Needed for DB transactions.)

#### Mongo

To connect to the mongo replica we need to add the host entry for the single node to the `/etc/hosts` file.
You can edit the file directly or you can run this convience script in the root of the repo:
`sudo bash add-mongo-host.sh` (updating this file may prompt for your user password)

Once successful you can connect to the replica set with this connection string:
`mongodb://localhost:27017/?replicaSet=rs0`

#### Seeding data

Once you've succesfully connected to mongo locally, run `npm run seed:db` to intialize the db with some seed data.
To reset the data, run `npm run reset:db`.
