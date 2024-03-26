export default function dateConversion(noteDate: string): string {
  const options: Intl.DateTimeFormatOptions = {
    month: '2-digit',
    day: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: false // Use 24-hour format
  };
  const createdAt = new Date(noteDate).toLocaleDateString('en-US', options);
  return createdAt;
}
