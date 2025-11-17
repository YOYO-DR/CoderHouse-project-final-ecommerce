import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dumbbell, Mail, Lock, Loader2 } from "lucide-react";
import Input from "../../components/ui/inputs/Input";
import Button from "../../components/ui/buttons/Button";
import { useAuthStore } from "../../hooks/useAuthStore";
import { useTranslation } from "../../../application/context/LanguageContext";
import { z } from "zod";
import { routePaths } from "../../../routers";

const loginSchema = z.object({
  email: z.string().email({ message: "Enter a valid email address." }),
  password: z.string().min(8, { message: "Password must be at least 8 characters." }),
});

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formErrors, setFormErrors] = useState({ email: "", password: "" });
  const { t } = useTranslation();

  const navigate = useNavigate();
  const login = useAuthStore((state) => state.login);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setFormErrors({ email: "", password: "" });
    setIsLoading(true);

    try {
      const result = loginSchema.safeParse({ email, password });

      if (!result.success) {
        const fieldErrors = result.error.flatten().fieldErrors;
        setFormErrors({
          email: fieldErrors.email?.[0] ?? "",
          password: fieldErrors.password?.[0] ?? "",
        });
        setIsLoading(false);
        return;
      }

      const credentials = result.data;
      await login(credentials.email, credentials.password);
      navigate("/");
    } catch (authError) {
      setError(authError.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-900 dark:to-gray-800 flex items-center justify-center p-4">
      <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8">
        {isLoading && (
          <div className="absolute inset-0 z-20 flex items-center justify-center bg-white/70 dark:bg-gray-900/70 backdrop-blur-sm rounded-2xl">
            <Loader2 className="w-10 h-10 text-blue-600 animate-spin" />
          </div>
        )}
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 dark:bg-blue-500 p-3 rounded-full mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {t("Welcome to AllNutrition")}
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            {t("Sign in to your account")}
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-900 text-red-600 dark:text-red-300 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <Input
            label={t("Email")}
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder={t("Enter your email")}
            icon={Mail}
            required
            autoFocus
            error={formErrors.email}
          />

          <Input
            label={t("Password")}
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder={t("Enter your password")}
            icon={Lock}
            showPasswordToggle
            isPasswordVisible={showPassword}
            onPasswordToggle={() => setShowPassword(!showPassword)}
            required
            error={formErrors.password}
          />

          <div className="flex items-center justify-between">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="w-4 h-4 text-blue-600 dark:text-blue-400 rounded border-gray-300 dark:border-gray-600 focus:ring-blue-500"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">
                {t("Remember me")}
              </span>
            </label>

            <Link
              to="/forgot-password"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
            >
              {t("Forgot password?")}
            </Link>
          </div>

          <Button type="submit" className="w-full" isLoading={isLoading}>
            {t("login")}
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
          {t("Don't have an account?")}{" "}
          <Link
            to={routePaths.register.path}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            {t("Sign up")}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
