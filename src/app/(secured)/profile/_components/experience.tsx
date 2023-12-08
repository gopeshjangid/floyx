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
  Backdrop,
  CircularProgress,
} from '@mui/material';

import {
  useAddExperienceMutation,
  useGetProfileAboutQuery,
  useUpdateExperienceMutation,
} from '@/lib/redux/slices/profile';
import ProfileActivityInfo from '@/components/ProfileActivityInfo';
import DynamicForm from './addEditActivity';
import { months, years } from '@/lib/utils';
import { useToast } from '@/components/Toast/useToast';
import { useParams } from 'next/navigation';

const elements = [
  {
    label: 'Position',
    name: 'position',
    type: 'text',
    options: { maxLength: 30 },
    xs: 9,
    componentProps: { inputProps: { maxLength: 30 } },
  },
  {
    label: 'Company',
    name: 'company',
    type: 'text',
    options: { maxLength: 30 },
    xs: 9,
    componentProps: { inputProps: { maxLength: 30 } },
  },

  {
    label: 'From',
    name: 'fromMonth',
    type: 'monthSelect',
    options: months,
    xs: 4.5,
  },
  {
    label: '',
    name: 'fromYear',
    type: 'yearSelect',
    options: years,
    xs: 4.5,
  },
  {
    label: 'To',
    name: 'toMonth',
    type: 'monthSelect',
    options: months,
    xs: 4.5,
  },
  {
    label: '',
    name: 'toYear',
    type: 'yearSelect',
    options: years,
    xs: 4.5,
  },
  {
    label: 'Description',
    name: 'description',
    type: 'text',
    options: { maxLength: 50 },
    xs: 9,
    componentProps: { inputProps: { maxLength: 50 }, minRows: 3 },
  },
];

const initialValues = {
  id: '',
  company: '',
  description: '',
  fromMonth: '',
  fromYear: '',
  period: '',
  position: '',
  toMonth: '',
  toYear: '',
};

const ExperienceForm: React.FC = () => {
  const toast = useToast();
  const params = useParams();
  const [action, setAction] = React.useState('');
  const { data, isError, isLoading, error } = useGetProfileAboutQuery({
    username: params.username,
  });

  const [addExperience, { isLoading: isAdding, error: addError, isSuccess }] =
    useAddExperienceMutation();

  const [
    updateExperience,
    { isLoading: isUpdating, error: updateError, isSuccess: isUpdateSuccess },
  ] = useUpdateExperienceMutation();

  const [formValues, setFormValues] = useState(initialValues);
  const handleSubmit = data => {
    if (formValues?.id) {
      updateExperience(data);
    } else {
      addExperience(data);
    }
  };

  useEffect(() => {
    if (isSuccess || isUpdateSuccess) {
      toast.success(`New Experience ${isUpdateSuccess ? 'Updated' : 'Added'}!`);
      setAction('');
    }
  }, [isSuccess, isUpdateSuccess]);

  useEffect(() => {
    if (addError || updateError) {
      toast.error(
        `Error Occured in ${updateError ? 'updating' : 'adding'} experience`
      );
    }
  }, [addError, updateError]);

  const onEditHandler = useCallback(
    data => {
      setAction('Edit');
      setFormValues(data);
    },
    [setAction, setFormValues]
  );

  const cancelHandler = useCallback(() => {
    setAction('');
    setFormValues({});
  }, [setFormValues, setAction]);

  if (isLoading) {
    return (
      <Skeleton
        animation="wave"
        width="100%"
        variant="rectangular"
        height="300px"
      />
    );
  }

  if (isError) return <Alert severity="error">Error occured: {error}</Alert>;

  if (action === '') {
    return (
      <Stack gap={2}>
        <Box py={2} width={'100%'}>
          <Grid spacing={2} container>
            <Grid textAlign="left" item xs={4}>
              <Typography variant="h5" color="textPrimary">
                Experience
              </Typography>
            </Grid>{' '}
            <Grid item xs={8} textAlign="right">
              <Button variant="outlined" onClick={() => setAction('ADD')}>
                Add New
              </Button>
            </Grid>
          </Grid>
        </Box>
        {data?.experiences ? (
          data?.experiences?.map((experience, index) => (
            <ProfileActivityInfo
              onEdit={onEditHandler}
              key={'experience-' + index}
              {...experience}
              type="Experience"
            />
          ))
        ) : (
          <Typography variant="subtitle1">
            No experience history available.
          </Typography>
        )}
      </Stack>
    );
  }

  return (
    <Box>
      {(isAdding || isUpdating) && (
        <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <React.Suspense
        fallback={
          <Typography variant="body2" color="warning">
            Loading...{' '}
          </Typography>
        }
      >
        {' '}
        <DynamicForm
          formElements={elements}
          initialValues={formValues}
          onSubmit={handleSubmit}
          onCancel={cancelHandler}
          title="Add New Experience"
        />
      </React.Suspense>
    </Box>
  );
};

const ExperienceSection: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:480px)');

  return (
    <Box sx={{ p: isMobile ? 0 : 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
      <Box p={2} textAlign="center">
        <ExperienceForm />
      </Box>
    </Box>
  );
};

export default React.memo(ExperienceSection);
