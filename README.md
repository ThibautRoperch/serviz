# serviz

## Introduction

Serviz is presented as a server rendering your charts. By sending it some data, this tool will be able to offer you an adapted visualization via its graphic interface.

It has the advantage of being used by any programming language, both client and server side. No need any chart library either views, Serviz is hosted on a port as a server and just wait for you to send him some series, labels or coordinates. 

## Software architecture

On the one hand, a NodeJS server is used as an API. It is responsible for receiving the data sent, storing them in a MongoDB database and making them available.

On another side we have a a view-composed interface, displaying as a graph and in real-time the last sent data.

## Configure a MongoDB database

Docker : `mongo` and `mongo-express`

Create the database `serviz`

## Ajust the configuration file

Open the file `/config.json` and follow the next instructions in order to properly configure the differents parts of Serviz.

### Set the MongoDB server instance input

Write down the address and the port of the MongoDB server instance respectively under the path `inputs.mongo_db.address` and `inputs.mongo_db.port`.

Example of configuration :

    "inputs": {
        "mongo_db": {
            "address": "localhost",
            "port": 32778
        }
    }

### Set the API port (output)

Set the port on which you want to host the API of Serviz under the path `outputs.api.port`.

Example of configuration :

    "outputs": {
        "api": {
            "port": 5000
        }
    }

## Set up the server

### Install dependencies

    npm run server_i

### Launch the server

    npm run server

## Set up the client

### Install dependencies

    npm run client_i

### Launch the client

    npm run client

## Usage

Send your datas to the server (both POST or GET methods are supported)

    localhost:5000/api/charts

    // TODO GET example
    // TODO POST example

Vizualise your chart

    localhost:8000
  
