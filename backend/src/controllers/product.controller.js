import { ProductService } from "../services/product.service.js";

export const getProducts = async (req, res) => {
  try {
    const result = await ProductService.getHot();

    if (result.error) {
      return res.status(400).json({ error: result.error.message });
    }

    // Format lại dữ liệu từ 2 bảng thành 1 object phẳng cho Ecosystem.tsx
    const products = (result.data || []).map(p => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image_url: p.image_url,
      price: p.product_details?.[0]?.price || 0,
      category: "Sản phẩm" // Mặc định vì schema products không có category
    }));

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
