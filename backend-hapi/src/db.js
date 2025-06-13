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
    shade TEXT NOT NULL,
    price INTEGER NOT NULL,
    imageUrl TEXT,
    category TEXT,
    link TEXT
  )`);

  const products = [
    // Cushion
    ['Colorfit Cushion', '11C Pink Fair', 122550, 'http://localhost:4000/img/chusion/11c-pink-fair.jpg', 'fair', 'https://shopee.co.id/WARDAH-Colorfit-Perfect-Glow-Cushion-Tahan-Lama-Hingga-12-Jam-Dilengkapi-SPF-33-PA-dan-Centella-Asiatica-Hasil-Akhir-Glowing-dan-Menyatu-Dengan-Warna-Kulit-Makeup-i.59763733.28567659478?sp_atk=ef4bcb22-1983-41e3-93b7-d18b79b64264&xptdk=ef4bcb22-1983-41e3-93b7-d18b79b64264'],
    ['Colorfit Cushion', '22N Light Ivory', 122550, 'http://localhost:4000/img/chusion/22n-light-ivory.jpg', 'fair', 'https://shopee.co.id/WARDAH-Colorfit-Perfect-Glow-Cushion-Tahan-Lama-Hingga-12-Jam-Dilengkapi-SPF-33-PA-dan-Centella-Asiatica-Hasil-Akhir-Glowing-dan-Menyatu-Dengan-Warna-Kulit-Makeup-i.59763733.28567659478?sp_atk=ef4bcb22-1983-41e3-93b7-d18b79b64264&xptdk=ef4bcb22-1983-41e3-93b7-d18b79b64264'],
    ['Colorfit Cushion', '23W Warm Ivory', 122550, 'http://localhost:4000/img/chusion/23w-warm-ivory.jpg', 'medium', 'https://shopee.co.id/WARDAH-Colorfit-Perfect-Glow-Cushion-Tahan-Lama-Hingga-12-Jam-Dilengkapi-SPF-33-PA-dan-Centella-Asiatica-Hasil-Akhir-Glowing-dan-Menyatu-Dengan-Warna-Kulit-Makeup-i.59763733.28567659478?sp_atk=ef4bcb22-1983-41e3-93b7-d18b79b64264&xptdk=ef4bcb22-1983-41e3-93b7-d18b79b64264'],
    ['Colorfit Cushion', '32N Neutral Beige', 122550, 'http://localhost:4000/img/chusion/32n-neutral-beige.jpg', 'medium', 'https://shopee.co.id/WARDAH-Colorfit-Perfect-Glow-Cushion-Tahan-Lama-Hingga-12-Jam-Dilengkapi-SPF-33-PA-dan-Centella-Asiatica-Hasil-Akhir-Glowing-dan-Menyatu-Dengan-Warna-Kulit-Makeup-i.59763733.28567659478?sp_atk=ef4bcb22-1983-41e3-93b7-d18b79b64264&xptdk=ef4bcb22-1983-41e3-93b7-d18b79b64264'],
    ['Colorfit Cushion', '33W Olive Beige', 122550, 'http://localhost:4000/img/chusion/33w-olive-beige.jpg', 'medium', 'https://shopee.co.id/WARDAH-Colorfit-Perfect-Glow-Cushion-Tahan-Lama-Hingga-12-Jam-Dilengkapi-SPF-33-PA-dan-Centella-Asiatica-Hasil-Akhir-Glowing-dan-Menyatu-Dengan-Warna-Kulit-Makeup-i.59763733.28567659478?sp_atk=ef4bcb22-1983-41e3-93b7-d18b79b64264&xptdk=ef4bcb22-1983-41e3-93b7-d18b79b64264'],
    ['Colorfit Cushion', '42N Neutral Sand', 122550, 'http://localhost:4000/img/chusion/42n-neutral-sand.jpg', 'medium', 'https://shopee.co.id/WARDAH-Colorfit-Perfect-Glow-Cushion-Tahan-Lama-Hingga-12-Jam-Dilengkapi-SPF-33-PA-dan-Centella-Asiatica-Hasil-Akhir-Glowing-dan-Menyatu-Dengan-Warna-Kulit-Makeup-i.59763733.28567659478?sp_atk=ef4bcb22-1983-41e3-93b7-d18b79b64264&xptdk=ef4bcb22-1983-41e3-93b7-d18b79b64264'],
    ['Colorfit Cushion', '43W Golden Sand', 122550, 'http://localhost:4000/img/chusion/43w-golden-sand.jpg', 'dark', 'https://shopee.co.id/WARDAH-Colorfit-Perfect-Glow-Cushion-Tahan-Lama-Hingga-12-Jam-Dilengkapi-SPF-33-PA-dan-Centella-Asiatica-Hasil-Akhir-Glowing-dan-Menyatu-Dengan-Warna-Kulit-Makeup-i.59763733.28567659478?sp_atk=ef4bcb22-1983-41e3-93b7-d18b79b64264&xptdk=ef4bcb22-1983-41e3-93b7-d18b79b64264'],
    ['Colorfit Cushion', '52N Almod', 122550, 'http://localhost:4000/img/chusion/52n-almond.jpg', 'dark', 'https://shopee.co.id/WARDAH-Colorfit-Perfect-Glow-Cushion-Tahan-Lama-Hingga-12-Jam-Dilengkapi-SPF-33-PA-dan-Centella-Asiatica-Hasil-Akhir-Glowing-dan-Menyatu-Dengan-Warna-Kulit-Makeup-i.59763733.28567659478?sp_atk=ef4bcb22-1983-41e3-93b7-d18b79b64264&xptdk=ef4bcb22-1983-41e3-93b7-d18b79b64264']
  
    // Cream Blush
    ['Colorfit Cream Blush', '01 Sand Coral', 47520, 'http://localhost:4000/img/cream-blush/01-sand-coral.jpg', 'fair', 'https://shopee.co.id/WARDAH-COLORFIT-CREAM-BLUSH-Blush-On-i.116531487.15811595050'],
    ['Colorfit Cream Blush', '02 Merry Mauve', 47520, 'http://localhost:4000/img/cream-blush/02-merry-mauve.jpg', 'medium', 'https://shopee.co.id/WARDAH-COLORFIT-CREAM-BLUSH-Blush-On-i.116531487.15811595050'],
    ['Colorfit Cream Blush', '03 Summer Peach', 47520, 'http://localhost:4000/img/cream-blush/03-summer-peach.jpg', 'fair', 'https://shopee.co.id/WARDAH-COLORFIT-CREAM-BLUSH-Blush-On-i.116531487.15811595050'],
    ['Colorfit Cream Blush', '04 Ethereal Rose', 47520, 'http://localhost:4000/img/cream-blush/04-ethereal-rose.jpg', 'dark', 'https://shopee.co.id/WARDAH-COLORFIT-CREAM-BLUSH-Blush-On-i.116531487.15811595050'],
    ['Colorfit Cream Blush', '05 Peachful Plum', 47520, 'http://localhost:4000/img/cream-blush/05-peachful-plum.jpg', 'medium', 'https://shopee.co.id/WARDAH-COLORFIT-CREAM-BLUSH-Blush-On-i.116531487.15811595050'],
    ['Colorfit Cream Blush', '06 Soulful Brick', 47520, 'http://localhost:4000/img/cream-blush/06-soulful-brick.jpg', 'dark', 'https://shopee.co.id/WARDAH-COLORFIT-CREAM-BLUSH-Blush-On-i.116531487.15811595050'],

    // Lip Glasting
    ['Liquid Lip Glasting', '01 Caramel Coat', 90210, 'http://localhost:4000/img/lip-glasting/01-caramel-coat.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '01 Caramel Coat', 90210, 'http://localhost:4000/img/lip-glasting/01-caramel-coat.jpg', 'medium', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '01 Caramel Coat', 90210, 'http://localhost:4000/img/lip-glasting/01-caramel-coat.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '02 Peach Polish', 90210, 'http://localhost:4000/img/lip-glasting/02-peach-polish.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '02 Peach Polish', 90210, 'http://localhost:4000/img/lip-glasting/02-peach-polish.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '03 Dazzle Maple', 90210, 'http://localhost:4000/img/lip-glasting/03-dazzle-maple.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '03 Dazzle Maple', 90210, 'http://localhost:4000/img/lip-glasting/03-dazzle-maple.jpg', 'medium', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '03 Dazzle Maple', 90210, 'http://localhost:4000/img/lip-glasting/03-dazzle-maple.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '05 Glazingberry', 90210, 'http://localhost:4000/img/lip-glasting/05-glazingberry.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '05 Glazingberry', 90210, 'http://localhost:4000/img/lip-glasting/05-glazingberry.jpg', 'medium', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '05 Glazingberry', 90210, 'http://localhost:4000/img/lip-glasting/05-glazingberry.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '06 Ruby Sparks', 90210, 'http://localhost:4000/img/lip-glasting/06-ruby-sparks.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '06 Ruby Sparks', 90210, 'http://localhost:4000/img/lip-glasting/06-ruby-sparks.jpg', 'medium', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '06 Ruby Sparks', 90210, 'http://localhost:4000/img/lip-glasting/06-ruby-sparks.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '07 Rouge Flare', 92150, 'http://localhost:4000/img/lip-glasting/07-rouge-flare.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '07 Rouge Flare', 92150, 'http://localhost:4000/img/lip-glasting/07-rouge-flare.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '08 Plushpome', 90210, 'http://localhost:4000/img/lip-glasting/08-plushpome.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '08 Plushpome', 90210, 'http://localhost:4000/img/lip-glasting/08-plushpome.jpg', 'medium', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '08 Plushpome', 90210, 'http://localhost:4000/img/lip-glasting/08-plushpome.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '09 Fudgy Toffee', 92150, 'http://localhost:4000/img/lip-glasting/09-fudgy-toffee.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '09 Fudgy Toffee', 92150, 'http://localhost:4000/img/lip-glasting/09-fudgy-toffee.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '10 Ombre Sheen', 92150, 'http://localhost:4000/img/lip-glasting/10-ombre-sheen.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '11 Petal Blush', 90210, 'http://localhost:4000/img/lip-glasting/11-petal-blush.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '12 Shine Sorbet', 90210, 'http://localhost:4000/img/lip-glasting/12-shine-sorbet.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '12 Shine Sorbet', 90210, 'http://localhost:4000/img/lip-glasting/12-shine-sorbet.jpg', 'medium', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '12 Shine Sorbet', 90210, 'http://localhost:4000/img/lip-glasting/12-shine-sorbet.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '13 Pumkin Drip', 90210, 'http://localhost:4000/img/lip-glasting/13-pumkin-drip.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '13 Pumkin Drip', 90210, 'http://localhost:4000/img/lip-glasting/13-pumkin-drip.jpg', 'medium', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '13 Pumkin Drip', 90210, 'http://localhost:4000/img/lip-glasting/13-pumkin-drip.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '14 Latte Lacquer', 92150, 'http://localhost:4000/img/lip-glasting/14-latte-lacquer.jpg', 'medium', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '14 Latte Lacquer', 92150, 'http://localhost:4000/img/lip-glasting/14-latte-lacquer.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '15 Blossom Veil', 92150, 'http://localhost:4000/img/lip-glasting/15-blossom-veil.jpg', 'fair', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b'],
    ['Liquid Lip Glasting', '15 Blossom Veil', 92150, 'http://localhost:4000/img/lip-glasting/15-blossom-veil.jpg', 'dark', 'https://shopee.co.id/WARDAH-Liquid-Lip-Glasting-Indonesia-3.5g-Merah-Jingga-Official-i.1346168602.27861603113?sp_atk=456335fb-c0ab-4d81-a6da-1e6f1d91772b&xptdk=456335fb-c0ab-4d81-a6da-1e6f1d91772b']
  ];

  const insertProduct = db.prepare(`INSERT OR IGNORE INTO products (name, shade, price, imageUrl, category, link) VALUES (?, ?, ?, ?, ?, ?)`);

  products.forEach(product => insertProduct.run(product));

  insertProduct.finalize(() => {
    console.log('✅ Semua produk berhasil dimasukkan ke database.');
  });
});

module.exports = db;
