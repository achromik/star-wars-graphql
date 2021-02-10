#!/bin/bash
set -e

mongo <<EOF
use $MONGO_INITDB_DATABASE;

db.createCollection('characters', { capped: false });
db.createCollection('planets', { capped: false });
db.createCollection('episodes', { capped: false });

var date = new Date();

var commonData = {
  createdAt: date,
  updatedAt: date,
  __v: 0,
};

db.planets.insert([
  {
    name: 'Alderan',
    population: 2000000000,
    ...commonData,
  },
  {
    name: 'Naboo',
    moons: 3,
    population: 4500000000,
    ...commonData,
  },
]);

var planets = db.planets.find();
var planetsIds = planets.map((item) => item._id);

db.characters.insert([
  {
    name: 'Luke Skywalker',
    ...commonData,
  },
  {
    name: 'Darth Vader',
    ...commonData,
  },
  {
    name: 'Han Solo',
    ...commonData,
  },
  {
    name: 'Leia Organa',
    planetId: planetsIds[0],
    ...commonData,
  },
  {
    name: 'Wilhuff Tarkin',
    planetId: planetsIds[1],
    ...commonData,
  },
  {
    name: 'C-3PO',
    ...commonData,
  },
  {
    name: 'R2-D2',
    ...commonData,
  },
]);

var characters = db.characters.find();
var charactersIds = character.map((item) => item._id);

db.episodes.insert([
  {
    name: 'NEWHOPE',
    fullName: 'A New Hope',
    episodeNo: 4,
    charactersIds,
    ...commonData,
  },
  {
    name: 'EMPIRE',
    fullName: 'The Empire Strikes Back',
    episodeNo: 5,
    charactersIds,
    ...commonData,
  },
  {
    name: 'JEDI',
    fullName: 'Return of the Jedi',
    episodeNo: 6,
    charactersIds: [
      charactersIds[0],
      charactersIds[2],
      charactersIds[4],
      charactersIds[5],
      charactersIds[6],
    ],
    ...commonData,
  },
]);

var episodes = db.episodes.find();

var episodesIds = episodes.map((item) => item._id);

db.characters.insert([
  {
    name: 'Luke Skywalker',
    ...commonData,
  },
  {
    name: 'Darth Vader',
    ...commonData,
  },
  {
    name: 'Han Solo',
    ...commonData,
  },
  {
    name: 'Leia Organa',
    planetId: planetsIds[0],
    ...commonData,
  },
  {
    name: 'Wilhuff Tarkin',
    ...commonData,
  },
  {
    name: 'C-3PO',
    ...commonData,
  },
  {
    name: 'R2-D2',
    ...commonData,
  },
]);
EOF
