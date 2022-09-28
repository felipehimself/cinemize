import * as Yup from 'yup';

export const validationSchema = Yup.object().shape({
  name: Yup.string().required('Obrigatório'),
  email: Yup.string().required('Obrigatório').email('Email inválido'),
  city: Yup.string().trim().nullable().required('Obrigatório'),
  street: Yup.string().trim().nullable().required('Obrigatório'),
  number: Yup.number()
    .nullable()
    .typeError('O valor deve ser numérico')
    .required('Obrigatório'),
  zipCode: Yup.string().trim().nullable().required('Obrigatório').min(9, 'CEP inválido').max(9,'CEP Inválido'),
  additional: Yup.string().trim().nullable(),
  district: Yup.string().trim().nullable().required('Obrigatório'),
  federalUnit: Yup.string().trim().nullable().required('Obrigatório'),
});

export const loginValidation = Yup.object().shape({
  email: Yup.string().required('Obrigatório').email('Email inválido'),
  password: Yup.string().required('Obrigatório'),
});

export const signupValidation = Yup.object().shape({
  name: Yup.string().required('Obrigatório'),
  email: Yup.string().required('Obrigatório').email('Email inválido'),
  password: Yup.string()
    .required('Obrigatório')
    .min(6, 'Senha tem quer ter no mínimo 6 caracteres')
    .max(10, 'Senha tem quer ter no máximo 10 caracteres'),
});