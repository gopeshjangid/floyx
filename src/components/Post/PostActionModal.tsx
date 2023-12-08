import { useDeletePostMutation } from "@/lib/redux"
import { DeleteOutline } from "@mui/icons-material";
import { Box, Button, CircularProgress, Modal, Typography } from "@mui/material"
import React from "react";
import { useToast } from "../Toast/useToast";

export default function PostActionModal({
  action,
  open,
  setOpen,
  postId
}: {
  action: string
  open: boolean
  setOpen: React.Dispatch<React.SetStateAction<boolean>>; 
  postId: string
  }) {
  const toast = useToast();
  const [deletePost, { isLoading: isDeleting }] = useDeletePostMutation()

  const performAction = async () => {
    if (action === "Delete Post") {
      await deletePost(postId);
      setOpen(false);
      toast.success('Post is deleted successfully.')
    }
  }

  return (
    <Modal
      keepMounted
      open={open}
      onClose={() => setOpen(false)}
      aria-labelledby="keep-mounted-modal-title"
      aria-describedby="keep-mounted-modal-description"
      sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
    >
      <Box
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: 400,
          bgcolor: "background.paper",
          border: "2px solid #000",
          boxShadow: 24,
          p: 4
        }}
      >
        <Box>
          <Typography variant="h6" component="h2" display={"flex"} justifyContent={"center"} alignItems={"center"}>
            <DeleteOutline /> {action}
          </Typography>
          <Typography id="keep-mounted-modal-description" sx={{ margin: "32px 0"}}>
            {action === "Delete Post" &&
              "Are you sure you want to delete this post?"}
          </Typography>
        </Box>
        <Box sx={{textAlign: 'end'}}>
          <Button
            variant="contained"
            color="error"
            sx={{
              marginRight: 3,
              padding: "12px 29px",
              borderRadius: "10px",
            }}
            disabled={isDeleting}
            onClick={performAction}
          >
            {!isDeleting && action}
            {isDeleting && <CircularProgress color="primary" size={25}/>}
          </Button>
          <Button variant="contained" color="primary" onClick={() => setOpen(false)}>
            Cancel
          </Button>
        </Box>
      </Box>
    </Modal>
  )
}
