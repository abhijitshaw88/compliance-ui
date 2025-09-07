import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Button,
  InputAdornment,
  IconButton,
  Alert,
  Container,
  Paper,
  Avatar,
  useTheme,
  alpha,
  Fade,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Business,
  Email,
  Lock,
  ArrowForward,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { login } from '../../store/slices/authSlice';

const Login: React.FC = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: '',
    password: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      await dispatch(login(credentials)).unwrap();
      navigate('/dashboard');
    } catch (err: any) {
      setError(typeof err === 'string' ? err : 'Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (field: string) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setCredentials(prev => ({ ...prev, [field]: e.target.value }));
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 2,
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Animated Background Elements */}
      <Box
        sx={{
          position: 'absolute',
          top: -50,
          right: -50,
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.1)',
          animation: 'float 6s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: -100,
          left: -100,
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'rgba(255, 255, 255, 0.05)',
          animation: 'float 8s ease-in-out infinite reverse',
        }}
      />

      <Container maxWidth="sm">
        <Fade in timeout={1000}>
          <Paper
            elevation={24}
            sx={{
              p: { xs: 3, sm: 4, md: 5 },
              borderRadius: 4,
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              position: 'relative',
              overflow: 'hidden',
            }}
          >
            {/* Header */}
            <Box sx={{ textAlign: 'center', mb: 4 }}>
              <Avatar
                sx={{
                  width: 80,
                  height: 80,
                  mx: 'auto',
                  mb: 3,
                  background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                  boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)',
                }}
              >
                <Business sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography
                variant="h3"
                component="h1"
                fontWeight={800}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                  backgroundClip: 'text',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  mb: 1,
                }}
              >
                CA Compliance
              </Typography>
              <Typography variant="h6" color="text.secondary" fontWeight={500}>
                Welcome back! Please sign in to continue
              </Typography>
            </Box>

            {/* Login Form */}
            <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
              {error && (
                <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
                  {error}
                </Alert>
              )}

              <TextField
                fullWidth
                label="Username"
                value={credentials.username}
                onChange={handleChange('username')}
                required
                sx={{ mb: 3 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="action" />
                    </InputAdornment>
                  ),
                }}
              />

              <TextField
                fullWidth
                label="Password"
                type={showPassword ? 'text' : 'password'}
                value={credentials.password}
                onChange={handleChange('password')}
                required
                sx={{ mb: 4 }}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Lock color="action" />
                    </InputAdornment>
                  ),
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Button
                type="submit"
                fullWidth
                variant="contained"
                size="large"
                disabled={loading}
                endIcon={<ArrowForward />}
                sx={{
                  py: 1.5,
                  fontSize: '1rem',
                  fontWeight: 600,
                  mb: 3,
                }}
              >
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </Box>

            {/* Demo Credentials */}
            <Box
              sx={{
                p: 3,
                borderRadius: 2,
                background: alpha(theme.palette.primary.main, 0.05),
                border: `1px solid ${alpha(theme.palette.primary.main, 0.1)}`,
              }}
            >
              <Typography variant="body2" color="text.secondary" fontWeight={600} gutterBottom>
                Demo Credentials:
              </Typography>
              <Typography variant="body2" color="text.primary" fontFamily="monospace">
                Username: <strong>admin</strong> | Password: <strong>admin123</strong>
              </Typography>
            </Box>
          </Paper>
        </Fade>
      </Container>
    </Box>
  );
};

export default Login;