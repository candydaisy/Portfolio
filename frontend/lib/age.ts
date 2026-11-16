/** Age in full years from an ISO date string (YYYY-MM-DD). */
export function calculateAge(dateOfBirth: string, now: Date = new Date()): number {
  const dob = new Date(dateOfBirth + "T00:00:00");
  if (Number.isNaN(dob.getTime())) return 0;

  let age = now.getFullYear() - dob.getFullYear();
  const monthDiff = now.getMonth() - dob.getMonth();
  const dayDiff = now.getDate() - dob.getDate();

  if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
    age -= 1;
  }

  return Math.max(0, age);
}
