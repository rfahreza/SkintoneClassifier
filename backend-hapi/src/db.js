const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./users.db');

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE,
    name TEXT,
    password TEXT
  )`);
  db.run(`CREATE TABLE IF NOT EXISTS products (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    description TEXT,
    price INTEGER NOT NULL,
    imageUrl TEXT,
    category TEXT
  )`);
  
  db.get(`SELECT COUNT(*) AS count FROM products`, (err, row) => {
    if (err) {
      console.error('Error checking product count:', err);
      return;
    }

    if (row.count === 0) {
      const stmt = db.prepare(`INSERT INTO products (name, description, price, imageUrl, category) VALUES (?, ?, ?, ?, ?)`);

      stmt.run(
        'Stroller Bayi',
        'Stroller untuk bayi usia 6 bulan ke atas',
        50000,
        '/images/stroller.jpg',
        'Peralatan Jalan'
      );

      stmt.run(
        'Box Bayi',
        'Box tidur bayi yang aman dan nyaman',
        75000,
        '/images/box-bayi.jpg',
        'Tempat Tidur'
      );

      stmt.run(
        'Car Seat Bayi',
        'Car seat bayi untuk keamanan saat berkendara',
        60000,
        '/images/car-seat.jpg',
        'Peralatan Jalan'
      );

      stmt.finalize();
      console.log('Produk berhasil disisipkan ke database.');
    } else {
      console.log('Produk sudah ada di database, tidak disisipkan ulang.');
    }
  });
});

module.exports = db;