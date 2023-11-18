import FriendsActivity from "@/components/FriendsActivity"
import PopularToday from "@/components/PopularToday"
import { Box, Grid } from "@mui/material"

export default function Page({}) {
  return (
    <Grid sx={{ width: '30%', display: { xs: 'none', md: 'block' } }}>
      <FriendsActivity />
      <PopularToday />
    </Grid>
  )
}
