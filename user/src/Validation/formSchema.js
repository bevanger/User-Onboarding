import * as yup from 'yup'

const formSchema =yup.object().shape({
    name: yup
        .string()
        .trim()
        .required('name is required'),
    email: yup
        .string()
        .email('Must be a valid email address')
        .required('Email is required'),
    password: yup 
        .string()
        .min(3)
        .max(16),
    terms: yup
    .boolean()
    .oneOf([true], 'You must accept the terms and conditions'),
})

export default formSchema;