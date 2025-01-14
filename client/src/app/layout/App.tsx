import { useEffect, useState } from "react";
import { Product } from "../models/product";
import Catalog from "../features/catalog/Catalog";
import { Box, Container, createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import Navbar from "./Navbar";

function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [darkMode, setDarkMode] = useState(true);
  const palletType = darkMode ? 'dark' : 'light';

  const changeMode = () =>{
    setDarkMode(!darkMode);
  }

  const theme = createTheme({
    palette: {
      mode: palletType,
      background: {
        default: palletType === 'dark' ? '#121212' : '#eaeaea',
      }
    }
  })

  useEffect(() => {
    fetch("https://localhost:5001/api/products")
      .then((response) => response.json())
      .then((data) => setProducts(data));
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline/>
      <Navbar darkMode={darkMode} changeMode={changeMode}/>      
      <Box
        sx={{
          minHeight: "100vh",
          background: darkMode ? 'radial-gradient(circle, #1e3aBa, #111B27)' : "radial-gradient(circle, #bacef9, #f0f9ff)",
          py: 6,
        }}
      >
        <Container maxWidth="xl" sx={{ mt: 8, }}>
          <Catalog products={products} />
        </Container>
      </Box>

    </ThemeProvider>
  );
}

export default App;
