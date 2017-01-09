# Breaking News Component

This is a breaking news banner written as a vue component.

## Prerequisites

Must have [Docker Compose](https://docs.docker.com/compose/) installed.

## Quick start

```
$ docker-compose up --build
```

Then navigate to http://localhost:8080.

## Environment Variables
There are two important environment variables for this component.

### `API_URL`
The URL to ping to find the breaking news banner information. See
/static/api.mock.json for an example of what the format.

### `API_INTERVAL`
How often to ping the breaking new banner `API_URL`. It defaults to 2
minutes in milliseconds (120000) if not set.

## Build Setup

This project was generated using vue-cli. For detailed explanation on
how things work, checkout the
[guide](http://vuejs-templates.github.io/webpack/) and
[docs for vue-loader](http://vuejs.github.io/vue-loader).

`npm run dev` and `npm run unit:watch` are exposed by docker-compose.
If the other npm scripts need to be executed then use

``` bash
# Log into your running service instance
docker-compose exec --privileged --user root web bash

# build for production with minification
npm run build

# run unit tests (single run)
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
