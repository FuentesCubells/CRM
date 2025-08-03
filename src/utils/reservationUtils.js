



function parseDate(dateString) {
  const isoDate = dateString;
  const date = new Date(isoDate);
  const formatted = date.toISOString().slice(0, 10);

  return formatted;
}

module.exports = { parseDate };