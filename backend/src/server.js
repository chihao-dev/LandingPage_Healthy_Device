import express from "express";
import cors from "cors";
import chatRoute from "./routes/chat.routes.js";
import productRoute from "./routes/product.routes.js";

const app = express();

app.use(cors()); // Cần thiết để frontend Next.js gọi được
app.use(express.json());

app.get("/", (req, res) => {
  res.send("AI Health Backend is running!");
});

app.use("/api", chatRoute);
app.use("/api", productRoute);

// QUAN TRỌNG: Thêm dòng này để Vercel có thể nhận diện app
export default app;

// Chỉ chạy app.listen khi không phải môi trường production (Vercel)
if (process.env.NODE_ENV !== "production") {
  const PORT = process.env.PORT || 3001;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}
