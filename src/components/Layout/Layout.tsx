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
        backgroundColor: '#f8fafc',
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
          marginLeft: isMobile ? 0 : sidebarOpen ? '280px' : '80px',
          transition: 'margin-left 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          width: isMobile ? '100%' : `calc(100% - ${sidebarOpen ? '280px' : '80px'})`,
        }}
      >
        {/* Header */}
        <Header />

        {/* Main Content */}
        <Box
          sx={{
            flexGrow: 1,
            overflow: 'auto',
            backgroundColor: '#f8fafc',
            padding: { xs: 2, sm: 3, md: 4 },
            paddingTop: { xs: 1, sm: 2, md: 3 }, // Reduced top padding for better spacing
          }}
        >
          {children}
        </Box>
      </Box>
    </Box>
  );
};

export default Layout;