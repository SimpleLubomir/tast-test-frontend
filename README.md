# Nuxt 3 Fronted for test task

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Starting guide

There are two ways of running project: via docker and manual

### Via Docker

Go to root page of project and run docker compose up using last version of docker

```bash
docker compose up
```

### Manual

```bash
npm install
## or
yarn install
```

Copy .env.example to .env file and fill in with values:

- BACKEND (full url to backend part of project, like http://`<example>`:`<port if local>`)

Then run `yarn build && yarn start` or `npm run build && npm run start`

## Notes

Used Nuxt 3, because of Vue 3 Composable API,
has some own data from pet project built in Nuxt,
and SSR of Nuxt allow SEO optimization and meta data injection on needed pages.

## Recommendation

With docker suppose to work on the same machine, just for quick start
