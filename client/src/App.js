import { BrowserRouter, Navigate, Routes, Route } from 'react-router-dom'
import { HomePage } from './scenes/homePage';
import { LoginPage } from './scenes/loginPage';
import { ProfilePage } from './scenes/profilePage'; 
import { useMemo } from 'react'; // 1
import { useSelector } from 'react-redux' // 2
import { CssBaseline, ThemeProvider } from '@mui/material'
import { createTheme } from '@mui/material/styles'
import { themeSettings } from './theme';

function App() {
  const mode = useSelector((state) => state.mode)
  const theme = useMemo(() => createTheme(themeSettings(mode), [mode]))

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/home" element={<HomePage />} />
            <Route path="/profile/:userId" element={<ProfilePage />} />
          </Routes>
          </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;


/*
1. The useMemo hook is a built-in hook in React that allows you to memoize a value. It helps improve the performance of your React application by only recomputing a value if one of its dependencies has changed. In other words, it allows you to cache the result of an expensive calculation and reuse it if the inputs haven't changed.

2. The useSelector hook is a built-in hook in react-redux that allows you to access the state managed by Redux from within your React components. */