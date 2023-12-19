import * as Yup from 'yup';

export const validationSchema = Yup.object({
  email: Yup.string().email('Введите корректный email'),
  password: Yup.string().min(5, 'Пароль должен содержать минимум 5 символов'),

  confirmpassword: Yup.string().oneOf([Yup.ref('password')], 'Пароли должны совпадать'),
  phone: Yup.string().length(12, 'Неверный формат номера').nullable(),
  name: Yup.string().matches(/^[А-Яа-яЁё\s]+$/, 'Введите Ваше имя на русском языке'),
  city: Yup.string().matches(/^[А-Яа-яЁё\s]+$/, 'Укажите город на русском языке')
});

export const validationClientSchema = Yup.object({
  email: Yup.string().email('Введите корректный email'),
  phone: Yup.string().length(12, 'Неверный формат номера'),
  name: Yup.string().matches(/^[А-Яа-яЁё\s]+$/, 'Введите ФИО на русском языке'),
  dolgnost: Yup.string().oneOf(['Владелец', 'Администратор', 'Менеджер'], 'Выберите должность'),
  filial: Yup.string().required('Выберите филиал')
});

export const validationClientAddSchema = Yup.object({
  email: Yup.string().email('Введите корректный email'),
  phone: Yup.string().length(12, 'Неверный формат номера').required('Введите телефон'),
  name: Yup.string()
    .matches(/^[А-Яа-яЁё\s]+$/, 'Введите ФИО на русском языке')
    .required('Введите ФИО')
});

export const validationEmployeeSchema = Yup.object({
  email: Yup.string().email('Введите корректный email').required('Введите email'),
  phone: Yup.string().length(12, 'Неверный формат номера').required('Введите телефон'),
  fio: Yup.string()
    .matches(/^[А-Яа-яЁё\s]+$/, 'Введите ФИО на русском языке')
    .required('Введите ФИО'),
  idfilial: Yup.string().required('Выберите филиал'),
  role: Yup.string().required('Выберите роль')
});

export const validationPasswordSchema = Yup.object({
  password: Yup.string().min(5, 'Введите минимум 5 символов').required('Введите пароль'),
  confirmpassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли должны совпадать')
    .required('Введите пароль повторно')
});

export const validationServiceWithGroupSchema = Yup.object({
  name: Yup.string().required('Введите название'),
  duration: Yup.number().required('Введите длительность').min(1, 'Минимальная длительность 1').max(1440, 'Максимальная длительность 1440 минут'),
  seatsmin: Yup.number().min(2, 'Min вместимость 1').max(999, 'Max вместимость 999').required('Введите значение'),
  seatsmax: Yup.number()
    .min(2, 'Min вместимость 2')
    .max(999, 'Max вместимость 999')
    //@ts-ignore
    .when(['seatsmin'], (seatsmin: number, schema: Yup.NumberSchema<number | undefined>) => {
      return schema.min(seatsmin, 'Max вместимость должна быть больше или равна Min') as Yup.NumberSchema<number | undefined>;
    })
    .required('Введите значение')
});
export const validationRecordingModal = Yup.object({
  subproductId: Yup.string().required('Введите название'),
  productId: Yup.string().required('Введите название'),
  resourceId: Yup.string().required('Введите название'),
  name: Yup.string().matches(/^[А-Яа-яЁё\s]+$/, 'Введите ФИО на русском языке'),
  phone: Yup.string().length(12, 'Неверный формат номера').required('Введите телефон')
});
