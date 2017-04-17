export function getMonthData(entries) {
  //input: array of entries
  //output: [{January: [id, id]}]
  const months = {};

  entries.forEach(entry => {
    const month = entry.created.split('-')[1];
    months[month] ? months[month].push(entry.id) : months[month] = [entry.id];
  })

  return months;
}

export const monthToEnglish = {
  '01': 'January',
  '02': 'February',
  '03': 'March',
  '04': 'April',
  '05': 'May',
  '06': 'June',
  '07': 'July',
  '08': 'August',
  '09': 'September',
  '10': 'October',
  '11': 'November',
  '12': 'December'
}