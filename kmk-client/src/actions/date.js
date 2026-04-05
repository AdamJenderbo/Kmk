

export function getDate(date) {
    return date.substring(0, 10);
}

export function getTime(date) {
    return date.substring(11, 16);
}

export function formatDateTime(input) {
  const date = new Date(input);

  const pad = (n) => n.toString().padStart(2, '0');

  const year = date.getFullYear();
  const month = pad(date.getMonth() + 1);
  const day = pad(date.getDate());
  const hours = pad(date.getHours());
  const minutes = pad(date.getMinutes());

  return `${year}-${month}-${day} ${hours}:${minutes}`;
}