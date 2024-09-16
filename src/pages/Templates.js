import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Box,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const templates = [
  {
    id: 1,
    name: 'E-commerce Dashboard',
    description: 'A complete dashboard for managing an online store',
    image: '/images/ecommerce-template.jpg',
  },
  {
    id: 2,
    name: 'Project Management',
    description: 'Kanban board and task management system',
    image: '/images/project-management-template.jpg',
  },
  {
    id: 3,
    name: 'Customer CRM',
    description: 'Customer relationship management system',
    image: '/images/crm-template.jpg',
  },
  {
    id: 4,
    name: 'Analytics Dashboard',
    description: 'Data visualization and analytics platform',
    image: '/images/analytics-template.jpg',
  },
];

const Templates = () => {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [projectName, setProjectName] = useState('');
  const navigate = useNavigate();
  const { currentUser } = useAuth();

  const handleTemplateClick = (template) => {
    setSelectedTemplate(template);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setProjectName('');
  };

  const handleUseTemplate = () => {
    if (selectedTemplate && projectName) {
      navigate(`/builder?template=${selectedTemplate.id}&name=${encodeURIComponent(projectName)}`);
    }
  };

  useEffect(() => {
    if (!currentUser) {
      navigate('/login');
    }
  }, [currentUser, navigate]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Pre-built Templates
      </Typography>
      <Grid container spacing={4}>
        {templates.map((template) => (
          <Grid item key={template.id} xs={12} sm={6} md={4}>
            <Card
              sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}
            >
              <CardMedia
                component="img"
                sx={{ height: 200 }}
                image={template.image}
                alt={template.name}
              />
              <CardContent sx={{ flexGrow: 1 }}>
                <Typography gutterBottom variant="h5" component="h2">
                  {template.name}
                </Typography>
                <Typography>{template.description}</Typography>
              </CardContent>
              <Button
                size="small"
                color="primary"
                onClick={() => handleTemplateClick(template)}
                sx={{ m: 2 }}
              >
                Use Template
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>
      <Dialog open={openDialog} onClose={handleCloseDialog}>
        <DialogTitle>Create New Project</DialogTitle>
        <DialogContent>
          <Typography gutterBottom>
            You are about to create a new project based on the {selectedTemplate?.name} template.
          </Typography>
          <TextField
            autoFocus
            margin="dense"
            id="projectName"
            label="Project Name"
            type="text"
            fullWidth
            variant="outlined"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog}>Cancel</Button>
          <Button onClick={handleUseTemplate} color="primary" disabled={!projectName}>
            Create Project
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default Templates;