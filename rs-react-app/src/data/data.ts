import type { DataFromForm } from '@/types/interfaces';

export const defaultFormData: DataFromForm = {
  name: '',
  age: 0,
  email: '',
  password: '',
  confirmPassword: '',
  gender: '',
  accept: false,
  picture: '',
  country: '',
};

export const strengthLabels = ['Weak', 'Fair', 'Good', 'Strong'];
export const colors = [
  'text-red-600/100',
  'text-orange-600/100',
  'text-yellow-600/100',
  'text-green-600/100',
];
