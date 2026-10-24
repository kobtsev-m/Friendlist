# Friendlist

Full-stack web app for finding friends by shared interests: profiles, friends, groups, places, posts and chat.

## Features
- Pages: home, profile, friends, groups, interest categories, places (Google Maps), posts, chat, sign-in / sign-up
- GraphQL API built with NestJS (code-first, Apollo) and TypeORM on PostgreSQL, with migrations
- JWT auth with argon2 password hashing
- API deployed as an AWS Lambda through Amplify (aws-serverless-express)

## Stack
**Frontend:** React, TypeScript, MobX, Apollo Client, MUI, Formik, Google Maps, ApexCharts
**Backend:** NestJS, GraphQL, TypeORM, PostgreSQL, JWT, AWS Lambda (Amplify)

## Run locally
```bash
yarn install
yarn start   # frontend
```
