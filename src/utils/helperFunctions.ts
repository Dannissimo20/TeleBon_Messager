export const transformStringCountServices = (count: number) => {
  let transformedString = '';
  if (count % 10 === 1 && (count < 10 || count > 20)) {
    transformedString = 'услугу';
  } else if (count % 10 >= 2 && count % 10 <= 4 && (count < 10 || count > 20)) {
    transformedString = 'услуги';
  } else if (((count % 10 >= 5 && count % 10 <= 9) || count % 10 === 0) && (count < 10 || count > 20)) {
    transformedString = 'услуг';
  } else {
    transformedString = 'услуг';
  }

  return transformedString;
};

export const getNumberCompleteYears = (date: string) => {
  if (!date) {
    return 'Дата не указана';
  }
  const birthdate = new Date(date);
  const currentdate = new Date();

  let age = currentdate.getFullYear() - birthdate.getFullYear();
  let ageStr = '';
  if (
    currentdate.getMonth() < birthdate.getMonth() ||
    (currentdate.getMonth() === birthdate.getMonth() && currentdate.getDate() < birthdate.getDate())
  ) {
    age--;
  }

  if (age % 10 === 1 && (age < 10 || age > 20)) {
    ageStr = ' год';
  } else if (age % 10 >= 2 && age % 10 <= 4 && (age < 10 || age > 20)) {
    ageStr = ' года';
  } else if (((age % 10 >= 5 && age % 10 <= 9) || age % 10 === 0) && (age < 10 || age > 20)) {
    ageStr = ' лет';
  } else {
    ageStr = ' лет';
  }

  return age + ageStr;
};
