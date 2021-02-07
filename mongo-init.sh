#!/bin/bash
set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE;

db.createCollection('characters', { capped: false });
db.createCollection('planets', { capped: false });
db.createCollection('episodes', { capped: false });

var date = new Date().toISOString()

db.episodes.insert([
  {
    name: "NEWHOPE",
    fullName: "A New Hope",
    episodeNo: 4,
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    name: "EMPIRE",
    fullName: "The Empire Strikes Back",
    episodeNo: 5,
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    name: "JEDI",
    fullName: "Return of the Jedi",
    episodeNo: 6,
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
]);

db.planets.insert([
  {
    name: "Alderan",
    population: "2B",
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    name: "Naboo",
    moons: 3,
    population: "4.5B",
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
]);

var episodes = db.episodes.find();

var planets = db.planets.find();

var episodesIds = episodes.map(item => item._id)

var planetsIds = planets.map(item => item._id)

db.characters.insert([
  {
    "name": "Luke Skywalker",
    episodesIds,
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    "name": "Darth Vader",
    episodesIds,
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    "name": "Han Solo",
    episodesIds,
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    "name": "Leia Organa",
    episodesIds,
    "planetId": planetsIds[0],
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    "name": "Wilhuff Tarkin",
    "episodesIds": [episodesIds[0]],
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    "name": "C-3PO",
    episodesIds,
    createdAt: date,
    updatedAt: date,
    __v: 1
  },
  {
    "name": "R2-D2",
    episodesIds,
    createdAt: date,
    updatedAt: date,
    __v: 1
  }
]);
EOF
