import React, { useState, useEffect, ChangeEvent } from 'react';
import { Button, Container, Grid, TextField, Typography, Box, Select, MenuItem, InputLabel, FormControl, SelectChangeEvent } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { ChromePicker } from 'react-color';
import { setFile } from '../indexedDB';
import styled from 'styled-components';

interface HeaderSectionProps {
    headerColor: string;
}

interface FooterSectionProps {
    footerColor: string;
}

interface TemplateSettings {
  templateName: string;
  fontFamily: string;

  resumeFontSize: number;
  headingFontSize: number;

  headingFontColor: string;

  headerSettings: HeaderSectionProps; 
  footerSettings: FooterSectionProps; 
  watermark: string;
  watermarkFile: File | null;
}

const fonts = [
    'Arial', 
    'Helvetica', 
    'Times New Roman', 
    'Courier New', 
    'Verdana', 
    'Georgia', 
    'Palatino', 
    'Garamond', 
    'Bookman', 
    'Trebuchet MS', 
    'Comic Sans MS', 
    'Impact',
    'Roboto',
    'Open Sans',
    'Lato',
    'Montserrat',
    'Source Sans Pro',
    'Raleway',
    'Poppins',
    'Nunito',
    'Merriweather',
    'Playfair Display',
    'Oswald',
    'Ubuntu'
  ];

const CreateTemplatePage: React.FC = () => {

  const initialTemplateSettings: TemplateSettings = {
    templateName: 'Template',
    fontFamily: 'Arial',
    resumeFontSize: 16,
    headingFontSize: 20,
    headingFontColor: '#000000',
    headerSettings: {headerColor: '#abdbe3'}, 
    footerSettings: {footerColor: '#abdbe3'}, 
    watermark: '',
    watermarkFile: null,
  };

  const [templateSettings, setTemplateSettings] = useState<TemplateSettings>(initialTemplateSettings);
  const navigate = useNavigate();

  useEffect(() => {
    const savedTemplateSettings = localStorage.getItem('resumeTemplateSettings');
    if (savedTemplateSettings) {
      setTemplateSettings(JSON.parse(savedTemplateSettings));
    }
  }, []);

  const handleSaveTemplate = () => {
    const savedTemplates = JSON.parse(localStorage.getItem('resumeTemplates') || '[]');
    const updatedTemplates = [...savedTemplates, templateSettings];
    localStorage.setItem('resumeTemplates', JSON.stringify(updatedTemplates));
      navigate('/');
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | SelectChangeEvent<string>) => {
    const { name, value } = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement;
    setTemplateSettings((prevSettings) => ({
      ...prevSettings,
      [name]: name === 'resumeFontSize' || name === 'headingFontSize' ? +value : value,
    }));
  };

  const handleColorChange = (color: any, field: string) => {
    if (field === 'headingFontColor') {
      setTemplateSettings((prevSettings) => ({
        ...prevSettings,
        [field]: color.hex,
      }));
    } else if (field === 'headerColor') {
      setTemplateSettings((prevSettings) => ({
        ...prevSettings,
        headerSettings: { headerColor: color.hex },
      }));
    } else if (field === 'footerColor') {
      setTemplateSettings((prevSettings) => ({
        ...prevSettings,
        footerSettings: { footerColor: color.hex },
      }));
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (file) {
      await setFile('watermarkFile', file);
      const fileURL = URL.createObjectURL(file);

      setTemplateSettings((prevSettings) => ({
        ...prevSettings,
        watermarkFile: file,
        watermark: fileURL,
      }));
    }
  };

  

  return (
    <Container sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '100vh', textAlign: 'center'}}>
      <Typography variant="h2" align="center" gutterBottom>
        Template Settings
      </Typography>
      <Box display="flex" flexDirection="column" alignItems="center" gap={2} width="100%" maxWidth="sm">
        <TextField
          label="Template Name"
          name="templateName"
          value={templateSettings.templateName}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />
        <TextField
          label="Resume Font Size"
          type="number"
          name="resumeFontSize"
          value={templateSettings.resumeFontSize}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <TextField
          label="Heading Font Size"
          type="number"
          name="headingFontSize"
          value={templateSettings.headingFontSize}
          onChange={handleChange}
          fullWidth
          margin="normal"
        />

        <FormControl fullWidth margin="normal">
            <InputLabel id="font-label">Font Family</InputLabel>
            <Select
            labelId="font-label"
            name="fontFamily"
            value={templateSettings.fontFamily}
            onChange={handleChange}
            style={{ textAlign: 'left' }}
            >
            {fonts.map((font) => (
                <MenuItem key={font} value={font}>
                {font}
                </MenuItem>
            ))}
            </Select>
        </FormControl>

        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
            <Typography variant="subtitle1">Heading Font Color</Typography>
            </Grid>
            <Grid item xs={6}>
            <ChromePicker
                color={templateSettings.headingFontColor}
                onChangeComplete={(color : any) => handleColorChange(color, 'headingFontColor')}
            />
            </Grid>
      </Grid>

    
        <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
            <Typography variant="subtitle1">Heading background Color</Typography>
            </Grid>
            <Grid item xs={6}>
            <ChromePicker
                color={templateSettings.headerSettings.headerColor}
                onChangeComplete={(color : any) => handleColorChange(color, 'headerColor')}
            />
            </Grid>
        </Grid>

         <Grid container spacing={2} alignItems="center">
            <Grid item xs={6}>
            <Typography variant="subtitle1">Footer background Color</Typography>
            </Grid>
            <Grid item xs={6}>
            <ChromePicker
                color={templateSettings.footerSettings.footerColor}
                onChangeComplete={(color : any) => handleColorChange(color, 'footerColor')}
            />
            </Grid>
          </Grid>
          <Box sx={{Width: '100%'}}>
            <Typography variant="h4" style={{ fontWeight: 'bold', textAlign: 'left' }}>Watermark</Typography>
            <TextField
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                fullWidth
                margin="normal"
            />
         </Box>

        <Button variant="contained" color="primary" onClick={handleSaveTemplate}>
          Save Template
        </Button>
      </Box>
    </Container>
  );
};

export default CreateTemplatePage;
