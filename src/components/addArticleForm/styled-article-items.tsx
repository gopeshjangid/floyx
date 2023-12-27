import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

export const ArticleItem = styled(Box)(({ theme }) => ({
  background: theme.palette.background.default,

  '#img': {
    display: 'none',
  },
  '.articles-editor__editor': {
    position: 'relative',
    '.articles-editor__toolbar': {
      backgroundColor: '#191b33',
      display: 'inline-block',
      padding: '7px',
      position: 'fixed',
      zIndex: 1000,
      '&:after': {
        backgroundColor: '#191b33',
        bottom: '-4px',
        '-webkit-box-shadow': '-1px 1px 2px -1px rgba(0, 0, 0, 0.16)',
        boxShadow: '-1px 1px 2px -1px rgba(0, 0, 0, 0.16)',
        // content: "'\A0'",
        display: 'block',
        height: '12px',
        left: '36px',
        margin: '0 auto',
        position: 'absolute',
        '-moz-transform': 'rotate(45deg)',
        '-ms-transform': 'rotate(45deg)',
        '-o-transform': 'rotate(45deg)',
        '-webkit-transform': 'rotate(135deg)',
        transform: 'rotate(90deg)',
        width: '12px',
      },
      '& button': {
        backgroundColor: '#191b33',
        border: 0,
        color: '#ffffff',
        cursor: 'pointer',
        display: 'inline-block',
        fontSize: '18px',
        height: '36px',
        lineHeight: '18px',
        padding: '7px 10px',
        width: '36px',
        '&:hover': {
          backgroundColor: '#47495c',
        },
      },
    },
    '.input-item': {
      paddingTop: '3px',
      position: 'relative',
      "& [contentEditable='true']": {
        '&:empty::before': {
          border: '0 !important',
          color: '#9b9bab',
          content: 'attr(placeholder)',
          position: 'relative',
        },
        '&:empty:focus::before': {
          content: 'attr(placeholder)',
        },
      },
      '& a': {
        color: '#191b33',
        textDecoration: 'underline',
      },
      '& .text-tooltip': {
        color: '#7f8099',
        fontSize: '24px',
        left: '-44px',
        position: 'absolute',
        top: '0',
      },
      '.articles-editor__change-type': {
        // backgroundColor: '#000000',
        width: 'max-content',
        backgroundColor: theme.palette.background.default, //'#171A3A',
        border: `1px solid ${
          theme.palette.mode === 'light'
            ? theme.palette?.primary?.[800]
            : theme.palette.primary.main
        }`,
        borderRadius: '4px',
        color: '#ffffff',
        display: 'inline-block',
        padding: '14px 16px 12px',
        position: 'absolute',
        top: '-7px',
        zIndex: '10000',
        '&:after': {
          content: "''",
          position: 'absolute',
          top: '30%',
          left: 0,
          marginLeft: '-16px',
          borderWidth: '8px',
          borderStyle: 'solid',
          borderColor: `transparent ${
            theme.palette?.mode === 'light' ? 'white' : '#1B1830'
          } transparent transparent`,
        },
        '&:before': {
          content: "''",
          position: 'absolute',
          top: '29%',
          left: 0,
          marginLeft: '-18px',
          borderWidth: '9px',
          borderStyle: 'solid',
          borderColor: `transparent ${
            theme.palette?.mode === 'light' ? '#E7F0FC' : '#5798FF'
          } transparent transparent`,
        },
        '& span': {
          paddingRight: '26px',
          cursor: 'pointer',
          '& :hover': {
            opacity: 0.6,
          },
          '&.subtitle': {
            position: 'relative',
            top: '-6px',
            color:
              theme.palette?.mode === 'light'
                ? theme.palette.text.primary
                : theme.palette.primary.main,
          },
          '& span:last-of-type': {
            padding: 0,
          },
        },
        '& label': {
          paddingRight: '26px',
        },
        '& .articles-editor__editor-link': {
          backgroundColor: '#000000',
          borderRadius: '4px',
          display: 'block',
          left: '0px',
          padding: '8px 54px 4px 13px',
          position: 'absolute',
          top: 'calc(100% - 10px)',
          width: '100%',
          '& input': {
            borderRadius: '4px',
            display: 'inline-block',
            lineHeight: '38px',
            marginBottom: '7px',
            paddingLeft: '10px',
            width: '238px !important',
            '& ::placeholder': {
              color: '#9b9bab !important',
            },
            '& button': {
              backgroundColor: 'transparent',
              border: 0,
              color: '#ffffff',
              cursor: 'pointer',
              padding: '8px 14px',
              position: 'absolute',
              right: '4px',
              top: '4px',
              '& .floyx-icon-arrow-circle-right': {
                fontSize: '18px',
                position: 'relative',
                top: '3px',
              },
            },
          },
        },
      },
      '& .articles-editor__paragraph': {
        fontSize: '18px',
        marginBottom: '15px',
        wordBreak: 'break-word',
        background: theme.palette.primary[400],
        outline: 'none',
        paddingLeft: '16px',
        padding: '12px',
        borderRadius: '10px',
        '&:focus': {
          border: `1px solid ${theme.palette.primary.boxBorder}`,
        },
      },
      '& .articles-editor__subtitle': {
        fontSize: '24px',
        fontWeight: '500',
        margin: '-4px 0 22px',
        padding: 0,
      },
      '& .articles-editor__quote': {
        fontSize: '24px',
        fontStyle: 'italic',
        lineHeight: '34px',
        marginBottom: '18px',
        position: 'relative',
        '& :not(:empty)': {
          paddingLeft: '28px',
        },
        '& :before': {
          borderLeft: '3px solid #7f8099 !important',
          content: "''",
          height: 'calc(100% - 11px)',
          left: 0,
          position: 'absolute',
          top: '3px',
        },
        '.articles-editor__ul': {
          '& ul': {
            paddingLeft: '33px',
          },
          '& ul li': {
            paddingLeft: '10px',
          },
        },
        '.articles-editor__ol': {
          '& ol': {
            listStylePosition: 'outside',
            listStyleType: 'decimal',
            margin: '0 0 0 17px',
            padding: 0,
            wordBreak: 'break-all',
          },
          '& ol li': {
            paddingLeft: '10px',
          },
        },
        '.articles-editor__link': {
          fontSize: '18px',
          marginBottom: '15px',
          padding: 0,
          textDecoration: 'underline',
        },
        '.articles-editor__item': {
          fontSize: '18px',
          marginBottom: '15px',
        },
        '.articles-editor__photo': {
          marginBottom: '35px',
          '.articles-editor__photo-preview': {
            height: 'auto',
            marginBottom: '7px',
            width: '100%',
            '& :hover': {
              outline: '3px solid #e6e6e6',
            },
            '.active': {
              outline: '3px solid #4956d0',
            },
          },
          '.articles-editor__caption': {
            '& :not(:focus)::placeholder': {
              color: '#9b9bab',
            },
            '& :focus::placeholder': {
              color: 'transparent',
            },
          },
        },
        '.articles-editor__video': {
          marginBottom: '50px',
          '.articles-editor__iframe-container': {
            height: '600px',
            '& :hover iframe': {
              outline: '3px solid #e6e6e6',
            },
            '& .active iframe': {
              outline: '3px solid #4956d0',
            },
            '& :before': {
              bottom: 0,
              content: "''",
              left: 0,
              position: 'absolute',
              right: 0,
              top: 0,
              zIndex: 400,
            },
            '.articles-editor__iframe': {
              position: 'relative',
              width: '100%',
            },
            '.articles-editor__video-link': {
              fontSize: '18px',
              padding: 0,
            },
          },
        },
      },
    },
  },
}));
