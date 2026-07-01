import { useState, useEffect, useCallback } from 'react';
import { Product, CartItem } from '@/lib/types';

export const useEcommerce = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [favorites, setFavorites] = useState<Product[]>([]);
  const [viewedProducts, setViewedProducts] = useState<Product[]>([]);

  const syncStorage = useCallback(() => {
    try {
      const savedCart = localStorage.getItem('chatbot_cart');
      const savedFavs = localStorage.getItem('chatbot_favs');
      const savedHistory = localStorage.getItem('chatbot_history');

      if (savedCart) setCart(JSON.parse(savedCart));
      if (savedFavs) setFavorites(JSON.parse(savedFavs));
      if (savedHistory) setViewedProducts(JSON.parse(savedHistory));
    } catch (e) {
      console.error('Failed to sync storage', e);
    }
  }, []);

  useEffect(() => {
    syncStorage();
    window.addEventListener('storage-update', syncStorage);
    return () => window.removeEventListener('storage-update', syncStorage);
  }, [syncStorage]);

  const addToCart = (product: Product) => {
    const currentCart = JSON.parse(localStorage.getItem('chatbot_cart') || '[]');
    const existing = currentCart.find((item: any) => item.name === product.name);
    let newCart;
    if (existing) {
      newCart = currentCart.map((item: any) =>
        item.name === product.name ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      newCart = [...currentCart, { ...product, quantity: 1 }];
    }
    setCart(newCart);
    localStorage.setItem('chatbot_cart', JSON.stringify(newCart));
    window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `🛒 Đã thêm 1 x ${product.name} vào giỏ !` } }));
    window.dispatchEvent(new Event('storage-update'));
  };

  const removeFromCart = (name: string) => {
    const currentCart = JSON.parse(localStorage.getItem('chatbot_cart') || '[]');
    const newCart = currentCart.filter((item: any) => item.name !== name);
    setCart(newCart);
    localStorage.setItem('chatbot_cart', JSON.stringify(newCart));
    window.dispatchEvent(new Event('storage-update'));
  };

  const toggleFavorite = (product: Product) => {
    const currentFavs = JSON.parse(localStorage.getItem('chatbot_favs') || '[]');
    const isFav = currentFavs.some((item: any) => item.name === product.name);
    let newFavs;
    if (isFav) {
      newFavs = currentFavs.filter((item: any) => item.name !== product.name);
    } else {
      newFavs = [...currentFavs, product];
      window.dispatchEvent(new CustomEvent('behavior-event', { detail: { message: `❤️ Đã thêm ${product.name} vào yêu thích!` } }));
    }
    setFavorites(newFavs);
    localStorage.setItem('chatbot_favs', JSON.stringify(newFavs));
    window.dispatchEvent(new Event('storage-update'));
  };

  const trackView = (product: Product) => {
    const currentHistory = JSON.parse(localStorage.getItem('chatbot_history') || '[]');
    const isAlreadyViewed = currentHistory.some((p: any) => p.name === product.name);

    if (!isAlreadyViewed) {
      const newHistory = [product, ...currentHistory].slice(0, 10);
      setViewedProducts(newHistory);
      localStorage.setItem('chatbot_history', JSON.stringify(newHistory));
      window.dispatchEvent(new Event('storage-update'));
    }
  };

  return {
    cart,
    favorites,
    viewedProducts,
    addToCart,
    removeFromCart,
    toggleFavorite,
    trackView
  };
};
