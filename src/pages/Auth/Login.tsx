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
  Grid,
  useMediaQuery,
  Card,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Business,
  Email,
  Lock,
  ArrowForward,
  Security,
  Speed,
  TrendingUp,
  CheckCircle,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../hooks/redux';
import { login } from '../../store/slices/authSlice';

const Login: React.FC = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
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

  const features = [
    {
      icon: <Security />,
      title: 'Secure & Compliant',
      description: 'Bank-grade security with full compliance management',
    },
    {
      icon: <Speed />,
      title: 'Lightning Fast',
      description: 'Optimized performance for maximum productivity',
    },
    {
      icon: <TrendingUp />,
      title: 'Growth Focused',
      description: 'Analytics and insights to drive your business forward',
    },
  ];

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: isMobile 
          ? 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
          : 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: { xs: 2, sm: 3 },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Elements for Mobile */}
      {isMobile && (
        <>
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
        </>
      )}

      <Container maxWidth={isMobile ? 'sm' : 'lg'}>
        <Grid container spacing={4} alignItems="center">
          {/* Left Side - Features (Desktop Only) */}
          {!isMobile && (
            <Grid item xs={12} md={6}>
              <Box sx={{ pr: 4 }}>
                <Box sx={{ mb: 4 }}>
                  <Avatar
                    sx={{
                      width: 80,
                      height: 80,
                      mb: 3,
                      background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                      boxShadow: '0 8px 32px rgba(37, 99, 235, 0.3)',
                    }}
                  >
                    <Business sx={{ fontSize: 40 }} />
                  </Avatar>
                  <Typography
                    variant="h2"
                    component="h1"
                    fontWeight={800}
                    sx={{
                      background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                      backgroundClip: 'text',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                      mb: 2,
                    }}
                  >
                    CA Compliance
                  </Typography>
                  <Typography variant="h5" color="text.secondary" fontWeight={500} sx={{ mb: 4 }}>
                    Professional compliance management made simple
                  </Typography>
                </Box>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                  {features.map((feature, index) => (
                    <Card
                      key={index}
                      sx={{
                        p: 3,
                        borderRadius: 3,
                        background: 'rgba(255, 255, 255, 0.8)',
                        backdropFilter: 'blur(10px)',
                        border: '1px solid rgba(255, 255, 255, 0.2)',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
                        },
                      }}
                    >
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                        <Avatar
                          sx={{
                            background: 'linear-gradient(135deg, #2563eb 0%, #3b82f6 100%)',
                            color: 'white',
                          }}
                        >
                          {feature.icon}
                        </Avatar>
                        <Box>
                          <Typography variant="h6" fontWeight={600} gutterBottom>
                            {feature.title}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            {feature.description}
                          </Typography>
                        </Box>
                      </Box>
                    </Card>
                  ))}
                </Box>
              </Box>
            </Grid>
          )}

          {/* Right Side - Login Form */}
          <Grid item xs={12} md={isMobile ? 12 : 6}>
            <Fade in timeout={1000}>
              <Paper
                elevation={isMobile ? 24 : 8}
                sx={{
                  p: { xs: 3, sm: 4, md: 5 },
                  borderRadius: 4,
                  background: isMobile 
                    ? 'rgba(255, 255, 255, 0.95)'
                    : 'rgba(255, 255, 255, 0.9)',
                  backdropFilter: 'blur(20px)',
                  border: '1px solid rgba(255, 255, 255, 0.2)',
                  position: 'relative',
                  overflow: 'hidden',
                }}
              >
                {/* Mobile Header */}
                {isMobile && (
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
                )}

                {/* Desktop Header */}
                {!isMobile && (
                  <Box sx={{ textAlign: 'center', mb: 4 }}>
                    <Typography
                      variant="h4"
                      component="h1"
                      fontWeight={700}
                      sx={{
                        background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                        backgroundClip: 'text',
                        WebkitBackgroundClip: 'text',
                        WebkitTextFillColor: 'transparent',
                        mb: 1,
                      }}
                    >
                      Sign In
                    </Typography>
                    <Typography variant="body1" color="text.secondary">
                      Access your compliance dashboard
                    </Typography>
                  </Box>
                )}

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
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Login;