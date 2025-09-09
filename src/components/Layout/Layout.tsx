import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { useAppSelector } from '../../hooks/redux';
import Sidebar from './Sidebar';
import Header from './Header';

interface LayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  return (
    <Box
      sx={{
        display: 'flex',
        height: '100vh',
        overflow: 'hidden',
        backgroundColor: '#fafafa',
      }}
    >
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <Box
        sx={{
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          marginLeft: 0,
          minHeight: '100vh',
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            backgroundColor: 'transparent',
            padding: { xs: 2, sm: 3, md: 4 },
            position: 'relative',
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;