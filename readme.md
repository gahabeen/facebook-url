# **facebook-url**
Parse, sanitize and craft any Facebook URL

# Getting started

```
npm i facebook-url -D

yarn add facebook-url -D
```

## Usage
```js
const { parse, craft } = require('facebook-url');

const url = 'https://www.facebook.com/EcoFriendlyMaidService/services/?service_id=1368411153266622'
const link = parse(url, { lazy: false }); // lazy=false by default;
// > link as 2 may accessors: { matches, data }

console.log(link.matches.aPage)
// > true

console.log(link.matches)
/* > {
  aPage: true,
  aPageServices: true,
  aUrl: true,
  aFacebookDomain: true,
  aPagePosts: false,
  aPageGroups: false,
  aPageJobs: false,
  aPageEvents: false,

  {...}
}
*/


console.log(link.data)
/* > {
  matched: true,
  url: URL {
    href: 'https://www.facebook.com/EcoFriendlyMaidService/services/?service_id=1368411153266622',
    origin: 'https://www.facebook.com',
    protocol: 'https:',
    username: '',
    password: '',
    host: 'www.facebook.com',
    hostname: 'www.facebook.com',
    port: '',
    pathname: '/EcoFriendlyMaidService/services/',
    search: '?service_id=1368411153266622',
    searchParams: URLSearchParams { 'service_id' => '1368411153266622' },
    hash: ''
  },
  domain: {
    name: 'www',
    hostname: 'www.facebook.com',
    interestingToQuery: true,
    queryPriority: 0
  },
  language: { code: 'en', name: 'English', native: 'English' },
  user: {
    identifier: 'EcoFriendlyMaidService',
    id: undefined,
    slug: 'EcoFriendlyMaidService'
  },
  page: {
    identifier: 'EcoFriendlyMaidService',
    id: undefined,
    slug: 'EcoFriendlyMaidService'
  },
  service: {
    identifier: '1368411153266622',
    id: '1368411153266622',
    slug: undefined
  }
}
*/

console.log(craft(link).aPage())
// > https://www.facebook.com/EcoFriendlyMaidService

console.log(craft(link).aPageAbout())
// > https://www.facebook.com/EcoFriendlyMaidService/about

console.log(craft(link).aPage({ page: '136820153266622'}))
// > https://www.facebook.com/136820153266622

```

## Running the build
All the different build steps are orchestrated via [npm scripts](https://docs.npmjs.com/misc/scripts).
Npm scripts basically allow us to call (and chain) terminal commands via npm.

| Npm Script | Description |
| ------------------------- | ------------------------------------------------------------------------------------------------- |
| `test`                   | Run tests using jest and 300 samples       |
| `test-min`               | Run tests using jest and 10 samples        |
| `test-all`               | Run tests using jest and all sample        |


## Eslint rules
Eslint is a code linter that helps catch minor code quality and style issues.
All rules are configured through `.eslintrc`.
