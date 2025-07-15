const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg',
    filename: 'banarasi-saree.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg',
    filename: 'brass-diya.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg',
    filename: 'kanjivaram-saree.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg',
    filename: 'cotton-kurti.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg',
    filename: 'silver-anklet.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg',
    filename: 'terracotta-art.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg',
    filename: 'spice-set.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg',
    filename: 'leather-jutti.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/3825573/pexels-photo-3825573.jpeg',
    filename: 'temple-bell.jpg'
  },
  {
    url: 'https://images.pexels.com/photos/291762/pexels-photo-291762.jpeg',
    filename: 'silk-stole.jpg'
  }
];

const downloadImage = (url, filename) => {
  return new Promise((resolve, reject) => {
    const filepath = path.join(__dirname, '../public/images', filename);
    const file = fs.createWriteStream(filepath);

    https.get(url, (response) => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        console.log(`Downloaded: ${filename}`);
        resolve();
      });
    }).on('error', (err) => {
      fs.unlink(filepath, () => {});
      reject(err);
    });
  });
};

const downloadAllImages = async () => {
  for (const image of images) {
    try {
      await downloadImage(image.url, image.filename);
    } catch (error) {
      console.error(`Error downloading ${image.filename}:`, error);
    }
  }
};

downloadAllImages(); 