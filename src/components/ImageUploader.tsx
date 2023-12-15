import React, { ChangeEvent, useRef } from 'react';

import { IconButton, Input, useTheme } from '@mui/material';
import { CameraAltOutlined } from '@mui/icons-material';

interface ImageUploaderProps {
  onImageUpload: (file: File) => void;
  getPreviewData: (data: string | null) => void;
}

const ImageUploader: React.FC<ImageUploaderProps> = ({
  onImageUpload,
  getPreviewData,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { palette } = useTheme();
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files ? event.target.files[0] : null;
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const imageData = reader.result as string;
        //setImagePreview(imageData);
        getPreviewData(imageData);
        onImageUpload(file);
      };
      reader.readAsDataURL(file);
    }
  };

  const triggerFileInput = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <div>
      <Input
        type="file"
        inputRef={fileInputRef}
        inputProps={{ accept: 'image/*' }}
        onChange={handleImageChange}
        style={{ display: 'none' }}
      />
      <IconButton onClick={triggerFileInput}>
        <CameraAltOutlined sx={{ color: palette.primary.iconFontColor }} />
      </IconButton>
    </div>
  );
};

export default ImageUploader;
