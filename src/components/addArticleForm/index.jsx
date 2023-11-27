'use client';
import { Box, Button, Divider, Input, TextField } from '@mui/material';
import InsertPhotoIcon from '@mui/icons-material/InsertPhoto';
import React, { SyntheticEvent, useEffect, useRef, useState } from 'react';

export default function AddArticleForm({ saveDraft, setSaveDraft }) {
  const [title, setTitle] = useState(null);
  const [content, setContent] = useState(null);
  const fileInputRef = useRef();

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleTitleChange = event => {
    setTitle(event.target.value);
    setSaveDraft(false);
  };

  const handleContentChange = event => {
    setContent(event.target.value);
    setSaveDraft(false);
  };

  const handleFileUpload = event => {
    const file = event.target.files[0];
    console.log('Selected file:', file);
    setSaveDraft(false);
  };

  const handleSubmit = () => {
    const data = {
      title: title,
      content: content,
    };
    console.log('data', data);
    setSaveDraft(false);
  };

  useEffect(() => {
    if (saveDraft) {
      handleSubmit();
    }
  }, [saveDraft]);

  return (
    <Box sx={{ marginTop: '30px', border: '1px solid White', borderRadius: '5px', width: '90%', p: '30px' }}>
      <Box>
        <TextField placeholder="Title" fullWidth multiline value={title} onChange={handleTitleChange} />
      </Box>
      <Box sx={{ m: '20px 0px' }}>
        <Divider />
        <Box sx={{ display: 'flex', justifyContent: 'center', m: '10px' }}>
          <Input
            // accept=".pdf,.doc,.docx,.jpg,.png"
            type="file"
            onChange={handleFileUpload}
            ref={fileInputRef}
            sx={{ display: 'none' }}
          />
          <Button variant="text" startIcon={<InsertPhotoIcon />} onClick={handleButtonClick}>
            Cover Photo (Optional)
          </Button>
        </Box>
        <Divider />
      </Box>
      <Box>
        <TextField value={content} onChange={handleContentChange} placeholder="Content" fullWidth multiline rows={10} />
      </Box>
    </Box>
  );
}
