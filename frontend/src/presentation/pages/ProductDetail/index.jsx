import React, { useState, useEffect } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { ChevronLeft, Package } from "lucide-react";
import { useProductStore } from "../../hooks/useProductStore";
import ProductGallery from "./components/product-detail/ProductGallery";
import ProductInfo from "./components/product-detail/ProductInfo";
import ProductReviews from "./components/product-detail/ProductReviews";
import { routePaths } from "../../../routers";

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const getProductById = useProductStore((state) => state.getProductById);
  const [activeTab, setActiveTab] = useState("description");
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const foundProduct = getProductById(id);
    if (!foundProduct) {
      navigate("/shop");
      return;
    }
    setProduct(foundProduct);
    window.scrollTo(0, 0);
  }, [id, getProductById, navigate]);

  if (!product) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">
          <Package className="mx-auto h-16 w-16 text-gray-400" />
          <p className="mt-4 text-gray-600 dark:text-gray-400">Loading product...</p>
        </div>
      </div>
    );
  }

  const tabs = [
    { id: "description", label: "Description" },
    { id: "nutrition", label: "Nutrition Facts" },
    { id: "reviews", label: `Reviews (${product.reviews?.length || 0})` },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <div className="border-b bg-white dark:bg-gray-950">
        <div className="container py-4">
          <Link
            to={routePaths.shop.path}
            className="inline-flex items-center gap-2 text-sm text-gray-600 transition-colors hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400"
          >
            <ChevronLeft className="h-4 w-4" />
            Back to Shop
          </Link>
        </div>
      </div>

      <div className="container py-8">
        <div className="grid gap-8 lg:grid-cols-2">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>

        <div className="mt-12">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <nav className="flex gap-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`border-b-2 px-1 py-4 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "border-blue-600 text-blue-600 dark:border-blue-400 dark:text-blue-400"
                      : "border-transparent text-gray-600 hover:border-gray-300 hover:text-gray-900 dark:text-gray-400 dark:hover:border-gray-600 dark:hover:text-gray-200"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>

          <div className="py-8">
            {activeTab === "description" && (
              <div className="prose max-w-none dark:prose-invert">
                <h3 className="text-2xl font-bold">About This Product</h3>
                <p className="text-gray-700 dark:text-gray-300">
                  {product.longDescription}
                </p>
                <h4 className="mt-6 text-xl font-semibold">Key Benefits</h4>
                <ul className="space-y-2">
                  <li>Supports lean muscle growth and recovery</li>
                  <li>High-quality ingredients from trusted sources</li>
                  <li>Enhanced with digestive enzymes for better absorption</li>
                  <li>Great taste with no artificial flavors</li>
                  <li>Third-party tested for purity and quality</li>
                </ul>
              </div>
            )}

            {activeTab === "nutrition" && (
              <div className="max-w-2xl">
                <h3 className="mb-6 text-2xl font-bold">Nutrition Facts</h3>
                <div className="overflow-hidden rounded-lg border border-gray-200 dark:border-gray-700">
                  <table className="w-full">
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="px-6 py-4 font-semibold">Serving Size</td>
                        <td className="px-6 py-4 text-right">
                          {product.nutritionFacts.servingSize}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-semibold">Calories</td>
                        <td className="px-6 py-4 text-right">
                          {product.nutritionFacts.calories}
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="px-6 py-4 font-semibold">Protein</td>
                        <td className="px-6 py-4 text-right">
                          {product.nutritionFacts.protein}
                        </td>
                      </tr>
                      <tr>
                        <td className="px-6 py-4 font-semibold">Carbohydrates</td>
                        <td className="px-6 py-4 text-right">
                          {product.nutritionFacts.carbs}
                        </td>
                      </tr>
                      <tr className="bg-gray-50 dark:bg-gray-800">
                        <td className="px-6 py-4 font-semibold">Fat</td>
                        <td className="px-6 py-4 text-right">
                          {product.nutritionFacts.fat}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
                <p className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                  * Percent Daily Values are based on a 2,000 calorie diet. Your daily
                  values may be higher or lower depending on your calorie needs.
                </p>
              </div>
            )}

            {activeTab === "reviews" && (
              <ProductReviews reviews={product.reviews} rating={product.rating} />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
