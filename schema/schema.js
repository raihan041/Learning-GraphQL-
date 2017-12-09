// app/src/schema.js

    const typeDefs = `
    type Company {
        id: String!                # "!" denotes a required field
        name: String!
        description: String!
        employees: [User]
    }

    type User {
        id: String!
        name: String!
        email: String!
        age: Int!
        company: Company
    }
    # This type specifies the entry points into our API. 
    type Query {
        users: [User]    # "[]" means this is a list of channels
        user(id: String!): User
    }

    # The mutation root type, used to define all mutations.
    type Mutation {
        # A mutation to add a new channel to the list of channels
        addUser(name: String!,email: String!,age: Int!): User
    }
    `;

    // const schemaApollo = makeExecutableSchema({ typeDefs, resolvers });
    // module.export = schemaApollo ;
    module.exports = typeDefs;