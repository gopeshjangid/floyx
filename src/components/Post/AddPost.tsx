"use client"

import { Box, Button, Tab, Tabs, Typography, CircularProgress } from "@mui/material"
import { SyntheticEvent, useRef, useState } from "react"
import Image from 'next/image'
import Link from 'next/link';

import { userDetail } from "../../constant/payload"
import Avatar from "@mui/material/Avatar"
import { MentionsInput, Mention } from "react-mentions"
import CropOriginalIcon from "@mui/icons-material/CropOriginal"
import { PostBox } from "./styledPostBox"
import { useCreatePostMutation } from "@/lib/redux"
import { SVGUser } from "@/assets/images"

const initialPostObj = {
  postText: '',
  postTextLeft: 280,
  publishButtonDisabled: false,
};

export default function AddPost() {
  const imageFileInput = useRef<HTMLInputElement>(null)
  const [postObj, setPostObj] = useState(initialPostObj)
  const value = 0;
  const isAuthorizedUser =false;
  const [imagePreview, setImagePreview] = useState<any>('')
  const [imageToUpload, setImageToUpload] = useState<string | Blob>('')

  const [createPost, {error, isLoading }] = useCreatePostMutation();

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
        setImagePreview(reader.result || "")
      }
    }
  }

  const handlePostText = (e: any, newValue: any, newPlainTextValue: any) => {
    const text = e.target.value;

    setPostObj(prev => {
      return {
        ...prev,
        postText: text,
        postTextLeft: 280 - calulcateLength(newPlainTextValue),
        publishButtonDisabled: !isAuthorizedUser ? true : 280 - calulcateLength(newPlainTextValue) < 0,
      }
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

  const publishImage = async () => {
    const formData = new FormData()
    formData.append('text', postObj.postText)
    formData.append('file', imageToUpload)
    await createPost(formData);
    setPostObj(initialPostObj);
  }

  const publishPost = () => {
    setPostObj((prev) => ({ ...prev, publishButtonDisabled: true }))
    publishImage()
  }

  return (
    <>
    <PostBox>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label="icon tabs example"
        sx={{ paddingX: 2}} 
      >
        <Tab sx={{ paddingX: 2}} label={<Typography variant="subtitle2">Post</Typography>} />
        <Tab
          component={Link}
          label={<Typography variant="subtitle2">Write an article</Typography>}
          href="/article/add-edit"
        />
      </Tabs>
      <Box className={`input-container ${postObj.postTextLeft < 0 ? 'danger-text' : postObj.postTextLeft < 30 ? 'warning-text' : ''}`}>
        <Box className="styled-input-container">
        <Avatar>
          <SVGUser />
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
            <Typography component={"span"} color={"error"}>
                {postObj.postTextLeft > 0
                ? 'You are getting close to the maximum character limit.'
                : 'You have exceeded the maximum character limit.'}
            </Typography>  

            <Typography component={"span"}>{postObj.postTextLeft}</Typography>
          </div>
          )}
          {error && !isLoading && <Typography component={"span"} color={"error"}>{"Please add photo description to publish it."}</Typography>}
        {imagePreview && <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }} // optional
              src={imagePreview}
              alt="thumbnail"
            />}
      </Box>
      <Box className="upload-media">
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
      <Box>
        {(imagePreview || postObj.postText !== '') &&
          <Button
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{ marginTop: 1 }}
            onClick={publishPost}
          >
            {isLoading && <CircularProgress />}
            {!isLoading && "Publish Post"}
          </Button>
        }
      </Box>
    </>
  )
}