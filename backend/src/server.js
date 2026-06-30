import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.routes.js";
import productRoute from "./routes/product.routes.js";

const app = express();

app.use(cors()); // Cần thiết để frontend Next.js gọi được
app.use(express.json());

app.use("/api", chatRoute);
app.use("/api", productRoute);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
