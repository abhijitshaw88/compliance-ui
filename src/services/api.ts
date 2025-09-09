import axios from 'axios';

const API_BASE_URL = 'https://compliance-server-ly2j.onrender.com/api/v1';

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle auth errors
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// Auth API
export const authApi = {
  login: (credentials: { username: string; password: string }) =>
    api.post('/auth/login-json', credentials).then((res) => res.data),
  
  getCurrentUser: () =>
    api.get('/auth/me').then((res) => res.data),
  
  register: (userData: any) =>
    api.post('/auth/register', userData).then((res) => res.data),
};

// Users API
export const usersApi = {
  getUsers: (params?: any) =>
    api.get('/users', { params }).then((res) => res.data),
  
  getUser: (id: number) =>
    api.get(`/users/${id}`).then((res) => res.data),
  
  createUser: (userData: any) =>
    api.post('/users', userData).then((res) => res.data),
  
  updateUser: (id: number, userData: any) =>
    api.put(`/users/${id}`, userData).then((res) => res.data),
  
  deleteUser: (id: number) =>
    api.delete(`/users/${id}`).then((res) => res.data),
  
  getPermissions: () =>
    api.get('/users/permissions').then((res) => res.data),
  
  getRolePermissions: () =>
    api.get('/users/role-permissions').then((res) => res.data),
};

// Clients API
export const clientsApi = {
  getClients: (params?: any) =>
    api.get('/clients', { params }).then((res) => res.data),
  
  getClient: (id: number) =>
    api.get(`/clients/${id}`).then((res) => res.data),
  
  createClient: (clientData: any) =>
    api.post('/clients', clientData).then((res) => res.data),
  
  updateClient: (id: number, clientData: any) =>
    api.put(`/clients/${id}`, clientData).then((res) => res.data),
  
  deleteClient: (id: number) =>
    api.delete(`/clients/${id}`).then((res) => res.data),
  
  getClientProjects: (id: number) =>
    api.get(`/clients/${id}/projects`).then((res) => res.data),
  
  getClientInvoices: (id: number) =>
    api.get(`/clients/${id}/invoices`).then((res) => res.data),
};

// Financial API
export const financialApi = {
  getInvoices: (params?: any) =>
    api.get('/financial/invoices', { params }).then((res) => res.data),
  
  getInvoice: (id: number) =>
    api.get(`/financial/invoices/${id}`).then((res) => res.data),
  
  createInvoice: (invoiceData: any) =>
    api.post('/financial/invoices', invoiceData).then((res) => res.data),
  
  updateInvoice: (id: number, invoiceData: any) =>
    api.put(`/financial/invoices/${id}`, invoiceData).then((res) => res.data),
  
  deleteInvoice: (id: number) =>
    api.delete(`/financial/invoices/${id}`).then((res) => res.data),
  
  getPayments: (params?: any) =>
    api.get('/financial/payments', { params }).then((res) => res.data),
  
  createPayment: (paymentData: any) =>
    api.post('/financial/payments', paymentData).then((res) => res.data),
  
  getChartOfAccounts: (params?: any) =>
    api.get('/financial/chart-of-accounts', { params }).then((res) => res.data),
  
  createChartOfAccount: (accountData: any) =>
    api.post('/financial/chart-of-accounts', accountData).then((res) => res.data),
  
  getGeneralLedger: (params?: any) =>
    api.get('/financial/general-ledger', { params }).then((res) => res.data),
  
  createGeneralLedgerEntry: (entryData: any) =>
    api.post('/financial/general-ledger', entryData).then((res) => res.data),
  
  getBankReconciliations: (params?: any) =>
    api.get('/financial/bank-reconciliations', { params }).then((res) => res.data),
  
  createBankReconciliation: (reconciliationData: any) =>
    api.post('/financial/bank-reconciliations', reconciliationData).then((res) => res.data),
};

// Compliance API
export const complianceApi = {
  getProjects: (params?: any) =>
    api.get('/compliance/projects', { params }).then((res) => res.data),
  
  getProject: (id: number) =>
    api.get(`/compliance/projects/${id}`).then((res) => res.data),
  
  createProject: (projectData: any) =>
    api.post('/compliance/projects', projectData).then((res) => res.data),
  
  getTasks: (params?: any) =>
    api.get('/compliance/tasks', { params }).then((res) => res.data),
  
  getTask: (id: number) =>
    api.get(`/compliance/tasks/${id}`).then((res) => res.data),
  
  createTask: (taskData: any) =>
    api.post('/compliance/tasks', taskData).then((res) => res.data),
  
  updateTask: (id: number, taskData: any) =>
    api.put(`/compliance/tasks/${id}`, taskData).then((res) => res.data),
  
  getCompliances: (params?: any) =>
    api.get('/compliance/compliances', { params }).then((res) => res.data),
  
  getCompliance: (id: number) =>
    api.get(`/compliance/compliances/${id}`).then((res) => res.data),
  
  createCompliance: (complianceData: any) =>
    api.post('/compliance/compliances', complianceData).then((res) => res.data),
  
  getGstReturns: (params?: any) =>
    api.get('/compliance/gst-returns', { params }).then((res) => res.data),
  
  getTdsReturns: (params?: any) =>
    api.get('/compliance/tds-returns', { params }).then((res) => res.data),
  
  getTimeEntries: (params?: any) =>
    api.get('/compliance/time-entries', { params }).then((res) => res.data),
  
  createTimeEntry: (timeEntryData: any) =>
    api.post('/compliance/time-entries', timeEntryData).then((res) => res.data),
};

// AI API
export const aiApi = {
  extractDocumentData: (file: File, extractionType: string) => {
    const formData = new FormData();
    formData.append('file', file);
    formData.append('extraction_type', extractionType);
    
    return api.post('/ai/document-extraction', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  },
  
  batchProcessDocuments: (files: File[], extractionType: string) => {
    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));
    formData.append('extraction_type', extractionType);
    
    return api.post('/ai/document-batch-processing', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }).then((res) => res.data);
  },
  
  gstReconciliation: (clientId: number, period: string) =>
    api.post('/ai/gst-reconciliation', { client_id: clientId, period }).then((res) => res.data),
  
  tdsReconciliation: (clientId: number, quarter: string) =>
    api.post('/ai/tds-reconciliation', { client_id: clientId, quarter }).then((res) => res.data),
  
  complianceMonitoring: (clientId?: number, complianceType?: string) =>
    api.post('/ai/compliance-monitoring', { client_id: clientId, compliance_type: complianceType }).then((res) => res.data),
  
  getAiAccuracy: () =>
    api.get('/ai/ai-accuracy').then((res) => res.data),
  
  smartCategorization: (transactionData: any) =>
    api.post('/ai/smart-categorization', transactionData).then((res) => res.data),
  
  anomalyDetection: (clientId: number, dataType: string = 'financial') =>
    api.post('/ai/anomaly-detection', { client_id: clientId, data_type: dataType }).then((res) => res.data),
};

export default api;
