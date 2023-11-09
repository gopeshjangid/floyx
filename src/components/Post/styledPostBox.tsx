import { Box } from "@mui/material";
import { styled } from "@mui/material/styles"

export const PostBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: "5px",
  marginTop: "2rem",
  "& .danger-text": {
    color: theme.palette.error.main,
  },
  "& .warning-text": {
    color: theme.palette.error.main,
  },
  "& .upload-media": {
    width: "100%",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius: "5px",
    display: "flex",
    backgroundColor: theme.palette.background.paper,
    padding: "1rem 2rem",
    "& .file-imput": {
      display: "none"
    },
    "& .image-upload": {
      display: "flex",
      justifyContent: "space-between",
      alignItem: "center",
      marginRight: "1rem",
      "& h6": {
        marginLeft: "8px"
      }
    }
  },
  "& .input-container": {
    padding: "2.5rem 2rem",
    "& .styled-input-container": {
      display: "flex",
      width: "100%",
      justifyContent: "space-between",
      "& textarea": {
        padding: "0.5rem",
        color: theme.palette.text.primary,
      },
      "& .mention-input-container": {
        width: "90%",
        backgroundColor: theme.palette.background.paper
      }
    },
    "& img": {
      width: '100%',
      paddingTop: '1rem'
    }
  }
}))
