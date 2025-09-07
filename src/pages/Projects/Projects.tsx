import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Paper,
  Grid,
  Card,
  CardContent,
  Chip,
  LinearProgress,
  Tabs,
  Tab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Assignment as AssignmentIcon,
  Schedule as ScheduleIcon,
  CheckCircle as CheckCircleIcon,
  Person as PersonIcon,
} from '@mui/icons-material';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`project-tabpanel-${index}`}
      aria-labelledby={`project-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Projects: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedProjectId] = useState<number | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, projectId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedProjectId(projectId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedProjectId(null);
  };

  // Mock data
  const projects = [
    {
      id: 1,
      name: 'Client A Audit',
      client: 'ABC Corp',
      status: 'in_progress',
      progress: 65,
      startDate: '2023-10-01',
      endDate: '2023-12-31',
      assignedTo: 'Priya Sharma',
      priority: 'high',
    },
    {
      id: 2,
      name: 'Tax Filing Q2',
      client: 'XYZ Ltd',
      status: 'completed',
      progress: 100,
      startDate: '2023-09-01',
      endDate: '2023-10-15',
      assignedTo: 'Raj Kumar',
      priority: 'medium',
    },
    {
      id: 3,
      name: 'New Client Onboarding',
      client: 'DEF Industries',
      status: 'pending',
      progress: 0,
      startDate: '2023-11-01',
      endDate: '2023-11-30',
      assignedTo: 'Amit Singh',
      priority: 'low',
    },
  ];

  const tasks = [
    {
      id: 1,
      name: 'GST Filing - July',
      assignedTo: 'Priya Sharma',
      priority: 'high',
      dueDate: '2023-10-15',
      status: 'in_progress',
    },
    {
      id: 2,
      name: 'TDS Deposit - Q2',
      assignedTo: 'Raj Kumar',
      priority: 'high',
      dueDate: '2023-10-20',
      status: 'pending',
    },
    {
      id: 3,
      name: 'Client B Audit',
      assignedTo: 'Amit Singh',
      priority: 'medium',
      dueDate: '2023-10-25',
      status: 'completed',
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'in_progress': return 'primary';
      case 'pending': return 'warning';
      case 'overdue': return 'error';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Project Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New Project
        </Button>
      </Box>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Project Overview" />
            <Tab label="Task List" />
            <Tab label="Project Timeline" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <Grid container spacing={3}>
            {/* Project Cards */}
            {projects.map((project) => (
              <Grid item xs={12} md={6} lg={4} key={project.id}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography variant="h6" component="div">
                        {project.name}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, project.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </Box>
                    
                    <Typography variant="body2" color="text.secondary" gutterBottom>
                      Client: {project.client}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <PersonIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Typography variant="body2" color="text.secondary">
                        {project.assignedTo}
                      </Typography>
                    </Box>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="body2">Progress</Typography>
                        <Typography variant="body2">{project.progress}%</Typography>
                      </Box>
                      <LinearProgress variant="determinate" value={project.progress} />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Chip
                        label={project.status}
                        color={getStatusColor(project.status) as any}
                        size="small"
                      />
                      <Chip
                        label={project.priority}
                        color={getPriorityColor(project.priority) as any}
                        size="small"
                      />
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Task Name</TableCell>
                  <TableCell>Assigned To</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tasks.map((task) => (
                  <TableRow key={task.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <AssignmentIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        {task.name}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PersonIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        {task.assignedTo}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={task.priority}
                        color={getPriorityColor(task.priority) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        {new Date(task.dueDate).toLocaleDateString()}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={task.status}
                        color={getStatusColor(task.status) as any}
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
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Project Timeline
          </Typography>
          <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Typography color="text.secondary">
              Timeline visualization would go here
            </Typography>
          </Box>
        </TabPanel>
      </Paper>

      {/* Action Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}>
          <AssignmentIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <ScheduleIcon sx={{ mr: 1 }} />
          Edit Project
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <CheckCircleIcon sx={{ mr: 1 }} />
          Mark Complete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Projects;
