export function validateCardExpDate(expirationDate: string): boolean {
  const dateParts = expirationDate.split("/");
  const month = parseInt(dateParts[0], 10) - 1; 
  const year = parseInt(dateParts[1], 10) + 2000; 

  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth();

  if (
    year > currentYear ||
    (year === currentYear && month >= currentMonth + 1)
  ) {
    return true;
  }
  return false;
}
