



function parseDate(dateString) {
  const isoDate = dateString;
  const date = new Date(isoDate);
  const formatted = date.toISOString().slice(0, 10);

  return formatted;
}


function calculateTotal(check_in, check_out, rate_per_night) {
  const checkInDate = new Date(check_in);
  const checkOutDate = new Date(check_out);

  const nights = Math.ceil(
    (checkOutDate - checkInDate) / (1000 * 60 * 60 * 24)
  );

  return nights * rate_per_night;
}


module.exports = { parseDate, calculateTotal };