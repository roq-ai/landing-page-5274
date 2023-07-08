import * as yup from 'yup';

export const landingPageValidationSchema = yup.object().shape({
  design: yup.string().required(),
  business_id: yup.string().nullable().required(),
});
