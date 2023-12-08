"use client"
import { Box, Modal, Skeleton, Typography } from "@mui/material"
import { useState } from "react"
import Post from "./Post"
import moment from "moment"
import Link from "next/link"
import Image from 'next/image'

export default function PostImage({ image, link, shared, isShared }: any) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const handleClose = () => {
    setOpen(false)
  }
  const handleOpen = () => {
    if (!isShared) {
      setOpen(true)
    }
  }

  const openInNewTab = () => {
    return window.open(link.url, "_blank")
  }

  const handleImageLoad = () => {
    setLoading(false);
  };

  return (
    <Box>
      {image &&
        <Box>
          {loading && (
            <Skeleton
              variant="rounded"
              height={300}
              animation="wave"
            />
          )}
          <Image
            width={0}
            onLoad={handleImageLoad}
            height={0}
            sizes="100vw"
            style={{ width: '100%', height: 'auto' }} // optional
            onClick={handleOpen}
            src={image.thumbnailPath}
            alt="thumbnail"
          />
          <Modal open={open} onClose={handleClose}>
            <Image
               width={0}
                height={0}
                sizes="100vw"
                style={{ width: '100%', height: 'auto' }} // optional
              src={image.thumbnailPath}
              alt="thumbnail"
            />
          </Modal>
        </Box>}
      {link &&
        <Box onClick={openInNewTab}>
          {link.thumbnailPath &&
            <Image
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: '100%', height: 'auto' }} // optional
              src={link.thumbnailPath}
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
      {shared && !isShared && (
        <>
          <Link href={`/post/${shared?.post?.id}`}>
            <Post
              name={shared?.author?.name || ''}
              username={shared?.author?.username || ''}
              createdDateTime={shared?.post?.createdDateTime}
              content={shared?.post?.content}
              shared={shared?.post?.shared}
              image={shared?.post?.image}
              link={shared?.post?.link}
              postId={shared?.post?.id}
              isShared={true}
            />
          </Link>
        </>
      )}
    </Box>
  )
}
