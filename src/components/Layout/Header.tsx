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
  alpha,
  Chip,
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
        background: 'white',
        borderBottom: '1px solid #e2e8f0',
        boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
        height: 72,
      }}
    >
      <Toolbar sx={{ height: 72, px: { xs: 2, sm: 3 } }}>
        {/* Menu Button */}
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => dispatch(toggleSidebar())}
          sx={{ 
            mr: 2,
            color: '#64748b',
            '&:hover': {
              backgroundColor: alpha(theme.palette.primary.main, 0.08),
            },
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
            maxWidth: 600,
            mr: 3,
          }}
        >
          <TextField
            fullWidth
            placeholder="Search clients, invoices, transactions..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            size="small"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon sx={{ color: '#94a3b8' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              '& .MuiOutlinedInput-root': {
                backgroundColor: '#f8fafc',
                borderRadius: 2,
                '&:hover': {
                  backgroundColor: '#f1f5f9',
                },
                '&.Mui-focused': {
                  backgroundColor: 'white',
                  boxShadow: '0 0 0 3px rgba(37, 99, 235, 0.1)',
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
            '&:hover': {
              backgroundColor: alpha(theme.palette.warning.main, 0.08),
            },
          }}
        >
          <Badge 
            badgeContent={3} 
            color="error"
            sx={{
              '& .MuiBadge-badge': {
                background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
                fontWeight: 600,
              },
            }}
          >
            <NotificationsIcon />
          </Badge>
        </IconButton>

        {/* User Profile */}
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          {!isMobile && (
            <Box sx={{ mr: 2, textAlign: 'right' }}>
              <Typography variant="body2" fontWeight={600} color="text.primary">
                {user?.full_name || 'System Administrator'}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {user?.role || 'Admin'}
              </Typography>
            </Box>
          )}
          
          <IconButton
            onClick={handleProfileMenuOpen}
            sx={{
              p: 0.5,
              '&:hover': {
                backgroundColor: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <Avatar 
              sx={{ 
                width: 40, 
                height: 40,
                background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                fontWeight: 600,
                fontSize: '1rem',
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
              mt: 1,
              borderRadius: 2,
              minWidth: 200,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
              border: '1px solid #e2e8f0',
            },
          }}
        >
          <Box sx={{ p: 2, borderBottom: '1px solid #f1f5f9' }}>
            <Typography variant="subtitle2" fontWeight={600}>
              {user?.full_name || 'System Administrator'}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {user?.email || 'admin@compliance.com'}
            </Typography>
          </Box>
          <MenuItem 
            onClick={() => { navigate('/settings'); handleProfileMenuClose(); }}
            sx={{ 
              py: 1.5,
              '&:hover': {
                background: alpha(theme.palette.primary.main, 0.08),
              },
            }}
          >
            <SettingsIcon sx={{ mr: 2, color: 'text.secondary' }} />
            Settings
          </MenuItem>
          <MenuItem 
            onClick={handleLogout}
            sx={{ 
              py: 1.5,
              '&:hover': {
                background: alpha(theme.palette.error.main, 0.08),
              },
            }}
          >
            <LogoutIcon sx={{ mr: 2, color: 'error.main' }} />
            Logout
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;