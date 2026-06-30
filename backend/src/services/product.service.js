import { supabase } from "../config/supabase.js";

export const ProductService = {
  async getHot() {
    // JOIN products với product_details để lấy price
    return supabase
      .from("products")
      .select("*, product_details(price)")
      .limit(10);
  },

  async getCheap(maxPrice) {
    // Lấy từ product_details và join ngược lại products
    return supabase
      .from("product_details")
      .select("*, products(*)")
      .lt("price", maxPrice);
  },

  async getByCategory(category) {
    let query = supabase
      .from("products")
      .select("*, product_details(price)");

    if (category === "medical") {
      query = query.ilike("name", "%Medical%");
    } else if (category === "air") {
      query = query.ilike("name", "%Purifier%");
    }

    return query.limit(10);
  }
};
