import React, { useState } from "react";
import { Star, ShoppingCart, Check, Truck, Shield, Package } from "lucide-react";
import { useCartStore } from "../../../../hooks/useCartStore";

const ProductInfo = ({ product }) => {
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);
  const addItem = useCartStore((state) => state.addItem);

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.images[0],
      });
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const handleQuantityChange = (value) => {
    const newQuantity = Math.max(1, Math.min(product.stock, value));
    setQuantity(newQuantity);
  };

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
          {product.category}
        </span>
        <h1 className="text-3xl font-bold md:text-4xl">{product.name}</h1>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-5 w-5 ${
                  i < product.rating
                    ? "fill-yellow-400 text-yellow-400"
                    : "text-gray-300 dark:text-gray-600"
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600 dark:text-gray-400">
            {product.reviews?.length || 0} reviews
          </span>
        </div>
      </div>

      <div className="space-y-1">
        <div className="text-4xl font-bold">${product.price}</div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {product.inStock ? (
            <span className="text-green-600 dark:text-green-400">
              In Stock ({product.stock} available)
            </span>
          ) : (
            <span className="text-red-600 dark:text-red-400">Out of Stock</span>
          )}
        </p>
      </div>

      <div className="space-y-3 border-y border-gray-200 py-6 dark:border-gray-700">
        <p className="text-gray-700 dark:text-gray-300">{product.description}</p>

        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <span className="font-semibold">Brand:</span> {product.brand}
          </div>
          <div>
            <span className="font-semibold">Flavor:</span> {product.flavor}
          </div>
          <div>
            <span className="font-semibold">Weight:</span> {product.weight}
          </div>
          <div>
            <span className="font-semibold">Servings:</span> {product.servings}
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div className="flex items-center gap-4">
          <label className="font-semibold">Quantity:</label>
          <div className="flex items-center rounded-lg border border-gray-300 dark:border-gray-600">
            <button
              onClick={() => handleQuantityChange(quantity - 1)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={quantity <= 1}
            >
              -
            </button>
            <input
              type="number"
              value={quantity}
              onChange={(e) => handleQuantityChange(parseInt(e.target.value) || 1)}
              className="w-16 border-x border-gray-300 bg-transparent py-2 text-center dark:border-gray-600"
              min="1"
              max={product.stock}
            />
            <button
              onClick={() => handleQuantityChange(quantity + 1)}
              className="px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-700"
              disabled={quantity >= product.stock}
            >
              +
            </button>
          </div>
        </div>

        <button
          onClick={handleAddToCart}
          disabled={!product.inStock || addedToCart}
          className="flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 px-6 py-4 text-lg font-semibold text-white transition-colors hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-50"
        >
          {addedToCart ? (
            <>
              <Check className="h-5 w-5" />
              Added to Cart
            </>
          ) : (
            <>
              <ShoppingCart className="h-5 w-5" />
              Add to Cart
            </>
          )}
        </button>
      </div>

      <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <Truck className="h-6 w-6 text-blue-600" />
          <div>
            <p className="text-sm font-semibold">Free Shipping</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">On orders over $50</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <Shield className="h-6 w-6 text-green-600" />
          <div>
            <p className="text-sm font-semibold">Secure Payment</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">100% protected</p>
          </div>
        </div>
        <div className="flex items-center gap-3 rounded-lg border border-gray-200 p-4 dark:border-gray-700">
          <Package className="h-6 w-6 text-orange-600" />
          <div>
            <p className="text-sm font-semibold">Easy Returns</p>
            <p className="text-xs text-gray-600 dark:text-gray-400">30-day guarantee</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductInfo;
