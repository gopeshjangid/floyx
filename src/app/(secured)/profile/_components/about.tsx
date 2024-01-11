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
  SelectChangeEvent,
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
import { useParams } from 'next/navigation';
import CustomChip from '@/components/CustomGridientChip';
import { useSession } from 'next-auth/react';

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
      <Grid item sm={3} xs={12}>
        <InputLabel htmlFor={name}>{label}</InputLabel>
      </Grid>
      <Grid item sm={9} xs={12}>
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
            disabled={list.length === 3}
          />
        )}
        <Stack flexWrap={'wrap'} direction="row" gap={1}>
          {list.length > 0 ? (
            list.map((skill, index) => {
              if (isEdit) {
                return (
                  <CustomChip
                    onDelete={() => handleDeleteSkill(skill, activityKey)}
                    deleteIcon={<CloseIcon fontSize="small" />}
                    key={index}
                    label={skill}
                  />
                );
              }
              return <CustomChip key={index} label={skill} />;
            })
          ) : (
            <Typography variant="subtitle2">{`No ${name} available`}</Typography>
          )}
        </Stack>
      </Grid>
    </>
  );
};

type PersonalInfoType = {
  [key: string]: string | string[];
  location: string;
  website: string;
  skills: string[];
  description: string;
  interests: string[];
  languages: string[];
};

const PersonalInfo: React.FC = () => {
  const { palette } = useTheme();
  const params = useParams<{ username: string }>();
  const [isEdit, setIsEdit] = React.useState(false);
  const toast = useToast();
  const username = params?.username ?? '';
  const { data, isLoading } = useGetProfileAboutQuery(
    {
      username,
    },
    { skip: !params?.username }
  );
  const [
    updateAbout,
    { isLoading: isUpdating, error: aboutUpdateError, isSuccess: aboutSuccess },
  ] = useUpdateAboutInfoMutation();
  const session = useSession();
  const isSameuser =
    session.status !== 'loading' && session.data?.user.username === username;
  const [formValues, setFormValues] = React.useState<PersonalInfoType>({
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
      toast.success(`About info updated!`);
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

  // const [formErrors, setFormErrors] = React.useState<{ [key]: string }>({
  //   location: '',
  //   website: '',
  //   skills: [],
  //   description: '',
  //   interests: [],
  //   languages: [],
  // });

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
      [key]: ((formValues[key] as string[]) || []).filter(
        (chip: string) => chip !== chipToDelete
      ),
    });
  };

  const validate = () => {
    const errors: any = {};
    // if (!formValues.location) {
    //   errors.location = 'Location is required';
    // }
    // if (!formValues.website) {
    //   errors.website = 'Website is required';
    // }

    // Add other validation checks as needed
    //setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const addSkillHandler = (skill: string, key: string) => {
    const values = Array.isArray(formValues[key])
      ? [...(formValues[key] as string[]), skill]
      : [skill];
    setFormValues({
      ...formValues,
      [key]: values,
    });
  };

  const handleSubmit = (event: React.FormEvent<HTMLButtonElement>) => {
    event.preventDefault();
    if (!validate()) return;
    updateAbout(formValues);
  };

  const handleSelectChange = (event: SelectChangeEvent<string>) => {
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
  return (
    <>
      {isUpdating && (
        <Backdrop sx={{ color: '#fff', zIndex: 999 }} open={true}>
          <CircularProgress color="inherit" />
        </Backdrop>
      )}
      <form>
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
            {isSameuser && (
              <Stack gap={1} direction="row">
                {isEdit ? (
                  <>
                    <Button onClick={handleSubmit} variant="outlined">
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
            )}
          </Stack>
        </Box>
        <Grid container justifyContent={'center'} spacing={1}>
          <Grid xs={12} sm={3} item>
            {' '}
            <InputLabel htmlFor="Country">Location</InputLabel>
          </Grid>
          <Grid xs={12} sm={9} item>
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
          <Grid sm={3} xs={12} item>
            <InputLabel htmlFor="Country">Website</InputLabel>
          </Grid>
          <Grid xs={12} sm={9} item>
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
          <Grid xs={12} sm={3} item>
            <InputLabel
              sx={{ textAlign: 'left', py: 2 }}
              htmlFor="Type interest and press enter"
            >
              Description
            </InputLabel>
          </Grid>
          <Grid xs={12} item sm={9}>
            {isEdit ? (
              <TextareaAutosize
                name="country"
                placeholder="Enter description..."
                value={formValues.description}
                minRows={8}
                maxLength={200}
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

export default React.memo(AboutSection);
