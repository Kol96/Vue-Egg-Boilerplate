# Vue-Egg-Boilerplate

> 基于Vue SPA和Egg的前后端模板

<p align="center">
  <img src="https://img.shields.io/badge/npm-5.6.0-blue.svg">
  <img src="https://img.shields.io/badge/node-8.11.1-blue.svg">
  <img src="https://img.shields.io/badge/vue-2.5.16-brightgreen.svg">
  <img src="https://img.shields.io/badge/egg-2.9.1-brightgreen.svg">
</p>

## Docs

- [Feature]()
- [Framework]()
- [Authentication](./docs/Authentication.md)
- [Authorization](./docs/Authorization.md)
- [Validation]()
- [Logger]()
- [ErrorHandler]()
- [ErrorPage]()
- [Security]()

## Install

```bash
$ git clone https://github.com/Kol96/Vue-Egg-Boilerplate.git
$ cd Vue-Egg-Boilerplate
$ npm i
```

## Development

```bash
$ npm run dev
# node proxy on http://localhost:7001/

$ npm run dev:client
$ open http://localhost:8080/
```

## Deploy

```bash
# boundle front resource
$ npm run build:client
$ npm start
$ npm stop
$ open http://localhost:7001/
```
