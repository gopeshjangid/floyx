'use client';

import React, { useState } from 'react';

import { Box } from '@mui/material';
import AddArticleHead from '@/components/addArticleHead';
import AddArticleForm from '@/components/addArticleForm';
import { useGetArticleInfoQuery } from '@/lib/redux/slices/articleDetails';

export default function Page() {
  const [saveDraft, setSaveDraft] = useState(false);
  const [value, setValue] = useState<string>('newArticle');
  
  const { data: articleDraftNumbers } = useGetArticleInfoQuery();


  return (
    <Box sx={{ width: '100%', marginTop: '20px' }}>
      <AddArticleHead
        setSaveDraft={setSaveDraft}
        articleDraftNumbers={articleDraftNumbers}
        value={value}
        setValue={setValue}
      />
      {value === 'newArticle' ? (
        <AddArticleForm saveDraft={saveDraft} setSaveDraft={setSaveDraft} />
      ) : (
        <>List </>
      )}
    </Box>
  );
}
