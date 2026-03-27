const Jimp = require('jimp');
const path = require('path');

const src = path.join(__dirname, 'logo.png');
const dest = path.join(__dirname, 'public/images/logo.png');

Jimp.read(src)
  .then(image => {
    image.scan(0, 0, image.bitmap.width, image.bitmap.height, function(x, y, idx) {
      const r = this.bitmap.data[idx + 0];
      const g = this.bitmap.data[idx + 1];
      const b = this.bitmap.data[idx + 2];
      
      // Calculate 'whiteness' level
      const avg = (r + g + b) / 3;
      
      // If it's very white, make it totally transparent
      if (avg > 230) {
        this.bitmap.data[idx + 3] = 0;
      } 
      // If it's semi-white (halo area), make it more transparent
      else if (avg > 180) {
        // Linear transparency for the halo
        // 230 -> 0 alpha, 180 -> 255 alpha (rough)
        const alpha = Math.max(0, Math.min(255, (230 - avg) * (255 / (230 - 180))));
        this.bitmap.data[idx + 3] = alpha;
      }
    });

    image.autocrop();
    
    return image.writeAsync(dest);
  })
  .then(() => console.log('Logo cleaned successfully without white halo.'))
  .catch(err => console.error(err));
