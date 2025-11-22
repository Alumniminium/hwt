/**
 * Format a number as currency (USD)
 */
export function formatMoney(value: number): string {
  return `$ ${new Intl.NumberFormat('en-US').format(value)}`;
}

/**
 * Format a date string for display
 */
export function formatDate(dateString: string | Date): string {
  const date = typeof dateString === 'string' ? new Date(dateString) : dateString;
  return date.toLocaleDateString('en-US');
}

/**
 * Add days to a date
 */
export function addDays(date: Date, days: number): Date {
  const result = new Date(date);
  result.setDate(result.getDate() + days);
  return result;
}

/**
 * Format date for newspaper display
 */
export function formatNewspaperDate(date: Date): string {
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const year = date.getFullYear();
  return `${day}. ${month}, ${year}`;
}
