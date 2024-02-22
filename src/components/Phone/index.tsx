import { iconArrowDown } from '@/assets/images';
import { Box, FormControl, FormHelperText, FormLabel, Theme, styled } from '@mui/material';
import React from 'react';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/bootstrap.css';

interface IPhoneProps {
  value: string;
  onChange: (e: any) => void;
  checkPhone: ({ phoneNumber }: { phoneNumber: string }) => void;
  error: string;
}

const StyledPhone = styled(Box)(({ theme }: { theme: Theme }) => ({
  '& .react-tel-input': {
    width: '100%',
    marginBottom: '5px',
    '& .selected-flag:before': {
      display: 'none',
    },
    '& .flag-dropdown': {
      borderRight: `1px solid ${theme.palette.action.border}`,
      paddingRight: '12px',
      borderRadius: '0',
      '& .flag.ae': {
        display: 'flex',
        alignItems: 'center',
        '& .arrow': {
          backgroundImage: `url(${iconArrowDown})`,
          backgroundSize: '100% 100%',
          backgroundPosition: 'cover',
          backgroundRepeat: 'no-repeat',
          margin: '0',
          border: '0',
          width: '15px',
          height: '15px',
          left: '30px',
          transform: 'translateY(-50%)',
        },
      },
      '& .country-list': {
        background: theme.palette.background.paper,
        '& .search': {
          background: theme.palette.background.default,
          padding: '5px',
          '& input': {
            margin: '0',
            padding: '5px',
            width: '100%',
            borderColor: theme.palette.action.border,
          },
        },
        '& .country': {
          '&:hover': {
            background: theme.palette.action.hover,
          },
          '&.highlight': {
            background: theme.palette.action.selected,
          },
        },
      },
    },
    '& .form-control': {
      width: '100%',
      background: theme.palette.background.paper,
      borderRadius: '10px',
      border: `1px solid ${theme.palette.action.border}`,
      padding: '15px 14px 15px 80px',
      color: theme.palette.text.primary,
      '&:focus': {
        outline: 'none',
        boxShadow: 'none',
        background: theme.palette.background.paper,
        borderColor: theme.palette.action.border,
      },
    },
  },
}));

const Phone = ({ value, onChange, checkPhone, error }: IPhoneProps) => {
  return (
    <FormControl>
      <FormLabel required>Phone number</FormLabel>
      <StyledPhone>
        <PhoneInput
          enableLongNumbers={false}
          enableSearch={true}
          searchPlaceholder="Search"
          country="us"
          value={value}
          specialLabel=""
          onChange={e => {
            onChange({
              target: {
                name: 'phone',
                value: `+${e}`,
              },
            });
            checkPhone({
              phoneNumber: `+${e}`,
            });
          }}
          inputProps={{
            id: 'phone',
            name: 'phone',
          }}
        />
      </StyledPhone>
      <FormHelperText error>{error}</FormHelperText>
    </FormControl>
  );
};

export default Phone;
