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
        background: 'linear-gradient(180deg, #1e293b 0%, #334155 100%)',
        color: 'white',
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
          borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        }}
      >
        <Avatar
          sx={{
            width: sidebarOpen ? 48 : 40,
            height: sidebarOpen ? 48 : 40,
            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
            mr: sidebarOpen ? 2 : 0,
            boxShadow: '0 4px 12px rgba(37, 99, 235, 0.3)',
          }}
        >
          <BusinessIcon sx={{ fontSize: sidebarOpen ? 24 : 20 }} />
        </Avatar>
        {sidebarOpen && (
          <Box>
            <Typography 
              variant="h6" 
              component="div" 
              fontWeight={700}
              sx={{ mb: 0.5 }}
            >
              CA Compliance
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                opacity: 0.8,
                fontSize: '0.75rem',
              }}
            >
              Management System
            </Typography>
          </Box>
        )}
      </Box>

      {/* Menu Items */}
      <List sx={{ flexGrow: 1, pt: 2, px: 1 }}>
        {menuItems.map((item) => {
          const isActive = location.pathname === item.path;
          return (
            <ListItem 
              key={item.text} 
              disablePadding 
              sx={{ mb: 0.5 }}
            >
              <ListItemButton
                onClick={() => handleItemClick(item.path)}
                sx={{
                  minHeight: 48,
                  borderRadius: 2,
                  justifyContent: sidebarOpen ? 'flex-start' : 'center',
                  px: sidebarOpen ? 2 : 1.5,
                  py: 1,
                  position: 'relative',
                  background: isActive 
                    ? `linear-gradient(135deg, ${alpha(item.color, 0.2)} 0%, ${alpha(item.color, 0.1)} 100%)`
                    : 'transparent',
                  border: isActive 
                    ? `1px solid ${alpha(item.color, 0.3)}`
                    : '1px solid transparent',
                  '&:hover': {
                    background: `rgba(255, 255, 255, 0.08)`,
                    transform: 'translateX(4px)',
                  },
                  transition: 'all 0.2s ease',
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: sidebarOpen ? 2 : 'auto',
                    justifyContent: 'center',
                    color: isActive ? item.color : 'rgba(255, 255, 255, 0.8)',
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
                          fontWeight: isActive ? 600 : 500,
                          color: isActive ? 'white' : 'rgba(255, 255, 255, 0.9)',
                        },
                      }}
                    />
                    {item.badge && (
                      <Chip
                        label={item.badge}
                        size="small"
                        sx={{
                          background: item.color,
                          color: 'white',
                          fontSize: '0.7rem',
                          height: 20,
                          minWidth: 20,
                          fontWeight: 600,
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
        <Box sx={{ p: 2, borderTop: '1px solid rgba(255, 255, 255, 0.1)' }}>
          <Box
            sx={{
              p: 2,
              borderRadius: 2,
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
            }}
          >
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
              <TrendingUpIcon sx={{ color: '#10b981', mr: 1, fontSize: 18 }} />
              <Typography variant="body2" fontWeight={600}>
                Performance
              </Typography>
            </Box>
            <Typography variant="h6" fontWeight={700} color="#10b981">
              +12.5%
            </Typography>
            <Typography variant="caption" sx={{ opacity: 0.8 }}>
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
          transition: 'width 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
          borderRight: 'none',
          boxShadow: '0 0 20px rgba(0, 0, 0, 0.1)',
        },
      }}
    >
      {drawer}
    </Drawer>
  );
};

export default Sidebar;