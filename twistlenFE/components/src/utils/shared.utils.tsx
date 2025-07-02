export const isRunningInNextron = () => {
  return (
    typeof navigator !== "undefined" && navigator.userAgent.includes("Electron")
  );
};

export const truncateText = (text: string, maxLength: number): string => {
  if (text.length <= maxLength) return text;
  return text.substring(0, maxLength) + "...";
};

export const isFieldEmpty = (field: string) => {
  return !field || field.trim() === "";
};

export const isValidUserId = (userId: any) => {
  const userIdPattern = /^[a-zA-Z0-9]{6,20}$/;
  return userIdPattern.test(userId);
};

export const isValidEmail = (email: string): boolean => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const isValidPassword = (password: string): boolean => {
  // At least 8 characters, one uppercase, one lowercase, one number, one special character
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  return re.test(password);
};