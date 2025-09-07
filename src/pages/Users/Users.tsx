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
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          User & Permission Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New User
        </Button>
      </Box>

      <Paper>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Department</TableCell>
                <TableCell>Last Active</TableCell>
                <TableCell>Status</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id} hover>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar sx={{ mr: 2, bgcolor: 'primary.main' }}>
                        {user.name.charAt(0)}
                      </Avatar>
                      {user.name}
                    </Box>
                  </TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.department}</TableCell>
                  <TableCell>{user.lastActive}</TableCell>
                  <TableCell>
                    <Chip
                      label={user.status}
                      color={getStatusColor(user.status) as any}
                      size="small"
                    />
                  </TableCell>
                  <TableCell align="right">
                    <IconButton size="small">
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
