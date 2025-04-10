import { useState, useEffect } from 'react';
import { Star } from 'lucide-react';

export function FavoriteButton({ id, name }) {
  const [isFavorite, setIsFavorite] = useState(false);

  useEffect(() => {
    const favorites = JSON.parse(localStorage.getItem('favoriteProducts')) || [];
    setIsFavorite(favorites.some(item => item.id === id));
  }, [id]);

  const toggleFavorite = (e) => {
    e.stopPropagation();
    const favorites = JSON.parse(localStorage.getItem('favoriteProducts')) || [];

    if (isFavorite) {
      const newFavorites = favorites.filter(item => item.id !== id);
      localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
    } else {
      const newFavorites = [...favorites, { id, name }];
      localStorage.setItem('favoriteProducts', JSON.stringify(newFavorites));
    }

    setIsFavorite(!isFavorite);
  };

  return (
    <button
      onClick={toggleFavorite}
      className="inline-flex items-center justify-center p-1 rounded-full hover:bg-gray-100"
      title={isFavorite ? "Quitar de favoritos" : "Añadir a favoritos"}
    >
      <Star 
        className={`h-5 w-5 ${
          isFavorite 
            ? "fill-yellow-400 text-yellow-400" 
            : "text-gray-400"
        }`}
      />
    </button>
  );
}