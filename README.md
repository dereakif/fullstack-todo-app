# Fullstack Todo App

A NodeJs application which uses MongoDB to store the to do items.
CRUD operations are essential to app development. In a similar vein, REST, is necessary for website development.

## Techincal Specifications

- The Backend is a REST API built with ExpressJs and Typescript.
- MongoDB is used as the NoSQL Database along with ExpressJs in the backend Rest API. Mongoose has also been used along with MongoDB in the database layer.
- The Frontend is built using ReactJs and Typescript.

## Project Specifications

- User can Create a new item to their to do list .
- User can Read their to do list.
- User can Update any to do item.
- User can Delete any to do item.

## Requirements

- Express 4.x
- MongoDB 5.x
- Mongoose 6.x
- Node 14.x

## Installation

Clone the repository and Run the following commands in the terminal:

- `npm run install_all` (This will install the server's and the client's dependency packages)

- `npm dev` (This will start both the client and the server with `ts-node-dev`, which will look for the changes in the files and restart the server every time)

Also you can start the app in separate terminals:

- `npm run start` (This will start the Frontend React application for Dev Environment)

- `cd server` and then

- `npm run start` to start the server with `ts-node-dev`.
