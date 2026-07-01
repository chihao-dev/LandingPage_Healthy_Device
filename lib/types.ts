export type Product = {
  id?: string;
  name: string;
  price: number;
  image_url?: string;
  description?: string;
  category?: string;
};

export type CartItem = Product & {
  quantity: number;
};

export type ChatOption = {
  label: string;
  next: string;
};

export type ChatMessage = {
  id: string;
  type: 'bot' | 'user';
  text: string;
  options?: ChatOption[];
  products?: Product[];
};

export type ChatTabType = 'chat' | 'cart' | 'favorites' | 'history';
