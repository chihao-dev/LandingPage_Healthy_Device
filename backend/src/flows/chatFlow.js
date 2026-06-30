export const chatFlow = {
  start: {
    text: "Chào mừng bạn đến với Hệ thống hỗ trợ AI Health. Tôi có thể giúp gì cho bạn hôm nay?",
    options: [
      { label: "Sản phẩm nổi bật", next: "hot" },
      { label: "Tìm kiếm theo giá", next: "price_range" },
      { label: "Danh mục sản phẩm", next: "categories" }
    ]
  },

  hot: {
    text: "Dưới đây là danh sách các sản phẩm đang được quan tâm nhất hiện nay:",
    action: "hot",
    options: [
      { label: "Thiết bị y tế", next: "medical" },
      { label: "Máy lọc không khí", next: "air" },
      { label: "Quay lại", next: "start" }
    ]
  },

  price_range: {
    text: "Vui lòng chọn phân khúc giá mà bạn đang quan tâm:",
    options: [
      { label: "Dưới 1.000.000 VNĐ", next: "cheap_1m" },
      { label: "Dưới 5.000.000 VNĐ", next: "cheap_5m" },
      { label: "Quay lại", next: "start" }
    ]
  },

  categories: {
    text: "Bạn đang quan tâm đến dòng sản phẩm nào?",
    options: [
      { label: "Thiết thiết bị y tế chuyên dụng", next: "medical" },
      { label: "Giải pháp lọc không khí", next: "air" },
      { label: "Quay lại", next: "start" }
    ]
  },

  cheap_1m: {
    text: "Đây là các lựa chọn phù hợp với ngân sách dưới 1.000.000 VNĐ của bạn:",
    action: "cheap_1000000",
    options: [
      { label: "Xem sản phẩm nổi bật", next: "hot" },
      { label: "Về menu chính", next: "start" }
    ]
  },

  cheap_5m: {
    text: "Đây là các lựa chọn phù hợp với ngân sách dưới 5.000.000 VNĐ của bạn:",
    action: "cheap_5000000",
    options: [
      { label: "Xem sản phẩm nổi bật", next: "hot" },
      { label: "Về menu chính", next: "start" }
    ]
  },

  medical: {
    text: "Hệ thống đã lọc ra các thiết bị y tế chất lượng cao dành cho bạn:",
    action: "category_medical",
    options: [
      { label: "Tìm theo giá", next: "price_range" },
      { label: "Về menu chính", next: "start" }
    ]
  },

  air: {
    text: "Danh sách các giải pháp lọc không khí tiên tiến giúp bảo vệ sức khỏe gia đình:",
    action: "category_air",
    options: [
      { label: "Xem sản phẩm nổi bật", next: "hot" },
      { label: "Về menu chính", next: "start" }
    ]
  }
};
