import React, { useState } from "react";
import {
  Shield,
  Key,
  Smartphone,
  Lock,
  Eye,
  EyeOff,
  CheckCircle,
  AlertTriangle,
  LogOut,
} from "lucide-react";
import { useTranslation } from "../../../../application/context/LanguageContext";

const SecuritySettings = () => {
  const { t } = useTranslation();
  const [showPasswordForm, setShowPasswordForm] = useState(false);
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [twoFactorEnabled, setTwoFactorEnabled] = useState(false);
  const [passwordForm, setPasswordForm] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [activeSessions] = useState([
    {
      id: 1,
      device: "Chrome on Windows",
      location: "New York, USA",
      lastActive: "Active now",
      current: true,
    },
    {
      id: 2,
      device: "Safari on iPhone",
      location: "New York, USA",
      lastActive: "2 hours ago",
      current: false,
    },
    {
      id: 3,
      device: "Chrome on MacBook",
      location: "Boston, USA",
      lastActive: "1 day ago",
      current: false,
    },
  ]);

  const handlePasswordChange = (e) => {
    e.preventDefault();
    // TODO: Implement password change API call
    console.log("Password change:", passwordForm);
    setShowPasswordForm(false);
    setPasswordForm({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });
  };

  const handleLogoutDevice = (sessionId) => {
    if (
      window.confirm(
        t("Are you sure you want to log out this device?")
      )
    ) {
      console.log("Logout device:", sessionId);
    }
  };

  const handleEnable2FA = () => {
    setTwoFactorEnabled(!twoFactorEnabled);
    // TODO: Implement 2FA setup flow
  };

  return (
    <div className="p-6">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">
          {t("Security Settings")}
        </h2>
        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
          {t("Manage your account security and privacy")}
        </p>
      </div>

      {/* Password Section */}
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900/30">
              <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div>
              <h3 className="font-semibold text-gray-900 dark:text-white">
                {t("Password")}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {t("Last changed 30 days ago")}
              </p>
            </div>
          </div>
          {!showPasswordForm && (
            <button
              onClick={() => setShowPasswordForm(true)}
              className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              {t("Change Password")}
            </button>
          )}
        </div>

        {showPasswordForm && (
          <form
            onSubmit={handlePasswordChange}
            className="rounded-lg border border-gray-200 bg-gray-50 p-6 dark:border-gray-700 dark:bg-gray-800/50"
          >
            <div className="space-y-4">
              {/* Current Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("Current Password")}
                </label>
                <div className="relative">
                  <input
                    type={showCurrentPassword ? "text" : "password"}
                    value={passwordForm.currentPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        currentPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showCurrentPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* New Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("New Password")}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? "text" : "password"}
                    value={passwordForm.newPassword}
                    onChange={(e) =>
                      setPasswordForm({
                        ...passwordForm,
                        newPassword: e.target.value,
                      })
                    }
                    required
                    className="w-full rounded-lg border border-gray-300 bg-white py-2.5 pl-4 pr-10 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                  >
                    {showNewPassword ? (
                      <EyeOff className="h-5 w-5" />
                    ) : (
                      <Eye className="h-5 w-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Confirm Password */}
              <div>
                <label className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300">
                  {t("Confirm New Password")}
                </label>
                <input
                  type="password"
                  value={passwordForm.confirmPassword}
                  onChange={(e) =>
                    setPasswordForm({
                      ...passwordForm,
                      confirmPassword: e.target.value,
                    })
                  }
                  required
                  className="w-full rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-gray-900 transition focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-end space-x-3">
              <button
                type="button"
                onClick={() => setShowPasswordForm(false)}
                className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
              >
                {t("Cancel")}
              </button>
              <button
                type="submit"
                className="rounded-lg bg-blue-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-blue-700"
              >
                {t("Update Password")}
              </button>
            </div>
          </form>
        )}
      </div>

      {/* Two-Factor Authentication */}
      <div className="mb-8">
        <div className="rounded-lg border border-gray-200 bg-white p-6 dark:border-gray-700 dark:bg-gray-800/50">
          <div className="flex items-start justify-between">
            <div className="flex items-start space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/30">
                <Smartphone className="h-5 w-5 text-green-600 dark:text-green-400" />
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">
                  {t("Two-Factor Authentication (2FA)")}
                </h3>
                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                  {t("Add an extra layer of security to your account")}
                </p>
                {twoFactorEnabled && (
                  <div className="mt-2 inline-flex items-center space-x-1 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle className="h-4 w-4" />
                    <span>{t("Enabled")}</span>
                  </div>
                )}
              </div>
            </div>
            <button
              onClick={handleEnable2FA}
              className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
                twoFactorEnabled
                  ? "border border-red-300 bg-red-50 text-red-600 hover:bg-red-100 dark:border-red-900/30 dark:bg-red-900/20 dark:text-red-400"
                  : "bg-blue-600 text-white hover:bg-blue-700"
              }`}
            >
              {twoFactorEnabled ? t("Disable") : t("Enable")}
            </button>
          </div>
        </div>
      </div>

      {/* Active Sessions */}
      <div className="mb-8">
        <h3 className="mb-4 flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
          <Lock className="h-5 w-5" />
          <span>{t("Active Sessions")}</span>
        </h3>
        <div className="space-y-3">
          {activeSessions.map((session) => (
            <div
              key={session.id}
              className="flex items-start justify-between rounded-lg border border-gray-200 bg-white p-4 dark:border-gray-700 dark:bg-gray-800/50"
            >
              <div className="flex items-start space-x-3">
                <div className="mt-1 flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                  <Shield className="h-4 w-4 text-gray-600 dark:text-gray-400" />
                </div>
                <div>
                  <div className="flex items-center space-x-2">
                    <h4 className="font-medium text-gray-900 dark:text-white">
                      {session.device}
                    </h4>
                    {session.current && (
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-0.5 text-xs font-semibold text-green-800 dark:bg-green-900/30 dark:text-green-400">
                        {t("Current")}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    {session.location}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-500">
                    {session.lastActive}
                  </p>
                </div>
              </div>
              {!session.current && (
                <button
                  onClick={() => handleLogoutDevice(session.id)}
                  className="flex items-center space-x-1 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400"
                >
                  <LogOut className="h-4 w-4" />
                  <span>{t("Logout")}</span>
                </button>
              )}
            </div>
          ))}
        </div>
        <button className="mt-4 text-sm font-medium text-red-600 hover:text-red-700 dark:text-red-400">
          {t("Log out all other sessions")}
        </button>
      </div>

      {/* Security Tips */}
      <div className="rounded-lg border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/30 dark:bg-yellow-900/20">
        <div className="flex items-start space-x-3">
          <AlertTriangle className="mt-0.5 h-5 w-5 flex-shrink-0 text-yellow-600 dark:text-yellow-400" />
          <div>
            <h4 className="font-semibold text-yellow-900 dark:text-yellow-300">
              {t("Security Tips")}
            </h4>
            <ul className="mt-2 space-y-1 text-sm text-yellow-700 dark:text-yellow-400">
              <li>
                • {t("Use a strong, unique password")}
              </li>
              <li>
                • {t("Enable two-factor authentication")}
              </li>
              <li>
                • {t("Don't share your password with anyone")}
              </li>
              <li>
                • {t("Log out from public or shared devices")}
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecuritySettings;
