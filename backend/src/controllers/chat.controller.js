import { chatFlow } from "../flows/chatFlow.js";
import { ProductService } from "../services/product.service.js";

export const chatController = async (req, res) => {
  const { node } = req.body;

  const current = chatFlow[node || "start"];

  let products = [];

  // 🔥 xử lý lấy data từ Supabase
  if (current.action === "hot") {
    const { data } = await ProductService.getHot();
    // Format lại dữ liệu để phẳng (flatten) cho frontend dễ dùng
    products = (data || []).map(p => ({
      ...p,
      price: p.product_details?.[0]?.price || 0
    }));
  }

  if (current.action === "cheap_1000000") {
    const { data } = await ProductService.getCheap(1000000);
    products = (data || []).map(d => ({
      ...d.products,
      price: d.price
    }));
  }

  if (current.action === "cheap_5000000") {
    const { data } = await ProductService.getCheap(5000000);
    products = (data || []).map(d => ({
      ...d.products,
      price: d.price
    }));
  }

  if (current.action === "category_medical") {
    const { data } = await ProductService.getByCategory("medical");
    products = (data || []).map(p => ({
      ...p,
      price: p.product_details?.[0]?.price || 0
    }));
  }

  if (current.action === "category_air") {
    const { data } = await ProductService.getByCategory("air");
    products = (data || []).map(p => ({
      ...p,
      price: p.product_details?.[0]?.price || 0
    }));
  }

  res.json({
    text: current.text,
    options: current.options,
    products
  });
};
