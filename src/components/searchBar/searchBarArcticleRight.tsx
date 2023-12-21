'use client';

import { Search } from "@mui/icons-material";
import { Box, IconButton, InputAdornment, TextField, Typography, useTheme } from '@mui/material';
import { Mention, MentionsInput } from 'react-mentions';

export default function SearchBarArcticleRight() {
  const { palette } = useTheme();

  function handleArticleSearch(e: any) {
    console.log(e.target.value);
  }

  return (
    <Box>
      <Typography
        variant="h5"
        color={palette.mode=== "light" ? "primary": "textPrimary"}
      >
        Search for Arcticles
      </Typography>
      <TextField
        name="email"
        fullWidth
        hiddenLabel
        placeholder="Search articles..."
        onChange={handleArticleSearch}
        sx={{
          ".MuiOutlinedInput-root": {
            background: palette.primary[700],
          }
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
