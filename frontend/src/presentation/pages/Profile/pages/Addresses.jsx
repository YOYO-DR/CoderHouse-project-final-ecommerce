import React, { useState } from "react";
import { MapPin, Plus, Edit2, Trash2, Star } from "lucide-react";
import { useTranslation } from "../../../../application/context/LanguageContext";

const Addresses = () => {
  const { t } = useTranslation();
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [addresses, setAddresses] = useState([
    {
      id: 1,
      type: "home",
      isDefault: true,
      fullName: "John Doe",
      addressLine1: "123 Main Street",
      addressLine2: "Apt 4B",
      city: "New York",
      state: "NY",
      zipCode: "10001",
      country: "United States",
      phone: "+1 (555) 123-4567",
    },
    {
      id: 2,
      type: "work",
      isDefault: false,
      fullName: "John Doe",
      addressLine1: "456 Business Ave",
      addressLine2: "Suite 200",
      city: "Brooklyn",
      state: "NY",
      zipCode: "11201",
      country: "United States",
      phone: "+1 (555) 987-6543",
    },
  ]);

  const [newAddress, setNewAddress] = useState({
    fullName: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    zipCode: "",
    country: "United States",
    phone: "",
  });

  const handleAddAddress = (e) => {
    e.preventDefault();
    const addressData = {
      id: addresses.length + 1,
      type: "other",
      isDefault: addresses.length === 0,
      ...newAddress,
    };
    setAddresses([...addresses, addressData]);
    setNewAddress({
      fullName: "",
      addressLine1: "",
      addressLine2: "",
      city: "",
      state: "",
      zipCode: "",
      country: "United States",
      phone: "",
    });
    setShowAddAddress(false);
  };

  const handleDeleteAddress = (id) => {
    if (
      window.confirm(
        t("Are you sure you want to delete this address?")
      )
    ) {
      setAddresses(addresses.filter((addr) => addr.id !== id));
    }
  };

  const handleSetDefault = (id) => {
    setAddresses(
      addresses.map((addr) => ({
        ...addr,
        isDefault: addr.id === id,
      }))
    );
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("Addresses")}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("Manage your shipping and billing addresses")}
          </p>
        </div>
        {!showAddAddress && (
          <button
            onClick={() => setShowAddAddress(true)}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Plus className="h-4 w-4" />
            <span>{t("Add Address")}</span>
          </button>
        )}
      </div>

      {/* Add Address Form */}
      {showAddAddress && (
        <div className="mb-6 rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <h3 className="mb-4 text-lg font-semibold text-gray-900 dark:text-white">
            {t("Add New Address")}
          </h3>
          <form onSubmit={handleAddAddress} className="space-y-4">
            <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("Full Name")}
                </label>
                <input
                  type="text"
                  value={newAddress.fullName}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, fullName: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("Address Line 1")}
                </label>
                <input
                  type="text"
                  value={newAddress.addressLine1}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      addressLine1: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("Address Line 2")} ({t("Optional")})
                </label>
                <input
                  type="text"
                  value={newAddress.addressLine2}
                  onChange={(e) =>
                    setNewAddress({
                      ...newAddress,
                      addressLine2: e.target.value,
                    })
                  }
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("City")}
                </label>
                <input
                  type="text"
                  value={newAddress.city}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, city: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("State/Province")}
                </label>
                <input
                  type="text"
                  value={newAddress.state}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, state: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("ZIP/Postal Code")}
                </label>
                <input
                  type="text"
                  value={newAddress.zipCode}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, zipCode: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("Phone")}
                </label>
                <input
                  type="tel"
                  value={newAddress.phone}
                  onChange={(e) =>
                    setNewAddress({ ...newAddress, phone: e.target.value })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowAddAddress(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {t("Cancel")}
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {t("Save Address")}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Saved Addresses */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {addresses.map((address) => (
          <div
            key={address.id}
            className="relative rounded-lg border border-gray-200 bg-white p-6 transition hover:shadow-md dark:border-gray-700 dark:bg-gray-800/50"
          >
            {address.isDefault && (
              <div className="absolute right-4 top-4">
                <span className="inline-flex items-center space-x-1 rounded-full bg-green-100 px-2 py-1 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                  <Star className="h-3 w-3 fill-current" />
                  <span>{t("Default")}</span>
                </span>
              </div>
            )}

            <div className="mb-4 flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400" />
              </div>
              <span className="font-semibold capitalize text-gray-900 dark:text-white">
                {address.type}
              </span>
            </div>

            <div className="space-y-1 text-sm text-gray-600 dark:text-gray-400">
              <p className="font-medium text-gray-900 dark:text-white">
                {address.fullName}
              </p>
              <p>{address.addressLine1}</p>
              {address.addressLine2 && <p>{address.addressLine2}</p>}
              <p>
                {address.city}, {address.state} {address.zipCode}
              </p>
              <p>{address.country}</p>
              <p>{address.phone}</p>
            </div>

            <div className="mt-4 flex space-x-2">
              {!address.isDefault && (
                <button
                  onClick={() => handleSetDefault(address.id)}
                  className="flex-1 rounded-lg border border-gray-300 bg-white px-3 py-2 text-xs font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
                >
                  {t("Set as Default")}
                </button>
              )}
              <button className="rounded-lg border border-gray-300 bg-white p-2 text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600">
                <Edit2 className="h-4 w-4" />
              </button>
              <button
                onClick={() => handleDeleteAddress(address.id)}
                className="rounded-lg bg-red-50 p-2 text-red-600 transition hover:bg-red-100 dark:bg-red-900/20 dark:text-red-400 dark:hover:bg-red-900/30"
              >
                <Trash2 className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Addresses;
