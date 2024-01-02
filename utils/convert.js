const formatToCurrency = (number) => {
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(number)

  return formattedNumber
}

const formatToDate = (date) => {
  const dates = new Date(date)

  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    timeZone: 'Asia/Jakarta',
  }

  const formattedDate = dates.toLocaleString('id-ID', options)

  return formattedDate
}

export { formatToCurrency, formatToDate }
