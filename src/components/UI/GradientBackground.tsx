import React from 'react';
import { Box, BoxProps } from '@mui/material';

interface GradientBackgroundProps extends BoxProps {
  variant?: 'primary' | 'secondary' | 'success' | 'warning' | 'error' | 'custom';
  customGradient?: string;
  opacity?: number;
}

const GradientBackground: React.FC<GradientBackgroundProps> = ({
  variant = 'primary',
  customGradient,
  opacity = 0.1,
  children,
  sx,
  ...props
}) => {
  const getGradient = () => {
    if (customGradient) return customGradient;
    
    const gradients: Record<string, string> = {
      primary: `linear-gradient(135deg, rgba(99, 102, 241, ${opacity}) 0%, rgba(139, 92, 246, ${opacity}) 100%)`,
      secondary: `linear-gradient(135deg, rgba(236, 72, 153, ${opacity}) 0%, rgba(251, 113, 133, ${opacity}) 100%)`,
      success: `linear-gradient(135deg, rgba(16, 185, 129, ${opacity}) 0%, rgba(52, 211, 153, ${opacity}) 100%)`,
      warning: `linear-gradient(135deg, rgba(245, 158, 11, ${opacity}) 0%, rgba(251, 191, 36, ${opacity}) 100%)`,
      error: `linear-gradient(135deg, rgba(239, 68, 68, ${opacity}) 0%, rgba(248, 113, 113, ${opacity}) 100%)`,
    };
    
    return gradients[variant] || gradients.primary;
  };

  return (
    <Box
      sx={{
        background: getGradient(),
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'radial-gradient(circle at 20% 80%, rgba(99, 102, 241, 0.05) 0%, transparent 50%), radial-gradient(circle at 80% 20%, rgba(139, 92, 246, 0.05) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
        ...sx,
      }}
      {...props}
    >
      {children}
    </Box>
  );
};

export default GradientBackground;
