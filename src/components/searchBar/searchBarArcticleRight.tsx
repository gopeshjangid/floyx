'use client';

// import { Search } from '@mui/icons-material';
import Search from '@/assets/images/svg/search';
import {
  Box,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { Mention, MentionsInput } from 'react-mentions';

export default function SearchBarArcticleRight({ setDynamicTab }) {
  const { palette } = useTheme();

  const debounce = (func: (...args: any[]) => void, delay: number) => {
    let timer: any;
    return function (...args: any[]) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        func(...args);
      }, delay);
    };
  };

  const handleInputChange = debounce(value => {
    setDynamicTab({
      searchBy: 'search',
      value: value,
      tagId: value,
    });
  }, 500);

  function handleArticleSearch(e: any) {
    handleInputChange(e.target.value);
  }

  return (
    <Box>
      <Typography variant="subtitle1">Search for Articles</Typography>
      <TextField
        name="email"
        fullWidth
        hiddenLabel
        placeholder="Search articles..."
        onChange={handleArticleSearch}
        sx={{
          '.MuiOutlinedInput-root': {
            background: palette.primary[400],
          },
        }}
        InputProps={{
          startAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" color="primary">
                <Search />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
}
