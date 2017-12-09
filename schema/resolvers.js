// app/src/resolvers.js
const axios = require('axios');

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
        return axios.post('http://localhost:3000/users',{name,email,age,companyId}).then(res => res.data);
      },
    },
  };

  module.exports = resolvers;