import React from "react";
import { Link } from "react-router-dom";
import {
  ChevronRight,
  Star,
  TrendingUp,
  Award,
  ArrowRight,
  Instagram,
  Facebook,
  Twitter,
} from "lucide-react";
import { useTranslation } from "../../../application/context/LanguageContext";
import FeaturedProducts from "../../components/sliders/FeaturedProducts";
import { routePaths } from "../../../routers";

const categories = [
  {
    name: "Proteins",
    image:
      "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=500",
    descriptionKey: "Premium protein powders for muscle growth",
  },
  {
    name: "Pre-Workout",
    image:
      "https://images.unsplash.com/photo-1546483875-ad9014c88eba?auto=format&fit=crop&q=80&w=500",
    descriptionKey: "Energy boost for intense workouts",
  },
  {
    name: "Vitamins",
    image:
      "https://images.unsplash.com/photo-1471864190281-a93a3070b6de?auto=format&fit=crop&q=80&w=500",
    descriptionKey: "Essential vitamins and minerals",
  },
];

const testimonials = [
  {
    name: "John Doe",
    image:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=200",
    textKey: "Amazing products! I've seen great results in my training.",
    rating: 5,
  },
  {
    name: "Sarah Smith",
    image:
      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&q=80&w=200",
    textKey: "The quality is outstanding. Highly recommended!",
    rating: 5,
  },
];

function ProductCard({ product }) {
  return (
    <div className="group relative overflow-hidden rounded-lg bg-white p-4 shadow-md transition-all hover:shadow-lg dark:bg-gray-800">
      <div className="aspect-square overflow-hidden rounded-lg">
        <img
          src={product.image}
          alt={product.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="mt-4">
        <span className="text-sm text-blue-600">{product.category}</span>
        <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
        <div className="mt-1 flex items-center">
          {Array.from({ length: product.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
          ))}
        </div>
        <div className="mt-2 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span>
          <button className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700">
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}

function CategoryCard({ category }) {
  const { t } = useTranslation();
  
  return (
    <Link
      to={`${routePaths.shop.path}?category=${category.name.toLowerCase()}`}
      className="group relative overflow-hidden rounded-lg"
    >
      <div className="aspect-[4/3] overflow-hidden">
        <img
          src={category.image}
          alt={category.name}
          className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-110"
        />
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent">
        <div className="absolute bottom-0 p-4">
          <h3 className="text-xl font-bold text-white">{t(category.name)}</h3>
          <p className="mt-1 text-sm text-gray-200">{t(category.descriptionKey)}</p>
        </div>
      </div>
    </Link>
  );
}

function TestimonialCard({ testimonial }) {
  const { t } = useTranslation();
  
  return (
    <div className="rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <div className="flex items-center gap-4">
        <img
          src={testimonial.image}
          alt={testimonial.name}
          className="h-12 w-12 rounded-full object-cover"
        />
        <div>
          <h4 className="font-semibold">{testimonial.name}</h4>
          <div className="flex">
            {Array.from({ length: testimonial.rating }).map((_, i) => (
              <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
            ))}
          </div>
        </div>
      </div>
      <p className="mt-4 text-gray-600 dark:text-gray-300">
        {t(testimonial.textKey)}
      </p>
    </div>
  );
}

const Home = () => {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative h-[80vh] overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1517836357463-d25dfeac3438?auto=format&fit=crop&q=80"
          alt="Hero background"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-black/40">
          <div className="container mx-auto flex h-full items-center">
            <div className="max-w-2xl text-white">
              <h1 className="text-5xl font-bold leading-tight">
                {t("Fuel Your Performance")}
              </h1>
              <p className="mt-4 text-xl">
                {t(
                  "Premium sports nutrition products for athletes and fitness enthusiasts"
                )}
              </p>
              <Link
                to={routePaths.shop.path}
                className="mt-8 inline-flex items-center rounded-full bg-blue-600 px-6 py-3 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {t("Shop Now")}
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Categories */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-3xl font-bold">{t("Shop by Category")}</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category) => (
              <CategoryCard key={category.name} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="bg-blue-600 py-16 text-white">
        <div className="container">
          <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            <div className="flex items-start gap-4">
              <TrendingUp className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-semibold">{t("Premium Quality")}</h3>
                <p className="mt-2 text-blue-100">
                  {t("Only the highest quality ingredients in all our products")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Award className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-semibold">{t("Certified Products")}</h3>
                <p className="mt-2 text-blue-100">
                  {t("All products are tested and certified for safety")}
                </p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <Star className="h-8 w-8" />
              <div>
                <h3 className="text-xl font-semibold">{t("Trusted by Athletes")}</h3>
                <p className="mt-2 text-blue-100">
                  {t("Used and recommended by professional athletes")}
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-16">
        <div className="container">
          <h2 className="mb-8 text-3xl font-bold">{t("What Our Customers Say")}</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((testimonial) => (
              <TestimonialCard
                key={testimonial.name}
                testimonial={testimonial}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gray-50 py-16 dark:bg-gray-900">
        <div className="container">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold">{t("Stay Updated")}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t("Subscribe to our newsletter for exclusive offers and fitness tips")}
            </p>
            <form className="mt-6 flex flex-col gap-2 sm:flex-row">
              <input
                type="email"
                placeholder={t("Enter your email")}
                className="flex-1 rounded-lg border border-gray-300 px-4 py-2 focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-700 dark:bg-gray-800"
              />
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-6 py-2 font-semibold text-white transition-colors hover:bg-blue-700"
              >
                {t("Subscribe")}
              </button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
