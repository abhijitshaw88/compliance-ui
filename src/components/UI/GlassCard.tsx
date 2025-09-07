import React from 'react';
import { Card, CardProps, alpha, useTheme } from '@mui/material';

interface GlassCardProps extends Omit<CardProps, 'variant'> {
  variant?: 'light' | 'medium' | 'dark';
  blur?: number;
  opacity?: number;
}

const GlassCard: React.FC<GlassCardProps> = ({
  variant = 'light',
  blur = 10,
  opacity = 0.1,
  children,
  sx,
  ...props
}) => {
  const theme = useTheme();

  const getGlassStyles = () => {
    const variants = {
      light: {
        background: `rgba(255, 255, 255, ${opacity})`,
        border: `1px solid rgba(255, 255, 255, ${opacity * 2})`,
        backdropFilter: `blur(${blur}px)`,
      },
      medium: {
        background: `rgba(255, 255, 255, ${opacity * 1.5})`,
        border: `1px solid rgba(255, 255, 255, ${opacity * 3})`,
        backdropFilter: `blur(${blur}px)`,
      },
      dark: {
        background: `rgba(0, 0, 0, ${opacity})`,
        border: `1px solid rgba(255, 255, 255, ${opacity})`,
        backdropFilter: `blur(${blur}px)`,
      },
    };
    
    return variants[variant];
  };

  return (
    <Card
      sx={{
        ...getGlassStyles(),
        borderRadius: 3,
        boxShadow: `0 8px 32px rgba(0, 0, 0, 0.1)`,
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 12px 40px rgba(0, 0, 0, 0.15)`,
        },
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        ...sx,
      }}
      {...props}
    >
      {children}
    </Card>
  );
};

export default GlassCard;
