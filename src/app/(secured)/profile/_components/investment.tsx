/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import React, { useCallback, useEffect, useState } from 'react';
import {
  Box,
  Grid,
  Typography,
  Stack,
  useMediaQuery,
  Button,
  Alert,
  Skeleton,
} from '@mui/material';

import {
  useAddInvestmentMutation,
  useGetProfileAboutQuery,
  useUpdateInvestmentMutation,
} from '@/lib/redux/slices/profile';
import ProfileActivityInfo, { Project } from '@/components/ProfileActivityInfo';
import DynamicForm from './addEditActivity';
import { useToast } from '@/components/Toast/useToast';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';

const elements = [
  {
    label: 'Name',
    name: 'name',
    type: 'text',
    xs: 9,
    componentProps: { inputProps: { maxLength: 30 } },
  },
  {
    label: 'Year',
    name: 'year',
    type: 'text',
    xs: 9,
    componentProps: { inputProps: { maxLength: 30 } },
  },

  {
    label: 'Description',
    name: 'description',
    type: 'text',
    xs: 9,
    componentProps: { inputProps: { maxLength: 50 }, minRows: 3 },
  },
];

const initialValues = {
  id: '',
  name: '',
  phase: '',
  quantity: '',
  year: '',
  description: '',
  tags: '',
};

type InvestMentType = Project;

type FormValues = {
  [key: string]: string;
};
const InvestmentForm: React.FC = () => {
  const toast = useToast();
  const params = useParams();
  const [action, setAction] = React.useState('');
  const username = Array.isArray(params?.username)
    ? params?.username[0] ?? ''
    : params?.username || '';

  const { data, isError, isLoading, error } = useGetProfileAboutQuery(
    {
      username: username!,
    },
    { skip: !username }
  );
  const session = useSession();
  const isSameuser =
    session.status !== 'loading' && session.data?.user.username === username;
  const [addInvestment, { isLoading: isAdding, error: addError, isSuccess }] =
    useAddInvestmentMutation();
  const [
    updateInvestment,
    {
      // isLoading: isUpdating,
      // isError: isUpdateError,
      error: updateError,
      isSuccess: isUpdateSuccess,
    },
  ] = useUpdateInvestmentMutation();

  const [formValues, setFormValues] = useState<FormValues>({});
  const handleSubmit = (data: Partial<InvestMentType>) => {
    if (formValues?.id) {
      updateInvestment(data);
    } else {
      addInvestment({ ...data, phase: '', quantity: '', tags: [] });
    }
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      toast.success(`New Investment ${isUpdateSuccess ? 'Updated' : 'Added'}!`);
      setAction('');
    }
  }, [isSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (addError || updateError) {
      toast.error(
        `Error Occured in ${updateError ? 'updating' : 'adding'} investment`
      );
    }
  }, [addError, updateError]);

  const onEditHandler = useCallback(
    (data: FormValues) => {
      setAction('Edit');
      setFormValues(data);
    },
    [setAction, setFormValues]
  );

  const cancelHandler = useCallback(() => {
    setAction('');
    setFormValues(initialValues);
  }, [setFormValues, setAction]);

  if (isLoading || isAdding) {
    return (
      <Skeleton
        animation="wave"
        width="100%"
        variant="rectangular"
        height="300px"
      />
    );
  }

  if (isError)
    return (
      <Alert severity="error">Error occured: {JSON.stringify(error)}</Alert>
    );

  if (action === '') {
    return (
      <Stack gap={3}>
        <Box p={1} width={'100%'}>
          <Grid spacing={2} container>
            <Grid textAlign="left" item xs={4}>
              <Typography variant="h5" color="textPrimary">
                Investment
              </Typography>
            </Grid>{' '}
            <Grid item xs={8} textAlign="right">
              {isSameuser ? (
                <Button variant="outlined" onClick={() => setAction('ADD')}>
                  Add New
                </Button>
              ) : (
                ''
              )}
            </Grid>
          </Grid>
        </Box>
        {data?.investments && data?.investments.length > 0 ? (
          data?.investments?.map((investment, index) => (
            <ProfileActivityInfo
              onEdit={onEditHandler}
              key={'investment-' + index}
              {...investment}
              type="Investment"
              isSameuser={isSameuser}
            />
          ))
        ) : (
          <Typography variant="subtitle1">
            No investment history available.
          </Typography>
        )}
      </Stack>
    );
  }

  return (
    <Box>
      <DynamicForm
        formElements={elements}
        initialValues={formValues}
        onSubmit={handleSubmit}
        onCancel={cancelHandler}
        title="Add New Investment"
      />
    </Box>
  );
};

const InvestmentSection: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:480px)');

  return (
    <Box sx={{ p: isMobile ? 0 : 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
      <Box p={2} textAlign="center">
        <InvestmentForm />
      </Box>
    </Box>
  );
};

export default React.memo(InvestmentSection);
