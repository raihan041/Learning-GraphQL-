const express = require('express');
const expressGraphQL = require('express-graphql');

const {  makeExecutableSchema } = require('graphql-tools');

const resolvers  =  require('./schema/resolvers'); // Will be implemented at a later stage.
const typeDefs = require('./schema/schema');
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();

app.use('/graphql',new expressGraphQL({
    schema,   //that means schema:schema
    graphiql:true
}));

app.listen(4000, () => {
    console.log('Example app listening on port 4000!');
});

app.get('/', (req, res) => {
    res.send('Hello World!');
});


//Run app, then load http://localhost:port in a browser to see the output.