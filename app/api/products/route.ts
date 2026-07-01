import { NextResponse } from 'next/server';
import { ProductService } from '@/lib/productService';

export async function GET() {
  try {
    const result = await ProductService.getHot();

    if (result.error) {
      return NextResponse.json({ error: result.error.message }, { status: 400 });
    }

    const products = (result.data || []).map((p: any) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      image_url: p.image_url,
      price: p.product_details?.[0]?.price || 0,
      category: "Sản phẩm"
    }));

    return NextResponse.json(products);
  } catch (error: any) {
    console.error("API error:", error);
    return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
  }
}
