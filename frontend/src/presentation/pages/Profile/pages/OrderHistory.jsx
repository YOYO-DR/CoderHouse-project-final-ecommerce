import React, { useState } from "react";
import {
  Package,
  Clock,
  CheckCircle,
  XCircle,
  Truck,
  Search,
  ChevronDown,
  Eye,
} from "lucide-react";
import { useTranslation } from "../../../../application/context/LanguageContext";
import { cn } from "../../../../utils/tailwind";

const OrderHistory = () => {
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [selectedOrder, setSelectedOrder] = useState(null);

  // Mock data - Replace with API call
  const orders = [
    {
      id: "#ORD-2024-001",
      date: "2024-10-28",
      status: "delivered",
      total: 149.99,
      items: 3,
      products: [
        { name: "Premium Whey Protein", quantity: 2, price: 49.99 },
        { name: "BCAA Energy Boost", quantity: 1, price: 34.99 },
        { name: "Pre-Workout Formula", quantity: 1, price: 15.01 },
      ],
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "TRK123456789",
    },
    {
      id: "#ORD-2024-002",
      date: "2024-10-25",
      status: "shipped",
      total: 89.99,
      items: 2,
      products: [
        { name: "Creatine Monohydrate", quantity: 1, price: 29.99 },
        { name: "Omega-3 Fish Oil", quantity: 1, price: 60.00 },
      ],
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: "TRK987654321",
    },
    {
      id: "#ORD-2024-003",
      date: "2024-10-20",
      status: "processing",
      total: 199.99,
      items: 4,
      products: [
        { name: "Protein Bar Box (12 units)", quantity: 1, price: 199.99 },
      ],
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: null,
    },
    {
      id: "#ORD-2024-004",
      date: "2024-09-15",
      status: "cancelled",
      total: 54.99,
      items: 1,
      products: [
        { name: "Mass Gainer 5kg", quantity: 1, price: 54.99 },
      ],
      shippingAddress: "123 Main St, New York, NY 10001",
      trackingNumber: null,
    },
  ];

  const getStatusBadge = (status) => {
    const statusConfig = {
      delivered: {
        icon: CheckCircle,
        label: t("Delivered"),
        className: "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
      },
      shipped: {
        icon: Truck,
        label: t("Shipped"),
        className: "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400",
      },
      processing: {
        icon: Clock,
        label: t("Processing"),
        className: "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
      },
      cancelled: {
        icon: XCircle,
        label: t("Cancelled"),
        className: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
      },
    };

    const config = statusConfig[status] || statusConfig.processing;
    const Icon = config.icon;

    return (
      <span
        className={cn(
          "inline-flex items-center space-x-1 rounded-full px-3 py-1 text-xs font-semibold",
          config.className
        )}
      >
        <Icon className="h-3 w-3" />
        <span>{config.label}</span>
      </span>
    );
  };

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.products.some((p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase())
      );
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("Order History")}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("Track and manage your orders")}
        </p>
      </div>

      {/* Filters */}
      <div className="mb-6 grid grid-cols-1 gap-4 md:grid-cols-2">
        {/* Search */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder={t("Search by order ID or product")}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          />
        </div>

        {/* Status Filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="w-full appearance-none rounded-lg border border-gray-300 bg-white px-4 py-2.5 pr-10 text-sm transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
          >
            <option value="all">{t("All Orders")}</option>
            <option value="delivered">{t("Delivered")}</option>
            <option value="shipped">{t("Shipped")}</option>
            <option value="processing">{t("Processing")}</option>
            <option value="cancelled">{t("Cancelled")}</option>
          </select>
          <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <Package className="mb-4 h-16 w-16 text-gray-300 dark:text-gray-600" />
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {t("No orders found")}
            </h3>
            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
              {t("Try adjusting your filters")}
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => (
            <div
              key={order.id}
              className="rounded-lg border border-gray-200 bg-white p-6 transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
            >
              <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
                {/* Order Info */}
                <div className="flex-1">
                  <div className="mb-2 flex items-center space-x-3">
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white">
                      {order.id}
                    </h3>
                    {getStatusBadge(order.status)}
                  </div>
                  <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600 dark:text-gray-400">
                    <span className="flex items-center space-x-1">
                      <Clock className="h-4 w-4" />
                      <span>{new Date(order.date).toLocaleDateString()}</span>
                    </span>
                    <span className="flex items-center space-x-1">
                      <Package className="h-4 w-4" />
                      <span>
                        {order.items} {t("items")}
                      </span>
                    </span>
                    <span className="font-semibold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  {order.trackingNumber && (
                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                      {t("Tracking")}: {order.trackingNumber}
                    </p>
                  )}
                </div>

                {/* Actions */}
                <div className="flex space-x-2">
                  <button
                    onClick={() => setSelectedOrder(order)}
                    className="flex items-center space-x-2 rounded-lg border border-blue-600 bg-blue-50 px-4 py-2 text-sm font-medium text-blue-600 transition hover:bg-blue-100 dark:border-blue-500 dark:bg-blue-900/20 dark:text-blue-400 dark:hover:bg-blue-900/30"
                  >
                    <Eye className="h-4 w-4" />
                    <span>{t("View Details")}</span>
                  </button>
                </div>
              </div>

              {/* Order Details Modal */}
              {selectedOrder?.id === order.id && (
                <div className="mt-4 border-t border-gray-200 pt-4 dark:border-gray-700">
                  <h4 className="mb-3 font-semibold text-gray-900 dark:text-white">
                    {t("Order Items")}
                  </h4>
                  <div className="space-y-2">
                    {order.products.map((product, index) => (
                      <div
                        key={index}
                        className="flex justify-between text-sm"
                      >
                        <span className="text-gray-700 dark:text-gray-300">
                          {product.quantity}x {product.name}
                        </span>
                        <span className="font-medium text-gray-900 dark:text-white">
                          ${product.price.toFixed(2)}
                        </span>
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 flex justify-between border-t border-gray-200 pt-3 dark:border-gray-700">
                    <span className="font-semibold text-gray-900 dark:text-white">
                      {t("Total")}
                    </span>
                    <span className="font-bold text-gray-900 dark:text-white">
                      ${order.total.toFixed(2)}
                    </span>
                  </div>
                  <p className="mt-3 text-sm text-gray-600 dark:text-gray-400">
                    <strong>{t("Shipping Address")}:</strong>{" "}
                    {order.shippingAddress}
                  </p>
                  <button
                    onClick={() => setSelectedOrder(null)}
                    className="mt-4 text-sm font-medium text-blue-600 hover:text-blue-700 dark:text-blue-400"
                  >
                    {t("Hide Details")}
                  </button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default OrderHistory;
