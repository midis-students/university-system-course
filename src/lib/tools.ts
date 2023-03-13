export function phoneNormalise(phone: string) {
  return phone.replace(/\s|-|\(|\)/gm, '');
}

export function phoneFormat(phone: string) {
  return (
    phone.substring(0, 2) +
    ' (' +
    phone.substring(2, 5) +
    ') ' +
    phone.substring(5, 8) +
    '-' +
    phone.substring(8)
  );
}

export function normaliseDate(date: Date) {
  const year = date.getFullYear();
  const month = (date.getMonth() + 1).toString().padStart(2, '0');
  const day = (date.getMonth() + 1).toString().padStart(2, '0');

  return `${year}-${month}-${day}`;
}
