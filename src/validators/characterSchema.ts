import * as yup from 'yup';

export const createCharacterValidationSchema = yup.object().shape({
  character: yup.object().shape({
    name: yup.string().required().min(3).max(50),
  }),
});
