import React, { useCallback, useEffect, useMemo, useState } from 'react';
import Autocomplete, { AutocompleteChangeReason, AutocompleteValue } from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import { useLazySearchArticleTagsQuery } from '@/lib/redux/slices/tags';
import CustomChip from '../CustomGridientChip';
import { Button, CircularProgress, Stack, styled } from '@mui/material';
import { GradientText } from '../GradientComponents';
import { debounce } from '@/lib/utils';
import { useToast } from "../Toast/useToast";

const RenderOptionWrapper = styled(Stack)(({ theme }) => ({
  '&:hover': {
    backgroundColor: theme.palette.primary.mainBackground,
  },
}));

const CustomAutoComplete = styled(Autocomplete)(({ theme }) => ({
  borderRadius: '10px',
  '&:focus': {
    border: `1px solid ${theme.palette.primary.boxBorder}`,
  },
  '& .MuiInputBase-root': {
    padding: '8px',
    background: theme.palette.primary[400],
  },
}));

const TagAutocomplete = ({
  onSelectTags,
  maxSelectedTag,
  resetAll
}: {
    onSelectTags: (tags: string[]) => void;
    maxSelectedTag?: number;
    resetAll: boolean;
}) => {
  const [inputValue, setInputValue] = useState('');
  const [selectedTags, setSelectedTags] = useState<string[] | never[]>([]);
  const [searchTag, { data: tags, isLoading, isFetching }] =
    useLazySearchArticleTagsQuery();
  const toast = useToast();
  const debouncedSearchTag = useCallback(
    debounce(newInputValue => {
      searchTag({ tag: newInputValue });
    }, 1500),
    [] // Dependencies array
  );

  const handleInputChange = (event, newInputValue, reason) => {
    if (maxSelectedTag === undefined || maxSelectedTag > selectedTags.length) {
      setInputValue(newInputValue);
      if (reason === 'input') {
        debouncedSearchTag(newInputValue);
      }
    } else {
      setInputValue('');
      toast.error(`Max ${maxSelectedTag} tags are allowed`);
    }
  };

  useEffect(() => {
    onSelectTags(selectedTags);
  }, [selectedTags]);

  const handleChange = (_event, newValue, reason: AutocompleteChangeReason) => {
    if (reason === 'selectOption') {
      setSelectedTags(prevTags => {
        if (prevTags.find(val => newValue.toLowerCase() === val.toLowerCase())) {
          toast.error(`You have already added this tag.`);
          return [...prevTags];
        }
        return [...prevTags, newValue];
      });
    } else if (reason === 'createOption') {
      setSelectedTags(prevTags => [...prevTags, inputValue]);
    }
  };

  const formatIndianNumber = useMemo(
    () => (num: number) => {
      if (num < 1000) {
        return num;
      } else if (num >= 1000 && num <= 9999) {
        return Math.floor(num / 1000) + 'K';
      } else if (num >= 10000 && num <= 999999) {
        return Math.floor(num / 1000) + 'K+';
      } else if (num >= 1000000 && num <= 9999999) {
        return Math.floor(num / 1000000) + 'M';
      } else if (num >= 10000000 && num <= 999999999) {
        return Math.floor(num / 1000000) + 'M+';
      } else {
        return num;
      }
    },
    []
  );

  const optionSelect = useCallback(
    tag => {
      handleChange(null, tag, 'selectOption');
      setInputValue('');
    },
    [handleChange]
  );

  const deleteTagHandler = useCallback(
    tag => {
      setSelectedTags(selectedTags =>
        selectedTags.filter(item => item !== tag)
      );
    },
    [setSelectedTags]
  );

  const renderOption = useCallback(
    (props, option) => {
      return (
        <RenderOptionWrapper
          key={'render-option-' + props.id}
          sx={{ cursor: 'pointer' }}
          gap={0.5}
        >
          <Button
            onClick={() => optionSelect(option.name)}
            sx={{ textAlign: 'left' }}
            variant="text"
          >
            <Stack
              justifyContent="flex-start"
              direction={'row'}
              alignItems={'center'}
              gap={0.5}
              p={1}
              width="100%"
            >
              <GradientText sx={{ fontWeight: 500 }}>
                {option.name}
              </GradientText>
              <GradientText sx={{ fontWeight: 300 }}>{`(${formatIndianNumber(
                option.tagCount
              )})`}</GradientText>
            </Stack>
          </Button>
        </RenderOptionWrapper>
      );
    },
    [formatIndianNumber, optionSelect]
  );

  useEffect(() => {
    if (resetAll) {
      setSelectedTags([]);
    }
  }, [resetAll]);

  return (
    <CustomAutoComplete
      multiple
      freeSolo
      openOnFocus
      open={isFetching || !!inputValue}
      autoComplete
      loading={isLoading || isFetching}
      clearOnEscape
      clearOnBlur
      loadingText="Searching..."
      fullWidth
      noOptionsText="No tag found!"
      options={tags ? tags.map(item => ({ ...item, name: item.name })) : []}
      getOptionLabel={(option: any) =>
        typeof option === 'string' ? option : option.name
      }
      value={selectedTags}
      onChange={handleChange}
      inputValue={inputValue}
      onInputChange={handleInputChange}
      renderOption={renderOption}
      renderInput={params => (
        <TextField
          placeholder="Search hashtag or press enter to create"
          {...params}
          InputProps={{
            ...params.InputProps,
            endAdornment: (
              <React.Fragment>
                {isFetching ? (
                  <CircularProgress color="inherit" size={20} />
                ) : null}
                {params.InputProps.endAdornment}
              </React.Fragment>
            ),
          }}
        />
      )}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option: any, index) => (
          <CustomChip
            label={typeof option === 'string' ? option : option.name}
            {...getTagProps({ index })}
            onDelete={() =>
              deleteTagHandler(
                typeof option === 'string' ? option : option.name
              )
            }
          />
        ))
      }
    />
  );
};

export default TagAutocomplete;
