import mongoose from "mongoose"; // Import the mongoose module for MongoDB connection.

const connectDB = async () => {
    try {
        // Attempt to connect to MongoDB using the connection string from environment variables.
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            // Additional options can be added here if necessary.
        });
        // If the connection is successful, log the host to which MongoDB is connected.
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        // If an error occurs, log the error message to the console.
        console.log(`Error: ${error.message}`);
        // Exit the process with a failure code.
        process.exit(1);
    }
};

// Export the connectDB function as the default export.
export default connectDB;
