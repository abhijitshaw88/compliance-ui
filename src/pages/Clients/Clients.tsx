import React, { useState } from 'react';
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  TextField,
  InputAdornment,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Menu,
  MenuItem,
  Chip,
  Avatar,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  useTheme,
  alpha,
  Stepper,
  Step,
  StepLabel,
  Alert,
  Skeleton,
  Tabs,
  Tab,
  Checkbox,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  ListItemSecondaryAction,
} from '@mui/material';
import {
  Add as AddIcon,
  Search as SearchIcon,
  MoreVert as MoreVertIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Business as BusinessIcon,
  Email as EmailIcon,
  Phone as PhoneIcon,
  LocationOn as LocationIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Person as PersonIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  Download as DownloadIcon,
  Upload as UploadIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Error as ErrorIcon,
  Info as InfoIcon,
} from '@mui/icons-material';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { clientsApi } from '../../services/api';

interface Client {
  id: number;
  name: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: 'active' | 'inactive' | 'pending' | 'suspended';
  created_at: string;
  updated_at: string;
  last_contact: string;
  total_invoices: number;
  total_amount: number;
  outstanding_amount: number;
  priority: 'high' | 'medium' | 'low';
  notes: string;
  tags: string[];
  assigned_to: string;
  industry: string;
  company_size: string;
  website: string;
  is_favorite: boolean;
}

interface ClientFormData {
  name: string;
  email: string;
  phone: string;
  gstin: string;
  pan: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  status: string;
  priority: string;
  notes: string;
  tags: string[];
  assigned_to: string;
  industry: string;
  company_size: string;
  website: string;
}

const Clients: React.FC = () => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedClient, setSelectedClient] = useState<Client | null>(null);
  const [clientDialogOpen, setClientDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [selectedClientId, setSelectedClientId] = useState<number | null>(null);
  const [statusFilter, setStatusFilter] = useState('all');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'list'>('table');
  const [activeTab, setActiveTab] = useState(0);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState<ClientFormData>({
    name: '',
    email: '',
    phone: '',
    gstin: '',
    pan: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    status: 'active',
    priority: 'medium',
    notes: '',
    tags: [],
    assigned_to: '',
    industry: '',
    company_size: '',
    website: '',
  });
  const [isEditing, setIsEditing] = useState(false);
  const [bulkSelected, setBulkSelected] = useState<number[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  // Fetch clients data with enhanced parameters
  const { data: clients = [], isLoading, error } = useQuery<Client[]>({
    queryKey: ['clients', searchQuery, statusFilter, priorityFilter, sortBy, sortOrder],
    queryFn: () => clientsApi.getClients({ 
      search: searchQuery,
      status: statusFilter !== 'all' ? statusFilter : undefined,
      priority: priorityFilter !== 'all' ? priorityFilter : undefined,
      sort_by: sortBy,
      sort_order: sortOrder,
    }),
    retry: 3,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  // Create client mutation
  const createClientMutation = useMutation({
    mutationFn: (clientData: ClientFormData) => clientsApi.createClient(clientData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setClientDialogOpen(false);
      resetForm();
    },
  });

  // Update client mutation
  const updateClientMutation = useMutation({
    mutationFn: ({ id, data }: { id: number; data: ClientFormData }) => 
      clientsApi.updateClient(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setClientDialogOpen(false);
      resetForm();
    },
  });

  // Delete client mutation
  const deleteClientMutation = useMutation({
    mutationFn: (id: number) => clientsApi.deleteClient(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      handleMenuClose();
    },
  });

  // Bulk operations mutations
  const bulkDeleteMutation = useMutation({
    mutationFn: (ids: number[]) => Promise.all(ids.map(id => clientsApi.deleteClient(id))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setBulkSelected([]);
    },
  });

  const bulkStatusUpdateMutation = useMutation({
    mutationFn: ({ ids, status }: { ids: number[]; status: string }) => 
      Promise.all(ids.map(id => clientsApi.updateClient(id, { status }))),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['clients'] });
      setBulkSelected([]);
    },
  });

  // Utility functions
  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      phone: '',
      gstin: '',
      pan: '',
      address: '',
      city: '',
      state: '',
      pincode: '',
      status: 'active',
      priority: 'medium',
      notes: '',
      tags: [],
      assigned_to: '',
      industry: '',
      company_size: '',
      website: '',
    });
    setFormStep(0);
    setIsEditing(false);
  };

  const populateForm = (client: Client) => {
    setFormData({
      name: client.name,
      email: client.email,
      phone: client.phone,
      gstin: client.gstin,
      pan: client.pan,
      address: client.address,
      city: client.city,
      state: client.state,
      pincode: client.pincode,
      status: client.status,
      priority: client.priority,
      notes: client.notes,
      tags: client.tags,
      assigned_to: client.assigned_to,
      industry: client.industry,
      company_size: client.company_size,
      website: client.website,
    });
  };

  // Event handlers
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>, clientId: number) => {
    setAnchorEl(event.currentTarget);
    setSelectedClientId(clientId);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedClientId(null);
  };

  const handleViewClient = (client: Client) => {
    setSelectedClient(client);
    setViewDialogOpen(true);
    handleMenuClose();
  };

  const handleEditClient = (client: Client) => {
    setSelectedClient(client);
    populateForm(client);
    setIsEditing(true);
    setClientDialogOpen(true);
    handleMenuClose();
  };

  const handleDeleteClient = (clientId: number) => {
    if (window.confirm('Are you sure you want to delete this client?')) {
      deleteClientMutation.mutate(clientId);
    }
    handleMenuClose();
  };

  const handleAddClient = () => {
    resetForm();
    setClientDialogOpen(true);
  };

  const handleFormSubmit = () => {
    if (isEditing && selectedClient) {
      updateClientMutation.mutate({ id: selectedClient.id, data: formData });
    } else {
      createClientMutation.mutate(formData);
    }
  };

  const handleBulkSelect = (clientId: number) => {
    setBulkSelected(prev => 
      prev.includes(clientId) 
        ? prev.filter(id => id !== clientId)
        : [...prev, clientId]
    );
  };

  const handleBulkSelectAll = () => {
    setBulkSelected(
      bulkSelected.length === filteredClients.length 
        ? [] 
        : filteredClients.map(client => client.id)
    );
  };

  const handleBulkDelete = () => {
    if (window.confirm(`Are you sure you want to delete ${bulkSelected.length} clients?`)) {
      bulkDeleteMutation.mutate(bulkSelected);
    }
  };

  const handleBulkStatusUpdate = (status: string) => {
    bulkStatusUpdateMutation.mutate({ ids: bulkSelected, status });
  };

  const handleToggleFavorite = (clientId: number) => {
    // Toggle favorite status
    console.log('Toggle favorite for client:', clientId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'success';
      case 'inactive': return 'error';
      case 'pending': return 'warning';
      case 'suspended': return 'error';
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

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'active': return <CheckCircleIcon color="success" />;
      case 'inactive': return <ErrorIcon color="error" />;
      case 'pending': return <WarningIcon color="warning" />;
      case 'suspended': return <ErrorIcon color="error" />;
      default: return <InfoIcon color="info" />;
    }
  };

  // Enhanced filtering logic
  const filteredClients = clients.filter(client => {
    const matchesStatus = statusFilter === 'all' || client.status === statusFilter;
    const matchesPriority = priorityFilter === 'all' || client.priority === priorityFilter;
    const matchesSearch = searchQuery === '' || 
      client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.phone.includes(searchQuery) ||
      client.gstin.toLowerCase().includes(searchQuery.toLowerCase()) ||
      client.city.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesStatus && matchesPriority && matchesSearch;
  });

  // Sort clients
  const sortedClients = [...filteredClients].sort((a, b) => {
    let aValue = a[sortBy as keyof Client];
    let bValue = b[sortBy as keyof Client];
    
    if (typeof aValue === 'string') {
      aValue = aValue.toLowerCase();
      bValue = (bValue as string).toLowerCase();
    }
    
    if (sortOrder === 'asc') {
      return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
    } else {
      return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
    }
  });

  if (error as any) {
    return (
      <Box sx={{ p: 3 }}>
        <Alert severity="error" sx={{ mb: 3 }}>
          Failed to load clients. Please try again.
        </Alert>
      </Box>
    );
  }

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
        <Box>
            <Typography 
              variant="h3" 
              component="h1" 
              fontWeight={800} 
              gutterBottom
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #7c3aed 100%)',
                backgroundClip: 'text',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
            Client Management
          </Typography>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
            Manage your clients and their information
          </Typography>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <Chip
                icon={<PersonIcon />}
                label={`${clients.length} Total Clients`}
                color="primary"
                variant="outlined"
              />
              <Chip
                icon={<CheckCircleIcon />}
                label={`${clients.filter(c => c.status === 'active').length} Active`}
                color="success"
                variant="outlined"
              />
              <Chip
                icon={<WarningIcon />}
                label={`${clients.filter(c => c.status === 'pending').length} Pending`}
                color="warning"
                variant="outlined"
              />
        </Box>
          </Box>
          <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              sx={{ borderRadius: 3 }}
            >
              Export
            </Button>
            <Button
              variant="outlined"
              startIcon={<UploadIcon />}
              sx={{ borderRadius: 3 }}
            >
              Import
            </Button>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
              onClick={handleAddClient}
          sx={{
            px: 3,
            py: 1.5,
            fontWeight: 600,
                borderRadius: 3,
          }}
        >
          Add New Client
        </Button>
          </Box>
      </Box>

      {/* Search and Filters */}
      <Card sx={{ mb: 3 }}>
        <CardContent sx={{ p: 3 }}>
          <Grid container spacing={2} alignItems="center">
              <Grid item xs={12} md={4}>
              <TextField
                fullWidth
                  placeholder="Search clients by name, email, phone, GSTIN..."
                value={searchQuery}
                onChange={handleSearchChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <SearchIcon />
                    </InputAdornment>
                  ),
                }}
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Grid>
              <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={statusFilter}
                  label="Status"
                  onChange={(e) => setStatusFilter(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="all">All Status</MenuItem>
                  <MenuItem value="active">Active</MenuItem>
                  <MenuItem value="inactive">Inactive</MenuItem>
                  <MenuItem value="pending">Pending</MenuItem>
                    <MenuItem value="suspended">Suspended</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} md={2}>
                <FormControl fullWidth>
                  <InputLabel>Priority</InputLabel>
                  <Select
                    value={priorityFilter}
                    label="Priority"
                    onChange={(e) => setPriorityFilter(e.target.value)}
                    sx={{ borderRadius: 2 }}
                  >
                    <MenuItem value="all">All Priority</MenuItem>
                    <MenuItem value="high">High</MenuItem>
                    <MenuItem value="medium">Medium</MenuItem>
                    <MenuItem value="low">Low</MenuItem>
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={2}>
              <FormControl fullWidth>
                <InputLabel>Sort By</InputLabel>
                <Select
                  value={sortBy}
                  label="Sort By"
                  onChange={(e) => setSortBy(e.target.value)}
                  sx={{ borderRadius: 2 }}
                >
                  <MenuItem value="name">Name</MenuItem>
                  <MenuItem value="created_at">Created Date</MenuItem>
                    <MenuItem value="updated_at">Updated Date</MenuItem>
                  <MenuItem value="status">Status</MenuItem>
                    <MenuItem value="priority">Priority</MenuItem>
                    <MenuItem value="total_amount">Total Amount</MenuItem>
                </Select>
              </FormControl>
            </Grid>
              <Grid item xs={12} md={2}>
                <Box sx={{ display: 'flex', gap: 1 }}>
                  <Button
                    variant="outlined"
                    startIcon={<SortIcon />}
                    onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
                    sx={{ borderRadius: 2 }}
                  >
                    {sortOrder === 'asc' ? '↑' : '↓'}
                  </Button>
                  <Button
                    variant="outlined"
                    startIcon={<FilterIcon />}
                    onClick={() => setShowFilters(!showFilters)}
                    sx={{ borderRadius: 2 }}
                  >
                    Filters
                  </Button>
                </Box>
          </Grid>
            </Grid>

            {/* Advanced Filters */}
            {showFilters && (
              <Box sx={{ mt: 3, pt: 3, borderTop: '1px solid', borderColor: 'divider' }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Industry"
                      placeholder="e.g., Technology, Healthcare"
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Company Size"
                      placeholder="e.g., Small, Medium, Large"
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <TextField
                      fullWidth
                      label="Assigned To"
                      placeholder="Staff member"
                      sx={{ borderRadius: 2 }}
                    />
                  </Grid>
                  <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', gap: 1, alignItems: 'center', height: '100%' }}>
                      <Button variant="contained" size="small">
                        Apply Filters
                      </Button>
                      <Button variant="outlined" size="small">
                        Clear
                      </Button>
                    </Box>
                  </Grid>
                </Grid>
              </Box>
            )}
        </CardContent>
      </Card>

        {/* View Mode Toggle and Bulk Actions */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Box sx={{ display: 'flex', gap: 1 }}>
            <Button
              variant={viewMode === 'table' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewMode('table')}
            >
              Table
            </Button>
            <Button
              variant={viewMode === 'grid' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewMode('grid')}
            >
              Grid
            </Button>
            <Button
              variant={viewMode === 'list' ? 'contained' : 'outlined'}
              size="small"
              onClick={() => setViewMode('list')}
            >
              List
            </Button>
          </Box>

          {bulkSelected.length > 0 && (
            <Box sx={{ display: 'flex', gap: 1, alignItems: 'center' }}>
              <Typography variant="body2" color="text.secondary">
                {bulkSelected.length} selected
              </Typography>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleBulkStatusUpdate('active')}
              >
                Mark Active
              </Button>
              <Button
                variant="outlined"
                size="small"
                onClick={() => handleBulkStatusUpdate('inactive')}
              >
                Mark Inactive
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={handleBulkDelete}
              >
                Delete
              </Button>
            </Box>
          )}
        </Box>

        {/* Clients Display */}
        {isLoading ? (
          <Card>
            <CardContent sx={{ p: 3 }}>
              <Grid container spacing={2}>
                {[...Array(6)].map((_, index) => (
                  <Grid item xs={12} sm={6} md={4} key={index}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Skeleton variant="circular" width={40} height={40} sx={{ mr: 2 }} />
                      <Box sx={{ flexGrow: 1 }}>
                        <Skeleton variant="text" width="60%" />
                        <Skeleton variant="text" width="40%" />
                      </Box>
                    </Box>
                    <Skeleton variant="rectangular" height={100} />
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </Card>
        ) : viewMode === 'table' ? (
      <Card>
        <TableContainer>
          <Table>
            <TableHead>
              <TableRow>
                    <TableCell padding="checkbox">
                      <Checkbox
                        checked={bulkSelected.length === sortedClients.length && sortedClients.length > 0}
                        indeterminate={bulkSelected.length > 0 && bulkSelected.length < sortedClients.length}
                        onChange={handleBulkSelectAll}
                      />
                    </TableCell>
                <TableCell>Client</TableCell>
                <TableCell>Contact</TableCell>
                <TableCell>Location</TableCell>
                <TableCell>Status</TableCell>
                    <TableCell>Priority</TableCell>
                    <TableCell>Total Amount</TableCell>
                <TableCell>Created</TableCell>
                <TableCell align="right">Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
                  {sortedClients.map((client: Client) => (
                <TableRow key={client.id} hover>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={bulkSelected.includes(client.id)}
                          onChange={() => handleBulkSelect(client.id)}
                        />
                      </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          mr: 2,
                        }}
                      >
                        <BusinessIcon />
                      </Avatar>
                      <Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Typography variant="body1" fontWeight={600}>
                          {client.name}
                        </Typography>
                              <IconButton
                                size="small"
                                onClick={() => handleToggleFavorite(client.id)}
                              >
                                {client.is_favorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                              </IconButton>
                            </Box>
                        <Typography variant="caption" color="text.secondary">
                          GSTIN: {client.gstin}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                        <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{client.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{client.phone}</Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                      <Box>
                        <Typography variant="body2">{client.city}</Typography>
                        <Typography variant="caption" color="text.secondary">
                          {client.state} - {client.pincode}
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                  <TableCell>
                    <Chip
                          icon={getStatusIcon(client.status)}
                      label={client.status}
                      color={getStatusColor(client.status) as any}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                      <TableCell>
                        <Chip
                          label={client.priority}
                          color={getPriorityColor(client.priority) as any}
                          size="small"
                          sx={{ fontWeight: 600 }}
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" fontWeight={600}>
                          ₹{client.total_amount?.toLocaleString() || '0'}
                        </Typography>
                        {client.outstanding_amount > 0 && (
                          <Typography variant="caption" color="error">
                            Outstanding: ₹{client.outstanding_amount.toLocaleString()}
                          </Typography>
                        )}
                      </TableCell>
                  <TableCell>
                    <Typography variant="body2">
                      {new Date(client.created_at).toLocaleDateString()}
                    </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {new Date(client.created_at).toLocaleTimeString()}
                        </Typography>
                  </TableCell>
                  <TableCell align="right">
                    <IconButton
                      onClick={(e) => handleMenuOpen(e, client.id)}
                      size="small"
                    >
                      <MoreVertIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Card>
        ) : viewMode === 'grid' ? (
          <Grid container spacing={3}>
            {sortedClients.map((client: Client) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={client.id}>
                <Card
                  sx={{
                    height: '100%',
                    position: 'relative',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: theme.shadows[8],
                    },
                    transition: 'all 0.3s ease',
                  }}
                >
                  <CardContent sx={{ p: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                          width: 48,
                          height: 48,
                        }}
                      >
                        <BusinessIcon />
                      </Avatar>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleFavorite(client.id)}
                        >
                          {client.is_favorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, client.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </Box>

                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {client.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {client.industry} • {client.company_size}
                    </Typography>

                    <Box sx={{ mb: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <EmailIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{client.email}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <PhoneIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{client.phone}</Typography>
                      </Box>
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        <LocationIcon sx={{ fontSize: 16, mr: 1, color: 'text.secondary' }} />
                        <Typography variant="body2">{client.city}, {client.state}</Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
                      <Chip
                        icon={getStatusIcon(client.status)}
                        label={client.status}
                        color={getStatusColor(client.status) as any}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                      <Chip
                        label={client.priority}
                        color={getPriorityColor(client.priority) as any}
                        size="small"
                        sx={{ fontWeight: 600 }}
                      />
                    </Box>

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="h6" fontWeight={600}>
                          ₹{client.total_amount?.toLocaleString() || '0'}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          Total Amount
                        </Typography>
                      </Box>
                      <Typography variant="caption" color="text.secondary">
                        {new Date(client.created_at).toLocaleDateString()}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        ) : (
          <Card>
            <List>
              {sortedClients.map((client: Client) => (
                <React.Fragment key={client.id}>
                  <ListItem
                    sx={{
                      py: 2,
                      '&:hover': {
                        backgroundColor: alpha(theme.palette.primary.main, 0.04),
                      },
                    }}
                  >
                    <ListItemIcon>
                      <Checkbox
                        checked={bulkSelected.includes(client.id)}
                        onChange={() => handleBulkSelect(client.id)}
                      />
                    </ListItemIcon>
                    <ListItemIcon>
                      <Avatar
                        sx={{
                          bgcolor: alpha(theme.palette.primary.main, 0.1),
                          color: theme.palette.primary.main,
                        }}
                      >
                        <BusinessIcon />
                      </Avatar>
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1 }}>
                          <Typography variant="h6" fontWeight={600}>
                            {client.name}
                          </Typography>
                          <Chip
                            icon={getStatusIcon(client.status)}
                            label={client.status}
                            color={getStatusColor(client.status) as any}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          <Chip
                            label={client.priority}
                            color={getPriorityColor(client.priority) as any}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                        </Box>
                      }
                      secondary={
                        <Box>
                          <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                            {client.email} • {client.phone} • {client.city}, {client.state}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total: ₹{client.total_amount?.toLocaleString() || '0'} • 
                            Created: {new Date(client.created_at).toLocaleDateString()}
                          </Typography>
                        </Box>
                      }
                    />
                    <ListItemSecondaryAction>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          onClick={() => handleToggleFavorite(client.id)}
                        >
                          {client.is_favorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                        </IconButton>
                        <IconButton
                          size="small"
                          onClick={(e) => handleMenuOpen(e, client.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </Box>
                    </ListItemSecondaryAction>
                  </ListItem>
                  <Divider />
                </React.Fragment>
              ))}
            </List>
          </Card>
        )}

      {/* Empty State */}
        {sortedClients.length === 0 && !isLoading && (
        <Card>
          <CardContent sx={{ p: 6, textAlign: 'center' }}>
            <BusinessIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
                {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all' 
                  ? 'No clients match your filters' 
                  : 'No clients found'
                }
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                  ? 'Try adjusting your search criteria or filters'
                  : 'Get started by adding your first client'
                }
            </Typography>
              <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
                  onClick={handleAddClient}
            >
              Add Client
            </Button>
                {(searchQuery || statusFilter !== 'all' || priorityFilter !== 'all') && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setPriorityFilter('all');
                    }}
                  >
                    Clear Filters
                  </Button>
                )}
              </Box>
          </CardContent>
        </Card>
      )}

      {/* Context Menu */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
          PaperProps={{
            sx: {
              borderRadius: 2,
              minWidth: 200,
              boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
            },
          }}
      >
        <MenuItem onClick={() => handleViewClient(clients.find((c: Client) => c.id === selectedClientId)!)}>
          <VisibilityIcon sx={{ mr: 1 }} />
          View Details
        </MenuItem>
        <MenuItem onClick={() => handleEditClient(clients.find((c: Client) => c.id === selectedClientId)!)}>
          <EditIcon sx={{ mr: 1 }} />
          Edit
        </MenuItem>
          <MenuItem onClick={() => handleToggleFavorite(selectedClientId!)}>
            <StarIcon sx={{ mr: 1 }} />
            Toggle Favorite
          </MenuItem>
          <Divider />
        <MenuItem onClick={() => handleDeleteClient(selectedClientId!)}>
          <DeleteIcon sx={{ mr: 1 }} />
          Delete
        </MenuItem>
      </Menu>

        {/* Client Form Dialog */}
      <Dialog
        open={clientDialogOpen}
        onClose={() => setClientDialogOpen(false)}
        maxWidth="md"
        fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <BusinessIcon />
              </Avatar>
              <Box>
                <Typography variant="h5" fontWeight={600}>
                  {isEditing ? 'Edit Client' : 'Add New Client'}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {isEditing ? 'Update client information' : 'Enter client details to get started'}
                </Typography>
              </Box>
            </Box>
          </DialogTitle>
          <DialogContent sx={{ pt: 2 }}>
            <Stepper activeStep={formStep} orientation="horizontal" sx={{ mb: 4 }}>
              <Step>
                <StepLabel>Basic Info</StepLabel>
              </Step>
              <Step>
                <StepLabel>Contact Details</StepLabel>
              </Step>
              <Step>
                <StepLabel>Additional Info</StepLabel>
              </Step>
            </Stepper>

            <Tabs value={activeTab} onChange={(e, newValue) => setActiveTab(newValue)} sx={{ mb: 3 }}>
              <Tab label="Basic Information" />
              <Tab label="Contact Details" />
              <Tab label="Additional Information" />
            </Tabs>

            {activeTab === 0 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Client Name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Industry"
                    value={formData.industry}
                    onChange={(e) => setFormData({ ...formData, industry: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="GSTIN"
                    value={formData.gstin}
                    onChange={(e) => setFormData({ ...formData, gstin: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="PAN"
                    value={formData.pan}
                    onChange={(e) => setFormData({ ...formData, pan: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Status</InputLabel>
                    <Select
                      value={formData.status}
                      label="Status"
                      onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                    >
                      <MenuItem value="active">Active</MenuItem>
                      <MenuItem value="inactive">Inactive</MenuItem>
                      <MenuItem value="pending">Pending</MenuItem>
                      <MenuItem value="suspended">Suspended</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Priority</InputLabel>
                    <Select
                      value={formData.priority}
                      label="Priority"
                      onChange={(e) => setFormData({ ...formData, priority: e.target.value })}
                    >
                      <MenuItem value="high">High</MenuItem>
                      <MenuItem value="medium">Medium</MenuItem>
                      <MenuItem value="low">Low</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>
            )}

            {activeTab === 1 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Address"
                    multiline
                    rows={3}
                    value={formData.address}
                    onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="City"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="State"
                    value={formData.state}
                    onChange={(e) => setFormData({ ...formData, state: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={4}>
                  <TextField
                    fullWidth
                    label="Pincode"
                    value={formData.pincode}
                    onChange={(e) => setFormData({ ...formData, pincode: e.target.value })}
                  />
                </Grid>
              </Grid>
            )}

            {activeTab === 2 && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Website"
                    value={formData.website}
                    onChange={(e) => setFormData({ ...formData, website: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Company Size"
                    value={formData.company_size}
                    onChange={(e) => setFormData({ ...formData, company_size: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Assigned To"
                    value={formData.assigned_to}
                    onChange={(e) => setFormData({ ...formData, assigned_to: e.target.value })}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Tags (comma separated)"
                    value={formData.tags.join(', ')}
                    onChange={(e) => setFormData({ ...formData, tags: e.target.value.split(',').map(tag => tag.trim()) })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Notes"
                    multiline
                    rows={4}
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </Grid>
              </Grid>
            )}
          </DialogContent>
          <DialogActions sx={{ p: 3, gap: 2 }}>
            <Button onClick={() => setClientDialogOpen(false)}>
              Cancel
            </Button>
            {activeTab > 0 && (
              <Button onClick={() => setActiveTab(activeTab - 1)}>
                Previous
              </Button>
            )}
            {activeTab < 2 ? (
              <Button variant="contained" onClick={() => setActiveTab(activeTab + 1)}>
                Next
              </Button>
            ) : (
              <Button 
                variant="contained" 
                onClick={handleFormSubmit}
                disabled={createClientMutation.isPending || updateClientMutation.isPending}
              >
                {createClientMutation.isPending || updateClientMutation.isPending 
                  ? 'Saving...' 
                  : isEditing ? 'Update Client' : 'Create Client'
                }
              </Button>
            )}
          </DialogActions>
        </Dialog>

        {/* Client View Dialog */}
        <Dialog
          open={viewDialogOpen}
          onClose={() => setViewDialogOpen(false)}
          maxWidth="md"
          fullWidth
          PaperProps={{
            sx: { borderRadius: 3 }
          }}
        >
          <DialogTitle sx={{ pb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Avatar sx={{ bgcolor: 'primary.main' }}>
                <BusinessIcon />
              </Avatar>
              <Box sx={{ flexGrow: 1 }}>
                <Typography variant="h5" fontWeight={600}>
                  {selectedClient?.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Client Details
                </Typography>
              </Box>
              <Box sx={{ display: 'flex', gap: 1 }}>
                <IconButton onClick={() => handleToggleFavorite(selectedClient?.id!)}>
                  {selectedClient?.is_favorite ? <StarIcon color="warning" /> : <StarBorderIcon />}
                </IconButton>
                <IconButton onClick={() => {
                  setViewDialogOpen(false);
                  handleEditClient(selectedClient!);
                }}>
                  <EditIcon />
                </IconButton>
              </Box>
            </Box>
        </DialogTitle>
        <DialogContent>
            {selectedClient && (
              <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Contact Information</Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <EmailIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{selectedClient.email}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <PhoneIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{selectedClient.phone}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                    <LocationIcon sx={{ mr: 1, color: 'text.secondary' }} />
                    <Typography>{selectedClient.address}, {selectedClient.city}, {selectedClient.state} - {selectedClient.pincode}</Typography>
                  </Box>
                </Grid>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom>Business Information</Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>GSTIN:</strong> {selectedClient.gstin}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>PAN:</strong> {selectedClient.pan}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Industry:</strong> {selectedClient.industry}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    <strong>Company Size:</strong> {selectedClient.company_size}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>Financial Summary</Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" color="primary.main" fontWeight={600}>
                            ₹{selectedClient.total_amount?.toLocaleString() || '0'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Amount
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" color="error.main" fontWeight={600}>
                            ₹{selectedClient.outstanding_amount?.toLocaleString() || '0'}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Outstanding
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                    <Grid item xs={12} md={4}>
                      <Card variant="outlined">
                        <CardContent sx={{ textAlign: 'center' }}>
                          <Typography variant="h4" color="success.main" fontWeight={600}>
                            {selectedClient.total_invoices || 0}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Total Invoices
                          </Typography>
                        </CardContent>
                      </Card>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            )}
        </DialogContent>
          <DialogActions sx={{ p: 3 }}>
            <Button onClick={() => setViewDialogOpen(false)}>
              Close
            </Button>
            <Button 
              variant="contained" 
              onClick={() => {
                setViewDialogOpen(false);
                handleEditClient(selectedClient!);
              }}
            >
              Edit Client
            </Button>
        </DialogActions>
      </Dialog>
    </Box>
    </Box>
  );
};

export default Clients;