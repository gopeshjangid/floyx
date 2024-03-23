'use client';

import React from 'react';
import Box from '@mui/material/Box';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Link from 'next/link';
import { Theme, styled, useTheme } from '@mui/material';
import { usePathname } from 'next/navigation';

import { allRoutes } from '@/constants/allRoutes';
import SVGAccount from '@/iconComponents/account';
import SVGChangePassword from '@/iconComponents/changePassword';
import SVGBlockUser from '@/iconComponents/blockUser';
import SVGHelp from '@/iconComponents/help';
import Wrapper from '@/components/wrapper';
import SVGDelete from '@/iconComponents/delete';

const SettingsWrapper = styled(Box)(({ theme }: { theme: Theme }) => ({
  borderBottom: 1,
  paddingInline: '20px',
  border: `1px solid ${
    theme.palette?.mode === 'light' ? '#E7F0FC' : 'rgba(255, 255, 255, 0.15)'
  }`,
  '& .notifications-content': {
    '& .MuiBox-root': {
      padding: '0',
      paddingTop: '25px',
    },
  },
  [theme.breakpoints.up('md')]: {
    paddingInline: '32px',
    '& .notifications-content': {
      '& .MuiBox-root': {
        paddingTop: '30px',
      },
    },
  },
}));

function LinkTab(props: any) {
  return <Tab component={Link} {...props} />;
}

export default function SettingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const theme = useTheme();
  const pathname = usePathname();
  const [value, setValue] = React.useState(pathname);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        flexDirection: 'column',
        alignItems: 'center',
      }}
    >
      <Wrapper
        sx={{
          maxWidth: {
            md: '100%',
            lg: '70%',
          },
        }}
      >
        <SettingsWrapper>
          <Box
            display="flex"
            alignItems="center"
            justifyContent="space-between"
            flexWrap="wrap"
            gap="10px"
          >
            <Tabs
              value={value}
              onChange={handleChange}
              aria-label="setting tabs"
              variant="scrollable"
              scrollButtons="auto"
            >
              <LinkTab
                value={allRoutes.settings.account}
                href={allRoutes.settings.account}
                label="Account"
                icon={
                  <SVGAccount
                    stroke={
                      value === allRoutes.settings.account
                        ? theme.palette.secondary[100]
                        : theme.palette.action.svg
                    }
                  />
                }
                iconPosition="start"
              />
              <LinkTab
                value={allRoutes.settings.changePassword}
                href={allRoutes.settings.changePassword}
                label="Change Password"
                icon={
                  <SVGChangePassword
                    stroke={
                      value === allRoutes.settings.changePassword
                        ? theme.palette.secondary[100]
                        : theme.palette.action.svg
                    }
                  />
                }
                iconPosition="start"
              />
              <LinkTab
                value={allRoutes.settings.blockUser}
                href={allRoutes.settings.blockUser}
                label="Block User"
                icon={
                  <SVGBlockUser
                    stroke={
                      value === allRoutes.settings.blockUser
                        ? theme.palette.secondary[100]
                        : theme.palette.action.svg
                    }
                  />
                }
                iconPosition="start"
              />
              <LinkTab
                value={allRoutes.settings.deleteAccount}
                href={allRoutes.settings.deleteAccount}
                label="Delete Account"
                icon={
                  <SVGDelete
                    stroke={
                      value === allRoutes.settings.deleteAccount
                        ? theme.palette.secondary[100]
                        : theme.palette.action.svg
                    }
                  />
                }
                iconPosition="start"
              />
              <LinkTab
                value={allRoutes.settings.help}
                href={allRoutes.settings.help}
                label="Help"
                icon={
                  <SVGHelp
                    stroke={
                      value === allRoutes.settings.help
                        ? theme.palette.secondary[100]
                        : theme.palette.action.svg
                    }
                  />
                }
                iconPosition="start"
              />
            </Tabs>
          </Box>
        </SettingsWrapper>
      </Wrapper>
      {children}
    </Box>
  );
}
