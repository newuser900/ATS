const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors({ origin: true }));

mongoose.connect(
	process.env.MONGODB_CONNECTION_STRING || "mongodb://localhost:27017/ATS",
	{
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useCreateIndex: true,
	},
	(err) => {
		if (err) throw err;
		console.log("MongoDB connection established");
	}
);

const PORT = process.env.PORT || 10000;

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));
}

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));

app.use("/users", require("./routes/userRouter"));
