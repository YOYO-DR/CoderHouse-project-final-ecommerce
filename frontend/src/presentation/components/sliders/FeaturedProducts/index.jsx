import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ChevronRight, ChevronLeft, Star } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, EffectFade, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/effect-fade";
import "swiper/css/navigation";
import { cn } from "../../../../utils/tailwind";
import { useTranslation } from "../../../../application/context/LanguageContext";
import { routePaths } from "../../../../routers";

const featuredProducts = [
  {
    id: "1",
    name: "Premium Whey Protein",
    price: 49.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=500",
    category: "Proteins",
    description: "High-quality whey protein for muscle growth and recovery",
  },
  {
    id: "2",
    name: "BCAA Energy Boost",
    price: 34.99,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=500",
    category: "Amino Acids",
    description: "Essential amino acids for enhanced performance",
  },
  {
    id: "3",
    name: "Pre-Workout Formula",
    price: 39.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=500",
    category: "Pre-Workout",
    description: "Powerful pre-workout for maximum energy",
  },
  {
    id: "4",
    name: "Creatine Monohydrate",
    price: 29.99,
    rating: 5,
    image:
      "https://images.unsplash.com/photo-1594498506442-a2e8a4daa696?auto=format&fit=crop&q=80&w=500",
    category: "Supplements",
    description: "Pure creatine for strength and power",
  },
  {
    id: "5",
    name: "Mass Gainer Elite",
    price: 54.99,
    rating: 4,
    image:
      "https://images.unsplash.com/photo-1594498506154-655bd107c8d5?auto=format&fit=crop&q=80&w=500",
    category: "Weight Gainers",
    description: "Premium mass gainer for muscle growth",
  },
];

const ProductCard = ({ product }) => {
  const { t } = useTranslation();
  
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
        <span className="text-sm text-blue-600 dark:text-blue-400">
          {product.category}
        </span>
        <h3 className="mt-1 text-lg font-semibold">{product.name}</h3>
        <div className="mt-1 flex items-center">
          {Array.from({ length: product.rating }).map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-current text-yellow-400" />
          ))}
        </div>
        <p className="mt-2 line-clamp-2 text-sm text-gray-600 dark:text-gray-400">
          {product.description}
        </p>
        <div className="mt-4 flex items-center justify-between">
          <span className="text-xl font-bold">${product.price}</span> 
          <Link
            to={`${routePaths.product_detail.path.split(":id")[0]}${product.id}`}
            className="rounded-full bg-blue-600 p-2 text-white transition-colors hover:bg-blue-700"
          >
            <ChevronRight className="h-5 w-5" />
          </Link>
        </div>
      </div>

      {/* Hover Overlay */}
      <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <Link
          to={`${routePaths.product_detail.path.split(":id")[0]}${product.id}`}
          className="transform rounded-lg bg-white px-6 py-3 font-semibold text-gray-900 transition-transform hover:scale-105 dark:bg-gray-800 dark:text-white"
        >
          {t("View Details")}
        </Link>
      </div>
    </div>
  );
};

export function FeaturedProducts() {
  const swiperRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const { t } = useTranslation();

  // Handle mouse enter/leave for autoplay pause
  const handleMouseEnter = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.stop();
    }
  };

  const handleMouseLeave = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.autoplay.start();
    }
  };

  return (
    <section className="bg-gray-50 py-16 dark:bg-gray-900">
      <div className="container">
        <div className="mb-8 flex flex-col sm:flex-row items-start sm:items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold">{t("Featured Products")}</h2>
            <p className="mt-2 text-gray-600 dark:text-gray-400">
              {t("Discover our most popular supplements")}
            </p>
          </div>
          <Link
            to={routePaths.shop.path}
            className="mt-4 md:mt-0 flex items-center text-blue-600 hover:underline dark:text-blue-400"
          >
            {t("View All")}
            <ChevronRight className="ml-1 h-5 w-5" />
          </Link>
        </div>

        <div
          className="relative"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {/* Navigation Arrows */}
          <button
            className="swiper-button-prev absolute left-0 top-1/2 z-10 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-transform hover:scale-110 dark:bg-gray-800"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-6 w-6" />
          </button>
          <button
            className="swiper-button-next absolute right-0 top-1/2 z-10 translate-x-1/2 -translate-y-1/2 rounded-full bg-white p-3 shadow-lg transition-transform hover:scale-110 dark:bg-gray-800"
            aria-label="Next slide"
          >
            <ChevronRight className="h-6 w-6" />
          </button>

          {/* Swiper Container */}
          <div className="px-12">
            <Swiper
              ref={swiperRef}
              modules={[Autoplay, EffectFade, Navigation]}
              spaceBetween={24}
              slidesPerView={1}
              loop={true}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              speed={1000}
              navigation={{
                prevEl: ".swiper-button-prev",
                nextEl: ".swiper-button-next",
              }}
              onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
              breakpoints={{
                640: {
                  slidesPerView: 2,
                },
                1024: {
                  slidesPerView: 3,
                },
              }}
              className="overflow-hidden"
            >
              {featuredProducts.map((product) => (
                <SwiperSlide key={product.id}>
                  <ProductCard product={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          {/* Custom Navigation Dots */}
          <div className="mt-8 flex justify-center gap-2">
            {featuredProducts.map((_, index) => (
              <button
                key={index}
                onClick={() => swiperRef.current?.swiper.slideToLoop(index)}
                className={cn(
                  "h-2 w-2 rounded-full transition-all",
                  activeIndex === index
                    ? "bg-blue-600 w-6"
                    : "bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                )}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default FeaturedProducts;
