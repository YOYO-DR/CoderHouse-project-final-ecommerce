import React, { useState } from "react";
import {
  Mail,
  Calendar,
  Edit2,
  Camera,
  Save,
  X,
  CheckCircle,
  Star,
  ShoppingBag,
  CreditCard,
} from "lucide-react";
import { useAuthStore } from "../../../hooks/useAuthStore";
import { useTranslation } from "../../../../application/context/LanguageContext";

const ProfileOverview = () => {
  const { t } = useTranslation();
  const { user } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.first_name || user?.name?.split(" ")[0] || "",
    lastName: user?.last_name || user?.name?.split(" ")[1] || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSave = () => {
    // TODO: Call API to update user profile
    setIsEditing(false);
    setShowSuccess(true);
    setTimeout(() => setShowSuccess(false), 3000);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setFormData({
      firstName: user?.first_name || user?.name?.split(" ")[0] || "",
      lastName: user?.last_name || user?.name?.split(" ")[1] || "",
      email: user?.email || "",
      phone: user?.phone || "",
    });
  };

  const memberSince = user?.created_at
    ? new Date(user.created_at).toLocaleDateString()
    : "2024";

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8 flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("Profile Overview") || "Profile Overview"}
          </h2>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {t("Manage your personal information") ||
              "Manage your personal information"}
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Edit2 className="h-4 w-4" />
            <span>{t("Edit Profile") || "Edit Profile"}</span>
          </button>
        )}
      </div>

      {/* Success Message */}
      {showSuccess && (
        <div className="mb-6 flex items-center space-x-2 rounded-lg bg-green-50 p-4 text-green-800 dark:bg-green-900/20 dark:text-green-400">
          <CheckCircle className="h-5 w-5" />
          <span>{t("Profile updated successfully") || "Profile updated successfully"}</span>
        </div>
      )}

      {/* Profile Picture */}
      <div className="mb-8 flex items-center space-x-6">
        <div className="relative">
          <div className="flex h-24 w-24 items-center justify-center rounded-full bg-gradient-to-br from-blue-500 to-purple-600 text-3xl font-bold text-white shadow-lg">
            {formData.firstName?.[0]?.toUpperCase() || "U"}
            {formData.lastName?.[0]?.toUpperCase() || ""}
          </div>
          {isEditing && (
            <button className="absolute bottom-0 right-0 rounded-full bg-blue-600 p-2 text-white shadow-lg hover:bg-blue-700">
              <Camera className="h-4 w-4" />
            </button>
          )}
        </div>
        <div>
          <h3 className="text-xl font-bold text-gray-900 dark:text-white">
            {formData.firstName} {formData.lastName}
          </h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">
            {t("Member Since") || "Member Since"} {memberSince}
          </p>
          <div className="mt-2 inline-flex items-center rounded-full bg-gradient-to-r from-amber-400 to-orange-500 px-3 py-1 text-xs font-semibold text-white">
            <Star className="mr-1 h-3 w-3" />
            {t("Gold Member") || "Gold Member"}
          </div>
        </div>
      </div>

      {/* Form */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {/* First Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("First Name") || "First Name"}
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("Last Name") || "Last Name"}
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800"
          />
        </div>

        {/* Email */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("Email") || "Email"}
          </label>
          <div className="relative">
            <Mail className="absolute left-3 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              disabled={!isEditing}
              className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800"
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
            {t("Phone") || "Phone"}
          </label>
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            disabled={!isEditing}
            placeholder="+1 (555) 000-0000"
            className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 disabled:bg-gray-50 disabled:text-gray-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:disabled:bg-gray-800"
          />
        </div>
      </div>

      {/* Action Buttons */}
      {isEditing && (
        <div className="mt-8 flex justify-end space-x-3">
          <button
            onClick={handleCancel}
            className="flex items-center space-x-2 rounded-lg border border-gray-300 bg-white px-6 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
          >
            <X className="h-4 w-4" />
            <span>{t("Cancel") || "Cancel"}</span>
          </button>
          <button
            onClick={handleSave}
            className="flex items-center space-x-2 rounded-lg bg-blue-600 px-6 py-2.5 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            <Save className="h-4 w-4" />
            <span>{t("Save Changes") || "Save Changes"}</span>
          </button>
        </div>
      )}

      {/* Stats Cards */}
      <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-blue-50 to-blue-100 p-4 dark:border-gray-700 dark:from-blue-900/20 dark:to-blue-800/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("Total Orders") || "Total Orders"}
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                24
              </p>
            </div>
            <ShoppingBag className="h-10 w-10 text-blue-600 dark:text-blue-400" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-green-50 to-green-100 p-4 dark:border-gray-700 dark:from-green-900/20 dark:to-green-800/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("Total Spent") || "Total Spent"}
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                $1,248
              </p>
            </div>
            <CreditCard className="h-10 w-10 text-green-600 dark:text-green-400" />
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-gradient-to-br from-purple-50 to-purple-100 p-4 dark:border-gray-700 dark:from-purple-900/20 dark:to-purple-800/20">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                {t("Loyalty Points") || "Loyalty Points"}
              </p>
              <p className="mt-1 text-2xl font-bold text-gray-900 dark:text-white">
                3,450
              </p>
            </div>
            <Star className="h-10 w-10 text-purple-600 dark:text-purple-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileOverview;
