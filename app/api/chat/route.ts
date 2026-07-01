import { NextResponse } from 'next/server';
import { chatFlow } from '@/lib/chatFlow';
import { ProductService } from '@/lib/productService';

export async function POST(request: Request) {
  try {
    const { node } = await request.json();
    const current = chatFlow[node || "start"];

    if (!current) {
      return NextResponse.json({ text: "Xin lỗi, tôi không tìm thấy thông tin này." }, { status: 404 });
    }

    let products: any[] = [];

    // 🔥 xử lý lấy data từ Supabase
    if (current.action === "hot") {
      const { data } = await ProductService.getHot();
      products = (data || []).map((p: any) => ({
        ...p,
        price: p.product_details?.[0]?.price || 0
      }));
    }

    if (current.action === "cheap_1000000") {
      const { data } = await ProductService.getCheap(1000000);
      products = (data || []).map((d: any) => ({
        ...d.products,
        price: d.price
      }));
    }

    if (current.action === "cheap_5000000") {
      const { data } = await ProductService.getCheap(5000000);
      products = (data || []).map((d: any) => ({
        ...d.products,
        price: d.price
      }));
    }

    if (current.action === "category_medical") {
      const { data } = await ProductService.getByCategory("medical");
      products = (data || []).map((p: any) => ({
        ...p,
        price: p.product_details?.[0]?.price || 0
      }));
    }

    if (current.action === "category_air") {
      const { data } = await ProductService.getByCategory("air");
      products = (data || []).map((p: any) => ({
        ...p,
        price: p.product_details?.[0]?.price || 0
      }));
    }

    return NextResponse.json({
      text: current.text,
      options: current.options,
      products
    });
  } catch (error: any) {
    console.error("Chat API error:", error);
    return NextResponse.json({ error: "Internal Server Error", message: error.message }, { status: 500 });
  }
}
