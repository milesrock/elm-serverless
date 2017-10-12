# elm-serverless

elm-serverless is a boilerplate to run a elm worker in a AWS Lambda, deployed with serverless.

This code comes with a basic `hello world` example : when you trigger the elm app with a string, it answers with the same string completed with "\n Hello world!".

## Features

- Uses [serverless](https://serverless.com/) to deploy to AWS Lambda
- Basic Boilerplate template for a elm worker
- Comes with env variables implemented, but not used in the lambda (it can easily be sent to the worker through flags or a port). Variables should be written inside 'secrets.yml' and sent to the lambda in serverless.yml. .gitignore is already set to prevent secret.yml to be commited.
- The lambda can be tested locally with the command `yarn run invoke`. It uses `test/data.json`to send data locally to the lambda. This can be modified to be adapted to any other need.
