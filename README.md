## Prerequisities

```bash
npm install -g mocha nodemon

# typescript
npm install -g typescript@rc ts-node
npm install -g tslint

# typescript@rc installs 2.1 (supports async/await and more)
# https://blogs.msdn.microsoft.com/typescript/2016/11/08/typescript-2-1-rc-better-inference-async-functions-and-more
# tslint for linting
# ts-node for running mocha tests without compiling ts files
```

## Developing

```bash
# install dependencies
npm install

# run in dev-mode (compile on save, reload server)
npm run dev

# run without live-reload
npm run start

# for production
node dist/index.js

# run all tests
npm run test
```