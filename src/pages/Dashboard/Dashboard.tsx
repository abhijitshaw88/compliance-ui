import React, { useState } from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Chip,
  Avatar,
  IconButton,
  useTheme,
  alpha,
  Divider,
  Button,
  Fab,
  Tooltip,
  Skeleton,
  Alert,
} from '@mui/material';
import {
  People,
  Assignment,
  CheckCircle,
  Warning,
  Schedule,
  AccountBalance,
  CloudUpload,
  ArrowUpward,
  ArrowDownward,
  Star,
  Speed,
  MoreVert,
  Refresh,
  Notifications,
  Add,
  FilterList,
  Download,
} from '@mui/icons-material';
import { useQuery } from '@tanstack/react-query';
import { clientsApi, complianceApi } from '../../services/api';
import {
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip as RechartsTooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart,
} from 'recharts';

const Dashboard: React.FC = () => {
  const theme = useTheme();
  const [refreshing, setRefreshing] = useState(false);
  const [timeRange] = useState('30d');

  // Fetch data from APIs with better error handling
  const { data: clients = [], isLoading: clientsLoading, error: clientsError } = useQuery({
    queryKey: ['clients'],
    queryFn: () => clientsApi.getClients(),
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  const { data: projects = [], isLoading: projectsLoading } = useQuery({
    queryKey: ['projects'],
    queryFn: () => complianceApi.getProjects(),
    retry: 3,
    staleTime: 5 * 60 * 1000,
  });

  // Enhanced mock data with more realistic values
  const revenueData = [
    { month: 'Jan', revenue: 1200000, expenses: 800000, profit: 400000 },
    { month: 'Feb', revenue: 1500000, expenses: 900000, profit: 600000 },
    { month: 'Mar', revenue: 1800000, expenses: 1000000, profit: 800000 },
    { month: 'Apr', revenue: 1600000, expenses: 950000, profit: 650000 },
    { month: 'May', revenue: 2000000, expenses: 1100000, profit: 900000 },
    { month: 'Jun', revenue: 2200000, expenses: 1200000, profit: 1000000 },
  ];

  const projectStatusData = [
    { name: 'Completed', value: 45, color: '#059669', count: 18 },
    { name: 'In Progress', value: 30, color: '#d97706', count: 12 },
    { name: 'Pending', value: 25, color: '#dc2626', count: 10 },
  ];

  const upcomingDeadlines = [
    {
      text: 'GST Return Due',
      date: '15 Nov',
      priority: 'high',
      client: 'Sharma & Associates',
      type: 'GST',
      daysLeft: 3,
    },
    {
      text: 'TDS Payment Due',
      date: '7 Nov',
      priority: 'medium',
      client: 'InnovatEX Solutions',
      type: 'TDS',
      daysLeft: 1,
    },
    {
      text: 'ITR Filing',
      date: '31 Dec',
      priority: 'low',
      client: 'Gupta Enterprises',
      type: 'ITR',
      daysLeft: 45,
    },
  ];

  const recentActivities = [
    {
      text: 'GST Return Filed',
      client: 'Sharma & Associates LLP',
      time: '2 hours ago',
      type: 'success',
      amount: '₹45,000',
    },
    {
      text: 'Payment Overdue',
      client: 'InnovatEX Solutions',
      time: '4 hours ago',
      type: 'warning',
      amount: '₹12,500',
    },
    {
      text: 'New Project Created',
      client: 'TDS Compliance',
      time: '6 hours ago',
      type: 'info',
      amount: '₹8,000',
    },
    {
      text: 'Invoice Generated',
      client: 'Gupta Enterprises',
      time: '8 hours ago',
      type: 'success',
      amount: '₹25,000',
    },
  ];

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'error';
      case 'medium':
        return 'warning';
      case 'low':
        return 'success';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'success':
        return <CheckCircle color="success" />;
      case 'warning':
        return <Warning color="warning" />;
      case 'info':
        return <Assignment color="primary" />;
      default:
        return <Schedule color="action" />;
    }
  };

  const handleRefresh = async () => {
    setRefreshing(true);
    setTimeout(() => setRefreshing(false), 1000);
  };

  const StatCard = ({ title, value, change, icon, color, subtitle, trend }: any) => (
    <Card
      sx={{
        height: '100%',
        background: `linear-gradient(135deg, ${alpha(color, 0.1)} 0%, ${alpha(color, 0.05)} 100%)`,
        border: `1px solid ${alpha(color, 0.2)}`,
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: `0 8px 25px ${alpha(color, 0.15)}`,
        },
        transition: 'all 0.3s ease',
      }}
    >
      <CardContent sx={{ p: 3 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 2 }}>
          <Avatar
            sx={{
              width: 48,
              height: 48,
              background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
              boxShadow: `0 4px 12px ${alpha(color, 0.3)}`,
            }}
          >
            {icon}
          </Avatar>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            {trend && (
              <Chip
                label={trend}
                size="small"
                color={trend === 'Up' ? 'success' : 'error'}
                sx={{ fontSize: '0.7rem' }}
              />
            )}
            <IconButton size="small" sx={{ color: 'text.secondary' }}>
              <MoreVert />
            </IconButton>
          </Box>
        </Box>

        <Typography variant="h4" fontWeight={800} color="text.primary" gutterBottom>
          {value}
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom sx={{ mb: 2 }}>
          {title}
        </Typography>
        {subtitle && (
          <Typography variant="caption" color="text.secondary" sx={{ mb: 1, display: 'block' }}>
            {subtitle}
          </Typography>
        )}

        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {change > 0 ? (
              <ArrowUpward sx={{ color: 'success.main', fontSize: 18, mr: 0.5 }} />
            ) : (
              <ArrowDownward sx={{ color: 'error.main', fontSize: 18, mr: 0.5 }} />
            )}
            <Typography
              variant="body2"
              color={change > 0 ? 'success.main' : 'error.main'}
              fontWeight={600}
            >
              {Math.abs(change)}%
            </Typography>
          </Box>
          <Typography variant="caption" color="text.secondary">
            vs last month
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );

  const QuickActionButton = ({ icon, label, color, onClick }: any) => (
    <Tooltip title={label}>
      <Fab
        size="medium"
        sx={{
          background: `linear-gradient(135deg, ${color} 0%, ${alpha(color, 0.8)} 100%)`,
          color: 'white',
          boxShadow: `0 4px 12px ${alpha(color, 0.3)}`,
          '&:hover': {
            transform: 'scale(1.1)',
            boxShadow: `0 6px 16px ${alpha(color, 0.4)}`,
          },
          transition: 'all 0.2s ease',
        }}
        onClick={onClick}
      >
        {icon}
      </Fab>
    </Tooltip>
  );

  if (clientsError) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load dashboard data. Please try again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
          <Box>
            <Typography
              variant="h3"
              component="h1"
              fontWeight={800}
              gutterBottom
              sx={{
                fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' },
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Welcome back! 👋
            </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 3 }}>
              Here's what's happening with your practice today.
            </Typography>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<Refresh />}
              onClick={handleRefresh}
              disabled={refreshing}
              sx={{ borderRadius: 3 }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button variant="contained" startIcon={<Download />} sx={{ borderRadius: 3 }}>
              Export Report
            </Button>
          </Box>
        </Box>

        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center' }}>
          <Chip icon={<Star />} label="Performance: Excellent" color="success" sx={{ fontWeight: 600 }} />
          <Chip icon={<Speed />} label="System Status: Online" color="primary" sx={{ fontWeight: 600 }} />
          <Chip
            icon={<Notifications />}
            label="3 New Notifications"
            color="warning"
            sx={{ fontWeight: 600 }}
          />
        </Box>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Revenue"
            value="₹1,50,00,000"
            change={12.5}
            icon={<AccountBalance />}
            color={theme.palette.success.main}
            subtitle="FY 2023-24"
            trend="Up"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Total Clients"
            value={clientsLoading ? <Skeleton width={60} /> : clients.length || 0}
            change={8.2}
            icon={<People />}
            color={theme.palette.primary.main}
            subtitle="Active clients"
            trend="Up"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Active Projects"
            value={projectsLoading ? <Skeleton width={60} /> : projects.length || 0}
            change={-2.1}
            icon={<Assignment />}
            color={theme.palette.warning.main}
            subtitle="In progress"
            trend="Down"
          />
        </Grid>
        <Grid item xs={12} sm={6} lg={3}>
          <StatCard
            title="Pending Tasks"
            value="12"
            change={-15.3}
            icon={<Schedule />}
            color={theme.palette.error.main}
            subtitle="Due this week"
            trend="Down"
          />
        </Grid>
      </Grid>

      {/* Charts Row */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {/* Revenue Chart */}
        <Grid item xs={12} lg={8}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Box>
                  <Typography variant="h5" fontWeight={700} gutterBottom>
                    Revenue Overview
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Track your monthly revenue and expenses
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button size="small" variant={timeRange === '7d' ? 'contained' : 'outlined'}>
                    7D
                  </Button>
                  <Button size="small" variant={timeRange === '30d' ? 'contained' : 'outlined'}>
                    30D
                  </Button>
                  <Button size="small" variant={timeRange === '90d' ? 'contained' : 'outlined'}>
                    90D
                  </Button>
                </Box>
              </Box>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={revenueData}>
                    <defs>
                      <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id="expenseGradient" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#dc2626" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#dc2626" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke={alpha(theme.palette.divider, 0.3)} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <RechartsTooltip
                      contentStyle={{
                        backgroundColor: theme.palette.background.paper,
                        border: `1px solid ${theme.palette.divider}`,
                        borderRadius: 12,
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#2563eb"
                      fillOpacity={1}
                      fill="url(#revenueGradient)"
                      strokeWidth={3}
                    />
                    <Area
                      type="monotone"
                      dataKey="expenses"
                      stroke="#dc2626"
                      fillOpacity={1}
                      fill="url(#expenseGradient)"
                      strokeWidth={3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Project Status */}
        <Grid item xs={12} lg={4}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Project Status
              </Typography>
              <Box sx={{ height: 250, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={projectStatusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={40}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {projectStatusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <RechartsTooltip />
                  </PieChart>
                </ResponsiveContainer>
              </Box>
              <Box sx={{ mt: 2 }}>
                {projectStatusData.map((item, index) => (
                  <Box key={item.name} sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <Box
                      sx={{
                        width: 12,
                        height: 12,
                        bgcolor: item.color,
                        borderRadius: '50%',
                        mr: 1,
                      }}
                    />
                    <Typography variant="body2" sx={{ flexGrow: 1 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" fontWeight={700} sx={{ mr: 1 }}>
                      {item.value}%
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      ({item.count})
                    </Typography>
                  </Box>
                ))}
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Bottom Row */}
      <Grid container spacing={3}>
        {/* Upcoming Deadlines */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                <Typography variant="h6" fontWeight={700}>
                  Upcoming Deadlines
                </Typography>
                <Button size="small" startIcon={<FilterList />}>
                  Filter
                </Button>
              </Box>
              <List>
                {upcomingDeadlines.map((deadline, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        },
                      }}
                    >
                      <ListItemIcon>{getActivityIcon(deadline.priority)}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography fontWeight={600} color="text.primary">
                            {deadline.text}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {deadline.client} • {deadline.type}
                            </Typography>
                          </>
                        }
                      />
                      <Chip
                        label={`${deadline.daysLeft} days`}
                        size="small"
                        color={getPriorityColor(deadline.priority)}
                      />
                    </ListItem>
                    {index < upcomingDeadlines.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>

        {/* Recent Activities */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h6" fontWeight={700} gutterBottom>
                Recent Activities
              </Typography>
              <List>
                {recentActivities.map((activity, index) => (
                  <React.Fragment key={index}>
                    <ListItem
                      sx={{
                        borderRadius: 2,
                        mb: 1,
                        '&:hover': {
                          backgroundColor: alpha(theme.palette.primary.main, 0.04),
                        },
                      }}
                    >
                      <ListItemIcon>{getActivityIcon(activity.type)}</ListItemIcon>
                      <ListItemText
                        primary={
                          <Typography fontWeight={600} color="text.primary">
                            {activity.text}
                          </Typography>
                        }
                        secondary={
                          <>
                            <Typography component="span" variant="body2" color="text.secondary">
                              {activity.client}
                            </Typography>
                            {' • '}
                            <Typography component="span" variant="caption" color="text.secondary">
                              {activity.time}
                            </Typography>
                          </>
                        }
                      />
                      <Typography variant="body2" fontWeight={600} color="primary">
                        {activity.amount}
                      </Typography>
                    </ListItem>
                    {index < recentActivities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Floating Quick Actions */}
      <Box
        sx={{
          position: 'fixed',
          bottom: 24,
          right: 24,
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
          zIndex: 1200,
        }}
      >
        <QuickActionButton
          icon={<Add />}
          label="New Client"
          color={theme.palette.primary.main}
          onClick={() => console.log('Add new client')}
        />
        <QuickActionButton
          icon={<Assignment />}
          label="New Project"
          color={theme.palette.success.main}
          onClick={() => console.log('Add new project')}
        />
        <QuickActionButton
          icon={<CloudUpload />}
          label="Upload Document"
          color={theme.palette.warning.main}
          onClick={() => console.log('Upload document')}
        />
      </Box>
    </Box>
  );
};

export default Dashboard;
