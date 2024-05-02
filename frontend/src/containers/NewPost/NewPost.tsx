import { Box, Container, Grid, TextField } from '@mui/material'
import React from 'react'

const NewPost: React.FC = () => {
  return (
    <Container maxWidth='md'>
      <Box component='form'>
        <Grid container>
          <Grid item xs={12}><TextField/></Grid>
          <Grid item xs={12}><TextField/></Grid>
          <Grid item xs={12}><TextField/></Grid>
        </Grid>
      </Box>
    </Container>
  )
}

export default NewPost