#!/bin/bash
set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE;

db.createCollection('characters', { capped: false });
db.createCollection('planets', { capped: false });
db.createCollection('episodes', { capped: false });

var date = new Date()

var commonData = {
  createdAt: date,
  updatedAt: date,
  __v: 0
}

db.episodes.insert([
  {
    name: "NEWHOPE",
    fullName: "A New Hope",
    episodeNo: 4,
    ...commonData
  },
  {
    name: "EMPIRE",
    fullName: "The Empire Strikes Back",
    episodeNo: 5,
    ...commonData
  },
  {
    name: "JEDI",
    fullName: "Return of the Jedi",
    episodeNo: 6,
    ...commonData
  },
]);

db.planets.insert([
  {
    name: "Alderan",
    population: "2B",
    ...commonData
  },
  {
    name: "Naboo",
    moons: 3,
    population: "4.5B",
    ...commonData
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
    ...commonData
  },
  {
    "name": "Darth Vader",
    episodesIds,
    ...commonData
  },
  {
    "name": "Han Solo",
    episodesIds,
    ...commonData
  },
  {
    "name": "Leia Organa",
    episodesIds,
    "planetId": planetsIds[0],
    ...commonData
  },
  {
    "name": "Wilhuff Tarkin",
    "episodesIds": [episodesIds[0]],
    ...commonData
  },
  {
    "name": "C-3PO",
    episodesIds,
    ...commonData
  },
  {
    "name": "R2-D2",
    episodesIds,
    ...commonData
  }
]);
EOF
