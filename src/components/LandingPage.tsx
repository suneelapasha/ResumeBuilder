import React, {useState, useEffect} from 'react';
import { Button, Container, Typography, Box, Divider, List, ListItem, ListItemText } from '@mui/material';
import { useNavigate } from 'react-router-dom';

interface HeaderSectionProps {
    headerColor: string;
}

interface FooterSectionProps {
    footerColor: string;
}
interface TemplateSettings {
    templateName: string;  
    fontSize: number;
    fontFamily: string;
    colorScheme: string;
    headerSettings: HeaderSectionProps; 
    footerSettings: FooterSectionProps; 
    watermark: string;
  }

  
const LandingPage: React.FC = () => {
  const navigate = useNavigate();
  const [templates, setTemplates] = useState<TemplateSettings[]>([]);

  const handleCreateTemplate = () => {
    navigate('/create-template');
  };

  const handleTemplateClick = (template: TemplateSettings) => {
    navigate('/resume-builder', { state: { templateSettings: template } });
  };

  useEffect(() => {
    const savedTemplates = JSON.parse(localStorage.getItem('resumeTemplates') || '[]');
    setTemplates(savedTemplates);
  }, []);
  return (

    <Container maxWidth="md" sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center' }}>
      <Typography variant="h2" align="center" gutterBottom>
        Dashboard
      </Typography>
      <Container sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 2 }}>
        <Button variant="contained" color="primary" onClick={handleCreateTemplate}>
          Create Template
        </Button>
        <Divider orientation="vertical" flexItem />
        <Box>
        <Typography variant="h4">List of Templates</Typography>
        <List>
          {templates.map((template, index) => (
            <ListItem key={index} button onClick={() => handleTemplateClick(template)}>
              <ListItemText primary={template.templateName} />
            </ListItem>
          ))}
        </List>
        </Box>
      </Container>
    </Container>
  );
};

export default LandingPage;
