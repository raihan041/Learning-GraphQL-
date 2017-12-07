const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;

const _ = require('lodash');


const UserType = new GraphQLObjectType({
    name:"User",
    fields:{
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        age:{type:GraphQLInt}
    }
});

const RootQuery = new GraphQLObjectType({
    name:"RootQueryType",
    fields:{
        user:{
            type: UserType,
            args: {
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/users/`+args.id).then(res => res.data);
            }
        },      
        users:{
            type: new GraphQLList(UserType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/users`).then(res => res.data);
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});