import * as Yup from 'yup';

export const loginValidation = Yup.object().shape({
  email: Yup.string().trim().required('Obrigatório').email('Email inválido'),
  password: Yup.string().required('Obrigatório'),
});

export const signupValidation = Yup.object().shape({
  name: Yup.string().trim().required('Obrigatório'),
  email: Yup.string().trim().required('Obrigatório').email('Email inválido'),
  password: Yup.string()
    .trim()
    .required('Obrigatório')
    .min(6, 'Senha tem quer ter no mínimo 6 caracteres')
    .max(10, 'Senha tem quer ter no máximo 10 caracteres'),
});

export const profileValidation = Yup.object().shape({
  userName: Yup.string()
    .trim()
    .max(20, 'Nome de usuário não pode ter mais que 20 caracteres'),
  name: Yup.string().trim().max(30, 'Nome não pode ter mais que 30 caracteres'),
  description: Yup.string()
    .trim()
    .max(60, 'Bio não pode ter mais que 60 caracteres'),
  location: Yup.string()
    .trim()
    .max(20, 'Localização não pode ter mais que 20 caracteres'),
});

export const postValidation = Yup.object().shape({
  type: Yup.mixed().oneOf(['filme', 'série']).defined().required(),
  title: Yup.string().trim().max(30).required(),
  comment: Yup.string().trim().max(460).required(),
  whereToWatch: Yup.array().min(1).of(Yup.string().required()).required(),
  genre: Yup.array().min(1).of(Yup.string().required()).required(),
});
