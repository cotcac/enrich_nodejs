const mongoose = require('mongoose');

const start = async () => {
    try {
      await mongoose.connect(
        "mongodb://localhost:27017/notesdb"
      );
      console.log("connected to mongodb!");
      const kittySchema = new mongoose.Schema({
        name: String
      });

      const Kitten = mongoose.model('Kitten', kittySchema);

      const silence = new Kitten({ name: 'Silence' });
      console.log(silence.name);
    
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  start();