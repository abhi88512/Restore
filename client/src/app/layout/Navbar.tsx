import { DarkMode, LightMode } from "@mui/icons-material";
import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";

type Props = {
    darkMode: boolean;
    changeMode: () => void;
}

export default function Navbar({darkMode, changeMode}: Props) {
  return (
    <AppBar position='fixed'>
        <Toolbar>
            <Typography variant='h6'>ReStore</Typography>
            <IconButton onClick={changeMode}>
                {darkMode ? <DarkMode/> : <LightMode sx={{color: 'yellow'}}/>}
            </IconButton>
        </Toolbar>

    </AppBar>
  )
}