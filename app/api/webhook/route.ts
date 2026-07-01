import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';
import { supabase } from '@/lib/supabase';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, email, phone } = body;

    // 1. KIỂM TRA HỢP LỆ (Validation)
    if (!name || !email || !phone) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc (Tên, Email, SĐT)' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: 'Địa chỉ Email không đúng định dạng!' }, { status: 400 });
    }

    const record = {
      ...body,
      verified: true,
      source: 'vietnam_landing_page',
      serverTime: new Date().toISOString()
    };

    // 2. KÍCH HOẠT SUPABASE AUTH ĐỂ GỬI EMAIL TỰ ĐỘNG
    // Cách này không cần API Key bên thứ 3, dùng hạ tầng của Supabase
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: email,
      password: Math.random().toString(36).slice(-12), // Tạo pass ngẫu nhiên vì chỉ cần lấy lead
      options: {
        data: {
          full_name: name,
          phone: phone,
        },
        // Redirect về trang chủ sau khi click link trong mail
        emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'}`
      }
    });

    if (authError) {
      console.warn('Supabase Auth Notice:', authError.message);
      // Nếu user đã tồn tại, chúng ta vẫn tiếp tục lưu vào bảng leads bên dưới
    }

    // 3. LƯU TRỮ VÀO BẢNG LEADS (Để admin quản lý)
    const { error: supabaseError } = await supabase
      .from('leads')
      .insert([{
        name: record.name,
        email: record.email,
        phone: record.phone,
        metadata: { ...record, auth_id: authData?.user?.id }
      }]);

    if (supabaseError) console.error('Supabase DB Error:', supabaseError);

    // 4. LƯU LOCAL DỰ PHÒNG (Cho môi trường dev)
    const dbPath = path.join(process.cwd(), 'database.json');
    try {
      const fileData = await fs.readFile(dbPath, 'utf8');
      const currentData = JSON.parse(fileData);
      currentData.push(record);
      await fs.writeFile(dbPath, JSON.stringify(currentData, null, 2));
    } catch (e) {}

    return NextResponse.json({ 
      success: true, 
      message: 'Đăng ký thành công! Vui lòng kiểm tra email để xác nhận.',
      saved_record: record
    });
  } catch (error: any) {
    console.error('Server Error:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ', details: error.message }, { status: 500 });
  }
}
