# challengue_shippify
Code challengue to Shippify - Backend Developer

# Description

Server that have the main goal of create routes based of some deliveries.
- A route need to have at least two deliveries.
- A route is composed by steps, each step is a part of a delivery, for example: We have
delivery one with pickup_1 and delivery_1 and delivery two with pickup_2 and
delivery_2. So the steps of the route could be pickup_1, pickup_2, delivery_1,
delivery_2.

Create an endpoint to create an optimized route.

## Directory tree

```
├── docs
│   └── challengue-shippify.postman_collection.json
├── src
│   ├── config
│   │   └── index.js
│   └── routes
│       └── index.js
├── utils
│   └── utils.js
├── volumeData
│   └── payloadTest.json
├── .dockerignore
├── .envrc
├── .envrc.example
├── .gitignore
├── Dockerfile
├── index.js
├── package-lock.json
├── package.json
└── README.md
```

## How to run

Follow the steps below to run the service in your local environment:

- Install the dependencies with ```npm i```

- Set the environment variables in your **.envrc** file and use the ```source .envrc``` command

- Run the server with ```npm run start```

- Import the file challengue-shippify.postman_collection.json from folder docs as a new Postman collection, with this file you can make a test.

- Remember update the x-api-key in the headers

- Send request

## Author

* Kevin Castro
* [LinkedIn](https://www.linkedin.com/in/kevin-brandown-castro-/)
* [Contact](https://kevincastrop.github.io/KC)
