import { clsx } from "clsx";

const PasswordStrength = ({ password }) => {
  const getStrength = (password) => {
    if (!password) return 0;
    let strength = 0;
    if (password.length >= 8) strength++;
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/[0-9]/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    return strength;
  };

  const strength = getStrength(password);

  return (
    <div className="space-y-2">
      <div className="flex gap-1">
        {[1, 2, 3, 4, 5].map((level) => (
          <div
            key={level}
            className={clsx("h-2 flex-1 rounded-full transition-colors", {
              "bg-red-500": strength >= level && strength < 3,
              "bg-yellow-500": strength >= level && strength === 3,
              "bg-green-500": strength >= level && strength > 3,
              "bg-gray-200": strength < level,
            })}
          />
        ))}
      </div>
      <p className="text-sm text-gray-600">
        {strength === 0 && "Enter a password"}
        {strength === 1 && "Very weak"}
        {strength === 2 && "Weak"}
        {strength === 3 && "Medium"}
        {strength === 4 && "Strong"}
        {strength === 5 && "Very strong"}
      </p>
    </div>
  );
};

export default PasswordStrength;