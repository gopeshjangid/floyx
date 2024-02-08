import React, { useEffect, useState } from 'react';
import { getCookie, hasCookie, setCookie } from 'cookies-next';
import { FormControl, MenuItem, OutlinedInput, Select, SelectChangeEvent } from '@mui/material';

const languages = [
  { label: 'English', value: '/auto/en' },
  { label: 'Polish', value: '/auto/pl' },
  { label: 'Portuguese', value: '/auto/pt' }
];

const languagesCode: { [key: string]: string } = {
  '/auto/en': 'English',
  '/auto/pl': 'Polish',
  '/auto/pt': 'Portuguese'
};

declare global {
  interface Window {
    google: any;
    googleTranslateElementInit: () => void;
  }                   
}

const GoogleTranslate: React.FC = () => {
  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement({
      pageLanguage: 'auto',
      autoDisplay: false,
      layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE
    }, 'google_translate_element');
  }

  const [selected, setSelected] = useState('English');

  useEffect(() => {
    var addScript = document.createElement('script');
    addScript.setAttribute('src', '//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit');
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;

    const cookieValue = getCookie('googtrans');
    setSelected(cookieValue ? languagesCode[cookieValue] : 'English');
  }, []);

  const langChange = (e: SelectChangeEvent<string>) => {
    const value = e.target.value;
    setCookie('googtrans', value);
    setSelected(languagesCode[value]);
    window.location.reload();
  };

    return (
      <>
        <FormControl sx={{ minWidth: 120 }} size="small" translate="no">
          <Select
              displayEmpty
              labelId="demo-select-small-label"
              id="demo-select-small"
              value={selected}
              onChange={langChange}
              input={<OutlinedInput sx={{ color: '#fff' }} />}
              renderValue={(selected) => {
                  return selected as string;
              }}
              sx={{ background: '#000' }}
          >
              {languages.map((ld, i) => (
            <MenuItem sx={{ color: '#000' }} key={`${ld.label}`} value={`${ld.value}`} translate="no">{ld.label}</MenuItem>
              ))}
          </Select>
        </FormControl>
      </>
    )
};

export default GoogleTranslate;