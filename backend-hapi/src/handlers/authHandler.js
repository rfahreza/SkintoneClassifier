const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const db = require('../db');

// REGISTER
exports.registerHandler = async (request, h) => {
  const { username, password, name } = request.payload;
  const hashed = await bcrypt.hash(password, 10);

  return new Promise((resolve) => {
    db.run(
      'INSERT INTO users (username, name, password) VALUES (?, ?, ?)',
      [username, name, hashed],
      function (err) {
        if (err) {
          return resolve(h.response({ message: 'Email sudah terdaftar' }).code(400));
        }
        resolve(h.response({ message: 'Register success' }).code(201));
      }
    );
  });
};

// LOGIN
exports.loginHandler = async (request, h) => {
  const { username, password } = request.payload;
  return new Promise((resolve) => {
    db.get('SELECT * FROM users WHERE username = ?', [username], async (err, user) => {
      if (err || !user) {
        return resolve(h.response({ message: 'User not found' }).code(404));
      }
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return resolve(h.response({ message: 'Wrong password' }).code(401));
      const token = jwt.sign({ username }, process.env.JWT_SECRET, { expiresIn: '1h' });
      resolve({ token, name: user.name });
    });
  });
};

exports.getAllProductsHandler = async (request, h) => {
  return new Promise((resolve) => {
    db.all('SELECT * FROM products', (err, rows) => {
      if (err) {
        console.error('❌ Gagal mengambil data produk:', err.message);
        return resolve(h.response({ message: 'Gagal mengambil data produk' }).code(500));
      }

      resolve(h.response(rows).code(200));
    });
  });
};