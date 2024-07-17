const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose = require('mongoose');
const cors = require('cors');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const typeDefs = require('./schemas/typeDefs');
const resolvers = require('./schemas/resolvers');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Authentication Middleware
const authenticate = async (req, res, next) => {
  const token = req.headers.authorization || '';
  if (token) {
    try {
      const user = await jwt.verify(token.replace('Bearer ', ''), process.env.JWT_SECRET);
      req.user = user;
    } catch (error) {
      console.error('Invalid token');
    }
  }
  next();
};

app.use(authenticate);

// Apollo Server Setup
async function startApolloServer() {
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => ({ user: req.user }),
  });

  await server.start();
  server.applyMiddleware({ app });

  // MongoDB Connection
  mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
      console.log('Connected to MongoDB');
      app.listen(port, () => {
        console.log(`Server running on port ${port}`);
      });
    })
    .catch(error => console.error('MongoDB connection error:', error));
}

startApolloServer();
