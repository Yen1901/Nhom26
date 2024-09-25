const express = require("express");
const cors = require("cors");
const app = express();
const mongoose = require("mongoose");
var bodyParser = require("body-parser");
const morgan = require("morgan");
const dotenv = require("dotenv");
const authorRoute = require("./routes/authors");
const bookRoute = require("./routes/books");
const categoryRoute = require("./routes/categories");
const userRoute = require("./routes/users");
const reviewRoute = require("./routes/reviews");
const paymentRoute = require("./routes/payments");
const orderRoute = require("./routes/orders");
const orderItemRoute = require("./routes/orderItems");

app.use(bodyParser.json({limit:"50mb"}));
app.use(cors());
app.use(morgan("common"));

dotenv.config();
//connect database
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB");
    } catch (error) {
        console.error("Error connecting to MongoDB", error);
        process.exit(1); // Dừng server nếu không thể kết nối
    }
};
connectDB();

//routes
app.use("/api/author", authorRoute);
app.use("/api/book", bookRoute);
app.use("/api/category", categoryRoute);
app.use("/api/user", userRoute);
app.use("/api/review", reviewRoute);
app.use("/api/payment", paymentRoute);
app.use("/api/order", orderRoute);
app.use("/api/orderItem", orderItemRoute);

app.listen(8000, () =>{
    console.log("Server is running ...");
})