import * as Yup from 'yup';
 
 export const SigninSchema = Yup.object().shape({
   email: Yup.string().email('Invalid email').required('Email is required'),
   password: Yup.string()
    .min(7, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
    .required('Password is required'),
 });

 export const RegesterSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),

    password: Yup.string()
    .min(7, 'Password must be at least 8 characters')
    .max(20, 'Password cannot exceed 20 characters')
    .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
    .matches(/[0-9]/, 'Password must contain at least one number')
    .matches(/[!@#$%^&*]/, 'Password must contain at least one special character')
    .required('Password is required'),
  });