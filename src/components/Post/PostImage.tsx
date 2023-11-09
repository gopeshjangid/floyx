"use client"
import { Box, Modal, Typography } from "@mui/material"
import { useEffect, useState } from "react"
import Post from "./Post"
import moment from "moment"

export default function PostImage({ image, link, shared, isShared }: any) {
  const [open, setOpen] = useState(false)
  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => setOpen(true)

  const openInNewTab = () => {
    return window.open(link.url, "_blank")
  }

  useEffect(() => {
      console.log(shared)
  }, [shared])

  return (
    <Box>
      {image &&
        <Box>
          <img
            onClick={handleOpen}
            className="post__img"
            width="100%"
            src={image.thumbnailPath}
            alt="thumbnail"
          />
          <Modal open={open} onClose={handleClose}>
            <img
              // onClick={openLightBox}
              className="post__img"
              width="100%"
              src={image.thumbnailPath}
              alt="thumbnail"
            />
          </Modal>
        </Box>}
      {link &&
        <Box onClick={openInNewTab} className="post__link">
          {link.thumbnailPath &&
            <img
              width="100%"
              src={
                // ApiEndpoint.BasePath +
                link.thumbnailPath
              }
              alt="thumbnail"
            />}
          <Box>
            <Typography component={"span"}>
              {link.startDate &&
                moment(link.startDate).format("DD MMM YYYY - ")}{" "}
              {link.title}
            </Typography>
            <Typography>
              {link.url}
            </Typography>
          </Box>
        </Box>}
      {shared && !isShared && <Post
        name={shared?.author?.name || ''}
        username={shared?.author?.username || ''}
        createdDateTime={shared?.post?.createdDateTime}
        content={shared?.post?.content}
        shared={shared?.post?.shared}
        image={shared?.post?.image}
        link={shared?.post?.link}
        isShared={true}
      />}
    </Box>
  )
}
