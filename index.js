const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");
const path = require("path");

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

app.use("/users", require("./routes/userRouter"));

const PORT = process.env.PORT || 10000;

if (process.env.NODE_ENV === "production") {
	app.use(express.static("client/build"));

	app.get("*", (req, res) => {
		res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
	});
}

app.listen(PORT, () => console.log(`The server has started on port: ${PORT}`));
