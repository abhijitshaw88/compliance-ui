import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
} from '@mui/material';
import {
  Assessment as AssessmentIcon,
  Download as DownloadIcon,
} from '@mui/icons-material';

const Reports: React.FC = () => {
  const reportTypes = [
    { name: 'Financial Reports', description: 'P&L, Balance Sheet, Cash Flow' },
    { name: 'Tax Reports', description: 'GST, TDS, ITR Reports' },
    { name: 'Compliance Reports', description: 'Regulatory compliance status' },
    { name: 'Client Reports', description: 'Client-wise performance analysis' },
  ];

  return (
    <Box>
      <Typography variant="h4" component="h1" gutterBottom>
        Reports & Analytics
      </Typography>
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        Generate comprehensive reports and analytics for your practice.
      </Typography>

      <Grid container spacing={3}>
        {reportTypes.map((report, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <AssessmentIcon sx={{ mr: 1, color: 'primary.main' }} />
                  <Typography variant="h6">{report.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {report.description}
                </Typography>
                <Button
                  variant="outlined"
                  startIcon={<DownloadIcon />}
                  fullWidth
                >
                  Generate Report
                </Button>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default Reports;
