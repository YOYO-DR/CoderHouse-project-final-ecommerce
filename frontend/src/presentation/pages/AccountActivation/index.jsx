import { useEffect, useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { CheckCircle, XCircle, Loader2 } from "lucide-react";
import Button from "../../components/ui/buttons/Button";
import { authService } from "../../../application/services/authService";

const AccountActivation = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [status, setStatus] = useState("loading");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const activateAccount = async () => {
      const uid = searchParams.get("uid");
      const token = searchParams.get("token");

      if (!uid || !token) {
        setStatus("error");
        setErrorMessage("Invalid activation link. Missing parameters.");
        return;
      }

      try {
        await authService.activateAccount(uid, token);
        setStatus("success");
        
        // Auto redirect after 5 seconds
        setTimeout(() => {
          navigate("/login");
        }, 5000);
      } catch (error) {
        setStatus("error");
        const message =
          error.response?.data?.error ||
          "Activation failed. The link may be invalid or expired.";
        setErrorMessage(message);
      }
    };

    activateAccount();
  }, [searchParams, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-blue-50 to-blue-100 dark:bg-gray-900">
      <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl w-full max-w-md p-8 text-center">
        {status === "loading" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <Loader2 className="w-16 h-16 text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Activating your account...
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Please wait while we verify your account.
            </p>
          </div>
        )}

        {status === "success" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <CheckCircle className="w-16 h-16 text-green-500 dark:text-green-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Account Activated! 🎉
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              Your account has been successfully activated. You will be
              redirected to the login page in a few seconds.
            </p>
            <Button onClick={() => navigate("/login")} className="mt-4">
              Go to Login
            </Button>
          </div>
        )}

        {status === "error" && (
          <div className="space-y-4">
            <div className="flex justify-center">
              <XCircle className="w-16 h-16 text-red-500 dark:text-red-400" />
            </div>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
              Activation Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-300">
              {errorMessage || "This activation link has expired or is invalid. Please request a new activation link."}
            </p>
            <Button
              onClick={() => navigate("/register")}
              variant="outline"
              className="mt-4"
            >
              Back to Register
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default AccountActivation;
