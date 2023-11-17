import FriendsActivity from "@/components/FriendsActivity"
import PopularToday from "@/components/PopularToday"
import { Box } from "@mui/material"

export default function Page({}) {
  return (
    <Box sx={{ width: '30%' }}>
      <FriendsActivity />
      <PopularToday />
    </Box>
  )
}
