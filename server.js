const express = require('express');
const expressGraphQL = require('express-graphql');

const {  makeExecutableSchema } = require('graphql-tools');

const { createServer } = require('http');
const { execute, subscribe } = require('graphql');
const { SubscriptionServer } = require('subscriptions-transport-ws');
const {
    graphqlExpress,
    graphiqlExpress,
  } = require('graphql-server-express');
const cors = require('cors');
const bodyParser = require('body-parser');
const resolvers  =  require('./schema/resolvers'); // Will be implemented at a later stage.
const typeDefs = require('./schema/schema');
const schema = makeExecutableSchema({ typeDefs, resolvers });
const app = express();

const PORT = 8000;
// app.use('/graphql',new expressGraphQL({
//     schema,   //that means schema:schema
//     graphiql:true
// }));

// app.listen(PORT, () => {
//     console.log(`Example app listening on port ${PORT}!`);
// });
 app.use('*', cors({ origin: 'http://localhost:7000' }));

 app.use('/graphql', bodyParser.json(), graphqlExpress({
    schema
  }));
  
 app.use('/graphiql', graphiqlExpress({
    endpointURL: '/graphql',
    subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
  }));

const server = createServer(app);

server.listen(PORT, () => {
    new SubscriptionServer({
      execute,
      subscribe,
      schema,
    }, {
      server: server,
      path: '/subscriptions',
    });
});


//Run app, then load http://localhost:port in a browser to see the output.