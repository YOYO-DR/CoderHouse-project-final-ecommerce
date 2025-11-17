import React, { useState, useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import {
  Search,
  SlidersHorizontal,
  Star,
  X,
  ChevronDown,
  ShoppingCart,
  ChevronLeft,
} from "lucide-react";
import { useCartStore } from "../../hooks/useCartStore";
import { cn } from "../../../utils/tailwind";
import { routePaths } from "../../../routers";

// Mock data
const products = [
  {
    id: "1",
    name: "Premium Whey Protein",
    price: 49.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500",
    category: "Proteins",
    brand: "AllNutrition",
    description: "High-quality whey protein for muscle growth and recovery.",
    inStock: true,
  },
  {
    id: "2",
    name: "BCAA Energy Boost",
    price: 34.99,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=500",
    category: "Amino Acids",
    brand: "AllNutrition",
    description: "Essential amino acids for enhanced performance and recovery.",
    inStock: true,
  },
  {
    id: "3",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
  {
    id: "4",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
  {
    id: "5",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
  {
    id: "6",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
  {
    id: "7",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
  {
    id: "8",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
  {
    id: "9",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
  {
    id: "10",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
  {
    id: "11",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    brand: "AllNutrition",
    description: "Powerful pre-workout formula for maximum energy and focus.",
    inStock: true,
  },
];

const categories = [
  "All",
  "Proteins",
  "Amino Acids",
  "Pre-Workout",
  "Vitamins",
  "Weight Loss",
];
const brands = ["AllNutrition", "OptimumNutrition", "Dymatize", "MuscleTech"];

const initialFilters = {
  category: [],
  brand: [],
  rating: null,
  inStock: false,
  priceRange: [0, 200],
};

function ProductCard({ product }) {
  const addItem = useCartStore((state) => state.addItem);
  const [isHovered, setIsHovered] = useState(false);

  const handleAddToCart = () => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      quantity: 1,
      image: product.image,
    });
  };

  return (
    <div
      className="group relative overflow-hidden rounded-lg bg-white shadow-md transition-all hover:shadow-lg dark:bg-gray-800"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Link to={`${routePaths.product_detail.path.split(":id")[0]}${product.id}`}>
        <div className="aspect-square overflow-hidden">
          <img
            src={product.image}
            alt={product.name}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
            loading="lazy"
          />
        </div>
      </Link>
      <div className="p-4">
        <span className="text-sm text-blue-600">{product.category}</span>
        <Link to={`${routePaths.product_detail.path.split(":id")[0]}${product.id}`}>
          <h3 className="mt-1 text-lg font-semibold transition-colors hover:text-blue-600">
            {product.name}
          </h3>
        </Link>
        <div className="mt-1 flex items-center">
          {Array.from({ length: product.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button
            onClick={handleAddToCart}
            className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
            aria-label="Add to cart"
          >
            <ShoppingCart className="h-5 w-5" />
          </button>
        </div>
      </div>

      {/* Quick View Overlay - Only show on desktop */}
      {isHovered && (
        <div className="absolute inset-0 hidden items-center justify-center bg-black/50 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:flex">
          <div className="rounded-lg bg-white p-4 dark:bg-gray-800">
            <p className="text-sm">{product.description}</p>
            <div className="mt-4 flex gap-2">
              <Link
                to={`${routePaths.product_detail.path.split(":id")[0]}${product.id}`}
                className="flex-1 rounded-lg border border-blue-600 px-4 py-2 text-center text-blue-600 hover:bg-blue-50 dark:hover:bg-gray-700"
              >
                View Details
              </Link>
              <button
                onClick={handleAddToCart}
                className="flex-1 rounded-lg bg-blue-600 px-4 py-2 text-white hover:bg-blue-700"
              >
                Add to Cart
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Mobile Quick View - Touch friendly */}
      <button
        onClick={handleAddToCart}
        className="absolute inset-x-0 bottom-0 flex w-full items-center justify-center bg-blue-600 p-4 text-white opacity-0 transition-opacity duration-300 group-hover:opacity-100 md:hidden"
      >
        Add to Cart
      </button>
    </div>
  );
}

function FilterSidebar({ filters, setFilters, isOpen, onClose }) {
  const handleResetFilters = () => {
    setFilters(initialFilters);
  };

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  return (
    <>
      {/* Mobile Overlay */}
      <div
        className={cn(
          "fixed inset-0 z-30 bg-black/50 transition-opacity duration-300 lg:hidden",
          isOpen ? "opacity-100" : "pointer-events-none opacity-0"
        )}
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-40 w-full max-w-xs transform overflow-y-auto bg-white pb-6 shadow-xl transition-transform duration-300 dark:bg-gray-800 lg:static lg:h-auto lg:max-h-[calc(100vh-12rem)] lg:w-full lg:max-w-full lg:translate-x-0 lg:overflow-y-auto lg:rounded-lg lg:border lg:border-gray-200 lg:shadow-md lg:dark:border-gray-700",
          isOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        )}
      >
        <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-white/95 p-4 backdrop-blur-lg dark:bg-gray-800/95 lg:rounded-t-lg">
          <h3 className="text-xl font-bold">Filters</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={handleResetFilters}
              className="rounded-lg px-3 py-1.5 text-sm text-blue-600 hover:bg-blue-50 dark:text-blue-400 dark:hover:bg-gray-700"
            >
              Reset All
            </button>
            <button
              onClick={onClose}
              className="rounded-full bg-gray-100 p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700 dark:bg-gray-700 dark:text-gray-400 dark:hover:bg-gray-600 dark:hover:text-gray-200 lg:hidden"
              aria-label="Close filters"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="p-6">
          {/* Categories */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Categories</h3>
            <div className="space-y-2">
              {categories.map((category) => (
                <label
                  key={category}
                  className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={filters.category.includes(category)}
                    onChange={(e) => {
                      setFilters((prev) => ({
                        ...prev,
                        category: e.target.checked
                          ? [...prev.category, category]
                          : prev.category.filter((c) => c !== category),
                      }));
                    }}
                    className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="flex-1 text-base">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brands */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Brands</h3>
            <div className="space-y-2">
              {brands.map((brand) => (
                <label
                  key={brand}
                  className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(brand)}
                    onChange={(e) => {
                      setFilters((prev) => ({
                        ...prev,
                        brand: e.target.checked
                          ? [...prev.brand, brand]
                          : prev.brand.filter((b) => b !== brand),
                      }));
                    }}
                    className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="flex-1 text-base">{brand}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price Range */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Price Range</h3>
            <div className="flex items-center gap-3">
              <div className="flex-1">
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                  Min
                </label>
                <input
                  type="number"
                  value={filters.priceRange[0]}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [Number(e.target.value), prev.priceRange[1]],
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  min="0"
                  step="1"
                />
              </div>
              <div className="flex-1">
                <label className="mb-1 block text-sm text-gray-600 dark:text-gray-400">
                  Max
                </label>
                <input
                  type="number"
                  value={filters.priceRange[1]}
                  onChange={(e) => {
                    setFilters((prev) => ({
                      ...prev,
                      priceRange: [prev.priceRange[0], Number(e.target.value)],
                    }));
                  }}
                  className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
                  min="0"
                  step="1"
                />
              </div>
            </div>
          </div>

          {/* Rating Filter */}
          <div className="mb-6">
            <h3 className="mb-3 font-semibold">Minimum Rating</h3>
            <select
              value={filters.rating || ""}
              onChange={(e) => {
                setFilters((prev) => ({
                  ...prev,
                  rating: e.target.value ? Number(e.target.value) : null,
                }));
              }}
              className="w-full rounded-lg border border-gray-300 px-3 py-2 dark:border-gray-600 dark:bg-gray-700"
            >
              <option value="">Any Rating</option>
              {[5, 4, 3, 2, 1].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} Stars & Up
                </option>
              ))}
            </select>
          </div>

          {/* In Stock Filter */}
          <div className="mb-6">
            <label className="flex cursor-pointer items-center rounded-lg p-2 hover:bg-gray-100 dark:hover:bg-gray-700">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={(e) => {
                  setFilters((prev) => ({
                    ...prev,
                    inStock: e.target.checked,
                  }));
                }}
                className="mr-3 h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <span className="flex-1 text-base">In Stock Only</span>
            </label>
          </div>

          {/* Apply/Close Button (Mobile Only) */}
          <div className="mt-6 flex gap-2 lg:hidden">
            <button
              onClick={handleResetFilters}
              className="flex-1 rounded-lg border border-gray-300 px-4 py-2 font-semibold text-gray-700 hover:bg-gray-50 dark:border-gray-600 dark:text-gray-200 dark:hover:bg-gray-700"
            >
              Reset Filters
            </button>
            <button
              onClick={onClose}
              className="flex-1 rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
            >
              Apply Filters
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

const Shop = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [filters, setFilters] = useState(initialFilters);
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("relevance");
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // Initialize filters from URL params
  useEffect(() => {
    const category = searchParams.get("category");
    if (category) {
      setFilters((prev) => ({
        ...prev,
        category: [category],
      }));
    }
  }, [searchParams]);

  // Filter and sort products
  const filteredProducts = products
    .filter((product) => {
      if (
        searchQuery &&
        !product.name.toLowerCase().includes(searchQuery.toLowerCase())
      ) {
        return false;
      }
      if (
        filters.category.length > 0 &&
        !filters.category.includes("All") &&
        !filters.category.includes(product.category)
      ) {
        return false;
      }
      if (filters.brand.length > 0 && !filters.brand.includes(product.brand)) {
        return false;
      }
      if (filters.rating && product.rating < filters.rating) {
        return false;
      }
      if (filters.inStock && !product.inStock) {
        return false;
      }
      if (
        product.price < filters.priceRange[0] ||
        product.price > filters.priceRange[1]
      ) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      {/* Search and Filter Bar */}
      <div className="sticky top-16 z-30 border-b bg-white/95 backdrop-blur-lg dark:bg-gray-950/95">
        <div className="container py-4">
          <div className="flex flex-wrap items-center gap-4">
            {/* Mobile Filter Button */}
            <button
              onClick={() => setIsSidebarOpen(true)}
              className="flex items-center gap-2 rounded-lg border border-gray-300 px-4 py-2 hover:bg-gray-100 dark:border-gray-700 dark:hover:bg-gray-700 lg:hidden"
              aria-label="Open filters"
            >
              <SlidersHorizontal className="h-5 w-5" />
              <span>Filters</span>
            </button>

            {/* Search Bar */}
            <div className="flex flex-1 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800">
              <Search className="h-5 w-5 text-gray-400" />
              <input
                type="text"
                placeholder="Search products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-transparent outline-none"
              />
            </div>

            {/* Sort Dropdown */}
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 dark:border-gray-700 dark:bg-gray-800"
            >
              <option value="relevance">Relevance</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>
      </div>

      <div className="container py-8">
        <div className="lg:grid lg:grid-cols-[280px_1fr] lg:gap-8">
          {/* Filters Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-32">
              <FilterSidebar
                filters={filters}
                setFilters={setFilters}
                isOpen={isSidebarOpen}
                onClose={() => setIsSidebarOpen(false)}
              />
            </div>
          </aside>

          {/* Mobile Filter Sidebar */}
          <div className="lg:hidden">
            <FilterSidebar
              filters={filters}
              setFilters={setFilters}
              isOpen={isSidebarOpen}
              onClose={() => setIsSidebarOpen(false)}
            />
          </div>

          {/* Products Grid */}
          <div>
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-xl font-bold">
                {filteredProducts.length} Products
              </h2>
            </div>

            {/* Responsive Grid */}
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3">
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Empty State */}
            {filteredProducts.length === 0 && (
              <div className="rounded-lg border border-gray-200 p-8 text-center dark:border-gray-700">
                <p className="text-gray-500 dark:text-gray-400">
                  No products found matching your criteria.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
