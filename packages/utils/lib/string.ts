export const toFirstLetterUppercase = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1);
};

export const getInitials = (str: string) => {
  if (str.length === 1) return str.charAt(0).toUpperCase();
  return str.split("").slice(0, 2).join("").toUpperCase();
};
