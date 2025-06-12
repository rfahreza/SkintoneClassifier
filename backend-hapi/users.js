const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('./users.db');

db.all('SELECT * FROM users', [], (err, rows) => {
  if (err) {
    console.error('Gagal membaca data:', err.message);
    return;
  }

  if (rows.length === 0) {
    console.log('Tabel users kosong.');
  } else {
    console.log('Data dalam tabel users:');
    rows.forEach((row) => {
      console.log(row);
    });
  }
});

db.close();
