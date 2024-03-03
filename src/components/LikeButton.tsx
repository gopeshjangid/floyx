import React from 'react';
import Button from '@mui/material/Button';
import CircularProgress from '@mui/material/CircularProgress';
import { Box } from '@mui/material';
import LikeIcon from '@/images/image/likeIcon';

const LikeButton = ({ isLiked, isLoading, onClick, children, ...props }: { isLiked: boolean; isLoading: boolean, onClick: () => void; children: React.ReactNode }) => {
    return (
        <>
            {!isLoading ? (
                <Button
                    variant="text"
                    startIcon={<LikeIcon isLiked={isLiked} />}
                    onClick={onClick}
                    sx={{ padding: 0 }}
                >{children}</Button>
            ) : (
                <Box width="auto">
                    <CircularProgress size={24} className="loadingIndicator" />
                </Box>
            )}
        </>
    );
};

export default React.memo(LikeButton);
