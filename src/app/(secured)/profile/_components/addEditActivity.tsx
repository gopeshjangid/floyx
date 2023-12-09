import React, { useEffect, useState } from 'react';
import {
  Box,
  TextField,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Grid,
  Stack,
  Typography,
} from '@mui/material';

type SelectProps = { value: string; label: string };
// Define a type for the form element configuration
type FormElementConfig = {
  name: string;
  label: string;
  type: 'text' | 'monthSelect' | 'yearSelect';
  options?: SelectProps[]; // For select type
  xs: number; // Grid sizing for extra small screens
  componentProps: any;
};

// Define a type for the form values
type FormValues = {
  [key: string]: string | boolean;
};

interface DynamicFormProps {
  formElements: FormElementConfig[];
  initialValues: FormValues;
  onSubmit: (values: FormValues) => void;
  onCancel: () => void;
  title: string;
}

const DynamicForm: React.FC<DynamicFormProps> = ({
  formElements,
  initialValues,
  onSubmit,
  onCancel,
  title,
}) => {
  const [formValues, setFormValues] = useState<FormValues>(initialValues);

  useEffect(() => {
    setFormValues({ ...formValues });
  }, [initialValues]);

  //const [formErrors, setFormErrors] = useState<FormValues>({});
  const validate = () => {
    const tempErrors: FormValues = {};
    formElements.forEach(element => {
      if (element.type === 'text') {
        const value = formValues[element.name];
        if (typeof value === 'string' && !value.trim()) {
          tempErrors[element.name] = `${element.label} is required`;
        }
      }
      // Add more validation rules for other types as needed
    });
    //setFormErrors(tempErrors);
    // Form is valid if there are no error messages
    return Object.keys(tempErrors).length === 0;
  };

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | { name?: string; value: unknown }
    >
  ) => {
    const { name, value } = event.target as { name: string; value: string };
    setFormValues({ ...formValues, [name]: value });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (validate()) {
      const form = Object.keys(formValues)
        .filter(key => Object.keys(initialValues).includes(key))
        .reduce((obj: any, key) => {
          obj[key] = formValues[key];
          return obj;
        }, {});
      onSubmit(form);
    }
  };

  const renderFormElement = (element: FormElementConfig) => {
    switch (element.type) {
      case 'text':
        return (
          <TextField
            fullWidth
            name={element.name}
            placeholder="Type here..."
            value={formValues[element.name]}
            onChange={handleChange}
            {...element.componentProps}
          />
        );
      case 'monthSelect':
      case 'yearSelect':
        return (
          <FormControl fullWidth>
            <Select
              name={element.name}
              value={formValues[element.name] ?? ''}
              defaultValue={formValues[element.name]}
              label={element.label}
              onChange={handleChange}
              {...element.componentProps}
            >
              <MenuItem disabled value="">
                <em>Select</em>
              </MenuItem>
              {element.options?.map(
                (option: { label: string; value: string }) => (
                  <MenuItem key={option?.label} value={option.label}>
                    {option.label}
                  </MenuItem>
                )
              )}
            </Select>
          </FormControl>
        );
      default:
        return null;
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit}>
      <Stack
        direction="row"
        gap={6}
        mb={3}
        width="100%"
        justifyContent="space-between"
      >
        <Typography>{title}</Typography>
        <Stack direction="row" gap={1}>
          <Button
            sx={{ borderRadius: '20px' }}
            type="submit"
            variant="outlined"
            //disabled={Object.values(formValues).some(v => !v)}
          >
            Save
          </Button>
          <Button onClick={onCancel} variant="text">
            Cancel
          </Button>
        </Stack>
      </Stack>
      <Grid container spacing={2}>
        {formElements.map((element, index) => (
          <React.Fragment key={'element-' + index}>
            {element.label && (
              <Grid display="flex" alignItems="center" item xs={3}>
                <InputLabel>{element.label}</InputLabel>
              </Grid>
            )}
            <Grid item xs={element.xs} key={element.name}>
              {renderFormElement(element)}
            </Grid>
          </React.Fragment>
        ))}
      </Grid>
    </Box>
  );
};

export default DynamicForm;
