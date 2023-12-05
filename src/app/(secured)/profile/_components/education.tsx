/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';
import * as React from 'react';
import {
  Box,
  Grid,
  Typography,
  IconButton,
  Chip,
  styled,
  InputLabel,
  Checkbox,
  TextField,
  Stack,
  useMediaQuery,
  FormControlLabel,
  Button,
  TextareaAutosize,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
interface SearchCriteria {
  name: string;
  country: string;
  skill: string;
  skills: string[];
  professionalExperience: boolean;
}

const StyledChip = styled(Chip)(({ theme }) => ({
  borderRadius: '4px', // Adjust the border-radius for rounded corners
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

const SearchComponent: React.FC = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = React.useState<SearchCriteria>({
    name: '',
    country: '',
    skill: '',
    skills: [],
    professionalExperience: false,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, checked, type } = e.target;
    setSearchCriteria({
      ...searchCriteria,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handleSkillKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchCriteria.skill.trim() !== '') {
      setSearchCriteria({
        ...searchCriteria,
        skills: [...searchCriteria.skills, searchCriteria.skill],
        skill: '', // Clear the input after adding
      });
      e.preventDefault();
    }
  };

  const handleDeleteSkill = (skillToDelete: string) => {
    setSearchCriteria(prevCriteria => ({
      ...prevCriteria,
      skills: prevCriteria.skills.filter(skill => skill !== skillToDelete),
    }));
  };

  return (
    <Grid container justifyContent={'center'} spacing={2}>
      <Grid xs={3} item>
        {' '}
        <InputLabel htmlFor="Name">Name</InputLabel>
      </Grid>
      <Grid xs={9} item>
        {' '}
        <TextField
          variant="outlined"
          name="name"
          placeholder="Ex. Dustin Max"
          value={searchCriteria.name}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid xs={3} item>
        {' '}
        <InputLabel htmlFor="Country">Country</InputLabel>
      </Grid>
      <Grid xs={9} item>
        {' '}
        <TextField
          variant="outlined"
          name="country"
          placeholder="Ex. Canada"
          value={searchCriteria.country}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid xs={3} item>
        {' '}
        <InputLabel htmlFor="Skill">Skill</InputLabel>
      </Grid>
      <Grid xs={9} item>
        <TextField
          variant="outlined"
          name="skill"
          placeholder="Type skill and press enter"
          value={searchCriteria.skill}
          onChange={handleInputChange}
          onKeyUp={handleSkillKeyPress}
        />
        {searchCriteria.skills.map((skill, index) => (
          <StyledChip
            deleteIcon={<CloseIcon fontSize="small" />}
            onDelete={() => handleDeleteSkill(skill)}
            key={index}
            label={skill}
          />
        ))}
      </Grid>

      <Grid xs={12} item>
        <InputLabel htmlFor="Type interest and press enter">
          Description
        </InputLabel>
        <TextareaAutosize
          variant="outlined"
          name="country"
          placeholder="Enter description..."
          value={searchCriteria.country}
          minRows={5}
          sx={{ width: '100%' }}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid xs={3} item>
        {' '}
        <InputLabel htmlFor="Country">Interested in</InputLabel>
      </Grid>
      <Grid xs={9} item>
        {' '}
        <TextField
          variant="outlined"
          name="country"
          placeholder="Type interest and press enter"
          value={searchCriteria.country}
          onChange={handleInputChange}
        />
      </Grid>
      <Grid xs={3} item>
        {' '}
        <InputLabel htmlFor="Country">Language</InputLabel>
      </Grid>
      <Grid xs={9} item>
        {' '}
        <TextField
          variant="outlined"
          name="country"
          placeholder="Type language and press enter"
          value={searchCriteria.country}
          onChange={handleInputChange}
        />
      </Grid>
    </Grid>
  );
};

// Example usage of the styled components
const EducationSection: React.FC = () => {
  const [_value, setValue] = React.useState(0);
  const isMobile = useMediaQuery('(max-width:480px)');
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  return (
    <Box sx={{ p: isMobile ? 0 : 3, borderColor: 'rgba(255, 255, 255, 0.15)' }}>
      <Box p={1} width={'100%'}>
        <Stack
          gap={2}
          justifyContent="space-between"
          alignItems="center"
          display="flex"
          direction="row"
        >
          <Typography variant="h5" color="textPrimary">
            Education
          </Typography>
          <Stack gap={1} direction="row">
            <Button variant="outlined">Save</Button>
            <Button variant="text">Cancel</Button>
          </Stack>
        </Stack>
      </Box>
      <Box p={2} textAlign="center">
        <SearchComponent />
      </Box>
    </Box>
  );
};

export default EducationSection;
