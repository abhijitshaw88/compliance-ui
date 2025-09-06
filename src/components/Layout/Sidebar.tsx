import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Chip,
  Avatar,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  People as PeopleIcon,
  Folder as FolderIcon,
  Assignment as AssignmentIcon,
  AccountBalance as AccountBalanceIcon,
  Assessment as AssessmentIcon,
  CloudUpload as CloudUploadIcon,
  Settings as SettingsIcon,
  Person as PersonIcon,
  Business as BusinessIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setSidebarOpen } from '../../store/slices/uiSlice';

const drawerWidth = 280;
const collapsedWidth = 70;

const menuItems = [
  { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard', badge: null },
  { text: 'Clients', icon: <PeopleIcon />, path: '/clients', badge: '3' },
  { text: 'Projects', icon: <FolderIcon />, path: '/projects', badge: '5' },
  { text: 'Compliance', icon: <AssignmentIcon />, path: '/compliance', badge: '2' },
  { text: 'Financial', icon: <AccountBalanceIcon />, path: '/financial', badge: null },
  { text: 'Reports', icon: <AssessmentIcon />, path: '/reports', badge: null },
  { text: 'Data Entry', icon: <CloudUploadIcon />, path: '/data-entry', badge: null },
  { text: 'Users', icon: <PersonIcon />, path: '/users', badge: null },
  { text: 'Settings', icon: <SettingsIcon />, path: '/settings', badge: null },
];

const Sidebar: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { sidebarOpen } = useAppSelector((state) => state.ui);

  const handleItemClick = (path: string) => {
    navigate(path);
    if (isMobile) {
      dispatch(setSidebarOpen(false));
    }
  };

  const drawer = (
    <Box sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      background: sidebarOpen 
        ? 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)' 
        : 'linear-gradient(180deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
    }}>
      {/* Logo */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
          minHeight: 80,
          textAlign: 'center',
        }}
      >
        <Avatar
          sx={{
            width: sidebarOpen ? 48 : 40,
            height: sidebarOpen ? 48 : 40,
            bgcolor: 'rgba(255,255,255,0.2)',
            backdropFilter: 'blur(10px)',
            mr: sidebarOpen ? 2 : 0,
          }}
        >
          <BusinessIcon sx={{ fontSize: sidebarOpen ? 28 : 24 }} />
        </Avatar>
        {sidebarOpen && (
          <Box>
            <Typography variant="h5" component="div" sx={{ fontWeight: 'bold', mb: 0.5 }}>
              CA Compliance
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, fontSize: '0.75rem' }}>
              Management System
            </Typography>
          </Box>
        )}
      </Box>

      <Divider sx={{ borderColor: 'rgba(255,255,255,0.2)' }} />

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, pt: 2, px: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem key={item.text} disablePadding sx={{ mb: 0.5 }}>
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  minHeight: 48,
                  borderRadius: 2,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  px: sidebarOpen ? 2 : 1.5,
                  transition: 'all 0.3s ease',
                  bgcolor: isActive ? 'rgba(255,255,255,0.15)' : 'transparent',
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)',
                    transform: 'translateX(4px)',
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 2 : 'auto',
                    justifyContent: 'center',
                    color: 'white',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.9rem',
                          fontWeight: isActive ? 600 : 400,
                        },
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          bgcolor: 'rgba(255,255,255,0.2)',
                          color: 'white',
                          fontSize: '0.7rem',
                          height: 20,
                          minWidth: 20,
                        }}
                      />
                    )}
                  </Box>
                )}
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <Drawer
      variant={isMobile ? 'temporary' : 'persistent'}
      open={sidebarOpen}
      onClose={() => dispatch(setSidebarOpen(false))}
      sx={{
        width: sidebarOpen ? drawerWidth : collapsedWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: sidebarOpen ? drawerWidth : collapsedWidth,
          boxSizing: 'border-box',
          transition: 'width 0.3s ease',
          borderRight: 'none',
          boxShadow: '0 0 20px rgba(0,0,0,0.1)',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;
