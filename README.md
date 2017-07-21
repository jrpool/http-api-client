# http-api-client
Node HTTP client application designed for a specific API

## Project Members

[Jonathan Pool](https://github.com/jrpool)

## modules

```
hget.js
hget-get.js
weather.js
```

## Discussion

This application demonstrates the use of Node’s `http` module in a request to an API.

The application fulfills the specifications of the “What’s the Weather?” module of the [Learners Guild][lg] curriculum and is part of the “HTTP Node” module in Phase 2 of the Guild’s curriculum.

Two implementations are included in this directory. The one in `hget.js` uses the `http.request()` method, as specified in the curriculum. The one in `hget-get` uses the `http.get()` method instead. As packaged, the `weather.js` module imports objects from `hget.js`. To switch to the `http.get()` method, one can edit `weather.js` so that line 7 references `./hget-get` instead of `./hget`.

## Installation and Setup

0. These instructions presuppose that [npm][npm] is installed.

1. Your copy of this project will be located in its own directory, inside some other directory that you may choose or create. For example, to create that parent directory inside your own home directory’s `Documents` subdirectory and call it `projects`, you can execute:

    `mkdir ~/Documents/projects`

Make that parent directory your working directory, by executing, for example:

    `cd ~/Documents/projects`

2. Clone this project’s repository into it, thereby creating the project directory, named `http-api-client`, by executing:

    `git clone https://github.com/jrpool/http-api-client.git http-api-client`

2. Make the project directory your working directory by executing:

    `cd http-api-client`

3. Install required dependencies (you can see them listed in `package.json`) by executing:

    `npm i`

## Usage and Examples

Enter `node weather «city»`, replacing `«city»` with the name of any city in the world, to get an output of the latest reported weather temperature in that city. For example:

`node weather 'des Moines'`

To perform linting, execute `npm run lint`.

[lg]: https://www.learnersguild.org
[npm]: https://www.npmjs.com/
