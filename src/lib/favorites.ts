"use client";

import { useState, useEffect, useCallback } from "react";

// 收藏类型
export type FavoriteType = "prompt" | "tutorial";

export interface FavoriteItem {
  id: string;
  type: FavoriteType;
  title: string;
  addedAt: string;
}

// localStorage key
const FAVORITES_KEY = "studyai_favorites";

// 获取收藏列表
export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return [];
  try {
    const stored = localStorage.getItem(FAVORITES_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

// 添加收藏
export function addFavorite(item: Omit<FavoriteItem, "addedAt">): void {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavorites();
    const exists = favorites.some(
      (f) => f.id === item.id && f.type === item.type
    );
    if (!exists) {
      favorites.push({ ...item, addedAt: new Date().toISOString() });
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  } catch (error) {
    console.error("添加收藏失败:", error);
  }
}

// 移除收藏
export function removeFavorite(id: string, type: FavoriteType): void {
  if (typeof window === "undefined") return;
  try {
    const favorites = getFavorites().filter(
      (f) => !(f.id === id && f.type === type)
    );
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  } catch (error) {
    console.error("移除收藏失败:", error);
  }
}

// 检查是否已收藏
export function isFavorite(id: string, type: FavoriteType): boolean {
  if (typeof window === "undefined") return false;
  try {
    return getFavorites().some((f) => f.id === id && f.type === type);
  } catch {
    return false;
  }
}

// 获取特定类型的收藏
export function getFavoritesByType(type: FavoriteType): FavoriteItem[] {
  return getFavorites().filter((f) => f.type === type);
}

// React Hook
export function useFavorites() {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setFavorites(getFavorites());
    setIsLoaded(true);
  }, []);

  const add = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      addFavorite(item);
      setFavorites(getFavorites());
    },
    []
  );

  const remove = useCallback((id: string, type: FavoriteType) => {
    removeFavorite(id, type);
    setFavorites(getFavorites());
  }, []);

  const toggle = useCallback(
    (item: Omit<FavoriteItem, "addedAt">) => {
      if (isFavorite(item.id, item.type)) {
        remove(item.id, item.type);
      } else {
        add(item);
      }
      setFavorites(getFavorites());
    },
    [add, remove]
  );

  const isFav = useCallback(
    (id: string, type: FavoriteType) => {
      return favorites.some((f) => f.id === id && f.type === type);
    },
    [favorites]
  );

  return {
    favorites,
    isLoaded,
    add,
    remove,
    toggle,
    isFav,
    promptFavorites: favorites.filter((f) => f.type === "prompt"),
    tutorialFavorites: favorites.filter((f) => f.type === "tutorial"),
  };
}
