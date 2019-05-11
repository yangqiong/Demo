const express = require('express')
const graphqlHTTP = require('express-graphql')
const schema = require('./schema/schema')
const mongoose = require('mongoose')
const cors = require('cors');

const app = express()

// allow cross-domain access
app.use(cors())

mongoose.connect('mongodb://localhost:27017/graphql-playlist')
mongoose.connection.once('open', () => {
  console.log('connnected to database')
})

app.use('/graphql', graphqlHTTP({
  schema,
  graphiql: true
}))

app.listen(4000, () => {
  console.log('now listening for requests on port 4000')
})
