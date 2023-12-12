const formatToCurrency = (number) => {
  const formattedNumber = new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
  }).format(number);

  return formattedNumber;
};

export default formatToCurrency;
