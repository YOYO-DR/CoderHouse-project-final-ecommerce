import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Dumbbell, Mail, Lock } from "lucide-react";
import Input from "../../components/ui/inputs/Input";
import Button from "../../components/ui/buttons/Button";
import { useAuthStore } from "../../hooks/useAuthStore";
import PasswordStrength from "../../components/common/PasswordStrength";
import { routePaths } from "../../../routers";

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const navigate = useNavigate();
  const register = useAuthStore((state) => state.register);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateForm()) return;
    setIsLoading(true);

    try {
      const response = await register({
        email: formData.email,
        password: formData.password,
        confirmPassword: formData.confirmPassword,
        firstName: formData.firstName,
        lastName: formData.lastName,
      });
      
      // Navigate to success page with the email
      navigate("/registration-success", { state: { email: response.email } });
    } catch (error) {
      setError(error.message || "Registration failed. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-blue-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-blue-600 dark:bg-blue-400 p-3 rounded-full mb-4">
            <Dumbbell className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Create an Account
          </h1>
          <p className="text-gray-600 dark:text-gray-300 mt-2">
            Join AllNutrition today
          </p>
        </div>

        {error && (
          <div className="bg-red-50 dark:bg-red-800 text-red-600 dark:text-red-300 p-3 rounded-lg mb-6">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              placeholder="John"
              required
            />

            <Input
              label="Last Name"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              placeholder="Doe"
              required
            />
          </div>

          <Input
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="john@example.com"
            required
          />

          <div className="space-y-2">
            <Input
              label="Password"
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Create a password"
              showPasswordToggle
              isPasswordVisible={showPassword}
              onPasswordToggle={() => setShowPassword(!showPassword)}
              required
              autoComplete="new-password"
            />
            <PasswordStrength password={formData.password} />
          </div>

          <Input
            label="Confirm Password"
            type={showPassword ? "text" : "password"}
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
            autoComplete="new-password"
          />

          <Button type="submit" className="w-full" isLoading={isLoading}>
            Create Account
          </Button>
        </form>

        <p className="mt-8 text-center text-sm text-gray-600 dark:text-gray-300">
          Already have an account?{" "}
          <Link
            to={routePaths.login.path}
            className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
