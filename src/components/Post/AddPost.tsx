"use client"

import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material"
import { SyntheticEvent, useState } from "react"
import { userDetail } from "../../constant/payload"
import Avatar from "@mui/material/Avatar"
import PersonIcon from "@mui/icons-material/Person"
import { MentionsInput, Mention } from "react-mentions"
import CropOriginalIcon from "@mui/icons-material/CropOriginal";
import VideoCameraBackOutlinedIcon from '@mui/icons-material/VideoCameraBackOutlined';
import { alpha, styled } from "@mui/material/styles"

const PostBox = styled(Box)(({ theme }) => ({
  border: `1px solid ${theme.palette.text.secondary}`,
  borderRadius: "5px",
  "& .upload-media": {
    width: "100%",
    borderBottomLeftRadius: "5px",
    borderBottomRightRadius : "5px",
    display: 'flex',
    backgroundColor: theme.palette.background.paper,
    padding: "1rem 2rem",
    "& .file-imput": {
      display: 'none',
    },
    "& .image-upload": {
      display: 'flex',
      justifyContent: 'space-between',
      alignItem: 'center',
      marginRight: '1rem',
      "& h6": {
        marginLeft: "8px",
      }
    }
  },
  "& .styled-imput-container": {
    padding: "2.5rem 2rem",
    display: "flex",
    width: "100%",
    justifyContent: "space-between",
    "& textarea": {
      padding: "0.5rem"
    },
    "& .mention-input-container": {
      width: "90%",
      backgroundColor: theme.palette.background.paper
    },
    
  }
}))

export default function AddPost({}) {
  const [value, setValue] = useState(0)
  const [postText, setPostText] = useState("")
  const [imagePreview, setImagePreview] = useState<string | ArrayBuffer | null>(
    null
  )
  const [imageToUpload, setImageToUpload] = useState(null)

  const handleChange = (event: SyntheticEvent, newValue: number) => {
    console.log(newValue)
    // setValue(newValue);
  }

  const handleImg = (e: any) => {
    e.preventDefault()
    if (e.target.files.length) {
      const reader = new FileReader()
      const img = e.target.files[0]
      reader.readAsDataURL(img)
      reader.onloadend = () => {
        setImageToUpload(img)
        setImagePreview(reader.result)
      }
    }
  }

  const handlePostText = () => {}

  return (
    <PostBox>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
      >
        <Tab label={<Typography variant="subtitle2">Post</Typography>} />
        <Tab
          component="a"
          label={<Typography variant="subtitle2">Write an article</Typography>}
          href="/articles/add-edit"
        />
      </Tabs>
      <Box className="styled-imput-container">
        <Avatar>
          <PersonIcon />
        </Avatar>
        <MentionsInput
          className="mention-input-container"
          singleLine={false}
          value={postText}
          onChange={handlePostText}
          placeholder={
            userDetail.sharedPost && !userDetail.sharedEvent
              ? "What is happening?"
              : "Want to add something to your post?"
          }
        >
          <Mention
            trigger="@"
            displayTransform={(id: string) => `@${id}`}
            data={[]}
            // renderSuggestion={[]}
            appendSpaceOnAdd={true}
          />
        </MentionsInput>
      </Box>
      <Box className="upload-media">
        <Box>
          <input
            className="file-imput"
            type="file"
            onChange={handleImg}
            accept="image/x-png,image/gif,image/jpeg"
          />
          <label className="image-upload">
            <CropOriginalIcon />
            <Typography variant="subtitle1">Image</Typography>
          </label>
        </Box>
        <Box>
          <input
            className="file-imput"
            type="file"
            onChange={handleImg}
            accept="image/x-png,image/gif,image/jpeg"
          />
          <label className="image-upload">
            <VideoCameraBackOutlinedIcon  />
            <Typography variant="subtitle1">Video</Typography>
          </label>
        </Box>
      </Box>
    </PostBox>
  )
}
