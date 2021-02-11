# star-wars-graphql

**AWS Lambda with GraphQL API**


**Demo:**
 https://39sjvs9fkl.execute-api.eu-central-1.amazonaws.com/prod/graphql

 Query

 ```GraphQL
 getCharacterById(
  _id: MongoID
): Character

getCharacters(
  page: Int
  perPage: Int
  filter: FilterFindManyCharacterInput
  sort: SortFindManyCharacterInput
): CharacterPagination

getAllCharacters: Characters

planetById(
  _id: MongoID
): Planet

getAllPlanets(
  filter: FilterFindManyPlanetInput
  skip: Int
  limit: Int
  sort: SortFindManyPlanetInput
): [Planet!]!

getAllEpisodes(
  page: Int
  perPage: Int
  filter: FilterFindManyEpisodeInput
  sort: SortFindManyEpisodeInput
): EpisodePagination

getCharacterEpisodes(
  id: MongoID!
): [Episode]
```
Mutation:
```GraphQL
createCharacter(
  character: CharacterInput
): Character

updateCharacter(
  character: UpdateCharacterInput
): Character


deleteCharacter(
  id: String
): Character
```

## Local development

Required Docker or MongoDB installed locally or an access to MongoDB cluster

Locally you should created `.env.development` file.

To start MongoDB in docer container pleas type in you terminal:
```
npm run mongo:dev
```
or
```
yarn mongo:dev
```

*If you will use Docker your database will be filled with initial data.*

### Runnig lambda locally

**Install packages**
```
npm install
```
or
```
yarn install
```

**Start lambda**

```
npm run dev
```
or
```
yarn dev
```

## Deploying lambda

Prerequisites
- AWS CLI
- AWS credential

On production use `.env.production` file

To deploy lambda use command
```
npm run deploy
```
or
```
yarn deploy
```

