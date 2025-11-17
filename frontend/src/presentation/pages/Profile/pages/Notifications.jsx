import React, { useState } from "react";
import { Bell, Mail, MessageSquare, Check } from "lucide-react";
import { useTranslation } from "../../../../application/context/LanguageContext";

const Notifications = () => {
  const { t } = useTranslation();
  const [settings, setSettings] = useState({
    orderUpdates: true,
    promotions: true,
    newsletter: false,
    productRestock: true,
    priceDrops: true,
    accountSecurity: true,
    sms: false,
    push: true,
  });

  const handleToggle = (key) => {
    setSettings({ ...settings, [key]: !settings[key] });
  };

  const notificationCategories = [
    {
      title: t("Order & Shipping"),
      items: [
        {
          key: "orderUpdates",
          label: t("Order Updates"),
          description:
            t("Get notified about your order status, shipping updates, and delivery"),
        },
      ],
    },
    {
      title: t("Marketing & Promotions"),
      items: [
        {
          key: "promotions",
          label: t("Promotions & Discounts"),
          description:
            t("Receive exclusive offers, sales, and discount codes"),
        },
        {
          key: "newsletter",
          label: t("Newsletter"),
          description:
            t("Weekly newsletter with tips, recipes, and product highlights"),
        },
      ],
    },
    {
      title: t("Product Updates"),
      items: [
        {
          key: "productRestock",
          label: t("Product Restocks"),
          description:
            t("Get notified when out-of-stock products are available again"),
        },
        {
          key: "priceDrops",
          label: t("Price Drops"),
          description:
            t("Alert me when products in my wishlist go on sale"),
        },
      ],
    },
    {
      title: t("Account & Security"),
      items: [
        {
          key: "accountSecurity",
          label: t("Security Alerts"),
          description:
            t("Important notifications about your account security"),
        },
      ],
    },
  ];

  const communicationChannels = [
    {
      key: "email",
      label: t("Email"),
      icon: Mail,
      description: t("Receive notifications via email"),
      enabled: true,
      locked: true, // Can't be disabled
    },
    {
      key: "sms",
      label: t("SMS"),
      icon: MessageSquare,
      description:
        t("Get text messages for important updates"),
      enabled: settings.sms,
    },
    {
      key: "push",
      label: t("Push Notifications"),
      icon: Bell,
      description:
        t("Browser push notifications for real-time updates"),
      enabled: settings.push,
    },
  ];

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("Notification Preferences")}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("Choose how you want to receive updates from us")}
        </p>
      </div>

      {/* Communication Channels */}
      <div className="mb-8">
        <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
          {t("Communication Channels")}
        </h3>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          {communicationChannels.map((channel) => {
            const Icon = channel.icon;
            return (
              <div
                key={channel.key}
                className="relative rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50"
              >
                <div className="mb-3 flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                    <Icon className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                  </div>
                  {channel.locked ? (
                    <span className="text-xs font-medium text-green-600 dark:text-green-400">
                      {t("Always on")}
                    </span>
                  ) : (
                    <button
                      onClick={() => handleToggle(channel.key)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${
                        channel.enabled
                          ? "bg-blue-600"
                          : "bg-gray-300 dark:bg-gray-600"
                      }`}
                    >
                      <span
                        className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                          channel.enabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  )}
                </div>
                <h4 className="font-semibold text-gray-900 dark:text-white">
                  {channel.label}
                </h4>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {channel.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>

      {/* Notification Categories */}
      <div className="space-y-6">
        {notificationCategories.map((category) => (
          <div key={category.title}>
            <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
              {category.title}
            </h3>
            <div className="space-y-3">
              {category.items.map((item) => (
                <div
                  key={item.key}
                  className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50"
                >
                  <div className="flex-1">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {item.label}
                    </h4>
                    <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                      {item.description}
                    </p>
                  </div>
                  <button
                    onClick={() => handleToggle(item.key)}
                    className={`relative ml-4 inline-flex h-6 w-11 flex-shrink-0 items-center rounded-full transition ${
                      settings[item.key]
                        ? "bg-blue-600"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  >
                    <span
                      className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                        settings[item.key] ? "translate-x-6" : "translate-x-1"
                      }`}
                    />
                  </button>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Success Message */}
      <div className="mt-6 flex items-center space-x-2 rounded-lg border border-green-200 bg-green-50 p-4 text-green-800 dark:border-green-900/30 dark:bg-green-900/20 dark:text-green-400">
        <Check className="h-5 w-5 flex-shrink-0" />
        <p className="text-sm">
          {t("Your notification preferences are saved automatically")}
        </p>
      </div>
    </div>
  );
};

export default Notifications;
