const https = require('https');
const fs = require('fs');
const path = require('path');

const images = [
  {
    url: 'https://source.unsplash.com/800x600/?indian,saree',
    filename: 'banarasi-saree.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,diya',
    filename: 'brass-diya.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,saree,silk',
    filename: 'kanjivaram-saree.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,kurti',
    filename: 'cotton-kurti.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,jewelry',
    filename: 'silver-anklet.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,terracotta',
    filename: 'terracotta-art.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,spices',
    filename: 'spice-set.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,shoes',
    filename: 'leather-jutti.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,temple',
    filename: 'temple-bell.jpg'
  },
  {
    url: 'https://source.unsplash.com/800x600/?indian,scarf',
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