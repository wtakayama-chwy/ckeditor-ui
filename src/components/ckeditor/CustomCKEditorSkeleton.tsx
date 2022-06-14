import React from 'react'
import { Divider, Grid, Skeleton } from '@mui/material'

const CustomCKEditorSkeleton = () => (
  <Grid width="100%">
    <Skeleton height={38} variant="rectangular" width="100%" />
    <Divider />
    <Skeleton height={118} variant="rectangular" width="100%" />
  </Grid>
)

export default CustomCKEditorSkeleton
