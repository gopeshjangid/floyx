/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import {
  Box,
  Grid,
  Typography,
  Paper,
  Chip,
  styled,
  InputLabel,
  Stack,
  useMediaQuery,
  Button,
  useTheme,
  Skeleton,
  Backdrop,
  CircularProgress,
  FormControl,
  Select,
  MenuItem,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ExperienceSection from './experience';
import EducationSection from './education';
import InterestSection from './investment';
import TextField from '@/components/CustomTextField';
import { BorderColorOutlined } from '@mui/icons-material';
import {
  useGetProfileAboutQuery,
  useUpdateAboutInfoMutation,
} from '@/lib/redux/slices/profile';
import { useToast } from '@/components/Toast/useToast';
import TextareaAutosize from '@/components/CustomTextArea';

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: '16px', // Adjust the border-radius for rounded corners
  padding: theme.spacing(0.5, 1), // Use theme spacing for consistent padding
  margin: theme.spacing(0.5), // Use theme spacing for consistent margins
  backgroundColor:
    theme.palette.mode === 'dark' ? 'rgba(87, 152, 255, 0.13)' : '#bbdefb', // Dark blue for dark mode, light blue for light mode
  color:
    theme.palette.mode === 'dark'
      ? theme.palette.primary.main
      : theme.palette.primary.main, // Lighter text for dark mode, dark text for light mode
  '& .MuiChip-label': {
    padding: theme.spacing(0, 1), // Use theme spacing inside the chip
  },
  '& .MuiChip-deleteIcon': {
    color:
      theme.palette.mode === 'dark'
        ? theme.palette.primary.main
        : theme.palette.primary.main, // Same as text color
    '&:hover': {
      color: theme.palette.mode === 'dark' ? '#fff' : '#546e7a', // Lighter on hover for dark mode, darker for light mode
    },
  },
}));

type ActivityChipEditInfoProps = {
  label: string;
  list: string[];
  value: string;
  name: string;
  activityKey: string;
  isEdit: boolean;
  handleInputChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleDeleteSkill: (skill: string, key: string) => void;
  handleAddSkill: (skill: string, key: string) => void; // New prop for adding skills
};

const ActivityChipEditInfo: React.FC<ActivityChipEditInfoProps> = ({
  label,
  list,
  value,
  activityKey,
  name,
  isEdit,
  handleDeleteSkill,
  handleAddSkill, // Ensure this is passed from the parent component
}) => {
  const [form, setForm] = React.useState('');
  // Handle the key press event to add a new skill
  const handleSkillKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && form) {
      e.preventDefault(); // Prevent form submission
      handleAddSkill(form, activityKey);
      setForm('');
    }
  };

  const handleInputChange = (event: any) => {
    const { value } = event.target;
    setForm(value);
  };
  return (
    <>
      <Grid item xs={3}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
      </Grid>
      <Grid item xs={9}>
        {isEdit && (
          <TextField
            fullWidth
            variant="outlined"
            name={name}
            placeholder={`Type ${name} and press enter`}
            value={form}
            inputProps={{ maxLength: 20 }}
            onChange={handleInputChange}
            onKeyUp={handleSkillKeyPress}
          />
        )}
        {list.map((skill, index) => {
          if (isEdit) {
            return (
              <StyledChip
                onDelete={() => handleDeleteSkill(skill, activityKey)}
                deleteIcon={<CloseIcon fontSize="small" />}
                key={index}
                label={skill}
              />
            );
          }
          return <StyledChip key={index} label={skill} />;
        })}
      </Grid>
    </>
  );
};

const PersonalInfo: React.FC = () => {
  const { palette } = useTheme();
  const [isEdit, setIsEdit] = React.useState(false);
  const toast = useToast();
  const { data, isError, isLoading, error } = useGetProfileAboutQuery({
    username: 'saddam_beta',
  });
  const [
    updateAbout,
    { isLoading: isUpdating, error: aboutUpdateError, isSuccess: aboutSuccess },
  ] = useUpdateAboutInfoMutation();
  const [formValues, setFormValues] = React.useState({
    location: '',
    website: '',
    skills: [],
    description: '',
    interests: [],
    languages: [],
  });

  React.useEffect(() => {
    if (aboutSuccess) {
      setIsEdit(false);
      toast.success(`About info updated'}!`);
    }
  }, [aboutSuccess]);

  React.useEffect(() => {
    if (aboutUpdateError) {
      toast.error(`Error occured in updating about info !`);
    }
  }, [aboutUpdateError]);

  React.useEffect(() => {
    if (data) {
      const about = data.about;
      setFormValues({
        ...formValues,
        location: about?.location || '',
        website: about?.website || '',
        skills: about?.skills || [],
        description: about?.description || '',
        interests: about?.interests || [],
        languages: about?.languages || [],
      });
    }
  }, [data]);

  const [formErrors, setFormErrors] = React.useState({});

  const handleInputChange = (event: any) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

  const handleDeleteChip = (chipToDelete: string, key: string) => {
    setFormValues({
      ...formValues,
      [key]: (formValues[key] || []).filter(chip => chip !== chipToDelete),
    });
  };

  const validate = () => {
    let errors = {};
    if (!formValues.location) {
      errors.location = 'Location is required';
    }
    if (!formValues.location) {
      errors.location = 'Location is required';
    }
    if (!formValues.location) {
      errors.location = 'Location is required';
    }
    // Add other validation checks as needed
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addSkillHandler = (skill: string, key: string) => {
    setFormValues({
      ...formValues,
      [key]: [...(formValues[key] ?? {}), skill],
    });
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (!validate()) return;
    updateAbout(formValues);
  };

  const handleSelectChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormValues({
      ...formValues,
      [name]: value,
    });
  };

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
  console.log('formvalues', formValues);
  return (
    <>
      {isUpdating && (
        <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <form onSubmit={handleSubmit}>
        <Box
          py={2}
          mb={3}
          width={'100%'}
          sx={{ borderColor: 'rgba(255, 255, 255, 0.15)' }}
        >
          <Stack
            gap={3}
            justifyContent="space-between"
            alignItems="center"
            display="flex"
            direction="row"
          >
            <Typography variant="h5" color="textPrimary">
              About
            </Typography>
            <Stack gap={1} direction="row">
              {isEdit ? (
                <>
                  <Button variant="outlined" onClick={handleSubmit}>
                    Save
                  </Button>
                  <Button onClick={() => setIsEdit(false)} variant="text">
                    Cancel
                  </Button>
                </>
              ) : (
                <Button
                  sx={{ borderRadius: '29px' }}
                  startIcon={<BorderColorOutlined />}
                  variant="outlined"
                  onClick={() => setIsEdit(true)}
                >
                  Edit Section
                </Button>
              )}
            </Stack>
          </Stack>
        </Box>
        <Grid container justifyContent={'center'} spacing={2}>
          <Grid xs={3} item>
            {' '}
            <InputLabel htmlFor="Country">Location</InputLabel>
          </Grid>
          <Grid xs={9} item>
            {' '}
            <FormControl fullWidth>
              <Select
                name={'location'}
                disabled={!isEdit}
                value={formValues.location}
                defaultValue={formValues.location}
                onChange={handleSelectChange}
              >
                <MenuItem disabled value="">
                  <em>Select</em>
                </MenuItem>
                {data?.listOfLocations?.map((option: string) => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid xs={3} item>
            {' '}
            <InputLabel htmlFor="Country">Website</InputLabel>
          </Grid>
          <Grid xs={9} item>
            {' '}
            <TextField
              variant="outlined"
              name="website"
              disabled={!isEdit}
              placeholder="Ex. Canada"
              value={formValues.website}
              onChange={handleInputChange}
            />
          </Grid>
          <ActivityChipEditInfo
            handleDeleteSkill={handleDeleteChip}
            name="skill"
            list={formValues.skills}
            value=""
            label="Skill"
            handleInputChange={handleInputChange}
            isEdit={isEdit}
            handleAddSkill={addSkillHandler}
            activityKey={'skills'}
          />
          <Grid xs={12} item>
            <InputLabel
              sx={{ textAlign: 'left', py: 2 }}
              htmlFor="Type interest and press enter"
            >
              Description
            </InputLabel>
            {isEdit ? (
              <TextareaAutosize
                name="country"
                placeholder="Enter description..."
                value={formValues.description}
                minRows={4}
              />
            ) : (
              <Box sx={{ border: `1px solid ${palette.action.border}` }} p={2}>
                <Typography variant="subtitle2">
                  {formValues.description}
                </Typography>
              </Box>
            )}
          </Grid>
          <ActivityChipEditInfo
            handleDeleteSkill={handleDeleteChip}
            list={formValues.interests}
            value=""
            label="Interested In"
            name="interests"
            handleInputChange={handleInputChange}
            isEdit={isEdit}
            handleAddSkill={addSkillHandler}
            activityKey={'interests'}
          />
          <ActivityChipEditInfo
            handleDeleteSkill={handleDeleteChip}
            list={formValues.languages}
            value=""
            label="Languages"
            name="language"
            handleInputChange={handleInputChange}
            isEdit={isEdit}
            activityKey={'languages'}
            handleAddSkill={addSkillHandler}
          />
        </Grid>
      </form>
    </>
  );
};
// Example usage of the styled components
const AboutSection: React.FC = () => {
  const [_value, setValue] = React.useState(0);
  const { palette } = useTheme();
  const isMobile = useMediaQuery('(max-width:480px)');

  return (
    <Box sx={{ p: isMobile ? 0 : 3 }}>
      <Paper
        sx={{
          backgroundColor: palette.primary[700],
          borderRadius: '10px',
          border: '1px solid ' + palette.action['border'],
        }}
      >
        <Box p={2} textAlign="justify">
          <React.Suspense
            fallback={
              <Skeleton
                width="100%"
                height="300px"
                variant="rectangular"
                animation="wave"
              />
            }
          >
            <PersonalInfo />
          </React.Suspense>
        </Box>
      </Paper>
      <Paper
        sx={{
          backgroundColor: palette.primary[700],
          borderRadius: '10px',
          border: '1px solid ' + palette.action['border'],
          marginTop: 2,
        }}
      >
        <React.Suspense
          fallback={
            <Skeleton
              width="100%"
              height="300px"
              variant="rectangular"
              animation="wave"
            />
          }
        >
          <ExperienceSection />
        </React.Suspense>
      </Paper>

      <Paper
        sx={{
          backgroundColor: palette.primary[700],
          borderRadius: '10px',
          border: '1px solid ' + palette.action['border'],
          marginTop: 2,
        }}
      >
        <React.Suspense
          fallback={
            <Skeleton
              width="100%"
              height="300px"
              variant="rectangular"
              animation="wave"
            />
          }
        >
          <EducationSection />
        </React.Suspense>
      </Paper>
      <Paper
        sx={{
          backgroundColor: palette.primary[700],
          borderRadius: '10px',
          border: '1px solid ' + palette.action['border'],
          marginTop: 2,
        }}
      >
        <React.Suspense
          fallback={
            <Skeleton
              width="100%"
              height="300px"
              variant="rectangular"
              animation="wave"
            />
          }
        >
          <InterestSection />
        </React.Suspense>
      </Paper>
    </Box>
  );
};

export default AboutSection;
