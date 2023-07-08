import AppLayout from 'layout/app-layout';
import React, { useState } from 'react';
import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  NumberInputStepper,
  NumberDecrementStepper,
  NumberInputField,
  NumberIncrementStepper,
  NumberInput,
} from '@chakra-ui/react';
import { useFormik, FormikHelpers } from 'formik';
import * as yup from 'yup';
import DatePicker from 'react-datepicker';
import { FiEdit3 } from 'react-icons/fi';
import { useRouter } from 'next/router';
import { createMarketingStrategy } from 'apiSdk/marketing-strategies';
import { Error } from 'components/error';
import { marketingStrategyValidationSchema } from 'validationSchema/marketing-strategies';
import { AsyncSelect } from 'components/async-select';
import { ArrayFormField } from 'components/array-form-field';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { BusinessInterface } from 'interfaces/business';
import { getBusinesses } from 'apiSdk/businesses';
import { MarketingStrategyInterface } from 'interfaces/marketing-strategy';

function MarketingStrategyCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: MarketingStrategyInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createMarketingStrategy(values);
      resetForm();
      router.push('/marketing-strategies');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<MarketingStrategyInterface>({
    initialValues: {
      strategy: '',
      business_id: (router.query.business_id as string) ?? null,
    },
    validationSchema: marketingStrategyValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout>
      <Box bg="white" p={4} rounded="md" shadow="md">
        <Box mb={4}>
          <Text as="h1" fontSize="2xl" fontWeight="bold">
            Create Marketing Strategy
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <form onSubmit={formik.handleSubmit}>
          <FormControl id="strategy" mb="4" isInvalid={!!formik.errors?.strategy}>
            <FormLabel>Strategy</FormLabel>
            <Input type="text" name="strategy" value={formik.values?.strategy} onChange={formik.handleChange} />
            {formik.errors.strategy && <FormErrorMessage>{formik.errors?.strategy}</FormErrorMessage>}
          </FormControl>
          <AsyncSelect<BusinessInterface>
            formik={formik}
            name={'business_id'}
            label={'Select Business'}
            placeholder={'Select Business'}
            fetcher={getBusinesses}
            renderOption={(record) => (
              <option key={record.id} value={record.id}>
                {record?.name}
              </option>
            )}
          />
          <Button isDisabled={formik?.isSubmitting} colorScheme="blue" type="submit" mr="4">
            Submit
          </Button>
        </form>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'marketing_strategy',
    operation: AccessOperationEnum.CREATE,
  }),
)(MarketingStrategyCreatePage);
