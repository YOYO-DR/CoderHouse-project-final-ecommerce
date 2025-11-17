import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [
    {
      id: "1",
      name: "Premium Whey Protein",
      price: 49.99,
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1579722821273-0f6c7d44362f?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1622484211174-e6a7f0ae1652?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&q=80&w=1000",
      ],
      category: "Proteins",
      brand: "AllNutrition",
      description: "High-quality whey protein for muscle growth and recovery.",
      longDescription:
        "Our Premium Whey Protein is designed for athletes and fitness enthusiasts seeking exceptional results. Each serving delivers 24g of high-quality protein from grass-fed whey concentrate, enhanced with digestive enzymes for optimal absorption. This formula supports lean muscle growth, accelerates recovery, and helps maintain a positive nitrogen balance. Perfect for post-workout nutrition or as a high-protein snack throughout the day.",
      inStock: true,
      stock: 150,
      weight: "2.2 lbs",
      servings: 30,
      flavor: "Chocolate",
      nutritionFacts: {
        servingSize: "30g",
        calories: 120,
        protein: "24g",
        carbs: "3g",
        fat: "2g",
      },
      reviews: [
        {
          id: "r1",
          author: "John Martinez",
          rating: 5,
          date: "2024-10-15",
          comment:
            "Best protein powder I've ever used! Mixes easily and tastes great. Noticeable gains after 2 weeks.",
          verified: true,
        },
        {
          id: "r2",
          author: "Sarah Thompson",
          rating: 5,
          date: "2024-10-10",
          comment:
            "Love the chocolate flavor. No artificial taste and my recovery time has improved significantly.",
          verified: true,
        },
        {
          id: "r3",
          author: "Mike Chen",
          rating: 4,
          date: "2024-10-05",
          comment:
            "Great quality protein. Only wish it came in more flavors. Will definitely buy again.",
          verified: true,
        },
      ],
    },
    {
      id: "2",
      name: "BCAA Energy Boost",
      price: 34.99,
      rating: 4,
      images: [
        "https://images.unsplash.com/photo-1594498653385-d5172c532c00?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1617791160536-598cf32026fb?auto=format&fit=crop&q=80&w=1000",
      ],
      category: "Amino Acids",
      brand: "AllNutrition",
      description: "Essential amino acids for enhanced performance and recovery.",
      longDescription:
        "BCAA Energy Boost provides the perfect 2:1:1 ratio of branched-chain amino acids to support muscle protein synthesis and reduce muscle breakdown during intense training. Enhanced with electrolytes and natural caffeine from green tea, this formula delivers sustained energy without the crash. Ideal for intra-workout hydration or as a refreshing energy drink any time of day.",
      inStock: true,
      stock: 200,
      weight: "1.2 lbs",
      servings: 40,
      flavor: "Tropical Punch",
      nutritionFacts: {
        servingSize: "10g",
        calories: 0,
        protein: "0g",
        carbs: "0g",
        fat: "0g",
      },
      reviews: [
        {
          id: "r4",
          author: "Emma Wilson",
          rating: 5,
          date: "2024-10-18",
          comment:
            "Perfect for my morning workouts! Gives me the energy I need without jitters.",
          verified: true,
        },
        {
          id: "r5",
          author: "David Lee",
          rating: 4,
          date: "2024-10-12",
          comment:
            "Good taste and effective. Noticed less muscle soreness after workouts.",
          verified: false,
        },
      ],
    },
    {
      id: "3",
      name: "Pre-Workout Formula",
      price: 39.99,
      rating: 5,
      images: [
        "https://images.unsplash.com/photo-1594498506331-aa49716cbf85?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1595231776094-2c551e671f83?auto=format&fit=crop&q=80&w=1000",
        "https://images.unsplash.com/photo-1619166265412-aabf980a5423?auto=format&fit=crop&q=80&w=1000",
      ],
      category: "Pre-Workout",
      brand: "AllNutrition",
      description: "Powerful pre-workout formula for maximum energy and focus.",
      longDescription:
        "Ignite your workouts with our advanced Pre-Workout Formula. Scientifically formulated with beta-alanine, citrulline malate, and natural caffeine to enhance endurance, increase blood flow, and sharpen mental focus. Experience explosive energy, improved strength output, and laser-sharp concentration. No artificial colors or banned substances.",
      inStock: true,
      stock: 180,
      weight: "1.5 lbs",
      servings: 35,
      flavor: "Berry Blast",
      nutritionFacts: {
        servingSize: "15g",
        calories: 15,
        protein: "0g",
        carbs: "3g",
        fat: "0g",
      },
      reviews: [
        {
          id: "r6",
          author: "Alex Rodriguez",
          rating: 5,
          date: "2024-10-20",
          comment:
            "This pre-workout is amazing! Clean energy, great pump, and no crash. Best I've tried.",
          verified: true,
        },
        {
          id: "r7",
          author: "Lisa Anderson",
          rating: 5,
          date: "2024-10-14",
          comment:
            "Love the berry flavor! Gives me the perfect amount of energy for early morning workouts.",
          verified: true,
        },
        {
          id: "r8",
          author: "Tom Harris",
          rating: 4,
          date: "2024-10-08",
          comment: "Effective formula. Tastes good and mixes well. Would recommend.",
          verified: true,
        },
      ],
    },
  ],

  getProductById: (id) => {
    return (
      useProductStore.getState().products.find((product) => product.id === id) ||
      null
    );
  },
}));
