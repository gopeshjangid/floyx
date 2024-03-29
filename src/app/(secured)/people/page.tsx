'use client';
import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  FormControlLabel,
  Grid,
  InputLabel,
  Paper,
  Theme,
  InputAdornment,
  IconButton,
  Stack,
} from '@mui/material';
import Chip from '@mui/material/Chip';
import { styled, useTheme } from '@mui/material/styles';
import Checkbox from '@mui/material/Checkbox';
import CloseIcon from '@mui/icons-material/Close';
import SearchResultItems from '@/components/search/FoundResultList';
import useQuery from '@/lib/hooks/useFetch';
import { ApiEndpoint } from '@/lib/services/ApiEndpoints';
import { SVGUser } from '@/assets/images';
import { FlagOutlined } from '@mui/icons-material';
import DailyTaskIcon from '@/iconComponents/dailyTaskIcon';
import { UserDetailsType } from '@/lib/redux/slices/profile';
import SearchIcon from '@/iconComponents/searchIcon';
import useDevice from '@/lib/hooks/useDevice';
const SearchBoxWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .MuiInputBase-root': {
    background: theme.palette.background.default,
  },
  margin: '25px',
  [theme.breakpoints.up('md')]: {
    margin: '50px',
  },
}));
interface SearchCriteria {
  name: string;
  country: string;
  skill: string;
  skills: string[];
  professionalExperience: boolean;
}

interface UserProfilesResponse {
  total: number;
  result: UserDetailsType[];
  page: number;
}

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
  "& .MuiFormControlLabel-label": {
    marginTop: '4px'
  }
}));

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
  isLoading: boolean;
}> = ({ onSearch, isLoading }) => {
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

  const handleNameKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && searchCriteria.name.trim() !== '') {
      e.preventDefault();
      onSearch(searchCriteria);
    }
  }

  return (
    <Box
      component="form"
      sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
    >
      <SearchBoxWrapper>
        <Grid container justifyContent={'center'} spacing={1}>
          <Grid sm={3} xs={12} item>
            {' '}
            <InputLabel htmlFor="Name">Name</InputLabel>
          </Grid>
          <Grid sm={9} xs={12} item>
            {' '}
            <TextField
              variant="outlined"
              name="name"
              placeholder="Ex. Dustin Max"
              value={searchCriteria.name}
              onChange={handleInputChange}
              onKeyUp={handleNameKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <SVGUser />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid sm={3} xs={12} item>
            {' '}
            <InputLabel htmlFor="Country">Country</InputLabel>
          </Grid>
          <Grid sm={9} xs={12} item>
            {' '}
            <TextField
              variant="outlined"
              name="country"
              placeholder="Ex. Canada"
              value={searchCriteria.country}
              onChange={handleInputChange}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end">
                      <FlagOutlined />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid sm={3} xs={12} item>
            {' '}
            <InputLabel htmlFor="Skill">Skill</InputLabel>
          </Grid>
          <Grid sm={9} xs={12} item>
            <TextField
              variant="outlined"
              name="skill"
              placeholder="Type skill and press enter"
              value={searchCriteria.skill}
              onChange={handleInputChange}
              onKeyUp={handleSkillKeyPress}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="end">
                    <IconButton edge="end" color="primary">
                      <DailyTaskIcon fill={'none'} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
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
          <Grid sm={3} xs={12} item>
            {' '}
            &nbsp;
          </Grid>
          <Grid sm={9} xs={12} item>
            {' '}
            <StyledFormControlLabel
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
          <Grid xs={12} sm={9} item>
            <Button
              variant="contained"
              color="primary"
              onClick={() => onSearch(searchCriteria)}
              sx={{ width: '100%' }}
              disabled={
                Object.values(searchCriteria).every(
                  v =>
                    v === false ||
                    v === '' ||
                    v === null ||
                    v === undefined ||
                    (Array.isArray(v) && v.length === 0)
                ) || isLoading
              }
            >
              Search
            </Button>
          </Grid>
        </Grid>
      </SearchBoxWrapper>
    </Box>
  );
};

// Main Component that uses SearchComponent and ProfileCard with TypeScript
const MainComponent: React.FC = () => {
  const { palette } = useTheme();
  const { data, isLoading, error, fetchData } = useQuery<{
    value: {
      data: UserProfilesResponse;
    };
  }>(ApiEndpoint.SearchPeople);
  const { isMobile } = useDevice();
  const handleSearch = (criteria: SearchCriteria) => {
    fetchData({
      method: 'POST',
      data: {
        name: criteria.name,
        skills: criteria.skills,
        page: 0,
        country: criteria.country,
        experienced: criteria.professionalExperience,
      },
    });
  };
  const result = data?.value.data ?? ({} as UserProfilesResponse);
  return (
    <Box mt={isMobile ? 2 : 5}>
      <Box pb={1} sx={{ display: { xs: 'block', sm: 'none' } }}>
        <Stack direction="row" gap={1} justifyContent="center">
          <SearchIcon stroke={palette.mode == 'light' ? '#1B1830' : '#fff'} />
          <Typography variant="h5">Search People</Typography>
        </Stack>
      </Box>
      <Paper
        sx={{
          padding: '16px',
          marginBottom: '24px',
          border: `1px solid ${palette.primary.boxBorder}`,
          borderRadius: '10px',
          background: palette.primary.mainBackground,
        }}
        elevation={0}
      >
        <SearchComponent isLoading={isLoading} onSearch={handleSearch} />
      </Paper>
      <Box p={isMobile ? 1 : 0}>
        {error && <Typography color="error">{error}</Typography>}
        {isLoading && <Typography color="info">Searching...</Typography>}
        {!error && !isLoading &&  result?.result && (
          <Typography color="success">{`Found ${
            result?.total ?? 0
          } results`}</Typography>
        )}
        <SearchResultItems
          results={result?.result ?? []}
          isLoading={isLoading}
        />
      </Box>
    </Box>
  );
};

export default MainComponent;
