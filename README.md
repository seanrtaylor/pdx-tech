# pdx-tech

A react/redux app for viewing and rating local tech businesses

This is a both a teaching and a learning exercise.

The master branch contains the base level implementation, but it is incomplete.
You should create a new branch to contain your work.

On the master branch, you will find a working crud api for companies, a scaffolded web app, and an initial action creator
for requesting a list of companies.

You'll need to create the CompaniesList component and map the new action to the component props.

When you call the action in ComponentDidMount, Axios-Middleware will emit actions for
GET_COMPANIES_REQUEST, *_SUCCESS, *_FAILURE.
Write a companies-reducer to handle these actions.
Don't forget to add your new reducer to combine reducers.

You can then connect your CompaniesList component to the redux store and map the data to props.
At this point you should be able to write a dumb Company component and start displaying that data.

You should then provide a mechanism for creating a new company, editing an existing company, and voting a company up or down.

The api is full tested. If you aren't sure about how to use the api, look at api/tests.

Good luck, but you totally got this. Don't hesitate to ask questions.

## Installation

Install front-end dependencies:
```
npm install
```

Install api dependencies:
```
cd api
npm install
```

## Run the app

Start a development webserver:
```
npm start
```

Start the api
```
cd api
npm start
```

Open your browser to http://localhost:8080


## Testing

Running unit tests:
```
npm test
```
Run api tests:
```
cd api
npm test
```

Running tests and generating code coverage reports:
```
npm run cover
```
This will generate a code coverage report which can be viewed by opening `./coverage/lcov-report/index.html` in your browser.

## Resources
[react-bootstrap](https://react-bootstrap.github.io)

[redux-axios-middleware](https://github.com/svrcekmichal/redux-axios-middleware)

[redux-minimal](https://github.com/catalin-luntraru/redux-minimal)

[redux-form](http://redux-form.com)
