import { supabase } from "@/lib/supabase";

export const ProductService = {
  async getHot() {
    return supabase
      .from("products")
      .select("*, product_details(price)")
      .limit(10);
  },

  async getCheap(maxPrice: number) {
    return supabase
      .from("product_details")
      .select("*, products(*)")
      .lt("price", maxPrice);
  },

  async getByCategory(category: string) {
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
