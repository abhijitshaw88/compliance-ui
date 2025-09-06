import React, { useState } from 'react';
import {
  Box,
  Typography,
  Paper,
  Grid,
  Card,
  CardContent,
  Button,
  TextField,
  Chip,
  LinearProgress,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
} from '@mui/material';
import {
  CloudUpload as CloudUploadIcon,
  Description as DescriptionIcon,
  CheckCircle as CheckCircleIcon,
  Warning as WarningIcon,
  Info as InfoIcon,
} from '@mui/icons-material';

const DataEntry: React.FC = () => {
  const [dragActive, setDragActive] = useState(false);
  const [processingStatus, setProcessingStatus] = useState('idle');
  const [aiAccuracy, setAiAccuracy] = useState(95);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleFiles(e.dataTransfer.files);
    }
  };

  const handleFiles = (files: FileList) => {
    setProcessingStatus('processing');
    // Simulate processing
    setTimeout(() => {
      setProcessingStatus('completed');
    }, 3000);
  };

  const documentTypes = [
    'Invoice',
    'Bank Statement',
    'GST Return',
    'Receipt',
    'ITR Form 16',
  ];

  const extractedData = [
    { field: 'Invoice No', value: 'INV-2023-001', confidence: 98, status: 'verified' },
    { field: 'Supplier GSTIN', value: '27ABOE1234F5Z9', confidence: 95, status: 'verified' },
    { field: 'Customer GSTIN', value: '29ABCDE1234F1Z5', confidence: 73, status: 'pending' },
    { field: 'Taxable Amount', value: '₹15,000.00', confidence: 72, status: 'verified' },
    { field: 'Total Amount', value: '₹17,700.00', confidence: 0, status: 'pending' },
  ];

  const recentDocuments = [
    { name: 'INV-2023-001', status: 'Approved', type: 'Invoice' },
    { name: 'GST-RET-2023-05', status: 'Pending Approval', type: 'GST Return' },
    { name: 'ITR-2022-001', status: 'Completed', type: 'ITR' },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'verified': return <CheckCircleIcon color="success" />;
      case 'pending': return <WarningIcon color="warning" />;
      default: return <InfoIcon color="info" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'verified': return 'success';
      case 'pending': return 'warning';
      default: return 'default';
    }
  };

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        AI-Powered Data Entry
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Upload documents and let AI extract data automatically.
      </Typography>

      <Grid container spacing={3}>
        {/* Document Upload */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Document Upload
            </Typography>
            <Box
              sx={{
                border: '2px dashed',
                borderColor: dragActive ? 'primary.main' : 'grey.300',
                borderRadius: 2,
                p: 4,
                textAlign: 'center',
                backgroundColor: dragActive ? 'primary.50' : 'grey.50',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                height: 200,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
              }}
              onDragEnter={handleDrag}
              onDragLeave={handleDrag}
              onDragOver={handleDrag}
              onDrop={handleDrop}
            >
              <CloudUploadIcon sx={{ fontSize: 48, color: 'primary.main', mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Drag & Drop Documents Here
              </Typography>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                or click to upload
              </Typography>
              <Button variant="contained" sx={{ mt: 2 }}>
                Choose Files
              </Button>
            </Box>

            <Typography variant="subtitle2" sx={{ mt: 3, mb: 1 }}>
              Supported Document Types:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {documentTypes.map((type) => (
                <Chip key={type} label={type} size="small" />
              ))}
            </Box>
          </Paper>
        </Grid>

        {/* Document Preview */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              Document Preview
            </Typography>
            <Box
              sx={{
                border: '1px solid',
                borderColor: 'grey.300',
                borderRadius: 1,
                p: 2,
                height: 250,
                backgroundColor: 'grey.50',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <DescriptionIcon sx={{ fontSize: 64, color: 'grey.400' }} />
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              GST Invoice Preview
            </Typography>
          </Paper>
        </Grid>

        {/* AI Accuracy */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: 400 }}>
            <Typography variant="h6" gutterBottom>
              AI Accuracy
            </Typography>
            <Box sx={{ textAlign: 'center', mb: 3 }}>
              <Typography variant="h2" color="success.main">
                {aiAccuracy}%
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Learning Progress: +0.2% today
              </Typography>
            </Box>
            
            <Typography variant="subtitle2" gutterBottom>
              Processing Status:
            </Typography>
            {processingStatus === 'processing' && (
              <Box>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  Extracting Data (75%)
                </Typography>
                <LinearProgress variant="determinate" value={75} />
              </Box>
            )}
            {processingStatus === 'completed' && (
              <Typography variant="body2" color="success.main">
                ✓ Processing Complete
              </Typography>
            )}
            {processingStatus === 'idle' && (
              <Typography variant="body2" color="text.secondary">
                Ready to process documents
              </Typography>
            )}
          </Paper>
        </Grid>

        {/* Extracted Data */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Extracted Data
            </Typography>
            <List>
              {extractedData.map((item, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      {getStatusIcon(item.status)}
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2">{item.field}</Typography>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" color="text.secondary">
                              {item.confidence}%
                            </Typography>
                            <Chip
                              label={item.status}
                              color={getStatusColor(item.status) as any}
                              size="small"
                            />
                          </Box>
                        </Box>
                      }
                      secondary={item.value}
                    />
                  </ListItem>
                  {index < extractedData.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
            <Button variant="outlined" fullWidth sx={{ mt: 2 }}>
              Manual Edit
            </Button>
          </Paper>
        </Grid>

        {/* Recent Documents */}
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Recently Processed Documents
            </Typography>
            <List>
              {recentDocuments.map((doc, index) => (
                <React.Fragment key={index}>
                  <ListItem>
                    <ListItemIcon>
                      <DescriptionIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={doc.name}
                      secondary={
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Typography variant="body2" color="text.secondary">
                            {doc.type}
                          </Typography>
                          <Chip
                            label={doc.status}
                            color={getStatusColor(doc.status) as any}
                            size="small"
                          />
                        </Box>
                      }
                    />
                  </ListItem>
                  {index < recentDocuments.length - 1 && <Divider />}
                </React.Fragment>
              ))}
            </List>
          </Paper>
        </Grid>

        {/* Action Buttons */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
              <Button variant="outlined" size="large">
                Manual Correction
              </Button>
              <Button variant="contained" size="large">
                Approve & Post
              </Button>
              <Button variant="outlined" size="large">
                Batch Process
              </Button>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default DataEntry;
