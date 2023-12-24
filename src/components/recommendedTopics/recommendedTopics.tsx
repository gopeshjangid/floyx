import { Box, Grid, Skeleton, Stack, Typography, useTheme } from '@mui/material';
import CustomChip from "../CustomGridientChip";
import { useGetPopularTagsQuery } from "@/lib/redux/slices/tags";

export default function RecommendedTopics({setDynamicTab}) {
  const { palette } = useTheme();
  const { data: hotTopics, isLoading } = useGetPopularTagsQuery();
  const handleClick = (val) => {
    setDynamicTab({
      searchBy: "tag",
      tagId: val.tagId,
      value: val.tagName,
    });
  }
  return (
    <Box sx={{ marginTop: '30px', width: '100%' }}>
      <Typography
        color={palette.mode === "light" ? "primary" : "textPrimary"}
        variant="h5"
      >
        Hot Topics
      </Typography>
      <Stack
        flexWrap="wrap"
        my={2}
        display="flex"
        direction="row"
        justifyContent="flex-start"
        rowGap={2}
      >
        {isLoading && <Skeleton variant="rectangular" width="100%" height="100px" />}
        {!isLoading && hotTopics && hotTopics.map((val, index) => (
          <CustomChip
            key={'topics' + index}
            label={val?.tagName}
            component="a"
            // href="#basic-chip"
            clickable
            style={{ marginBottom: 10, marginRight: 10 }}
            onClick={() => handleClick(val)}
          />
        ))}
       </Stack>
    </Box>
  );
}
