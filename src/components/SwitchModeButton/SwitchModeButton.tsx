import { IconButton, useTheme } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import { useAppDispatch, useAppSelector } from 'src/store/hooks';
import { changeViewMode } from 'src/store/reducers/modeReducer/modeReducer';

export const SwitchModeButton = (): JSX.Element => {
  const dispatch = useAppDispatch();
  const isDark = useAppSelector((store) => store.mode.mode);
  const theme = useTheme();

  return (
    <IconButton onClick={() => dispatch(changeViewMode(isDark === 'light' ? 'dark' : 'light'))}>
      {theme.palette.mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
    </IconButton>
  );
};
