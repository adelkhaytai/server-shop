// packages
import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import bodyParser from "body-parser";
// Utiles
import connectDB from "./config/db.js";

import userRoutes from "./routes/userRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";
import productRoutes from "./routes/productRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";
import orderRoutesNew from "./routes/orderRoutesNew.js"

//seller
import SELLERcategoryRoutes from "./sellerRoutes/SELLERcategoryRoutes.js";
import SELLERproductRoutes from "./sellerRoutes/SELLERproductRoutes.js";
import SELLERuploadRoutes from "./sellerRoutes/SELLERuploadRoutes.js";
import SELLERorderRoutes from "./sellerRoutes/SELLERorderRoutes.js";
import SELLERuserRoutes from "./sellerRoutes/SELLERuserRoutes.js";

dotenv.config();
const port = process.env.PORT || 5000;
// const options = {
//   origin: "https://client-shop-nsm0.onrender.com",
//   credentials: true,
// };
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(bodyParser.json({limit: "50mb"}));//middelwares
app.use(bodyParser.urlencoded({limit: "50mb", extended: true, parameterLimit:5000}));
//user and admin
app.use("/api/users", userRoutes);
app.use("/api/category", categoryRoutes);
app.use("/api/products", productRoutes);
app.use("/api/upload", uploadRoutes);
app.use("/api/orders", orderRoutesNew);

//seller
app.use("/api/seller/users", SELLERuserRoutes);
app.use("/api/seller/category", SELLERcategoryRoutes);
app.use("/api/seller/products", SELLERproductRoutes);
app.use("/api/seller/upload", SELLERuploadRoutes);
app.use("/api/seller/orders", SELLERorderRoutes);

// app.use("/",(req,res)=>{
//   res.send("server is running sucessfully !")
// })

app.get("/api/config/paypal", (req, res) => {
  res.send({ clientId: process.env.PAYPAL_CLIENT_ID });
});

const __dirname = path.resolve();
app.use("/uploads", express.static(path.join(__dirname + "/uploads")));

app.listen(port, () => console.log(`Server running on port: ${port}`));
