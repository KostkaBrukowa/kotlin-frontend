export const capitalize = (text?: string | null): string => {
  if (!text || text.length === 0) return '';

  return text[0].toLocaleUpperCase() + text.substring(1);
};
