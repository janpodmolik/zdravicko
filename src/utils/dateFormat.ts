export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('cs-CZ', { 
    day: 'numeric', 
    month: 'long', 
    year: 'numeric' 
  });
}

export function formatDateShort(dateString: string): string {
  const date = new Date(dateString);
  return date.toLocaleDateString('cs-CZ', { 
    day: 'numeric', 
    month: 'long'
  });
}
