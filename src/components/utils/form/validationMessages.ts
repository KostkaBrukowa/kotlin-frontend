/* eslint no-template-curly-in-string: 0 */

export const validateMessages = {
  required: 'To pole musi zostać wypełnione.',
  string: {
    min: 'Pole nie może mieć mniej niż ${min} znaków.',
    max: 'Pole nie może mieć więcej niż ${max} znaków.',
    range: 'Długość pola musi zawierać się między ${min} a ${max} znaków.',
  },
  array: {
    len: 'Pole musi mieć ${len} elementów.',
    min: 'Pole musi mieć więcej niż ${min} elementów.',
    max: 'Pole musi mieć mniej niż ${max} elementów.',
    range: 'Pole musi mieć między ${min} a ${max} elementów.',
  },
  types: {
    email: 'Email jest niepoprawny.',
  },
};
