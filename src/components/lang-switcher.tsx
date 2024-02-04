"use client"
import { useEffect, useState } from "react";
import { parseCookies, setCookie } from "nookies";
import { Box, Typography, Grid, Stack, Skeleton, MenuItem, FormControl, OutlinedInput} from '@mui/material';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const COOKIE_NAME = "googtrans";

interface LanguageDescriptor {
  name: string;
  title: string;
}

declare global {
  namespace globalThis {
    var __GOOGLE_TRANSLATION_CONFIG__: {
      languages: LanguageDescriptor[];
      defaultLanguage: string
    };
  }
}

const LanguageSwitcher = () => {
  const [currentLanguage, setCurrentLanguage] = useState<string>();
  const [languageConfig, setLanguageConfig] = useState<any>();

  console.log(currentLanguage,"currentLanguage",languageConfig,"languageConfig")

  useEffect(() => {
    const cookies = parseCookies()
    const existingLanguageCookieValue = cookies[COOKIE_NAME];

    let languageValue;
    if (existingLanguageCookieValue) {
      const sp = existingLanguageCookieValue.split("/");
      if (sp.length > 2) {
        languageValue = sp[2];
      }
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__ && !languageValue) {
      languageValue = global.__GOOGLE_TRANSLATION_CONFIG__.defaultLanguage;
    }
    if (languageValue) {
      setCurrentLanguage(languageValue);
    }
    if (global.__GOOGLE_TRANSLATION_CONFIG__) {
      setLanguageConfig(global.__GOOGLE_TRANSLATION_CONFIG__);
    }
  }, []);

  // if (!currentLanguage || !languageConfig) {
  //   return null;
  // }

  const switchLanguage = (lang: string) => () => {
    setCookie(null, COOKIE_NAME, "/auto/" + lang)
    window.location.reload();
  };

  const handleChange = (event: SelectChangeEvent) => {
    // setLanguage(event.target.value as string);
    switchLanguage(event.target.value as string)
  };

  return (
    <div className="text-center notranslate">
      <FormControl sx={{minWidth: 120 }} size="small">
          <Select
            displayEmpty
            labelId="demo-select-small-label"
            id="demo-select-small"
            value={currentLanguage}
            onChange={handleChange}
            input={<OutlinedInput />}
            renderValue={(selected) => {
              return selected
            }}
          >
            {languageConfig?.languages?.map((ld: LanguageDescriptor, i: number) => (
              currentLanguage === ld.name ||
                (currentLanguage === "auto" &&
                  languageConfig.defaultLanguage === ld) ? (
                    <MenuItem key={`${ld.name}`} value={`${ld.name}`}>{ld.name}</MenuItem>
                ) : (
                  <MenuItem key={`${ld.name}`} value={`${ld.name}`}>{ld.name}</MenuItem>
                )
            ))}
          </Select>
        </FormControl>
      
    </div>
  );
};

export { LanguageSwitcher, COOKIE_NAME };
