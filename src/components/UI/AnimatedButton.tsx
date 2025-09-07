import React from 'react';
import { Button, ButtonProps, alpha, useTheme } from '@mui/material';

interface AnimatedButtonProps extends Omit<ButtonProps, 'variant'> {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'gradient';
  size?: 'small' | 'medium' | 'large';
  glow?: boolean;
}

const AnimatedButton: React.FC<AnimatedButtonProps> = ({
  variant = 'primary',
  size = 'medium',
  glow = false,
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const getVariantStyles = () => {
    const variants = {
      primary: {
        background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
          transform: 'translateY(-2px)',
        },
      },
      secondary: {
        background: 'linear-gradient(135deg, #ec4899 0%, #f97316 100%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #be185d 0%, #ea580c 100%)',
          transform: 'translateY(-2px)',
        },
      },
      success: {
        background: 'linear-gradient(135deg, #10b981 0%, #34d399 100%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #059669 0%, #10b981 100%)',
          transform: 'translateY(-2px)',
        },
      },
      warning: {
        background: 'linear-gradient(135deg, #f59e0b 0%, #fbbf24 100%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #d97706 0%, #f59e0b 100%)',
          transform: 'translateY(-2px)',
        },
      },
      error: {
        background: 'linear-gradient(135deg, #ef4444 0%, #f87171 100%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #dc2626 0%, #ef4444 100%)',
          transform: 'translateY(-2px)',
        },
      },
      gradient: {
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        color: 'white',
        '&:hover': {
          background: 'linear-gradient(135deg, #5a67d8 0%, #6b46c1 100%)',
          transform: 'translateY(-2px)',
        },
      },
    };
    
    return variants[variant];
  };

  const getSizeStyles = () => {
    const sizes = {
      small: { padding: '8px 16px', fontSize: '0.875rem' },
      medium: { padding: '12px 24px', fontSize: '1rem' },
      large: { padding: '16px 32px', fontSize: '1.125rem' },
    };
    
    return sizes[size];
  };

  return (
    <Button
      sx={{
        ...getVariantStyles(),
        ...getSizeStyles(),
        borderRadius: 3,
        fontWeight: 600,
        textTransform: 'none',
        boxShadow: glow ? `0 0 20px ${alpha(theme.palette.primary.main, 0.3)}` : 'none',
        '&:hover': {
          boxShadow: glow 
            ? `0 0 30px ${alpha(theme.palette.primary.main, 0.4)}` 
            : `0 8px 25px rgba(0, 0, 0, 0.15)`,
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '-100%',
          width: '100%',
          height: '100%',
          background: 'linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.2), transparent)',
          transition: 'left 0.5s',
        },
        '&:hover::before': {
          left: '100%',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Button>
  );
};

export default AnimatedButton;
