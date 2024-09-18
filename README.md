# R2 local with test env

```sh
pnpm i

# 1. Upload any file
wrangler r2 object put testFiles/src/index.ts --file ./src/index.ts --local

# 2. See that it works on the local server
pnpm run start
curl http://localhost:8787

# 3. Try the tests
pnpm run test run
```

- The file can be accessed locally in the environment, since 2 works.
- The vitest tests environment has access to the local R2 server, demonstrated on the first test on 3.
- But in vitest, **the bucket appears to be empty**, failing the other tests.
