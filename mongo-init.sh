#!/bin/bash
set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE;

db.createCollection('characters', { capped: false });
db.createCollection('planets', { capped: false });
db.createCollection('episodes', { capped: false });

db.episodes.insert([
  {
    name: "NEWHOPE",
    fullName: "A New Hope",
    episodeNo: 4
  },
  {
    name: "EMPIRE",
    fullName: "The Empire Strikes Back",
    episodeNo: 5
  },
  {
    name: "JEDI", f
  ullName: "Return of the Jedi",
    episodeNo: 6
  },
]);

db.planets.insert([
  {
    name: "Alderan",
    population: "2B"
  },
  {
    name: "Naboo",
    moons: 3,
    population: "4.5B"
  },
]);

var episodes = db.episodes.find();

var planets = db.planets.find();

var episodesIds = episodes.map(item => item._id)

var planetsIds = planets.map(item => item._id)

db.characters.insert([
  {
    "name": "Luke Skywalker",
    "episodes": episodesIds
  },
  {
    "name": "Darth Vader",
    "episodes": episodesIds
  },
  {
    "name": "Han Solo",
    "episodes": episodesIds
  },
  {
    "name": "Leia Organa",
    "episodes": episodesIds,
    "planet": planetsIds[0]
  },
  {
    "name": "Wilhuff Tarkin",
    "episodes": [episodesIds[0]]
  },
  {
    "name": "C-3PO",
    "episodes": episodesIds
  },
  {
    "name": "R2-D2",
    "episodes": episodesIds
  }
]);
EOF
