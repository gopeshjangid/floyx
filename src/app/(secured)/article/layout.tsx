import { Box } from "@mui/material";

export default function Layout({ children, content, rightContent }: any) {
  return (
    <Box sx={{display:'flex'}}>
      {content}
      {children}
      {rightContent}
    </Box>
  );
}
