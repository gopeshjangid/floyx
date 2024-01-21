"use client";

import { Stack } from "@mui/material";
import CustomChip from "../CustomGridientChip";

export default function ArticleTags({ tags }) {
  return (
    <Stack
      gap={1}
      direction={"row"}
      mb={2}
    >
      {tags.map((val: any, index: number) => (
        <CustomChip
          key={'tags' + index}
          label={`#${val.tagName}`}
          component="a"
          href="#basic-chip"
          clickable
        />
      ))}
    </Stack>
  )
}