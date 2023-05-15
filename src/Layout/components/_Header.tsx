import { AppBar, Box, Stack, Typography } from '@mui/material';
import { SwitchModeButton } from 'src/components';

export const Header = (): JSX.Element => (
  <AppBar sx={{ height: '40px', bgcolor: '#8D918D' }} position="static">
    <Box mx="auto" maxWidth="1200px" width="100%">
      <Stack direction="row" justifyContent="space-between" alignItems="center">
        <Typography variant="h6" component="h1">
          Convert app
        </Typography>
        <SwitchModeButton />
      </Stack>
    </Box>
  </AppBar>
);
