import React, { useState } from "react";
import {
  CreditCard,
  Plus,
  Trash2,
  Star,
  Check,
} from "lucide-react";
import { useTranslation } from "../../../../application/context/LanguageContext";
import { cn } from "../../../../utils/tailwind";

const PaymentMethods = () => {
  const { t } = useTranslation();
  const [showAddCard, setShowAddCard] = useState(false);
  const [cards, setCards] = useState([
    {
      id: 1,
      type: "visa",
      last4: "4242",
      expiry: "12/25",
      isDefault: true,
      holderName: "John Doe",
    },
    {
      id: 2,
      type: "mastercard",
      last4: "8888",
      expiry: "09/26",
      isDefault: false,
      holderName: "John Doe",
    },
  ]);

  const [newCard, setNewCard] = useState({
    number: "",
    holderName: "",
    expiry: "",
    cvv: "",
  });

  const getCardIcon = (type) => {
    const icons = {
      visa: "bg-gradient-to-br from-blue-600 to-blue-800",
      mastercard: "bg-gradient-to-br from-red-600 to-orange-600",
      amex: "bg-gradient-to-br from-green-600 to-teal-600",
    };
    return icons[type] || icons.visa;
  };

  const handleAddCard = (e) => {
    e.preventDefault();
    // TODO: Integrate with payment processor API
    const cardData = {
      id: cards.length + 1,
      type: "visa",
      last4: newCard.number.slice(-4),
      expiry: newCard.expiry,
      isDefault: cards.length === 0,
      holderName: newCard.holderName,
    };
    setCards([...cards, cardData]);
    setNewCard({ number: "", holderName: "", expiry: "", cvv: "" });
    setShowAddCard(false);
  };

  const handleDeleteCard = (id) => {
    if (window.confirm(t("Are you sure you want to delete this card?"))) {
      setCards(cards.filter((card) => card.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setCards(
      cards.map((card) => ({
        ...card,
        isDefault: card.id === id,
      }))
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("Payment Methods")}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("Manage your saved payment methods")}
          </p>
        </div>
        {!showAddCard && (
          <button
            onClick={() => setShowAddCard(true)}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>{t("Add Card")}</span>
          </button>
        )}
      </div>

      {/* Add Card Form */}
      {showAddCard && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("Add New Card")}
          </h3>
          <form onSubmit={handleAddCard} className="space-y-4">
            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Card Number")}
              </label>
              <input
                type="text"
                placeholder={t("Card number placeholder")}
                maxLength="19"
                value={newCard.number}
                onChange={(e) =>
                  setNewCard({ ...newCard, number: e.target.value })
                }
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                {t("Cardholder Name")}
              </label>
              <input
                type="text"
                placeholder={t("Cardholder name placeholder")}
                value={newCard.holderName}
                onChange={(e) =>
                  setNewCard({ ...newCard, holderName: e.target.value })
                }
                required
                className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("Expiry Date")}
                </label>
                <input
                  type="text"
                  placeholder={t("Expiry placeholder")}
                  maxLength="5"
                  value={newCard.expiry}
                  onChange={(e) =>
                    setNewCard({ ...newCard, expiry: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("CVV")}
                </label>
                <input
                  type="text"
                  placeholder={t("CVV placeholder")}
                  maxLength="4"
                  value={newCard.cvv}
                  onChange={(e) =>
                    setNewCard({ ...newCard, cvv: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddCard(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {t("Cancel")}
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {t("Add Card")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Saved Cards */}
      <div className="space-y-4">
        {cards.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <CreditCard className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("No payment methods")}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t("Add a payment method to make checkout faster")}
            </p>
          </div>
        ) : (
          cards.map((card) => (
            <div
              key={card.id}
              className="group relative overflow-hidden rounded-lg border border-gray-200 bg-white p-6 transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
            >
              <div className="flex items-start justify-between">
                {/* Card Info */}
                <div className="flex items-center space-x-4">
                  <div
                    className={cn(
                      "flex h-14 w-20 items-center justify-center rounded-lg",
                      getCardIcon(card.type)
                    )}
                  >
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <h3 className="font-semibold capitalize text-gray-900 dark:text-white">
                        {card.type}
                      </h3>
                      {card.isDefault && (
                        <span className="inline-flex items-center space-x-1 rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                          <Star className="h-3 w-3 fill-current" />
                          <span>{t("Default")}</span>
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      •••• •••• •••• {card.last4}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-500">
                      {t("Expires")} {card.expiry} • {card.holderName}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  {!card.isDefault && (
                    <button
                      onClick={() => handleSetDefault(card.id)}
                      className="rounded-lg border border-gray-300 bg-white px-3 py-1.5 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                    >
                      {t("Set as Default")}
                    </button>
                  )}
                  <button
                    onClick={() => handleDeleteCard(card.id)}
                    className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Security Notice */}
      <div className="mt-6 rounded-lg border border-blue-200 bg-blue-50 p-4 dark:border-blue-900/30 dark:bg-blue-900/20">
        <div className="flex items-start space-x-3">
          <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-blue-600 dark:text-blue-400" />
          <div>
            <h4 className="font-semibold text-blue-900 dark:text-blue-300">
              {t("Your payment information is secure")}
            </h4>
            <p className="mt-1 text-sm text-blue-700 dark:text-blue-400">
              {t("All payment data is encrypted and stored securely")}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentMethods;
