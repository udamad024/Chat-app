import mongoose from "mongoose";

const connectToMongoDB = async () => {
	try {
		// Use the connection string from Azure Cosmos DB for MongoDB API
		await mongoose.connect(process.env.MONGO_DB_URI, {
			useNewUrlParser: true,
			useUnifiedTopology: true,
		});
		console.log("Connected to Azure Cosmos DB for MongoDB API");
	} catch (error) {
		// Log any errors that occur during connection attempt
		console.log("Error connecting to Azure Cosmos DB for MongoDB API", error.message);
	}
};

// Export the connectToMongoDB function as the default export
export default connectToMongoDB;