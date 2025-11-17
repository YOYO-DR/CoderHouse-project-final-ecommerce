import React from "react";
import { Star, CheckCircle } from "lucide-react";

const ProductReviews = ({ reviews, rating }) => {
  const ratingDistribution = [5, 4, 3, 2, 1].map((stars) => ({
    stars,
    count: reviews?.filter((r) => r.rating === stars).length || 0,
  }));

  const totalReviews = reviews?.length || 0;
  const averageRating = rating || 0;

  return (
    <div className="space-y-8">
      <div className="grid gap-8 md:grid-cols-[300px_1fr]">
        <div className="space-y-4 rounded-lg border border-gray-200 p-6 dark:border-gray-700">
          <div className="space-y-2 text-center">
            <div className="text-5xl font-bold">{averageRating.toFixed(1)}</div>
            <div className="flex justify-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  className={`h-5 w-5 ${
                    i < averageRating
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300 dark:text-gray-600"
                  }`}
                />
              ))}
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Based on {totalReviews} reviews
            </p>
          </div>

          <div className="space-y-2">
            {ratingDistribution.map(({ stars, count }) => (
              <div key={stars} className="flex items-center gap-2">
                <span className="w-8 text-sm">{stars}★</span>
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-gray-200 dark:bg-gray-700">
                  <div
                    className="h-full bg-yellow-400"
                    style={{
                      width: `${totalReviews > 0 ? (count / totalReviews) * 100 : 0}%`,
                    }}
                  />
                </div>
                <span className="w-8 text-right text-sm text-gray-600 dark:text-gray-400">
                  {count}
                </span>
              </div>
            ))}
          </div>
        </div>

        <div className="space-y-4">
          {reviews && reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="rounded-lg border border-gray-200 p-6 dark:border-gray-700"
              >
                <div className="mb-3 flex items-start justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-semibold">{review.author}</h4>
                      {review.verified && (
                        <span className="flex items-center gap-1 text-xs text-green-600 dark:text-green-400">
                          <CheckCircle className="h-3 w-3" />
                          Verified Purchase
                        </span>
                      )}
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {new Date(review.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < review.rating
                            ? "fill-yellow-400 text-yellow-400"
                            : "text-gray-300 dark:text-gray-600"
                        }`}
                      />
                    ))}
                  </div>
                </div>
                <p className="text-gray-700 dark:text-gray-300">{review.comment}</p>
              </div>
            ))
          ) : (
            <div className="rounded-lg border border-gray-200 p-8 text-center dark:border-gray-700">
              <p className="text-gray-500 dark:text-gray-400">
                No reviews yet. Be the first to review this product!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductReviews;
