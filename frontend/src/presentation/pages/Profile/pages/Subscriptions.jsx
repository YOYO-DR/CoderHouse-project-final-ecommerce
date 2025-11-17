import React, { useState } from "react";
import { Star, CreditCard, Calendar, X, Check } from "lucide-react";
import { useTranslation } from "../../../../application/context/LanguageContext";

const Subscriptions = () => {
  const { t } = useTranslation();
  const [subscriptions, setSubscriptions] = useState([
    {
      id: 1,
      name: "Premium Protein Box",
      description: "Monthly delivery of premium whey protein (5kg)",
      price: 89.99,
      frequency: "monthly",
      nextDelivery: "2024-11-15",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1593095948071-474c5cc2989d?auto=format&fit=crop&q=80&w=200",
    },
    {
      id: 2,
      name: "Vitamins & Supplements Bundle",
      description: "Omega-3, Vitamin D3, and Multivitamin pack",
      price: 49.99,
      frequency: "monthly",
      nextDelivery: "2024-11-20",
      status: "active",
      image:
        "https://images.unsplash.com/photo-1550572017-4ffe6d8e7770?auto=format&fit=crop&q=80&w=200",
    },
  ]);

  const handleCancelSubscription = (id) => {
    if (
      window.confirm(
        t("Are you sure you want to cancel this subscription?")
      )
    ) {
      setSubscriptions(
        subscriptions.map((sub) =>
          sub.id === id ? { ...sub, status: "cancelled" } : sub
        )
      );
    }
  };

  const handleReactivateSubscription = (id) => {
    setSubscriptions(
      subscriptions.map((sub) =>
        sub.id === id ? { ...sub, status: "active" } : sub
      )
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("Subscriptions")}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("Manage your recurring orders and subscriptions")}
        </p>
      </div>

      {/* Benefits Banner */}
      <div className="mb-6 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
        <div className="flex items-center space-x-3">
          <Star className="h-8 w-8 fill-current" />
          <div>
            <h3 className="text-lg font-bold">
              {t("Subscription Benefits")}
            </h3>
            <p className="mt-1 text-sm text-blue-100">
              {t("Save 15% on every order • Free shipping • Cancel anytime")}
            </p>
          </div>
        </div>
      </div>

      {/* Subscriptions List */}
      <div className="space-y-4">
        {subscriptions.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Star className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("No active subscriptions")}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t("Subscribe to your favorite products and save!")}
            </p>
            <button className="mt-4 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
              {t("Browse Products")}
            </button>
          </div>
        ) : (
          subscriptions.map((subscription) => (
            <div
              key={subscription.id}
              className="rounded-lg border border-gray-200 bg-white p-6 transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
            >
              <div className="flex flex-col space-y-4 md:flex-row md:items-start md:space-x-6 md:space-y-0">
                {/* Product Image */}
                <img
                  src={subscription.image}
                  alt={subscription.name}
                  className="h-24 w-24 rounded-lg object-cover"
                />

                {/* Subscription Info */}
                <div className="flex-1">
                  <div className="mb-2 flex items-start justify-between">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                        {subscription.name}
                      </h3>
                      <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                        {subscription.description}
                      </p>
                    </div>
                    {subscription.status === "active" ? (
                      <span className="inline-flex items-center space-x-1 rounded-full bg-green-100 px-3 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        <Check className="h-3 w-3" />
                        <span>{t("Active")}</span>
                      </span>
                    ) : (
                      <span className="inline-flex items-center space-x-1 rounded-full bg-red-100 px-3 py-1 text-xs font-semibold text-red-800 dark:bg-red-900/30 dark:text-red-400">
                        <X className="h-3 w-3" />
                        <span>{t("Cancelled")}</span>
                      </span>
                    )}
                  </div>

                  <div className="mt-4 grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div className="flex items-center space-x-2 text-sm">
                      <CreditCard className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600 dark:text-gray-400">
                        ${subscription.price.toFixed(2)}/{subscription.frequency}
                      </span>
                    </div>
                    {subscription.status === "active" && (
                      <div className="flex items-center space-x-2 text-sm">
                        <Calendar className="h-4 w-4 text-gray-500" />
                        <span className="text-gray-600 dark:text-gray-400">
                          {t("Next delivery")}:{" "}
                          {new Date(subscription.nextDelivery).toLocaleDateString()}
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="mt-4 flex space-x-3">
                    {subscription.status === "active" ? (
                      <>
                        <button className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                          {t("Manage")}
                        </button>
                        <button
                          onClick={() => handleCancelSubscription(subscription.id)}
                          className="rounded-lg border border-red-300 bg-red-50 px-4 py-2 text-sm font-medium text-red-600 transition hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                        >
                          {t("Cancel")}
                        </button>
                      </>
                    ) : (
                      <button
                        onClick={() => handleReactivateSubscription(subscription.id)}
                        className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
                      >
                        {t("Reactivate")}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add Subscription CTA */}
      {subscriptions.length > 0 && (
        <div className="mt-6 rounded-lg border border-dashed border-gray-300 bg-gray-50 p-6 text-center dark:border-gray-700 dark:bg-gray-800/50">
          <h3 className="font-semibold text-gray-900 dark:text-white">
            {t("Want to save more?")}
          </h3>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            {t("Add more products to your subscription and get 15% off")}
          </p>
          <button className="mt-4 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700">
            {t("Browse Products")}
          </button>
        </div>
      )}
    </div>
  );
};

export default Subscriptions;
