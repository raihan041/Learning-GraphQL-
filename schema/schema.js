const graphql = require('graphql');
const axios = require('axios');

const {
    GraphQLObjectType,
    GraphQLString,
    GraphQLInt,
    GraphQLList,
    GraphQLNonNull,
    GraphQLSchema
} = graphql;

const CompanyType = new GraphQLObjectType({
    name:"Company",
    fields:() => ({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        description:{type:GraphQLString},
        employees:{
            type: new GraphQLList(UserType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.id}/users`)
                .then(res => res.data);
            }
        }
    })
});


const UserType = new GraphQLObjectType({
    name:"User",
    fields:() => ({
        id:{type:GraphQLString},
        name:{type:GraphQLString},
        email:{type:GraphQLString},
        age:{type:GraphQLInt},
        company:{
            type:CompanyType,
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/${parentValue.companyId}`)
                .then(res => res.data);
            }
        }
    })
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
        },
        company:{
            type: CompanyType,
            args: {
                id:{type:GraphQLString}
            },
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies/`+args.id).then(res => res.data);
            }
        },      
        companies:{
            type: new GraphQLList(CompanyType),
            resolve(parentValue, args){
                return axios.get(`http://localhost:3000/companies`).then(res => res.data);
            }
        }
    }
});

const mutation = new GraphQLObjectType({
    name: "Mutation",
    fields: {
        addUser: {
            type: UserType,
            args: {
                name:{type:new GraphQLNonNull(GraphQLString)},
                age:{type:new GraphQLNonNull(GraphQLInt)},
                email:{type:new GraphQLNonNull(GraphQLString)},
                companyId:{type:GraphQLString}
            },
            resolve(parentValue, {name,email,age}){
                return axios.post('http://localhost:3000/users',{name,email,age}).then(res => res.data);
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});