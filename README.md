## NestJS take-home project

This is Candy Store Project.
A Company, NorthStar, is running a candy business. NorthStar has multiple stores across the
country. Each store is running its own business to maximize revenue. Customers can order
candy online and pick-up at a specific store.
NorthStar's Technology Department plans to build an API system to handle the backend data
interaction for consumers (customers) and candy products.

## Architecture

```bash
                        +------------+
                        |   Client   |
                        +------------+
                              |
                              |
                              v
                        +-----------+
                        |   API     |
                        |  Gateway  |
                        +-----------+
                              |
                              |
                              v
                        +-----------+
                        |  Services |
                        +-----------+----------
                        /     |     \          \
                       /      |      \          \
                      /       |       \          \
        +------------+ +-----------+ +----------+ +-----------+
        |  Customers | |Inventories| |  Stores  | |  Orders   |
        +------------+ +-----------+ +----------+ +-----------+
        |   TypeORM  | |  TypeORM  | |  TypeORM | |  TypeORM  |
        +------------+ +-----------+ +----------+ +-----------+
               |              |            |             |
                --------+-----------+--------------------
                        |   MySQL   |
                        +-----------+
```

## Description

Within this project you'll find an example of :

- 9 endpoints including customers, stores, orders and inventories
- Unit testing for customer Controller and Service
- E2E testing for the customer endpoint
- Typeorm configuration
- Repository pattern
- Authentication mechanism utilizing JWT

## Stack

- NestJS - NodeJs (TypeScript)
- Typeorm - ORM
- MySQL - Database
- Jest + Supertest - Testing
- Yarn

## API Endpoints

The following API endpoints are available.

- /customers: create a new customer, view all customers
- /customers/id: modify a customer, view one customer
- /stores: create a new store, view all stores
- /stores/id: update one store, view a store's information
- /inventories: create a new inventory, view all inventories
- /inventories/id: update one inventory, view all inventories
- /orders: create one order, view all orders
- /orders/id: update one order, view the order
- /report: Monthly report for orders grouped by store and status

## Requirements

- NodeJS >= 18.14.0
- Yarn >= 1.22.17
- For those endpoints that are viewing all customers, order, stores and inventories must include page and perPage as query parameter.

## Steps to run this project using local environment:

1. Run `yarn install` command
2. Copy `.env.example` to `.env` and fill the variables
3. Run `yarn run start` command

## Commands to run locally

You'll find the following commands in the `package.json` file:

### API

```bash

# Start development API
$ yarn run start:dev

# Build API
$ yarn run build

# Start production API
$ yarn run start:prod

```

### Testing

```bash
# Run unit tests
$ yarn run test

# Run specific unit test file
$ yarn run test -- users.controller.spec.ts

# Run e2e tests
$ yarn run test:e2e

# test coverage
$ yarn run test:cov
```
