import { DarkMode, LightMode, ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, LinearProgress, List, ListItem, Toolbar, Typography } from "@mui/material";
import { NavLink } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../store/store";
import { toggleDarkMode } from "./UISlice";


const midLinks = [
  { title: 'Catalog', path: '/catalog' },
  { title: 'About', path: '/about' },
  { title: 'Contact', path: '/contact' },
]

const rightLinks = [
  { title: 'Login', path: '/login' },
  { title: 'About', path: '/about' },
]

const navStyle = {
  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': { color: 'grey.500' },
  '&.active': { color: '#baecf9' },
}

export default function Navbar() {
  const { isLoading } = useAppSelector((state) => state.ui);
  const darkMode = useAppSelector((state) => state.ui.isDarkMode);
  const dispatch = useAppDispatch();
  return (
    <AppBar position='fixed'>
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>

        <Box display='flex' alignItems='center'>
          <Typography component={NavLink} to='/' sx={navStyle} variant='h6'>ReStore</Typography>
          <IconButton onClick={() => dispatch(toggleDarkMode())}>
            {darkMode ? <DarkMode /> : <LightMode sx={{ color: 'yellow' }} />}
          </IconButton>
        </Box>

        <List sx={{ display: 'flex' }}>
          {
            midLinks.map(
              ({ title, path }) => (
                <ListItem
                  key={path}
                  component={NavLink}
                  to={path}
                  sx={navStyle}

                >
                  {title.toUpperCase()}
                </ListItem>
              )
            )
          }
        </List>
        <Box display='flex' alignItems='center'>
          <IconButton size='large' sx={{ color: 'inherit' }}>
            <Badge badgeContent={4} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>
          <List sx={{ display: 'flex' }}>
            {
              rightLinks.map(
                ({ title, path }) => (
                  <ListItem
                    key={path}
                    component={NavLink}
                    to={path}
                    sx={navStyle}

                  >
                    {title.toUpperCase()}
                  </ListItem>
                )
              )
            }
          </List>
        </Box>

      </Toolbar>
      {isLoading && (
        <Box width= '100%'>
          <LinearProgress />
        </Box>
      )}

    </AppBar>
  )
}