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
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  MenuItem,
  Tabs,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  Avatar,
  Tooltip,
  Fab,
  useTheme,
  alpha,
  Divider,
  Stepper,
  Step,
  StepLabel,
} from '@mui/material';
import {
  Add as AddIcon,
  MoreVert as MoreVertIcon,
  Receipt as ReceiptIcon,
  AccountBalance as AccountBalanceIcon,
  TrendingUp as TrendingUpIcon,
  Payment as PaymentIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as VisibilityIcon,
  Download as DownloadIcon,
  Refresh as RefreshIcon,
  Warning as WarningIcon,
  CheckCircle as CheckCircleIcon,
  Schedule as ScheduleIcon,
  FilterList as FilterIcon,
  Sort as SortIcon,
  Search as SearchIcon,
  Send as SendIcon,
  QrCode as QrCodeIcon,
  ReceiptLong as ReceiptLongIcon,
  CreditCard as CreditCardIcon,
  LocalAtm as LocalAtmIcon,
} from '@mui/icons-material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, PieChart, Pie, Cell, BarChart, Bar } from 'recharts';

// Enhanced interfaces
interface Invoice {
  id: string;
  invoiceNumber: string;
  client: {
    id: string;
    name: string;
    email: string;
    phone: string;
    address: string;
    avatar?: string;
  };
  amount: number;
  tax: number;
  total: number;
  status: 'draft' | 'sent' | 'paid' | 'overdue' | 'cancelled';
  priority: 'low' | 'medium' | 'high' | 'critical';
  dueDate: string;
  issueDate: string;
  paidDate?: string;
  paymentMethod?: 'cash' | 'bank_transfer' | 'credit_card' | 'cheque' | 'upi' | 'other';
  items: Array<{
    id: string;
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  notes: string;
  terms: string;
  tags: string[];
  attachments: Array<{
    id: string;
    name: string;
    type: string;
    size: number;
    url: string;
  }>;
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Payment {
  id: string;
  invoiceId: string;
  amount: number;
  paymentDate: string;
  paymentMethod: 'cash' | 'bank_transfer' | 'credit_card' | 'cheque' | 'upi' | 'other';
  reference: string;
  notes: string;
  status: 'pending' | 'completed' | 'failed' | 'cancelled';
  createdBy: {
    id: string;
    name: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface Account {
  id: string;
  code: string;
  name: string;
  type: 'asset' | 'liability' | 'equity' | 'revenue' | 'expense';
  parentId?: string;
  balance: number;
  isActive: boolean;
  description: string;
  createdAt: string;
  updatedAt: string;
}

interface InvoiceFormData {
  clientId: string;
  issueDate: string;
  dueDate: string;
  items: Array<{
    description: string;
    quantity: number;
    rate: number;
    amount: number;
  }>;
  tax: number;
  notes: string;
  terms: string;
  tags: string[];
}

const Financial: React.FC = () => {
  const theme = useTheme();
  // const queryClient = useQueryClient();
  
  // Enhanced state management
  const [tabValue, setTabValue] = useState(0);
  const [invoiceDialogOpen, setInvoiceDialogOpen] = useState(false);
  // const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [viewDialogOpen, setViewDialogOpen] = useState(false);
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  // const [selectedPayment, setSelectedPayment] = useState<Payment | null>(null);
  const [isEditing, setIsEditing] = useState(false);
  const [formStep, setFormStep] = useState(0);
  const [formData, setFormData] = useState<InvoiceFormData>({
    clientId: '',
    issueDate: '',
    dueDate: '',
    items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
    tax: 0,
    notes: '',
    terms: '',
    tags: [],
  });
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [priorityFilter, setPriorityFilter] = useState<string>('all');
  // const [dateRange, setDateRange] = useState<string>('all');
  const [sortBy, setSortBy] = useState<string>('dueDate');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewMode, setViewMode] = useState<'table' | 'grid' | 'timeline'>('table');
  const [showFilters, setShowFilters] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  // const [timeRange, setTimeRange] = useState<'7D' | '30D' | '90D' | '1Y'>('30D');

  const handleTabChange = (event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Enhanced mock data
  const invoices: Invoice[] = [
    {
      id: '1',
      invoiceNumber: 'INV-2023-001',
      client: {
        id: '1',
        name: 'ABC Corp',
        email: 'contact@abccorp.com',
        phone: '+91 98765 43210',
        address: '123 Business Park, Mumbai, Maharashtra 400001',
        avatar: '/avatars/abc.jpg'
      },
      amount: 50000,
      tax: 9000,
      total: 59000,
      status: 'paid',
      priority: 'high',
      dueDate: '2023-10-15',
      issueDate: '2023-10-01',
      paidDate: '2023-10-10',
      paymentMethod: 'bank_transfer',
      items: [
        { id: '1', description: 'GST Filing Services', quantity: 1, rate: 25000, amount: 25000 },
        { id: '2', description: 'TDS Return Filing', quantity: 1, rate: 15000, amount: 15000 },
        { id: '3', description: 'ITR Preparation', quantity: 1, rate: 10000, amount: 10000 }
      ],
      notes: 'Monthly compliance services for Q2 FY 2023-24',
      terms: 'Payment due within 15 days of invoice date',
      tags: ['GST', 'TDS', 'ITR', 'Monthly'],
      attachments: [
        { id: '1', name: 'invoice_001.pdf', type: 'pdf', size: 1024000, url: '/docs/invoice_001.pdf' }
      ],
      createdBy: {
        id: '1',
        name: 'John Smith',
        email: 'john@company.com'
      },
      createdAt: '2023-10-01',
      updatedAt: '2023-10-10'
    },
    {
      id: '2',
      invoiceNumber: 'INV-2023-002',
      client: {
        id: '2',
        name: 'XYZ Ltd',
        email: 'accounts@xyzltd.com',
        phone: '+91 98765 43211',
        address: '456 Corporate Plaza, Delhi, Delhi 110001',
        avatar: '/avatars/xyz.jpg'
      },
      amount: 75000,
      tax: 13500,
      total: 88500,
      status: 'overdue',
      priority: 'critical',
      dueDate: '2023-10-20',
      issueDate: '2023-10-05',
      items: [
        { id: '4', description: 'Audit Services', quantity: 1, rate: 50000, amount: 50000 },
        { id: '5', description: 'Tax Planning Consultation', quantity: 1, rate: 25000, amount: 25000 }
      ],
      notes: 'Annual audit and tax planning services',
      terms: 'Payment due within 15 days of invoice date',
      tags: ['Audit', 'Tax Planning', 'Annual'],
      attachments: [],
      createdBy: {
        id: '2',
        name: 'Jane Doe',
        email: 'jane@company.com'
      },
      createdAt: '2023-10-05',
      updatedAt: '2023-10-05'
    },
    {
      id: '3',
      invoiceNumber: 'INV-2023-003',
      client: {
        id: '3',
        name: 'DEF Industries',
        email: 'finance@defindustries.com',
        phone: '+91 98765 43212',
        address: '789 Industrial Area, Bangalore, Karnataka 560001',
        avatar: '/avatars/def.jpg'
      },
      amount: 30000,
      tax: 5400,
      total: 35400,
      status: 'sent',
      priority: 'medium',
      dueDate: '2023-11-15',
      issueDate: '2023-11-01',
      items: [
        { id: '6', description: 'Bookkeeping Services', quantity: 1, rate: 20000, amount: 20000 },
        { id: '7', description: 'Financial Reporting', quantity: 1, rate: 10000, amount: 10000 }
      ],
      notes: 'Monthly bookkeeping and financial reporting',
      terms: 'Payment due within 15 days of invoice date',
      tags: ['Bookkeeping', 'Financial Reporting', 'Monthly'],
      attachments: [],
      createdBy: {
        id: '1',
        name: 'John Smith',
        email: 'john@company.com'
      },
      createdAt: '2023-11-01',
      updatedAt: '2023-11-01'
    }
  ];

  const payments: Payment[] = [
    {
      id: '1',
      invoiceId: '1',
      amount: 59000,
      paymentDate: '2023-10-10',
      paymentMethod: 'bank_transfer',
      reference: 'TXN123456789',
      notes: 'Payment received via NEFT',
      status: 'completed',
      createdBy: {
        id: '1',
        name: 'John Smith',
        email: 'john@company.com'
      },
      createdAt: '2023-10-10',
      updatedAt: '2023-10-10'
    }
  ];

  const accounts: Account[] = [
    {
      id: '1',
      code: '1000',
      name: 'Cash',
      type: 'asset',
      balance: 50000,
      isActive: true,
      description: 'Cash in hand',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: '2',
      code: '1100',
      name: 'Bank Account',
      type: 'asset',
      balance: 500000,
      isActive: true,
      description: 'Primary business bank account',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: '3',
      code: '2000',
      name: 'Accounts Payable',
      type: 'liability',
      balance: 25000,
      isActive: true,
      description: 'Outstanding payments to vendors',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: '4',
      code: '3000',
      name: 'Owner Equity',
      type: 'equity',
      balance: 1000000,
      isActive: true,
      description: 'Owner capital investment',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: '5',
      code: '4000',
      name: 'Service Revenue',
      type: 'revenue',
      balance: 1500000,
      isActive: true,
      description: 'Revenue from compliance services',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    },
    {
      id: '6',
      code: '5000',
      name: 'Office Expenses',
      type: 'expense',
      balance: 75000,
      isActive: true,
      description: 'General office operating expenses',
      createdAt: '2023-01-01',
      updatedAt: '2023-01-01'
    }
  ];

  // Chart data
  const revenueData = [
    { month: 'Jan', revenue: 120000, expenses: 80000, profit: 40000 },
    { month: 'Feb', revenue: 150000, expenses: 90000, profit: 60000 },
    { month: 'Mar', revenue: 180000, expenses: 100000, profit: 80000 },
    { month: 'Apr', revenue: 200000, expenses: 110000, profit: 90000 },
    { month: 'May', revenue: 220000, expenses: 120000, profit: 100000 },
    { month: 'Jun', revenue: 250000, expenses: 130000, profit: 120000 },
    { month: 'Jul', revenue: 280000, expenses: 140000, profit: 140000 },
    { month: 'Aug', revenue: 300000, expenses: 150000, profit: 150000 },
    { month: 'Sep', revenue: 320000, expenses: 160000, profit: 160000 },
    { month: 'Oct', revenue: 350000, expenses: 170000, profit: 180000 },
    { month: 'Nov', revenue: 380000, expenses: 180000, profit: 200000 },
    { month: 'Dec', revenue: 400000, expenses: 190000, profit: 210000 }
  ];

  const invoiceStatusData = [
    { name: 'Paid', value: 45, color: '#4caf50' },
    { name: 'Sent', value: 25, color: '#2196f3' },
    { name: 'Overdue', value: 15, color: '#f44336' },
    { name: 'Draft', value: 10, color: '#ff9800' },
    { name: 'Cancelled', value: 5, color: '#9e9e9e' }
  ];

  const paymentMethodData = [
    { name: 'Bank Transfer', value: 40, color: '#2196f3' },
    { name: 'UPI', value: 25, color: '#4caf50' },
    { name: 'Credit Card', value: 20, color: '#ff9800' },
    { name: 'Cash', value: 10, color: '#9e9e9e' },
    { name: 'Cheque', value: 5, color: '#607d8b' }
  ];

  // Enhanced utility functions
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'paid': return 'success';
      case 'sent': return 'info';
      case 'draft': return 'default';
      case 'overdue': return 'error';
      case 'cancelled': return 'default';
      default: return 'default';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'error';
      case 'high': return 'warning';
      case 'medium': return 'info';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'paid': return <CheckCircleIcon />;
      case 'sent': return <SendIcon />;
      case 'draft': return <EditIcon />;
      case 'overdue': return <WarningIcon />;
      case 'cancelled': return <DeleteIcon />;
      default: return <ReceiptIcon />;
    }
  };

  const getPaymentMethodIcon = (method: string) => {
    switch (method) {
      case 'bank_transfer': return <AccountBalanceIcon />;
      case 'credit_card': return <CreditCardIcon />;
      case 'upi': return <QrCodeIcon />;
      case 'cash': return <LocalAtmIcon />;
      case 'cheque': return <ReceiptLongIcon />;
      default: return <PaymentIcon />;
    }
  };

  const getAccountTypeColor = (type: string) => {
    switch (type) {
      case 'asset': return 'success';
      case 'liability': return 'error';
      case 'equity': return 'info';
      case 'revenue': return 'success';
      case 'expense': return 'warning';
      default: return 'default';
    }
  };

  // Event handlers
  const handleRefresh = async () => {
    setRefreshing(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    setRefreshing(false);
  };

  const handleCreateInvoice = () => {
    setSelectedInvoice(null);
    setIsEditing(false);
    setFormStep(0);
    setFormData({
      clientId: '',
      issueDate: '',
      dueDate: '',
      items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
      tax: 0,
      notes: '',
      terms: '',
      tags: [],
    });
    setInvoiceDialogOpen(true);
  };

  const handleEditInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setIsEditing(true);
    setFormStep(0);
    setFormData({
      clientId: invoice.client.id,
      issueDate: invoice.issueDate,
      dueDate: invoice.dueDate,
      items: invoice.items,
      tax: invoice.tax,
      notes: invoice.notes,
      terms: invoice.terms,
      tags: invoice.tags,
    });
    setInvoiceDialogOpen(true);
  };

  const handleViewInvoice = (invoice: Invoice) => {
    setSelectedInvoice(invoice);
    setViewDialogOpen(true);
  };

  // const handleDeleteInvoice = (invoiceId: string) => {
  //   // Implement delete logic
  //   console.log('Delete invoice:', invoiceId);
  // };

  // const handleCreatePayment = (invoice: Invoice) => {
  //   setSelectedInvoice(invoice);
  //   setPaymentDialogOpen(true);
  // };

  // const resetForm = () => {
  //   setFormData({
  //     clientId: '',
  //     issueDate: '',
  //     dueDate: '',
  //     items: [{ description: '', quantity: 1, rate: 0, amount: 0 }],
  //     tax: 0,
  //     notes: '',
  //     terms: '',
  //     tags: [],
  //   });
  //   setFormStep(0);
  // };

  // Filter and sort logic - commented out due to unused variables
  // const filteredInvoices = invoices.filter(invoice => {
  //   const matchesSearch = invoice.invoiceNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                        invoice.client.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
  //                        invoice.client.email.toLowerCase().includes(searchQuery.toLowerCase());
  //   const matchesStatus = statusFilter === 'all' || invoice.status === statusFilter;
  //   const matchesPriority = priorityFilter === 'all' || invoice.priority === priorityFilter;
  //   
  //   return matchesSearch && matchesStatus && matchesPriority;
  // });

  // const sortedInvoices = [...filteredInvoices].sort((a, b) => {
  //   let aValue, bValue;
  //   
  //   switch (sortBy) {
  //     case 'dueDate':
  //       aValue = new Date(a.dueDate).getTime();
  //       bValue = new Date(b.dueDate).getTime();
  //       break;
  //     case 'amount':
  //       aValue = a.total;
  //       bValue = b.total;
  //       break;
  //     case 'status':
  //       const statusOrder = { paid: 4, sent: 3, draft: 2, overdue: 1, cancelled: 0 };
  //       aValue = statusOrder[a.status as keyof typeof statusOrder] || 0;
  //       bValue = statusOrder[b.status as keyof typeof statusOrder] || 0;
  //       break;
  //     case 'invoiceNumber':
  //       aValue = a.invoiceNumber.toLowerCase();
  //       bValue = b.invoiceNumber.toLowerCase();
  //       break;
  //     default:
  //       aValue = a.dueDate;
  //       bValue = b.dueDate;
  //   }
  //   
  //   if (sortOrder === 'asc') {
  //     return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
  //   } else {
  //     return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
  //   }
  // });

  // Mock data for totals
  const totalRevenue: number = 125000;
  const totalOutstanding: number = 45000;
  const totalPending: number = 25000;
  const totalOverdue: number = 20000;
  const sortedInvoices: any[] = [];

  return (
    <Box className="fade-in">
      {/* Enhanced Header */}
      <Box sx={{ 
        backgroundColor: '#ffffff',
        borderRadius: 4,
        p: 4,
        mb: 4,
        color: '#0f172a',
        position: 'relative',
        overflow: 'hidden',
        border: '1px solid #e2e8f0',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #6366f1 0%, #8b5cf6 100%)',
        },
        '&::after': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%)',
          pointerEvents: 'none',
        },
      }}>
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography 
            variant="h2" 
            component="h1" 
            className="card-title"
            sx={{ 
              fontWeight: 900, 
              mb: 2,
              color: '#0f172a',
            }}
          >
            Financial Management
          </Typography>
          <Typography 
            variant="h6" 
            className="card-subtitle"
            sx={{ 
              opacity: 0.9, 
              mb: 3,
              color: '#64748b',
              fontWeight: 500,
            }}
          >
            Comprehensive invoice management, payment tracking, and financial reporting
          </Typography>
          
          {/* Quick Stats */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', mb: 3 }}>
            <Chip 
              label={`₹${totalRevenue.toLocaleString()} Revenue`} 
              className="status-chip"
              sx={{ 
                background: 'rgba(16, 185, 129, 0.2)',
                color: '#10b981',
                border: '1px solid rgba(16, 185, 129, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontWeight: 700,
              }}
            />
            <Chip 
              label={`₹${totalOutstanding.toLocaleString()} Outstanding`} 
              className="status-chip"
              sx={{ 
                background: 'rgba(245, 158, 11, 0.2)',
                color: '#f59e0b',
                border: '1px solid rgba(245, 158, 11, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontWeight: 700,
              }}
            />
            <Chip 
              label={`₹${totalOverdue.toLocaleString()} Overdue`} 
              className="status-chip"
              sx={{ 
                background: 'rgba(239, 68, 68, 0.2)',
                color: '#ef4444',
                border: '1px solid rgba(239, 68, 68, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontWeight: 700,
              }}
            />
            <Chip 
              label={`${invoices.length} Total Invoices`} 
              className="status-chip"
              sx={{ 
                background: 'rgba(99, 102, 241, 0.2)',
                color: '#6366f1',
                border: '1px solid rgba(99, 102, 241, 0.3)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                fontWeight: 700,
              }}
            />
          </Box>

          {/* Action Buttons */}
          <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleCreateInvoice}
              className="hover-lift"
              sx={{ 
                borderRadius: 3,
                background: 'linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)',
                boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)',
                color: 'white',
                fontWeight: 700,
                px: 4,
                py: 2,
                '&:hover': { 
                  background: 'linear-gradient(135deg, #4f46e5 0%, #7c3aed 100%)',
                  boxShadow: '0 12px 40px rgba(99, 102, 241, 0.4)',
                }
              }}
            >
              Create Invoice
            </Button>
            <Button
              variant="outlined"
              startIcon={<RefreshIcon />}
              onClick={handleRefresh}
              disabled={refreshing}
              className="hover-lift"
              sx={{ 
                borderRadius: 2,
                backgroundColor: 'transparent',
                border: '1px solid #e2e8f0',
                color: '#0f172a',
                fontWeight: 500,
                '&:hover': { 
                  backgroundColor: '#f8fafc',
                  borderColor: '#cbd5e1',
                },
                '&:disabled': {
                  backgroundColor: '#f1f5f9',
                  color: '#94a3b8',
                  border: '1px solid #e2e8f0',
                }
              }}
            >
              {refreshing ? 'Refreshing...' : 'Refresh'}
            </Button>
            <Button
              variant="outlined"
              startIcon={<DownloadIcon />}
              className="hover-lift"
              sx={{ 
                borderRadius: 3,
                background: 'rgba(255, 255, 255, 0.1)',
                backdropFilter: 'blur(10px)',
                WebkitBackdropFilter: 'blur(10px)',
                border: '2px solid rgba(255, 255, 255, 0.3)',
                color: 'white',
                fontWeight: 600,
                '&:hover': { 
                  background: 'rgba(255, 255, 255, 0.2)',
                  border: '2px solid rgba(255, 255, 255, 0.5)',
                }
              }}
            >
              Export
            </Button>
          </Box>
        </Box>
        
        {/* Background Pattern */}
        <Box sx={{
          position: 'absolute',
          top: 0,
          right: 0,
          width: '200px',
          height: '200px',
          background: `radial-gradient(circle, ${alpha(theme.palette.common.white, 0.1)} 0%, transparent 70%)`,
          borderRadius: '50%',
          transform: 'translate(50%, -50%)'
        }} />
      </Box>

      {/* Enhanced Financial Overview Cards */}
      <Grid container spacing={3} sx={{ mb: 3 }}>
        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.success.main}15 0%, ${theme.palette.success.main}05 100%)`,
            border: `1px solid ${theme.palette.success.main}30`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <TrendingUpIcon color="success" sx={{ mr: 1 }} />
                <Typography variant="h6" className="card-title">Total Revenue</Typography>
              </Box>
              <Typography variant="h4" color="success.main" className="card-value-large">
                ₹{totalRevenue.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-subtitle" sx={{ mb: 1 }}>
                FY 2023-24
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <TrendingUpIcon sx={{ fontSize: 16, color: 'success.main', mr: 0.5 }} />
                <Typography variant="caption" color="success.main" className="table-cell">
                  +12.5% from last year
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.warning.main}15 0%, ${theme.palette.warning.main}05 100%)`,
            border: `1px solid ${theme.palette.warning.main}30`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <AccountBalanceIcon color="warning" sx={{ mr: 1 }} />
                <Typography variant="h6" className="card-title">Outstanding</Typography>
              </Box>
              <Typography variant="h4" color="warning.main" className="card-value-large">
                ₹{totalOutstanding.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-subtitle" sx={{ mb: 1 }}>
                {invoices.filter(i => ['sent', 'overdue'].includes(i.status)).length} invoices
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ fontSize: 16, color: 'warning.main', mr: 0.5 }} />
                <Typography variant="caption" color="warning.main" className="table-cell">
                  {invoices.filter(i => i.status === 'overdue').length} overdue
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.info.main}15 0%, ${theme.palette.info.main}05 100%)`,
            border: `1px solid ${theme.palette.info.main}30`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <PaymentIcon color="info" sx={{ mr: 1 }} />
                <Typography variant="h6" className="card-title">This Month</Typography>
              </Box>
              <Typography variant="h4" color="info.main" className="card-value-large">
                ₹{totalPending.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-subtitle" sx={{ mb: 1 }}>
                Pending payments
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <ScheduleIcon sx={{ fontSize: 16, color: 'info.main', mr: 0.5 }} />
                <Typography variant="caption" color="info.main" className="table-cell">
                  {invoices.filter(i => i.status === 'sent').length} sent invoices
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={3}>
          <Card sx={{ 
            background: `linear-gradient(135deg, ${theme.palette.error.main}15 0%, ${theme.palette.error.main}05 100%)`,
            border: `1px solid ${theme.palette.error.main}30`
          }}>
            <CardContent>
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <ReceiptIcon color="error" sx={{ mr: 1 }} />
                <Typography variant="h6" className="card-title">Overdue</Typography>
              </Box>
              <Typography variant="h4" color="error.main" className="card-value-large">
                ₹{totalOverdue.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" className="card-subtitle" sx={{ mb: 1 }}>
                {invoices.filter(i => i.status === 'overdue').length} invoices
              </Typography>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <WarningIcon sx={{ fontSize: 16, color: 'error.main', mr: 0.5 }} />
                <Typography variant="caption" color="error.main" className="table-cell">
                  Requires immediate attention
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Enhanced Search and Filters */}
      <Paper sx={{ p: 2, mb: 3 }}>
        <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', mb: 2 }}>
          <TextField
            placeholder="Search invoices, clients, or amounts..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            sx={{ minWidth: 300, flexGrow: 1 }}
            InputProps={{
              startAdornment: <SearchIcon sx={{ mr: 1, color: 'text.secondary' }} />
            }}
          />
          
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Status</InputLabel>
            <Select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              label="Status"
            >
              <MenuItem value="all">All Status</MenuItem>
              <MenuItem value="draft">Draft</MenuItem>
              <MenuItem value="sent">Sent</MenuItem>
              <MenuItem value="paid">Paid</MenuItem>
              <MenuItem value="overdue">Overdue</MenuItem>
              <MenuItem value="cancelled">Cancelled</MenuItem>
            </Select>
          </FormControl>

          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel>Priority</InputLabel>
            <Select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              label="Priority"
            >
              <MenuItem value="all">All Priorities</MenuItem>
              <MenuItem value="critical">Critical</MenuItem>
              <MenuItem value="high">High</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="low">Low</MenuItem>
            </Select>
          </FormControl>

          <Button
            variant="outlined"
            startIcon={<SortIcon />}
            onClick={() => setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')}
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>

          <Button
            variant="outlined"
            startIcon={<FilterIcon />}
            onClick={() => setShowFilters(!showFilters)}
          >
            {showFilters ? 'Hide Filters' : 'More Filters'}
          </Button>
        </Box>

        {/* Advanced Filters */}
        {showFilters && (
          <Box sx={{ 
            borderTop: 1, 
            borderColor: 'divider', 
            pt: 2,
            display: 'flex',
            gap: 2,
            flexWrap: 'wrap',
            alignItems: 'center'
          }}>
            <FormControl sx={{ minWidth: 120 }}>
              <InputLabel>Sort By</InputLabel>
              <Select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                label="Sort By"
              >
                <MenuItem value="dueDate">Due Date</MenuItem>
                <MenuItem value="amount">Amount</MenuItem>
                <MenuItem value="status">Status</MenuItem>
                <MenuItem value="invoiceNumber">Invoice Number</MenuItem>
                <MenuItem value="issueDate">Issue Date</MenuItem>
              </Select>
            </FormControl>

            <Button
              variant="text"
              onClick={() => {
                setSearchQuery('');
                setStatusFilter('all');
                setPriorityFilter('all');
                setSortBy('dueDate');
                setSortOrder('asc');
              }}
            >
              Clear All Filters
            </Button>
          </Box>
        )}
      </Paper>

      <Paper sx={{ width: '100%' }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={tabValue} onChange={handleTabChange}>
            <Tab label="Invoices" />
            <Tab label="Payments" />
            <Tab label="Chart of Accounts" />
            <Tab label="Reports" />
          </Tabs>
        </Box>

        {tabValue === 0 && (
          <Box sx={{ p: 3 }}>
            {/* View Mode Toggle */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Invoices ({sortedInvoices.length})
              </Typography>
              
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
              </Box>
            </Box>

            {/* Enhanced Invoice Table */}
            {viewMode === 'table' && (
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow>
                      <TableCell className="table-header">Invoice #</TableCell>
                      <TableCell className="table-header">Client</TableCell>
                      <TableCell className="table-header">Amount</TableCell>
                      <TableCell className="table-header">Status</TableCell>
                      <TableCell className="table-header">Priority</TableCell>
                      <TableCell className="table-header">Issue Date</TableCell>
                      <TableCell className="table-header">Due Date</TableCell>
                      <TableCell className="table-header">Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {sortedInvoices.map((invoice) => (
                      <TableRow key={invoice.id} hover>
                        <TableCell className="table-cell">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ReceiptIcon sx={{ mr: 1, color: 'text.secondary', fontSize: 18 }} />
                            <Box>
                              <Typography variant="subtitle2" className="table-cell-mono" sx={{ fontWeight: 'bold' }}>
                                {invoice.invoiceNumber}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" className="table-cell">
                                {invoice.items.length} items
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell className="table-cell">
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Avatar sx={{ width: 32, height: 32, mr: 1, fontSize: '0.875rem', fontWeight: 600 }}>
                              {invoice.client.name.charAt(0)}
                            </Avatar>
                            <Box>
                              <Typography variant="body2" className="table-cell" sx={{ fontWeight: 'bold' }}>
                                {invoice.client.name}
                              </Typography>
                              <Typography variant="caption" color="text.secondary" className="table-cell">
                                {invoice.client.email}
                              </Typography>
                            </Box>
                          </Box>
                        </TableCell>
                        <TableCell className="table-cell">
                          <Box>
                            <Typography variant="body2" className="amount-text" sx={{ fontWeight: 'bold' }}>
                              ₹{invoice.total.toLocaleString()}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" className="table-cell">
                              Tax: ₹{invoice.tax.toLocaleString()}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell className="table-cell">
                          <Chip
                            icon={getStatusIcon(invoice.status)}
                            label={invoice.status.toUpperCase()}
                            color={getStatusColor(invoice.status) as any}
                            size="small"
                            className="status-chip"
                            sx={{ fontFamily: 'Inter', fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell className="table-cell">
                          <Chip
                            label={invoice.priority.toUpperCase()}
                            color={getPriorityColor(invoice.priority) as any}
                            size="small"
                            variant="outlined"
                            className="priority-chip"
                            sx={{ fontFamily: 'Inter', fontWeight: 600 }}
                          />
                        </TableCell>
                        <TableCell className="table-cell">
                          <Typography variant="body2" className="table-cell-mono">
                            {new Date(invoice.issueDate).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell className="table-cell">
                          <Typography variant="body2" className="table-cell-mono">
                            {new Date(invoice.dueDate).toLocaleDateString()}
                          </Typography>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 0.5 }}>
                            <Tooltip title="View">
                              <IconButton size="small" onClick={() => handleViewInvoice(invoice)}>
                                <VisibilityIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Edit">
                              <IconButton size="small" onClick={() => handleEditInvoice(invoice)}>
                                <EditIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Send">
                              <IconButton size="small">
                                <SendIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="Download">
                              <IconButton size="small">
                                <DownloadIcon />
                              </IconButton>
                            </Tooltip>
                            <Tooltip title="More">
                              <IconButton size="small">
                                <MoreVertIcon />
                              </IconButton>
                            </Tooltip>
                          </Box>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            )}

            {/* Grid View */}
            {viewMode === 'grid' && (
              <Grid container spacing={2}>
                {sortedInvoices.map((invoice) => (
                  <Grid item xs={12} sm={6} md={4} key={invoice.id}>
                    <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                      <CardContent sx={{ flexGrow: 1 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <ReceiptIcon sx={{ mr: 1, color: 'text.secondary' }} />
                            <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                              {invoice.invoiceNumber}
                            </Typography>
                          </Box>
                          <Chip
                            icon={getStatusIcon(invoice.status)}
                            label={invoice.status.toUpperCase()}
                            color={getStatusColor(invoice.status) as any}
                            size="small"
                          />
                        </Box>

                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Avatar sx={{ width: 32, height: 32, mr: 1 }}>
                            {invoice.client.name.charAt(0)}
                          </Avatar>
                          <Box>
                            <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                              {invoice.client.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {invoice.client.email}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ mb: 2 }}>
                          <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                            ₹{invoice.total.toLocaleString()}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            Tax: ₹{invoice.tax.toLocaleString()}
                          </Typography>
                        </Box>

                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                          <Box>
                            <Typography variant="caption" color="text.secondary">Issue Date</Typography>
                            <Typography variant="body2">
                              {new Date(invoice.issueDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                          <Box>
                            <Typography variant="caption" color="text.secondary">Due Date</Typography>
                            <Typography variant="body2">
                              {new Date(invoice.dueDate).toLocaleDateString()}
                            </Typography>
                          </Box>
                        </Box>

                        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                          {invoice.tags.map((tag: any, index: number) => (
                            <Chip key={index} label={tag} size="small" variant="outlined" />
                          ))}
                        </Box>
                      </CardContent>

                      <Box sx={{ p: 2, pt: 0, display: 'flex', gap: 1 }}>
                        <Button
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewInvoice(invoice)}
                        >
                          View
                        </Button>
                        <Button
                          size="small"
                          startIcon={<EditIcon />}
                          onClick={() => handleEditInvoice(invoice)}
                        >
                          Edit
                        </Button>
                        <Button
                          size="small"
                          startIcon={<SendIcon />}
                        >
                          Send
                        </Button>
                      </Box>
                    </Card>
                  </Grid>
                ))}
              </Grid>
            )}

            {/* Empty State */}
            {sortedInvoices.length === 0 && (
              <Paper sx={{ p: 4, textAlign: 'center' }}>
                <ReceiptIcon sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
                <Typography variant="h6" color="text.secondary" sx={{ mb: 1 }}>
                  No invoices found
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {searchQuery || statusFilter !== 'all' || priorityFilter !== 'all'
                    ? 'Try adjusting your filters to see more results.'
                    : 'Get started by creating your first invoice.'}
                </Typography>
                {(searchQuery || statusFilter !== 'all' || priorityFilter !== 'all') && (
                  <Button
                    variant="outlined"
                    onClick={() => {
                      setSearchQuery('');
                      setStatusFilter('all');
                      setPriorityFilter('all');
                    }}
                    sx={{ mr: 1 }}
                  >
                    Clear Filters
                  </Button>
                )}
                <Button variant="contained" startIcon={<AddIcon />} onClick={handleCreateInvoice}>
                  Create Invoice
                </Button>
              </Paper>
            )}
          </Box>
        )}

        {tabValue === 1 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Payment History</Typography>
            <TableContainer>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Payment ID</TableCell>
                    <TableCell>Invoice</TableCell>
                    <TableCell>Amount</TableCell>
                    <TableCell>Method</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Status</TableCell>
                    <TableCell>Reference</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {payments.map((payment) => (
                    <TableRow key={payment.id} hover>
                      <TableCell>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {getPaymentMethodIcon(payment.paymentMethod)}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {payment.id}
                          </Typography>
                        </Box>
                      </TableCell>
                      <TableCell>
                        {invoices.find(inv => inv.id === payment.invoiceId)?.invoiceNumber}
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" sx={{ fontWeight: 'bold' }}>
                          ₹{payment.amount.toLocaleString()}
                        </Typography>
                      </TableCell>
                      <TableCell>
                        <Chip
                          icon={getPaymentMethodIcon(payment.paymentMethod)}
                          label={payment.paymentMethod.replace('_', ' ').toUpperCase()}
                          size="small"
                          variant="outlined"
                        />
                      </TableCell>
                      <TableCell>
                        {new Date(payment.paymentDate).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Chip
                          label={payment.status.toUpperCase()}
                          color={payment.status === 'completed' ? 'success' : 'default'}
                          size="small"
                        />
                      </TableCell>
                      <TableCell>
                        <Typography variant="body2" color="text.secondary">
                          {payment.reference}
                        </Typography>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </Box>
        )}

        {tabValue === 2 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 2 }}>Chart of Accounts</Typography>
            <Grid container spacing={2}>
              {accounts.map((account) => (
                <Grid item xs={12} sm={6} md={4} key={account.id}>
                  <Card>
                    <CardContent>
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                        <Typography variant="h6">{account.name}</Typography>
                        <Chip
                          label={account.type.toUpperCase()}
                          color={getAccountTypeColor(account.type) as any}
                          size="small"
                        />
                      </Box>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Code: {account.code}
                      </Typography>
                      <Typography variant="h5" color="primary.main" sx={{ fontWeight: 'bold' }}>
                        ₹{account.balance.toLocaleString()}
                      </Typography>
                      <Typography variant="caption" color="text.secondary">
                        {account.description}
                      </Typography>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}

        {tabValue === 3 && (
          <Box sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ mb: 3 }}>Financial Reports</Typography>
            
            {/* Revenue Chart */}
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2 }}>Revenue Trend</Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={revenueData}>
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="month" />
                      <YAxis />
                      <RechartsTooltip formatter={(value) => [`₹${value.toLocaleString()}`, '']} />
                      <Line type="monotone" dataKey="revenue" stroke="#2196f3" strokeWidth={2} />
                      <Line type="monotone" dataKey="expenses" stroke="#f44336" strokeWidth={2} />
                      <Line type="monotone" dataKey="profit" stroke="#4caf50" strokeWidth={2} />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>

            {/* Charts Row */}
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Invoice Status Distribution</Typography>
                    <Box sx={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={invoiceStatusData}
                            cx="50%"
                            cy="50%"
                            innerRadius={60}
                            outerRadius={80}
                            dataKey="value"
                          >
                            {invoiceStatusData.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Pie>
                          <RechartsTooltip />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Card>
                  <CardContent>
                    <Typography variant="h6" sx={{ mb: 2 }}>Payment Methods</Typography>
                    <Box sx={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={paymentMethodData}>
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis dataKey="name" />
                          <YAxis />
                          <RechartsTooltip formatter={(value) => [`${value}%`, '']} />
                          <Bar dataKey="value" fill="#2196f3" />
                        </BarChart>
                      </ResponsiveContainer>
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Box>
        )}
      </Paper>

      {/* Invoice Form Dialog */}
      <Dialog 
        open={invoiceDialogOpen} 
        onClose={() => setInvoiceDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          {isEditing ? 'Edit Invoice' : 'Create New Invoice'}
        </DialogTitle>
        <DialogContent>
          <Stepper activeStep={formStep} sx={{ mb: 3 }}>
            <Step>
              <StepLabel>Client & Dates</StepLabel>
            </Step>
            <Step>
              <StepLabel>Items & Pricing</StepLabel>
            </Step>
            <Step>
              <StepLabel>Terms & Notes</StepLabel>
            </Step>
          </Stepper>

          {formStep === 0 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <FormControl fullWidth>
                <InputLabel>Client</InputLabel>
                <Select
                  value={formData.clientId}
                  onChange={(e) => setFormData({ ...formData, clientId: e.target.value })}
                  label="Client"
                >
                  <MenuItem value="1">ABC Corp</MenuItem>
                  <MenuItem value="2">XYZ Ltd</MenuItem>
                  <MenuItem value="3">DEF Industries</MenuItem>
                </Select>
              </FormControl>
              
              <Box sx={{ display: 'flex', gap: 2 }}>
                <TextField
                  label="Issue Date"
                  type="date"
                  value={formData.issueDate}
                  onChange={(e) => setFormData({ ...formData, issueDate: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
                <TextField
                  label="Due Date"
                  type="date"
                  value={formData.dueDate}
                  onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                  fullWidth
                  InputLabelProps={{ shrink: true }}
                  required
                />
              </Box>
            </Box>
          )}

          {formStep === 1 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              {formData.items.map((item, index) => (
                <Box key={index} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                  <TextField
                    label="Description"
                    value={item.description}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].description = e.target.value;
                      setFormData({ ...formData, items: newItems });
                    }}
                    sx={{ flexGrow: 1 }}
                  />
                  <TextField
                    label="Qty"
                    type="number"
                    value={item.quantity}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].quantity = Number(e.target.value);
                      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
                      setFormData({ ...formData, items: newItems });
                    }}
                    sx={{ width: 100 }}
                  />
                  <TextField
                    label="Rate"
                    type="number"
                    value={item.rate}
                    onChange={(e) => {
                      const newItems = [...formData.items];
                      newItems[index].rate = Number(e.target.value);
                      newItems[index].amount = newItems[index].quantity * newItems[index].rate;
                      setFormData({ ...formData, items: newItems });
                    }}
                    sx={{ width: 120 }}
                  />
                  <TextField
                    label="Amount"
                    value={item.amount}
                    disabled
                    sx={{ width: 120 }}
                  />
                </Box>
              ))}
              
              <Button
                variant="outlined"
                startIcon={<AddIcon />}
                onClick={() => setFormData({
                  ...formData,
                  items: [...formData.items, { description: '', quantity: 1, rate: 0, amount: 0 }]
                })}
              >
                Add Item
              </Button>

              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <TextField
                  label="Tax (%)"
                  type="number"
                  value={formData.tax}
                  onChange={(e) => setFormData({ ...formData, tax: Number(e.target.value) })}
                  sx={{ width: 120 }}
                />
                <TextField
                  label="Total Amount"
                  value={formData.items.reduce((sum, item) => sum + item.amount, 0)}
                  disabled
                  sx={{ flexGrow: 1 }}
                />
              </Box>
            </Box>
          )}

          {formStep === 2 && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
              <TextField
                label="Terms & Conditions"
                value={formData.terms}
                onChange={(e) => setFormData({ ...formData, terms: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Notes"
                value={formData.notes}
                onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                fullWidth
                multiline
                rows={3}
              />
              <TextField
                label="Tags (comma-separated)"
                value={formData.tags.join(', ')}
                onChange={(e) => setFormData({ 
                  ...formData, 
                  tags: e.target.value.split(',').map(tag => tag.trim()).filter(tag => tag) 
                })}
                fullWidth
                placeholder="GST, Monthly, High Priority"
              />
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setInvoiceDialogOpen(false)}>
            Cancel
          </Button>
          {formStep > 0 && (
            <Button onClick={() => setFormStep(formStep - 1)}>
              Back
            </Button>
          )}
          {formStep < 2 ? (
            <Button variant="contained" onClick={() => setFormStep(formStep + 1)}>
              Next
            </Button>
          ) : (
            <Button variant="contained" onClick={() => {
              console.log('Saving invoice:', formData);
              setInvoiceDialogOpen(false);
            }}>
              {isEditing ? 'Update Invoice' : 'Create Invoice'}
            </Button>
          )}
        </DialogActions>
      </Dialog>

      {/* Invoice View Dialog */}
      <Dialog 
        open={viewDialogOpen} 
        onClose={() => setViewDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        <DialogTitle>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6">{selectedInvoice?.invoiceNumber}</Typography>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button
                size="small"
                startIcon={<EditIcon />}
                onClick={() => {
                  setViewDialogOpen(false);
                  handleEditInvoice(selectedInvoice!);
                }}
              >
                Edit
              </Button>
              <Button
                size="small"
                startIcon={<SendIcon />}
              >
                Send
              </Button>
              <Button
                size="small"
                startIcon={<DownloadIcon />}
              >
                Download
              </Button>
            </Box>
          </Box>
        </DialogTitle>
        <DialogContent>
          {selectedInvoice && (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
              {/* Invoice Header */}
              <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                <Chip
                  icon={getStatusIcon(selectedInvoice.status)}
                  label={selectedInvoice.status.toUpperCase()}
                  color={getStatusColor(selectedInvoice.status) as any}
                />
                <Chip
                  label={selectedInvoice.priority.toUpperCase()}
                  color={getPriorityColor(selectedInvoice.priority) as any}
                  size="small"
                  variant="outlined"
                />
              </Box>

              {/* Client Info */}
              <Box>
                <Typography variant="h6" gutterBottom>Bill To:</Typography>
                <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
                  {selectedInvoice.client.name}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedInvoice.client.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedInvoice.client.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {selectedInvoice.client.address}
                </Typography>
              </Box>

              {/* Invoice Items */}
              <Box>
                <Typography variant="h6" gutterBottom>Items:</Typography>
                <TableContainer>
                  <Table size="small">
                    <TableHead>
                      <TableRow>
                        <TableCell>Description</TableCell>
                        <TableCell>Qty</TableCell>
                        <TableCell>Rate</TableCell>
                        <TableCell>Amount</TableCell>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {selectedInvoice.items.map((item) => (
                        <TableRow key={item.id}>
                          <TableCell>{item.description}</TableCell>
                          <TableCell>{item.quantity}</TableCell>
                          <TableCell>₹{item.rate.toLocaleString()}</TableCell>
                          <TableCell>₹{item.amount.toLocaleString()}</TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </TableContainer>
              </Box>

              {/* Totals */}
              <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
                <Box sx={{ minWidth: 200 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Subtotal:</Typography>
                    <Typography>₹{selectedInvoice.amount.toLocaleString()}</Typography>
                  </Box>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography>Tax:</Typography>
                    <Typography>₹{selectedInvoice.tax.toLocaleString()}</Typography>
                  </Box>
                  <Divider sx={{ my: 1 }} />
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography variant="h6">Total:</Typography>
                    <Typography variant="h6">₹{selectedInvoice.total.toLocaleString()}</Typography>
                  </Box>
                </Box>
              </Box>

              {/* Notes and Terms */}
              {selectedInvoice.notes && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Notes:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedInvoice.notes}
                  </Typography>
                </Box>
              )}

              {selectedInvoice.terms && (
                <Box>
                  <Typography variant="subtitle2" gutterBottom>Terms & Conditions:</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {selectedInvoice.terms}
                  </Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setViewDialogOpen(false)}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Quick Actions FAB */}
      <Fab
        color="primary"
        sx={{ position: 'fixed', bottom: 16, right: 16 }}
        onClick={handleCreateInvoice}
      >
        <AddIcon />
      </Fab>
    </Box>
  );
};

export default Financial;
