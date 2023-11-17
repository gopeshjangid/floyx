'use client';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Avatar,
  Card,
  CardContent,
  Typography,
  FormControlLabel,
  Switch,
  Grid,
  Container,
  InputLabel,
  Paper,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import SearchResultItems from '@/components/search/FoundResultList';
import useQuery from '@/lib/hooks/useFetch';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
interface Profile {
  name: string;
  handle: string;
  avatar: string;
  followers: number;
  posts: number;
  articles: number;
}

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

// Search Component with TypeScript
const SearchComponent: React.FC<{
  onSearch: (criteria: SearchCriteria) => void;
}> = ({ onSearch }) => {
  const [searchCriteria, setSearchCriteria] = useState<SearchCriteria>({
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
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
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
        <Grid xs={3} item>
          {' '}
          &nbsp;
        </Grid>
        <Grid xs={9} item>
          {' '}
          <FormControlLabel
            control={
              <Checkbox
                name="professionalExperience"
                checked={searchCriteria.professionalExperience}
                onChange={handleInputChange}
              />
            }
            label="Only with professional experience"
          />
        </Grid>
        <Grid xs={3} item>
          {' '}
          &nbsp;
        </Grid>
        <Grid xs={9} item>
          <Button
            variant="contained"
            color="primary"
            onClick={() => onSearch(searchCriteria)}
            sx={{ width: '100%' }}
            disabled={Object.values(searchCriteria).every(
              v =>
                v === false ||
                v === '' ||
                v === null ||
                v === undefined ||
                (Array.isArray(v) && v.length === 0)
            )}
          >
            Search
          </Button>
        </Grid>
      </Grid>
    </Box>
  );
};

// Main Component that uses SearchComponent and ProfileCard with TypeScript
const MainComponent: React.FC = () => {
  const {
    data = [],
    isLoading,
    error,
    fetch,
  } = useQuery<[]>(ApiEndpoint.SearchPeople);

  const handleSearch = (criteria: SearchCriteria) => {
    fetch({ ...criteria, experienced: criteria.professionalExperience });
  };

  return (
    <Box>
      <Paper
        sx={{
          padding: '16px',
          marginBottom: '24px',
          border: '1px solid rgba(255, 255, 255, .1)',
          borderRadius: '10px',
        }}
        elevation={0}
      >
        <SearchComponent onSearch={handleSearch} />
      </Paper>
      {error && <Typography color="error">{error}</Typography>}
      {!error && !isLoading && (
        <Typography color="success">{`Found ${
          data?.length ?? 0
        } results`}</Typography>
      )}
      <SearchResultItems results={[]} isLoading={isLoading} />
    </Box>
  );
};

export default MainComponent;
