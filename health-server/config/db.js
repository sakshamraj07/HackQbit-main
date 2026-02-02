// config/db.js (or wherever you connect)
import mongoose from 'mongoose'; // or require('mongoose')

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, { // <--- **This must match the name in .env**
            useNewUrlParser: true,
            useUnifiedTopology: true,
            // ... other options
        });
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`MongoDB connection error: ${error}`);
        process.exit(1);
    }
};

export default connectDB;