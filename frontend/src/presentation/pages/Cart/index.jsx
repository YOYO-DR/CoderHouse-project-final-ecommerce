import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Trash2,
  Plus,
  Minus,
  ShoppingBag,
  ArrowLeft,
  AlertCircle,
  X,
  Loader2,
} from "lucide-react";
import { useCartStore } from "../../hooks/useCartStore";
import { cn } from "../../../utils/tailwind";
import { routePaths } from "../../../routers";

// Constants
const TAX_RATE = 0.08;
const FREE_SHIPPING_THRESHOLD = 100;
const SHIPPING_OPTIONS = [
  {
    id: "standard",
    name: "Standard Shipping",
    price: 5.99,
    estimatedDays: "3-5",
  },
  {
    id: "express",
    name: "Express Shipping",
    price: 14.99,
    estimatedDays: "1-2",
  },
];

const VALID_COUPONS = [
  { code: "SAVE10", discount: 10, type: "percentage" },
  { code: "SAVE20", discount: 20, type: "percentage" },
  { code: "FLAT15", discount: 15, type: "fixed" },
];

// Related products based on cart items
const relatedProducts = [
  {
    id: "4",
    name: "Shaker Bottle",
    price: 9.99,
    image:
      "https://images.unsplash.com/photo-1594498506442-a2e8a4daa696?auto=format&fit=crop&q=80&w=500",
    description: "Premium shaker bottle for your protein shakes",
  },
  {
    id: "5",
    name: "Creatine Monohydrate",
    price: 29.99,
    image:
      "https://images.unsplash.com/photo-1594498506154-655bd107c8d5?auto=format&fit=crop&q=80&w=500",
    description: "Pure creatine monohydrate for muscle strength",
  },
  {
    id: "6",
    name: "Multivitamin Complex",
    price: 19.99,
    image:
      "https://images.unsplash.com/photo-1594498506274-2e9843b15d5b?auto=format&fit=crop&q=80&w=500",
    description: "Complete daily vitamin and mineral support",
  },
];

function QuantityAdjuster({ quantity, onIncrease, onDecrease }) {
  return (
    <div className="flex items-center gap-2">
      <button
        onClick={onDecrease}
        disabled={quantity <= 1}
        className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 disabled:cursor-not-allowed disabled:opacity-50 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <Minus className="h-4 w-4" />
      </button>
      <span className="w-8 text-center">{quantity}</span>
      <button
        onClick={onIncrease}
        className="rounded-full bg-gray-100 p-1 text-gray-600 transition-colors hover:bg-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-gray-700"
      >
        <Plus className="h-4 w-4" />
      </button>
    </div>
  );
}

function CartItem({ item, onUpdateQuantity, onRemove }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleRemove = () => {
    setIsRemoving(true);
    // Simulate API call
    setTimeout(() => {
      onRemove(item.id);
      setIsRemoving(false);
    }, 500);
  };

  return (
    <div className="flex gap-4 border-b py-4 dark:border-gray-700">
      <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={item.image}
          alt={item.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <div className="flex justify-between">
          <h3 className="text-lg font-medium">{item.name}</h3>
          <p className="font-medium">
            ${(item.price * item.quantity).toFixed(2)}
          </p>
        </div>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          ${item.price.toFixed(2)} each
        </p>
        <div className="mt-2 flex items-center justify-between">
          <QuantityAdjuster
            quantity={item.quantity}
            onIncrease={() => onUpdateQuantity(item.id, item.quantity + 1)}
            onDecrease={() => onUpdateQuantity(item.id, item.quantity - 1)}
          />
          <button
            onClick={handleRemove}
            disabled={isRemoving}
            className="flex items-center gap-1 text-sm text-red-600 hover:text-red-700 dark:text-red-400 dark:hover:text-red-300"
          >
            {isRemoving ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <Trash2 className="h-4 w-4" />
            )}
            Remove
          </button>
        </div>
      </div>
    </div>
  );
}

function RelatedProduct({ product, onAddToCart }) {
  return (
    <div className="flex gap-4 rounded-lg border p-4 dark:border-gray-700">
      <div className="h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover"
        />
      </div>
      <div className="flex flex-1 flex-col">
        <h4 className="font-medium">{product.name}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400">
          {product.description}
        </p>
        <div className="mt-2 flex items-center justify-between">
          <p className="font-medium">${product.price.toFixed(2)}</p>
          <button
            onClick={onAddToCart}
            className="rounded-lg bg-blue-600 px-3 py-1 text-sm text-white hover:bg-blue-700"
          >
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}

const Cart = () => {
  const { items, updateQuantity, removeItem, addItem, clearCart } =
    useCartStore();
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [couponCode, setCouponCode] = useState("");
  const [appliedCoupon, setAppliedCoupon] = useState(null);
  const [couponError, setCouponError] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate totals
  const subtotal = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping =
    subtotal >= FREE_SHIPPING_THRESHOLD
      ? 0
      : SHIPPING_OPTIONS.find((option) => option.id === selectedShipping)
          ?.price || 0;

  // Calculate discount
  const discount = appliedCoupon
    ? appliedCoupon.type === "percentage"
      ? (subtotal * appliedCoupon.discount) / 100
      : appliedCoupon.discount
    : 0;

  const taxableAmount = subtotal - discount;
  const tax = taxableAmount * TAX_RATE;
  const total = taxableAmount + tax + shipping;

  const handleApplyCoupon = () => {
    const coupon = VALID_COUPONS.find(
      (c) => c.code.toLowerCase() === couponCode.toLowerCase()
    );

    if (coupon) {
      setAppliedCoupon(coupon);
      setCouponError("");
    } else {
      setCouponError("Invalid coupon code");
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon(null);
    setCouponCode("");
    setCouponError("");
  };

  const handleCheckout = async () => {
    setIsProcessing(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsProcessing(false);
    // Navigate to checkout (implement actual checkout logic)
  };

  if (items.length === 0) {
    return (
      <div className="container min-h-[50vh] py-8">
        <div className="flex flex-col items-center justify-center space-y-4 text-center">
          <ShoppingBag className="h-16 w-16 text-gray-400" />
          <h2 className="text-2xl font-bold">Your cart is empty</h2>
          <p className="text-gray-600 dark:text-gray-400">
            Looks like you haven't added any items to your cart yet.
          </p>
          <Link
            to={routePaths.shop.path}
            className="mt-4 inline-flex items-center gap-2 rounded-lg bg-blue-600 px-6 py-2 font-medium text-white hover:bg-blue-700"
          >
            <ArrowLeft className="h-4 w-4" />
            Continue Shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="container py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shopping Cart</h1>
        <p className="text-gray-600 dark:text-gray-400">
          {items.length} {items.length === 1 ? "item" : "items"} in your cart
        </p>
      </div>

      <div className="lg:grid lg:grid-cols-[1fr_400px] lg:gap-8">
        {/* Cart Items */}
        <div>
          <div className="space-y-4">
            {items.map((item) => (
              <CartItem
                key={item.id}
                item={item}
                onUpdateQuantity={updateQuantity}
                onRemove={removeItem}
              />
            ))}
          </div>

          {/* Related Products */}
          <div className="mt-8">
            <h3 className="mb-4 text-xl font-bold">You might also like</h3>
            <div className="space-y-4">
              {relatedProducts.map((product) => (
                <RelatedProduct
                  key={product.id}
                  product={product}
                  onAddToCart={() => {
                    addItem({
                      id: product.id,
                      name: product.name,
                      price: product.price,
                      quantity: 1,
                      image: product.image,
                    });
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Order Summary */}
        <div className="mt-8 lg:mt-0">
          <div className="rounded-lg border bg-white p-6 shadow-sm dark:border-gray-700 dark:bg-gray-800">
            <h3 className="text-xl font-bold">Order Summary</h3>

            {/* Coupon Code */}
            <div className="mt-4">
              <label className="mb-2 block text-sm font-medium">
                Have a coupon code?
              </label>
              {appliedCoupon ? (
                <div className="flex items-center justify-between rounded-lg border bg-blue-50 p-2 dark:border-gray-600 dark:bg-blue-900/20">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                      {appliedCoupon.code}
                    </span>
                    <span className="rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/40 dark:text-blue-400">
                      {appliedCoupon.type === "percentage"
                        ? `${appliedCoupon.discount}% off`
                        : `$${appliedCoupon.discount} off`}
                    </span>
                  </div>
                  <button
                    onClick={handleRemoveCoupon}
                    className="text-blue-700 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              ) : (
                <div className="flex gap-2">
                  <input
                    type="text"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError("");
                    }}
                    placeholder="Enter code"
                    className="flex-1 rounded-lg border px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  />
                  <button
                    onClick={handleApplyCoupon}
                    className="rounded-lg bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600"
                  >
                    Apply
                  </button>
                </div>
              )}
              {couponError && (
                <p className="mt-2 flex items-center gap-1 text-sm text-red-600 dark:text-red-400">
                  <AlertCircle className="h-4 w-4" />
                  {couponError}
                </p>
              )}
            </div>

            {/* Shipping Options */}
            <div className="mt-6">
              <label className="mb-2 block text-sm font-medium">
                Shipping Method
              </label>
              {subtotal >= FREE_SHIPPING_THRESHOLD ? (
                <div className="rounded-lg border bg-green-50 p-3 text-sm text-green-700 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
                  You qualify for free shipping!
                </div>
              ) : (
                <div className="space-y-2">
                  {SHIPPING_OPTIONS.map((option) => (
                    <label
                      key={option.id}
                      className={cn(
                        "flex cursor-pointer items-center justify-between rounded-lg border p-3 transition-colors",
                        selectedShipping === option.id
                          ? "border-blue-600 bg-blue-50 dark:border-blue-500 dark:bg-blue-900/20"
                          : "hover:bg-gray-50 dark:hover:bg-gray-700"
                      )}
                    >
                      <div className="flex items-center gap-3">
                        <input
                          type="radio"
                          name="shipping"
                          value={option.id}
                          checked={selectedShipping === option.id}
                          onChange={(e) => setSelectedShipping(e.target.value)}
                          className="h-4 w-4 text-blue-600 focus:ring-blue-500"
                        />
                        <div>
                          <p className="font-medium">{option.name}</p>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {option.estimatedDays} business days
                          </p>
                        </div>
                      </div>
                      <span className="font-medium">
                        ${option.price.toFixed(2)}
                      </span>
                    </label>
                  ))}
                </div>
              )}
            </div>

            {/* Totals */}
            <div className="mt-6 space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>${subtotal.toFixed(2)}</span>
              </div>
              {discount > 0 && (
                <div className="flex justify-between text-sm text-green-600 dark:text-green-400">
                  <span>Discount</span>
                  <span>-${discount.toFixed(2)}</span>
                </div>
              )}
              <div className="flex justify-between text-sm">
                <span>Shipping</span>
                <span>
                  {shipping === 0 ? "Free" : `$${shipping.toFixed(2)}`}
                </span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t pt-2 dark:border-gray-600">
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-blue-600 py-3 font-semibold text-white hover:bg-blue-700 disabled:cursor-not-allowed disabled:opacity-70"
            >
              {isProcessing ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  Processing...
                </>
              ) : (
                "Proceed to Checkout"
              )}
            </button>

            {/* Continue Shopping */}
            <Link
              to={routePaths.shop.path}
              className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              <ArrowLeft className="h-4 w-4" />
              Continue Shopping
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
