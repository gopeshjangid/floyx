import React from 'react';
import ReactContentEditable from 'react-contenteditable';

interface EditableProps {
  onChange?: (...args: any) => void,
  onInput?: (...args: any) => void,
  onBlur?: (...args: any) => void,
  onKeyPress?: (...args: any) => void,
  onKeyDown?: (...args: any) => void,
  className?: string;
  html?: any;
  disabled?: boolean;
  onKeyUp?: () => void;
  onMouseUp?: () => void;
  placeholder?: string;
  name?: string;
  value?: any; 
}
export default function ContentEditable({
  onChange,
  onInput,
  onBlur,
  onKeyPress,
  onKeyDown,
  ...props
}: EditableProps) {
  const onChangeRef = React.useRef(onChange);
  const onInputRef = React.useRef(onInput);
  const onBlurRef = React.useRef(onBlur);
  const onKeyPressRef = React.useRef(onKeyPress);
  const onKeyDownRef = React.useRef(onKeyDown);

  React.useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);
  React.useEffect(() => {
    onInputRef.current = onInput;
  }, [onInput]);
  React.useEffect(() => {
    onBlurRef.current = onBlur;
  }, [onBlur]);
  React.useEffect(() => {
    onKeyPressRef.current = onKeyPress;
  }, [onKeyPress]);
  React.useEffect(() => {
    onKeyDownRef.current = onKeyDown;
  }, [onKeyDown]);

  return (
    <ReactContentEditable
      {...props}
      onChange={
        onChange
          ? (...args: any) => {
              if (onChangeRef.current) {
                onChangeRef.current(...args);
              }
            }
          : undefined
      }
      onInput={
        onInput
          ? (...args: any) => {
              if (onInputRef.current) {
                onInputRef.current(...args);
              }
            }
          : undefined
      }
      onBlur={
        onBlur
          ? (...args: any) => {
              if (onBlurRef.current) {
                onBlurRef.current(...args);
              }
            }
          : undefined
      }
      onKeyPress={
        onKeyPress
          ? (...args: any) => {
              if (onKeyPressRef.current) {
                onKeyPressRef.current(...args);
              }
            }
          : undefined
      }
      onKeyDown={
        onKeyDown
          ? (...args: any) => {
              if (onKeyDownRef.current) {
                onKeyDownRef.current(...args);
              }
            }
          : undefined
      }
    />
  );
}
