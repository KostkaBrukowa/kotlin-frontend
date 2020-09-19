/* eslint no-template-curly-in-string: 0 */

export const validateMessages = {
  required: 'To pole musi zostać wypełnione.',
  string: {
    min: '${name} nie może mieć mniej niż ${min} znaków.',
    max: '${name} nie może mieć więcej niż ${max} znaków.',
    range: 'Długość pola musi zawierać się między ${min} a ${max} znaków.',
  },
  array: {
    len: "'${name}' musi mieć ${len} elementów.",
    min: "'${name}' musi mieć więcej niż ${min} elementów.",
    max: "'${name}' musi mieć mniej niż ${max} elementów.",
    range: "'${name}' musi mieć między ${min} a ${max} elementów",
  },
};
