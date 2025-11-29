export function getTodayDate(): string {
  // Return in "YYYY-MM-DD" format
  return new Date().toISOString().slice(0, 10);
}
