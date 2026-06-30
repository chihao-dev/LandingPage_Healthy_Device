import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Validate incoming data
    if (!body.name || !body.email || !body.phone) {
      return NextResponse.json({ error: 'Thiếu thông tin bắt buộc (Tên, Email, SĐT)' }, { status: 400 });
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(body.email)) {
      return NextResponse.json({ error: 'Định dạng email vô lý' }, { status: 400 });
    }

    const record = {
      ...body,
      verified: true,
      source: 'vietnam_landing_page',
      serverTime: new Date().toISOString()
    };

    // LƯU TRỮ BACKEND VÀO FILE JSON CỤC BỘ (Mô phỏng DB)
    const dbPath = path.join(process.cwd(), 'database.json');
    let currentData = [];
    try {
      const fileData = await fs.readFile(dbPath, 'utf8');
      currentData = JSON.parse(fileData);
    } catch (e: any) {
      // File doesnt exist yet, its fine.
    }
    
    currentData.push(record);
    await fs.writeFile(dbPath, JSON.stringify(currentData, null, 2));

    // Forward to actual webhook destination securely from the server
    const response = await fetch('https://httpbin.org/post', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(record),
    });

    if (!response.ok) {
      throw new Error(`Webhook validation failed: ${response.statusText}`);
    }

    const data = await response.json();

    return NextResponse.json({ 
      success: true, 
      message: 'Xác thực và lưu trữ dữ liệu thành công',
      saved_record: record,
      webhook_response: data.json 
    });
  } catch (error: any) {
    console.error('Webhook API Error:', error);
    return NextResponse.json({ error: 'Lỗi máy chủ khi gửi dữ liệu', details: error.message }, { status: 500 });
  }
}
