const { ApolloServer } = require('apollo-server');
const mongoose = require('mongoose');
const typeDefs = require('./graphql/typeDefs');
const resolvers = require('./graphql/resolvers/index');


const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    return {req};
  }
});

const PORT = process.env.port || 4000;

mongoose.connect('mongodb+srv://shreyaslshah:shreyasshah@cluster0.bakje.mongodb.net/Cluster0?retryWrites=true&w=majority', { useNewUrlParser: true })
  .then(() => {
    console.log('db connected');
    return server.listen({ port: PORT });
  }).then((res) => {
    console.log(`server running at ${res.url}`);
  }).catch((error)=>{
    console.log(error);
  });