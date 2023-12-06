'use client';

import React, { useState } from 'react';

import { Box } from '@mui/material';
import AddArticleHead from '@/components/addArticleHead';
import AddArticleForm from '@/components/addArticleForm';

export default function Page() {
  const [saveDraft, setSaveDraft] = useState(false);
  return (
    <Box sx={{width:'100%', marginTop:'20px'}}>
      <AddArticleHead setSaveDraft={setSaveDraft} />
      <AddArticleForm saveDraft={saveDraft} setSaveDraft={setSaveDraft} />
    </Box>
  );
}
