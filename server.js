const express = require('express');
const expressGraphQL = require('express-graphql');
const schema = require('./schema/schema');

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