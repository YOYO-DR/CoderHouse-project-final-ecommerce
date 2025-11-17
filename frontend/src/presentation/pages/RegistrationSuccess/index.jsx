import { useLocation, useNavigate, Link } from "react-router-dom";
import { Mail, CheckCircle } from "lucide-react";
import Button from "../../components/ui/buttons/Button";
import { routePaths } from "../../../routers";

const RegistrationSuccess = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email;

  // Redirect to register if accessed directly without email
  if (!email) {
    navigate("/register", { replace: true });
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-green-100 dark:from-gray-800 dark:to-gray-900 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl w-full max-w-md p-8">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-green-600 dark:bg-green-500 p-3 rounded-full mb-4">
            <CheckCircle className="w-12 h-12 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white text-center">
            Registration Successful! 🎉
          </h1>
        </div>

        <div className="space-y-4 text-center">
          <div className="bg-blue-50 dark:bg-blue-900/30 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
            <div className="flex items-center justify-center mb-2">
              <Mail className="w-5 h-5 text-blue-600 dark:text-blue-400 mr-2" />
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Check your email
              </p>
            </div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              We've sent a verification email to:
            </p>
            <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-1">
              {email}
            </p>
          </div>

          <div className="text-left space-y-2">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              <strong>Next steps:</strong>
            </p>
            <ol className="list-decimal list-inside text-sm text-gray-600 dark:text-gray-300 space-y-1">
              <li>Check your email inbox (and spam folder)</li>
              <li>Click the activation link in the email</li>
              <li>Your account will be activated automatically</li>
              <li>You can then log in to your account</li>
            </ol>
          </div>

          <div className="pt-4 space-y-3">
            <Button onClick={() => navigate("/login")} className="w-full">
              Go to Login
            </Button>
            
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Didn't receive the email?{" "}
              <Link
                to={routePaths.register.path}
                className="font-medium text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-500"
              >
                Try again
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationSuccess;
