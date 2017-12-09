// app/src/resolvers.js
const axios = require('axios');

const resolvers = {
    Query: {
      users: () => {
        return axios.get(`http://localhost:3000/users`)
        .then(res => res.data);
      },
      user: (root, { id }) => {
        return axios.get(`http://localhost:3000/users/`+id)
        .then(res => res.data);
      },
    },
    Mutation: {
      addUser: (root, {name,email,age}) => {
        return axios.post('http://localhost:3000/users',{name,email,age}).then(res => res.data);
      },
    },
  };

  module.exports = resolvers;