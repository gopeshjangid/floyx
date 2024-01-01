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
  CircularProgress,
  Backdrop,
} from '@mui/material';

import {
  useAddEducationMutation,
  useGetProfileAboutQuery,
  useUpdateEducationMutation,
} from '@/lib/redux/slices/profile';
import ProfileActivityInfo from '@/components/ProfileActivityInfo';
import DynamicForm from './addEditActivity';
import { months, years } from '@/lib/utils';
import { useToast } from '@/components/Toast/useToast';
import { useParams } from 'next/navigation';
import { Education } from '@/components/ProfileActivityInfo';
import { useSession } from 'next-auth/react';
const elements = [
  {
    label: 'School',
    name: 'school',
    type: 'text',
    xs: 9,
    componentProps: { inputProps: { maxLength: 30 } },
  },
  {
    label: 'Field',
    name: 'field',
    type: 'text',
    xs: 9,
    componentProps: { inputProps: { maxLength: 30 } },
  },
  {
    label: 'Type',
    name: 'type',
    type: 'text',
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
];

const initialValues = {
  id: '',
  school: '',
  field: '',
  type: '',
  fromMonth: '',
  fromYear: '',
  toMonth: '',
  toYear: '',
};

const EducationForm: React.FC = () => {
  const toast = useToast();
  const params = useParams<{ username: string }>();
  const [action, setAction] = React.useState('');

  const username = params?.username ?? '';
  const { data, isError, isLoading, error } = useGetProfileAboutQuery(
    {
      username,
    },
    { skip: !params?.username }
  );

  const [addEducation, { isLoading: isAdding, error: addError, isSuccess }] =
    useAddEducationMutation();
  const session = useSession();
  const isSameuser =
    session.status !== 'loading' && session.data?.user.username === username;
  const [
    updateEducation,
    { isLoading: isUpdating, error: updateError, isSuccess: isUpdateSucess },
  ] = useUpdateEducationMutation();

  const [formValues, setFormValues] = useState<Education & { id?: string }>(
    initialValues
  );
  const handleSubmit = (data: Partial<Education>) => {
    if (formValues.id) {
      updateEducation(data);
    } else {
      addEducation(data);
    }
  };

  useEffect(() => {
    if (isSuccess || isUpdateSucess) {
      toast.success(
        isUpdateSucess ? 'Education updated!' : `New Education Added!`
      );
      setAction('');
    }
  }, [isSuccess, isUpdateSucess]);

  useEffect(() => {
    if (addError || updateError) {
      toast.error(
        `Error Occured in ${updateError ? 'updating' : 'adding'} education`
      );
    }
  }, [addError, updateError]);

  const onEditHandler = useCallback(
    (data: Education) => {
      setAction('Edit');
      setFormValues(data);
    },
    [setAction, setFormValues]
  );

  const cancelHandler = useCallback(() => {
    setAction('');
    setFormValues(initialValues);
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
                Education
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
        {data?.educations && data?.educations.length > 0 ? (
          data?.educations?.map((education, index) => (
            <ProfileActivityInfo
              onEdit={onEditHandler}
              key={'education-' + index}
              {...education}
              type="Education"
            />
          ))
        ) : (
          <Typography variant="subtitle1">
            No education history available.
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
        <DynamicForm
          formElements={elements}
          initialValues={formValues}
          onSubmit={handleSubmit}
          onCancel={cancelHandler}
          title="Add New Education"
        />
      </React.Suspense>
    </Box>
  );
};

// Example usage of the styled components
const EducationSection: React.FC = () => {
  const isMobile = useMediaQuery('(max-width:480px)');

  return (
    <Box sx={{ p: isMobile ? 0 : 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
      <Box p={2} textAlign="center">
        <EducationForm />
      </Box>
    </Box>
  );
};

export default React.memo(EducationSection);
