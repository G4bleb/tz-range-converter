# tz-range-converter

Convert a time range from a timezone to local time

## Requirements

- [Node](https://nodejs.org/) (tested with v16.5.0)
- [Yarn Classic](https://classic.yarnpkg.com/)

## Installation

Install dependencies

```
$ yarn
```

Build & run the converter

```
$ yarn build
$ node build/converter.js 11pm-4am ET
```

## Development

Run the converter in a dev context with `yarn dev` :

```
$ yarn dev 11pm 4am Asia/Tokyo
$ yarn dev 23:00-04:00 Europe/Berlin
$ yarn dev 23-4 ET
$ yarn dev 11:45pm 4:15am US/Alaska
```
