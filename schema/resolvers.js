// app/src/resolvers.js
const axios = require('axios');

const {PubSub } = require('graphql-subscriptions');

const pubsub = new PubSub ();

const USER_ADDED = 'user_added';

const resolvers = {
    User:
    {
      company: (root,args) => {
        return axios.get(`http://localhost:3000/companies/`+root.companyId)
        .then(res => res.data);
      }
    },
    Company:{
      employees:(root,args) => {
        console.log(root,args);
        return axios.get(`http://localhost:3000/companies/${root.id}/users`)
        .then(res => res.data);
      }
    },
    Query: {
      users: () => {
        return axios.get(`http://localhost:3000/users`)
        .then(res => res.data);
      },
      user: (root, { id }) => {
        return axios.get(`http://localhost:3000/users/`+id)
        .then(res => res.data);
      },
      companies: () => {
        return axios.get(`http://localhost:3000/companies`)
        .then(res => res.data);
      },
      company: (root, { id }) => {
        return axios.get(`http://localhost:3000/companies/`+id)
        .then(res => res.data);
      }
    },
    Mutation: {
      addUser: (root, {name,email,age,companyId}) => {
        const userAdded =  axios.post('http://localhost:3000/users',{name,email,age,companyId}).then(res => res.data);
        pubsub.publish(USER_ADDED, { userAdded });

        return userAdded;
      },
    },
    Subscription: {
      userAdded: {
        subscribe: () => pubsub.asyncIterator(USER_ADDED),
      },
    },
  };

  module.exports = resolvers;