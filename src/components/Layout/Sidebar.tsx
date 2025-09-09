import React from 'react';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
  Avatar,
  Chip,
  alpha,
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
  TrendingUp as TrendingUpIcon,
} from '@mui/icons-material';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../../hooks/redux';
import { setSidebarOpen } from '../../store/slices/uiSlice';

const drawerWidth = 280;
const collapsedWidth = 80;

const menuItems = [
  { 
    text: 'Dashboard', 
    icon: <DashboardIcon />, 
    path: '/dashboard', 
    badge: null,
    color: '#2563eb'
  },
  { 
    text: 'Clients', 
    icon: <PeopleIcon />, 
    path: '/clients', 
    badge: '3',
    color: '#7c3aed'
  },
  { 
    text: 'Projects', 
    icon: <FolderIcon />, 
    path: '/projects', 
    badge: '5',
    color: '#059669'
  },
  { 
    text: 'Compliance', 
    icon: <AssignmentIcon />, 
    path: '/compliance', 
    badge: '2',
    color: '#d97706'
  },
  { 
    text: 'Financial', 
    icon: <AccountBalanceIcon />, 
    path: '/financial', 
    badge: null,
    color: '#dc2626'
  },
  { 
    text: 'Reports', 
    icon: <AssessmentIcon />, 
    path: '/reports', 
    badge: null,
    color: '#0891b2'
  },
  { 
    text: 'Data Entry', 
    icon: <CloudUploadIcon />, 
    path: '/data-entry', 
    badge: null,
    color: '#be185d'
  },
  { 
    text: 'Users', 
    icon: <PersonIcon />, 
    path: '/users', 
    badge: null,
    color: '#65a30d'
  },
  { 
    text: 'Settings', 
    icon: <SettingsIcon />, 
    path: '/settings', 
    badge: null,
    color: '#64748b'
  },
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
    <Box
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#ffffff',
        color: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Logo Section */}
      <Box
        sx={{
          p: 3,
          display: 'flex',
          alignItems: 'center',
          justifyContent: sidebarOpen ? 'flex-start' : 'center',
          minHeight: 80,
          borderBottom: '1px solid #e2e8f0',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <Avatar
          sx={{
            width: sidebarOpen ? 40 : 32,
            height: sidebarOpen ? 40 : 32,
            backgroundColor: '#2563eb',
            mr: sidebarOpen ? 2 : 0,
            boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
            '&:hover': {
              transform: 'scale(1.05)',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <BusinessIcon sx={{ fontSize: sidebarOpen ? 28 : 24 }} />
        </Avatar>
        {sidebarOpen && (
          <Box>
            <Typography 
              variant="h6" 
              component="div" 
              fontWeight={700}
              sx={{ 
                mb: 0.5,
                color: '#0f172a',
                fontSize: '1rem',
              }}
            >
              CA Compliance
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: '#64748b',
                fontSize: '0.75rem',
                fontWeight: 500,
              }}
            >
              Management System
            </Typography>
          </Box>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, pt: 2, px: 2 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem 
              key={item.text} 
              disablePadding 
              sx={{ mb: 1 }}
            >
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  minHeight: 44,
                  borderRadius: 8,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  px: sidebarOpen ? 2 : 1.5,
                  py: 1,
                  position: 'relative',
                  backgroundColor: isActive ? '#dbeafe' : 'transparent',
                  color: isActive ? '#1d4ed8' : '#64748b',
                  '&:hover': {
                    backgroundColor: isActive ? '#bfdbfe' : '#f8fafc',
                    color: isActive ? '#1d4ed8' : '#0f172a',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 2 : 'auto',
                    justifyContent: 'center',
                    color: 'inherit',
                    fontSize: sidebarOpen ? 20 : 18,
                    transition: 'all 0.2s ease',
                  }}
                >
                  {item.icon}
                </ListItemIcon>
                {sidebarOpen && (
                  <Box sx={{ display: 'flex', alignItems: 'center', width: '100%', position: 'relative', zIndex: 2 }}>
                    <ListItemText
                      primary={item.text}
                      sx={{
                        '& .MuiListItemText-primary': {
                          fontSize: '0.875rem',
                          fontWeight: isActive ? 600 : 500,
                          color: 'inherit',
                          letterSpacing: '0',
                        },
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          backgroundColor: item.color,
                          color: 'white',
                          fontSize: '0.7rem',
                          height: 20,
                          minWidth: 20,
                          fontWeight: 600,
                          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
                          '&:hover': {
                            transform: 'scale(1.05)',
                          },
                          transition: 'all 0.2s ease',
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

      {/* Bottom Stats */}
      {sidebarOpen && (
        <Box sx={{ p: 3, borderTop: '1px solid rgba(255, 255, 255, 0.1)', position: 'relative', zIndex: 2 }}>
          <Box
            sx={{
              p: 3,
              borderRadius: 20,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(15px)',
              WebkitBackdropFilter: 'blur(15px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
              position: 'relative',
              overflow: 'hidden',
              '&::before': {
                content: '""',
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '2px',
                background: 'linear-gradient(90deg, transparent, rgba(16, 185, 129, 0.6), transparent)',
              },
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <TrendingUpIcon sx={{ color: '#10b981', mr: 2, fontSize: 20 }} />
              <Typography 
                variant="body2" 
                fontWeight={700}
                color="white"
                sx={{}}
              >
                Performance
              </Typography>
            </Box>
            <Typography 
              variant="h5" 
              fontWeight={800} 
              color="#10b981"
              sx={{ 
                mb: 0.5,
              }}
            >
              +12.5%
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.8)',
                fontWeight: 500,
              }}
            >
              This month
            </Typography>
          </Box>
        </Box>
      )}
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
            borderRight: '1px solid #e2e8f0',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            position: 'fixed',
            height: '100vh',
            zIndex: 1200,
            borderRadius: 0,
            overflow: 'hidden',
            backgroundColor: '#ffffff',
          },
        }}
      >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;