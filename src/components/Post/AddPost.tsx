"use client"

import { Box, Card, CardContent, Tab, Tabs, Typography } from "@mui/material"
import { SyntheticEvent, useEffect, useRef, useState } from "react"
import { userDetail } from "../../constant/payload"
import Avatar from "@mui/material/Avatar"
import PersonIcon from "@mui/icons-material/Person"
import { MentionsInput, Mention } from "react-mentions"
import CropOriginalIcon from "@mui/icons-material/CropOriginal"
import VideoCameraBackOutlinedIcon from "@mui/icons-material/VideoCameraBackOutlined"
import { PostBox } from "./styledPostBox"


export default function AddPost({}) {
  const imageFileInput = useRef<HTMLInputElement>(null)
  const videoFileInput = useRef<HTMLInputElement>(null)
  const [value, setValue] = useState(0);
  const [isAuthorizedUser, setIsAuthorizedUser] = useState<Boolean>(false);
  const [postObj, setPostObj] = useState({
    postText: '',
    postTextLeft: 280,
    publishButtonDisabled: false,
  })
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

  const handlePostText = (e: any, newValue: any, newPlainTextValue: any, mentions: any) => {
    const text = e.target.value

    setPostObj({
      postText: text,
      postTextLeft: 280 - calulcateLength(newPlainTextValue),
      publishButtonDisabled: !isAuthorizedUser ? true : 280 - calulcateLength(newPlainTextValue) < 0
    })
  }

  const calulcateLength = (str: string) => {
    const output = str.replace(/([\uE000-\uF8FF]|\uD83C[\uDC00-\uDFFF]|\uD83D[\uDC00-\uDFFF]|[\u2694-\u2697]|\uD83E[\uDD10-\uDD5D])/g, '')
    const total = fancyCount(str) - fancyCount(output) + fancyCount(output)
    return total
  }

  const fancyCount = (str: any) => {
    return Array.from(str.split(/[\ufe00-\ufe0f]/).join('')).length
  }

  useEffect(() => {
    // userDetailsService.refresh();

  }, [])
  return (
    <PostBox>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
        sx={{ paddingX: 2}} 
      >
        <Tab sx={{ paddingX: 2}} label={<Typography variant="subtitle2">Post</Typography>} />
        <Tab
          component="a"
          label={<Typography variant="subtitle2">Write an article</Typography>}
          href="/articles/add-edit"
        />
      </Tabs>
      <Box className={`input-container ${postObj.postTextLeft < 0 ? 'danger-text' : postObj.postTextLeft < 30 ? 'warning-text' : ''}`}>
        <Box className="styled-input-container">
        <Avatar>
          <PersonIcon />
        </Avatar>
        <MentionsInput
          className="mention-input-container"
          singleLine={false}
          value={postObj.postText}
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
        {postObj.postTextLeft < 30 && (
          <div className="post__warning">
            <span>
              {postObj.postTextLeft > 0
                ? 'You are getting close to the maximum character limit.'
                : 'You have exceeded the maximum character limit.'}
            </span>
            <span className="post__count">{postObj.postTextLeft}</span>
          </div>
        )}
        {imagePreview && <img src={imagePreview} />}
      </Box>
      <Box className="upload-media">
        <Box>
          <input
            className="file-imput"
            type="file"
            onChange={handleImg}
            ref={videoFileInput}
            accept="image/x-png,image/gif,image/jpeg"
          />
          <label className="image-upload"  onClick={() => {
              videoFileInput?.current?.click()
            }}>
            <VideoCameraBackOutlinedIcon />
            <Typography variant="subtitle1">Video</Typography>
          </label>
        </Box>
        <Box>
          <input
            className="file-imput"
            type="file"
            onChange={handleImg}
            accept="image/x-png,image/gif,image/jpeg"
            ref={imageFileInput}
          />
          <label
            className="image-upload"
            onClick={() => {
              imageFileInput?.current?.click()
            }}
          >
            <CropOriginalIcon />
            <Typography variant="subtitle1">Image</Typography>
          </label>
        </Box>
      </Box>
    </PostBox>
  )
}
