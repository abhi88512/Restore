import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";
import { Outlet, ScrollRestoration } from "react-router-dom";
import { useAppSelector } from "../store/store";

function App() {

  const darkMode = useAppSelector((state) => state.ui.isDarkMode);
  const palletType = darkMode ? 'dark' : 'light';


  const theme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: palletType === 'dark' ? '#121212' : '#eaeaea',
      }
    }
  })

  return (
    <ThemeProvider theme={theme}>
      <ScrollRestoration/>
      <CssBaseline/>
      <Navbar />      
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode ? 'radial-gradient(circle, #1e3aBa, #111B27)' : "radial-gradient(circle, #bacef9, #f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8, }}>
          <Outlet/>
        </Container>
      </Box>

    </ThemeProvider>
  );
}

export default App;
