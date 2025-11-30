// Return in "YYYY-MM-DD" format
export function getTodayDate(): string {
  return new Date().toISOString().slice(0, 10);
}

// Adds days to the passed date
export function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr);
  date.setDate(date.getDate() + days);
  return date.toISOString().slice(0, 10);
}
