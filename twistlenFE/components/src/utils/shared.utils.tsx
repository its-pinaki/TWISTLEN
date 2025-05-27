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