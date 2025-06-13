require('dotenv').config();
const Hapi = require('@hapi/hapi');
const Inert = require('@hapi/inert');
const Path = require('path');
const authRoutes = require('./routes/authRoutes');

const init = async () => {
  const server = Hapi.server({
    port: 4000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
      files: {
        relativeTo: Path.join(__dirname, 'public'), 
      },
    },
  });

  await server.register(Inert);

  // Static file route
  server.route({
  method: 'GET',
  path: '/img/{param*}',
  handler: (request, h) => {
    console.log('Accessing static file:', request.params.param);
    return h.file(Path.join('img', request.params.param));
  }
});

  server.route(authRoutes);

  await server.start();
  console.log('✅ Server running on', server.info.uri);
};

init();
