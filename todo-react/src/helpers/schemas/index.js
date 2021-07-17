import * as Yup from 'yup';
import {
  alphanumRegExp,
  emailRegExp,
  passwordRegExp,
} from '../regexps';

export const signInSchema = Yup.object().shape({
  username: Yup.string().trim().required('Nazwa użytkownika jest wymagana.'),
  password: Yup.string().trim().required('Hasło jest wymagane.'),
});

export const signUpSchema = Yup.object().shape({
  username: Yup.string()
    .trim()
    .min(3, 'Nazwa użytkownika musi mieć minimum 3 znaki.')
    .max(32, 'Nazwa użytkownika może mieć maksymalnie 32 znaków.')
    .matches(
      alphanumRegExp,
      'Nazwa użytkownika może zawierać tylko cyfry i litery.',
    )
    .required('Nazwa użytkownika jest wymagana.'),
  email: Yup.string()
    .trim()
    .matches(emailRegExp, 'Adres email jest nieprawidłowy.')
    .required('Adres email jest wymagany.'),
  gender: Yup.string()
    .trim()
    .lowercase()
    .oneOf(['male', 'female'], 'Wybierz płeć z podanych.')
    .required('Płeć jest wymagana.'),
  password: Yup.string()
    .trim()
    .min(8, 'Hasło musi mieć minimum 8 znaków.')
    .max(32, 'Hasło może mieć maksymalnie 32 znaki.')
    .matches(
      passwordRegExp,
      'Hasło musi zawierać małą i dużą literę, cyfrę i znak specjalny.',
    )
    .required('Hasło jest wymagane.'),
  confirm_password: Yup.string()
    .trim()
    .oneOf([Yup.ref('password'), null], 'Hasła nie są takie same.')
    .required('Musisz powtórzyć hasło.'),
  terms_of_use_accepted: Yup.boolean()
    .oneOf([true], 'Musisz zaakceptować regulamin.')
    .required('Zaakceptowanie regulaminu jest wymagane.'),
});
