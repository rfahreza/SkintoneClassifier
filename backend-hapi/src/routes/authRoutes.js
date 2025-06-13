const { registerHandler, loginHandler, getAllProductsHandler } = require('../handlers/authHandler');

module.exports = [
  {
    method: 'POST',
    path: '/register',
    handler: registerHandler,
  },
  {
    method: 'POST',
    path: '/login',
    handler: loginHandler,
  },
  {
  method: 'GET',
  path: '/products',
  handler: getAllProductsHandler,
}

];