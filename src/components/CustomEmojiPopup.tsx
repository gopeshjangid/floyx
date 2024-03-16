'use client';

import {
    Box,
    IconButton,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import MoodIcon from '@mui/icons-material/Mood';
import useDevice from '@/lib/hooks/useDevice';

interface Props {
    onEmojiChange: (emoji: any) => void;
}

function EmojiPopup({
    onEmojiChange = (emoji: any) => { },
}: Props) {
    const triggerRef = useRef<HTMLButtonElement>(null); // Reference to the button or element that triggers the picker
    const pickerRef = useRef(null); // Reference to the emoji picker element
    const {isMobile} = useDevice();

    const [isVisible, setIsVisible] = useState(false);

    const toggleVisibility = () => {
        setIsVisible(!isVisible);
        adjustPickerPosition();
    };


    const [pickerStyle, setPickerStyle] = useState({});

    const adjustPickerPosition = () => {
        if (triggerRef.current) {
            const triggerRect = triggerRef.current.getBoundingClientRect();
            const spaceBelow = window.innerHeight - triggerRect.bottom;

            // Adjust this threshold as needed
            const neededSpace = 355; // Approximate height of the picker

            if (spaceBelow < neededSpace) {
                // Not enough space below, show above
                setPickerStyle({
                    position: 'absolute',
                    top: isMobile ? '-160px' :  `-${neededSpace + 77}px`
                });
            } else {
                // Enough space below, show below
                setPickerStyle({
                    position: 'absolute',
                    top: `${40}px`,
                });
            }
        }
    };

    useEffect(() => {
        window.addEventListener('resize', adjustPickerPosition);
        return () => {
            window.removeEventListener('resize', adjustPickerPosition);
        };
    }, []);


    return (
        <Box sx={{position:'relative'}}>
            <IconButton
                onClick={toggleVisibility}
                ref={triggerRef}
            >
                <MoodIcon />
            </IconButton>
            <Box
                sx={{
                    position: 'absolute',
                    zIndex: 99999,
                    left: isMobile ? '-160px' : '-100px',
                    top: '50px',
                    ...pickerStyle
                }}
                ref={pickerRef}
            >
                {isVisible ? (
                    <Picker
                        data={data}
                        onEmojiSelect={emoji => onEmojiChange(emoji)}
                        onClickOutside={() => setIsVisible(false)}
                    />
                ) : (
                    <></>
                )}
            </Box>
        </Box>
    );
}

export default React.memo(EmojiPopup);
