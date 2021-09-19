# Patronize API Task

This project was generated with ❤ by yours truely.

## Technology
`Adonis Js`
`Typescript`
`MySQL`

## Application Architecture
I am using a module based architecture which i created customly for this project, each unit of this project is treated as module which contains a controller, service & routes.
I also created a custom adonis command which is used to create the modules.

## Creating a new module
`$ node ace module <name>`

## Installation

1. Clone repository - `$ git clone https://github.com/Fn-studyo/patronize-api.git`

2. Install dependencies - `$ cd patronize-api`

3. Install dependencies - `$ yarn install`

4. Create a new file `.env` if it doesn't exist and copy the contents of `.env.example` into it to be able to run your server on production environment.

## Setting up db

Make sure you have mysql installed.

1. Connect to your db by providing the appropriate credentials, check .env.example for a similar example

2. Migrate the Database - `$ node ace migration:run`



## Running the server locally

1. Start up the server - Run `$ node ace serve --watch`

2. Server should be running on http://127.0.0.1:3333/ by default

## Running the server locally

1. Start up the server - Run `$ npm start` | `$ npm run dev`

2. Server should be running on http://localhost:2020/ by default 

## e2e Tests

1. Start up `$ npm run test`


## Testing the api

1. Via Postman Collection (https://documenter.getpostman.com/view/11039127/UUxtEAr4)
