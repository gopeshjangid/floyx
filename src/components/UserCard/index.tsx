import { Avatar, Box, Link, Typography } from "@mui/material"
import { styled } from "@mui/material/styles"

import DateParser from "../DateParser"
import { StyledTypography } from "../StyledSecondaryText"

export const UserCardBox = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "flex-start",
  alignItems: "center",
  padding: "20px 0px",
  "& .display-flex": {
    display: "flex",
    alignItems: "center"
  }
}))

export default function UserCard({
  name,
  displayPicture,
  username,
  timestamp,
  shared
}: {
  name: string
  displayPicture?: string
  username: string
  timestamp: number,
  shared?: any; 
}) {
  return (
    <UserCardBox>
      <Box>
        <Avatar
          alt={name}
          src={displayPicture}
          sx={{ width: 50, height: 50, marginRight: "10px" }}
        />
      </Box>
      <Box>
        <Box className="display-flex">
          {name &&
            <Link href="#" underline="none" >
              <StyledTypography variant="subtitle1" marginRight={1} >
                {name}
              </StyledTypography>
            </Link>}
          {username &&
            <Typography
              variant="body2"
              className="card-username"
              color={"primary"}
              marginRight={1}
              marginBottom={1.5}
              display={"block"}
              width="max-content"
            >
              @{username}
            </Typography>}
          {shared && (
            <>
              <StyledTypography
                variant="subtitle1"
                marginRight={1}
                marginBottom={1.5}
                display={"block"}
                width="max-content"
              >
                shared a
              </StyledTypography>
              <Link href="#" underline="none" >
                <Typography
                  variant="subtitle1"
                  marginBottom={1}
                >
                  post
                </Typography>
              </Link>
              </>
            )}
          </Box>
        {timestamp &&
          <Box>
            <DateParser date={timestamp} />
          </Box>}
        
      </Box>
    </UserCardBox>
  )
}
