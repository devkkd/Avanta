const mongoose = require('mongoose');

const MONGODB_URI = process.env.MONGODB_URI || 'mongodb://localhost:27017/avanta';

const ProductSchema = new mongoose.Schema({
  title: String,
  description: String,
  price: Number,
  images: [String],
  sizes: [String],
  colors: Array,
});

const Product = mongoose.model('Product', ProductSchema);

async function seed() {
  try {
    await mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true });
    await Product.deleteMany({});
    await Product.create([
      {
        title: 'Seed Tunic',
        description: 'Sample seeded product',
        price: 999,
        images: ['https://res.cloudinary.com/demo/image/upload/sample.jpg'],
        sizes: ['S','M','L'],
        colors: [{ name: 'Lime', code: 'bg-green-500' }]
      },
    ]);
    console.log('Seeded successfully');
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
