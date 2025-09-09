import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  Badge,
  Avatar,
  Menu,
  MenuItem,
  TextField,
  InputAdornment,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  Notifications as NotificationsIcon,
  Settings as SettingsIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { toggleSidebar } from '../../store/slices/uiSlice';
import { logout } from '../../store/slices/authSlice';

const Header: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [searchQuery, setSearchQuery] = useState('');

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
    handleProfileMenuClose();
  };

  const handleSearch = (event: React.FormEvent) => {
    event.preventDefault();
    console.log('Search query:', searchQuery);
  };

  return (
    <AppBar
      position="static"
      elevation={0}
      sx={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        height: 64,
        marginBottom: 0,
        borderRadius: 0,
        position: 'relative',
      }}
    >
      <Toolbar sx={{ height: 64, px: { xs: 2, sm: 3 } }}>
        {/* Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ 
            mr: 2,
            color: '#64748b',
            backgroundColor: 'transparent',
            borderRadius: 8,
            '&:hover': {
              backgroundColor: '#f8fafc',
              color: '#0f172a',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <MenuIcon />
        </IconButton>

        {/* Search Bar */}
        <Box
          component="form"
          onSubmit={handleSearch}
            sx={{
              flexGrow: 1,
              maxWidth: 500,
              mr: 2,
            }}
        >
          <TextField
            fullWidth
            placeholder="Search anything..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#ffffff',
                border: '1px solid #e2e8f0',
                borderRadius: 8,
                color: '#0f172a',
                height: 40,
                '&:hover': {
                  borderColor: '#cbd5e1',
                },
                '&.Mui-focused': {
                  borderColor: '#2563eb',
                  borderWidth: 2,
                  boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
                },
                '& input::placeholder': {
                  color: '#94a3b8',
                  opacity: 1,
                  fontWeight: 400,
                },
              },
            }}
          />
        </Box>

        {/* Notifications */}
        <IconButton 
          sx={{ 
            mr: 2,
            color: '#64748b',
            backgroundColor: 'transparent',
            borderRadius: 8,
            '&:hover': {
              backgroundColor: '#f8fafc',
              color: '#0f172a',
            },
            transition: 'all 0.2s ease',
          }}
        >
          <Badge 
            badgeContent={3} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                backgroundColor: '#ef4444',
                fontWeight: 600,
                fontSize: '0.75rem',
                boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && (
            <Box sx={{ mr: 3, textAlign: 'right' }}>
              <Typography 
                variant="body2" 
                fontWeight={600} 
                color="#0f172a"
              >
                {user?.full_name || 'System Administrator'}
              </Typography>
              <Typography 
                variant="caption" 
                sx={{ 
                  color: '#64748b',
                }}
              >
                {user?.role || 'Admin'}
              </Typography>
            </Box>
          )}
          
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              p: 0.5,
              '&:hover': {
                backgroundColor: '#f8fafc',
                transform: 'scale(1.05)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40,
                backgroundColor: '#2563eb',
                fontWeight: 600,
                fontSize: '1rem',
                boxShadow: '0 2px 8px rgba(37, 99, 235, 0.2)',
              }}
            >
              {user?.full_name?.charAt(0) || 'S'}
            </Avatar>
          </IconButton>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'right',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={Boolean(anchorEl)}
          onClose={handleProfileMenuClose}
          PaperProps={{
            sx: {
              mt: 2,
              borderRadius: 20,
              minWidth: 240,
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(20px)',
              WebkitBackdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              boxShadow: '0 20px 60px rgba(0, 0, 0, 0.15)',
            },
          }}
        >
          <Box sx={{ p: 3, borderBottom: '1px solid rgba(255, 255, 255, 0.1)' }}>
            <Typography 
              variant="subtitle2" 
              fontWeight={700}
              color="white"
              sx={{}}
            >
              {user?.full_name || 'System Administrator'}
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                color: 'rgba(255, 255, 255, 0.7)',
              }}
            >
              {user?.email || 'admin@compliance.com'}
            </Typography>
          </Box>
          <MenuItem 
            onClick={() => { navigate('/settings'); handleProfileMenuClose(); }}
            sx={{ 
              py: 2,
              px: 3,
              color: 'white',
              '&:hover': {
                background: 'rgba(255, 255, 255, 0.1)',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <SettingsIcon sx={{ mr: 2, color: 'rgba(255, 255, 255, 0.7)' }} />
            Settings
          </MenuItem>
          <MenuItem 
            onClick={handleLogout}
            sx={{ 
              py: 2,
              px: 3,
              color: 'white',
              '&:hover': {
                background: 'rgba(239, 68, 68, 0.1)',
                transform: 'translateX(4px)',
              },
              transition: 'all 0.2s ease',
            }}
          >
            <LogoutIcon sx={{ mr: 2, color: '#ef4444' }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;