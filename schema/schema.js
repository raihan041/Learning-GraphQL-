const graphql = require('graphql');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLSchema
} = graphql;

const _ = require('lodash');

const users = [
    {id:"1",name:"A",email:"a@a.com",age:23},
    {id:"2",name:"B",email:"b@b.com",age:24},
    {id:"3",name:"C",email:"c@c.com",age:25},
    {id:"4",name:"D",email:"d@d.com",age:26}
];

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
                return _.find(users,{id:args.id});
            }
        },      
        users:{
            type: new GraphQLList(UserType),
            resolve(parentValue, args){
                return users;
            }
        }
    }
});


module.exports = new GraphQLSchema({
    query: RootQuery
});