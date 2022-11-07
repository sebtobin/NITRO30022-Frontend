This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running the program
First, build the dependencies:
```bash
yarn build
```

Then, 

Either run the development server:
```bash
yarn dev
```

Or run the server normally:
```bash
yarn start
```

Open [http://localhost:3000](http://localhost:3000) with your browser to access the Nitrus Application.

## APIs
The Frontend APIs can be found in the src/redux folder.

These APIs send HTTP requests to the relevant Backend APIs and the Frontend then receives a response and acts as necessary.

## Testing
Test Cases can be found on cypress/e2e/Nitrus-Tests/nitrus.cy.js

These test cases are created and ran through Cypress, and mainly on the Google Chrome browser.

In order to run just the tests through the Command Line:
```bash
yarn cy:run
```

In order to run the tests through the Cypress GUI:
```bash
yarn cy:open
```

## Continuous Integration (CI) Pipeline
In order to access and view the CI Pipeline, click on the "Actions" button or use the link https://github.com/sebtobin/NITRO30022-Frontend/actions to head to the Github Actions page of the repository. The CI Pipeline are the runs named "Cypress Test for Nitrus Application."