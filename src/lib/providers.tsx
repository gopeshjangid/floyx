'use client'

/* Core */
import React from "react";
import { Provider } from 'react-redux'

/* Instruments */
import { reduxStore } from '@/lib/redux'

export const Providers = (props: React.PropsWithChildren) => {
  return <Provider store={reduxStore}>{props.children}</Provider>
}
