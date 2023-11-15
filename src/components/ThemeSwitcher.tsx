'use client';
import { useState, useEffect } from 'react';
import { useTheme } from 'next-themes';
import { Skeleton } from '@mui/material';

const ThemeSwitch = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <Skeleton variant="rectangular" animation="wave" width={60} height={19} sx={{ padding: 0, margin: 0 }} />;
  }

  return (
    <select value={theme} onChange={e => setTheme(e.target.value)}>
      <option value="system">System</option>
      <option value="dark">Dark</option>
      <option value="light">Light</option>
    </select>
  );
};

export default ThemeSwitch;
