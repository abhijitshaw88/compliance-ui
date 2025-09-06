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
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
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
  Warning as WarningIcon,
  Gavel as GavelIcon,
  AccountBalance as AccountBalanceIcon,
  Description as DescriptionIcon,
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
      id={`compliance-tabpanel-${index}`}
      aria-labelledby={`compliance-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

const Compliance: React.FC = () => {
  const [tabValue, setTabValue] = useState(0);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedComplianceId, setSelectedComplianceId] = useState<number | null>(null);

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, complianceId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedComplianceId(complianceId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedComplianceId(null);
  };

  // Mock data
  const complianceItems = [
    {
      id: 1,
      name: 'GSTR-1 Filing',
      type: 'GST',
      client: 'ABC Corp',
      dueDate: '2023-10-15',
      status: 'pending',
      priority: 'high',
      description: 'Monthly GST return filing for September 2023',
    },
    {
      id: 2,
      name: 'TDS Return - Q2',
      type: 'TDS',
      client: 'XYZ Ltd',
      dueDate: '2023-10-31',
      status: 'in_progress',
      priority: 'high',
      description: 'Quarterly TDS return for Q2 FY 2023-24',
    },
    {
      id: 3,
      name: 'ITR Filing - AY 2023-24',
      type: 'ITR',
      client: 'DEF Industries',
      dueDate: '2023-11-30',
      status: 'completed',
      priority: 'medium',
      description: 'Income Tax Return for Assessment Year 2023-24',
    },
    {
      id: 4,
      name: 'PF Returns - October',
      type: 'PF',
      client: 'GHI Pvt Ltd',
      dueDate: '2023-11-15',
      status: 'pending',
      priority: 'medium',
      description: 'Provident Fund returns for October 2023',
    },
  ];

  const upcomingDeadlines = [
    { date: '15 Oct', task: 'GSTR-1 Due', client: 'ABC Corp', priority: 'high' },
    { date: '31 Oct', task: 'ITR Filing Deadline', client: 'Multiple', priority: 'high' },
    { date: '7 Nov', task: 'TDS Payment Due', client: 'XYZ Ltd', priority: 'medium' },
    { date: '15 Nov', task: 'PF Returns', client: 'GHI Pvt Ltd', priority: 'medium' },
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

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'GST': return <AccountBalanceIcon />;
      case 'TDS': return <DescriptionIcon />;
      case 'ITR': return <AssignmentIcon />;
      case 'PF': return <GavelIcon />;
      default: return <AssignmentIcon />;
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h4" component="h1">
          Compliance Management
        </Typography>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
        >
          Add New Compliance
        </Button>
      </Box>

      {/* Compliance Dashboard Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AssignmentIcon color="primary" sx={{ mr: 1 }} />
                <Typography variant="h6">Compliance Status</Typography>
              </Box>
              <Typography variant="h4" color="primary.main" gutterBottom>
                75%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                15 pending items
              </Typography>
              <LinearProgress variant="determinate" value={75} sx={{ mt: 1 }} />
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <WarningIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6">Upcoming Deadlines</Typography>
              </Box>
              <Typography variant="h4" color="warning.main" gutterBottom>
                4
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Due this month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <CheckCircleIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6">Completed</Typography>
              </Box>
              <Typography variant="h4" color="success.main" gutterBottom>
                12
              </Typography>
              <Typography variant="body2" color="text.secondary">
                This month
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ScheduleIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6">Overdue</Typography>
              </Box>
              <Typography variant="h4" color="error.main" gutterBottom>
                2
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Requires attention
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Compliance List" />
            <Tab label="Calendar View" />
            <Tab label="Document Repository" />
          </Tabs>
        </Box>

        <TabPanel value={tabValue} index={0}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Compliance Item</TableCell>
                  <TableCell>Type</TableCell>
                  <TableCell>Client</TableCell>
                  <TableCell>Due Date</TableCell>
                  <TableCell>Priority</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell align="right">Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {complianceItems.map((item) => (
                  <TableRow key={item.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {getTypeIcon(item.type)}
                        <Box sx={{ ml: 1 }}>
                          <Typography variant="subtitle2">{item.name}</Typography>
                          <Typography variant="body2" color="text.secondary">
                            {item.description}
                          </Typography>
                        </Box>
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip label={item.type} size="small" />
                    </TableCell>
                    <TableCell>{item.client}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <ScheduleIcon sx={{ mr: 1, color: 'text.secondary' }} />
                        {new Date(item.dueDate).toLocaleDateString()}
                      </Box>
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.priority}
                        color={getPriorityColor(item.priority) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>
                      <Chip
                        label={item.status}
                        color={getStatusColor(item.status) as any}
                        size="small"
                      />
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={(e) => handleMenuOpen(e, item.id)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </TabPanel>

        <TabPanel value={tabValue} index={1}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Typography variant="h6" gutterBottom>
                Compliance Calendar
              </Typography>
              <Box sx={{ height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <Typography variant="h6" color="text.secondary">
                  Calendar View Coming Soon
                </Typography>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Typography variant="h6" gutterBottom>
                Upcoming Deadlines
              </Typography>
              <List>
                {upcomingDeadlines.map((deadline, index) => (
                  <ListItem key={index}>
                    <ListItemIcon>
                      <WarningIcon color={getPriorityColor(deadline.priority) as any} />
                    </ListItemIcon>
                    <ListItemText
                      primary={deadline.task}
                      secondary={`${deadline.date} - ${deadline.client}`}
                    />
                  </ListItem>
                ))}
              </List>
            </Grid>
          </Grid>
        </TabPanel>

        <TabPanel value={tabValue} index={2}>
          <Typography variant="h6" gutterBottom>
            Document Repository
          </Typography>
          <Grid container spacing={2}>
            {['GST Returns (Qtr 2) 2022-23', 'ITR Acknowledgements (AY 2022-23)', 'PF/ESI Filings (Oct 2023)'].map((doc, index) => (
              <Grid item xs={12} md={4} key={index}>
                <Card>
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <DescriptionIcon sx={{ mr: 1, color: 'primary.main' }} />
                      <Typography variant="subtitle2">{doc}</Typography>
                    </Box>
                    <Button size="small" variant="outlined" fullWidth>
                      Download
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
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
          Update Status
        </MenuItem>
        <MenuItem onClick={handleMenuClose}>
          <CheckCircleIcon sx={{ mr: 1 }} />
          Mark Complete
        </MenuItem>
      </Menu>
    </Box>
  );
};

export default Compliance;
