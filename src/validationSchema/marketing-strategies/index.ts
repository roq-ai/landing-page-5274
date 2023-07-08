import * as yup from 'yup';

export const marketingStrategyValidationSchema = yup.object().shape({
  strategy: yup.string().required(),
  business_id: yup.string().nullable().required(),
});
