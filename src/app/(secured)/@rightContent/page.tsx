import FriendsActivity from "@/components/FriendsActivity"
import PopularToday from "@/components/PopularToday"
import { Box } from "@mui/material"

export default function Page({}) {
  return (
    <Box>
      <FriendsActivity />
      <PopularToday />
    </Box>
  )
}
