import React from 'react';
import {
  Box,
  Typography,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Chip,
  IconButton,
  Button,
  Avatar,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
} from '@mui/icons-material';

const Users: React.FC = () => {
  // Mock data
  const users = [
    {
      id: 1,
      name: 'Rajesh Kumar',
      role: 'Admin',
      department: 'Taxation',
      lastActive: '2 hours ago',
      status: 'active',
    },
    {
      id: 2,
      name: 'Anjali Singh',
      role: 'Accountant',
      department: 'Manager',
      lastActive: 'Yesterday',
      status: 'active',
    },
    {
      id: 3,
      name: 'Siddnath Rao',
      role: 'Audit',
      department: 'Yesterday',
      lastActive: 'Inactive',
      status: 'inactive',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      default: return 'default';
    }
  };

  return (
    <Box className="fade-in">
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography 
          variant="h4" 
          component="h1"
          sx={{ 
            color: '#1e293b',
            fontWeight: 700,
            textShadow: 'none'
          }}
        >
          User & Permission Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          sx={{
            background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
            borderRadius: 2,
            px: 3,
            py: 1.5,
            fontWeight: 600,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)',
            '&:hover': {
              background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 20px rgba(99, 102, 241, 0.4)',
            },
          }}
        >
          + Add New User
        </Button>
      </Box>

      <Paper 
        sx={{
          background: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          WebkitBackdropFilter: 'blur(20px)',
          border: '1px solid rgba(0, 0, 0, 0.1)',
          borderRadius: 3,
          boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
          overflow: 'hidden',
        }}
      >
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow sx={{ background: 'rgba(0, 0, 0, 0.02)' }}>
                <TableCell sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>NAME</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>ROLE</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>DEPARTMENT</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>LAST ACTIVE</TableCell>
                <TableCell sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>STATUS</TableCell>
                <TableCell align="right" sx={{ fontWeight: 700, color: '#1e293b', fontSize: '0.875rem' }}>ACTIONS</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow 
                  key={user.id} 
                  hover
                  sx={{
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.02)',
                    },
                    '&:nth-of-type(even)': {
                      backgroundColor: 'rgba(0, 0, 0, 0.01)',
                    },
                  }}
                >
                  <TableCell sx={{ color: '#1e293b', fontWeight: 500 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar 
                        sx={{ 
                          mr: 2, 
                          bgcolor: 'primary.main',
                          fontWeight: 600,
                          color: 'white'
                        }}
                      >
                        {user.name.charAt(0)}
                      </Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell sx={{ color: '#64748b', fontWeight: 500 }}>{user.role}</TableCell>
                  <TableCell sx={{ color: '#64748b', fontWeight: 500 }}>{user.department}</TableCell>
                  <TableCell sx={{ color: '#64748b', fontWeight: 500 }}>{user.lastActive}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status) as any}
                      size="small"
                      sx={{
                        fontWeight: 600,
                        textTransform: 'capitalize',
                        '&.MuiChip-colorSuccess': {
                          backgroundColor: '#10b981',
                          color: 'white',
                        },
                        '&.MuiChip-colorError': {
                          backgroundColor: '#ef4444',
                          color: 'white',
                        },
                      }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton 
                      size="small"
                      sx={{
                        color: '#64748b',
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 0, 0.05)',
                          color: '#1e293b',
                        },
                      }}
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>
    </Box>
  );
};

export default Users;
