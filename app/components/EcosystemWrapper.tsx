import { supabase } from '@/lib/supabase';
import Ecosystem from './Ecosystem';
import { Product } from '@/lib/types';

export default async function EcosystemWrapper() {
  // Fetch dữ liệu trực tiếp từ Supabase trên Server
  // Giúp tối ưu SEO và Performance (First Contentful Paint)
  let products: Product[] = [];

  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .limit(10);

    if (!error && data) {
      products = data as Product[];
    }
  } catch (err) {
    console.error('Error fetching products on server:', err);
  }

  return <Ecosystem initialProducts={products} />;
}
