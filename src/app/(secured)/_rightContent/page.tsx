"use client";

import FriendsActivity from "@/components/FriendsActivity"
import PopularToday from "@/components/PopularToday"
import RecommendedTopics from "@/components/recommendedTopics/recommendedTopics";
import SearchBarArcticleRight from "@/components/searchBar/searchBarArcticleRight";
import WhoToFollow from "@/components/whoToFollow";
import { Grid } from "@mui/material"
import { usePathname } from 'next/navigation'
import { Suspense } from "react";
import WhoToFollowLoader from "@/components/whoToFollow/loader";

export default function Page() {
  const pathname = usePathname();
  const GetRightComponent = () => {
    switch (pathname) {
      case "/":
        return (
          <>
            <PopularToday />
            <FriendsActivity />
          </>
        )
      case "/article": 
        return (
          <>
            <SearchBarArcticleRight />
            <RecommendedTopics />
            <Suspense fallback={<WhoToFollowLoader />}>
              <WhoToFollow />
            </Suspense>
          </>
        )
    }
  }
  return (
    <Grid sx={{ width: '30%', display: { xs: 'none', sm: 'block' } }}>
      <GetRightComponent />
    </Grid>
  )
}