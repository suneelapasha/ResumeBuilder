import React, { ReactInstance, useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../app/store';
import { Button, Box, Typography, Grid, Divider, Paper } from '@mui/material';
import { useReactToPrint } from 'react-to-print';
import styled from 'styled-components';
import { useLocation } from 'react-router-dom';
import { getFile } from '../indexedDB';


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

const ParentResumeModel = styled(Paper)`
  && {
    margin: auto;
    margin-top: 5%;
    padding: 40px;
    max-width: 1000px;
  }
`;

const ParentSkillSection = styled.div`
  text-align: left;
`;

const Header = styled.div`
  text-align: left;
`;

const Content = styled.div`
  text-align: left;
  margin: 8px 3px;
`;

const ResumeSection = styled.div<TemplateSettings>`
  font-family: ${(props: TemplateSettings) => props.fontFamily}, sans-serif;

  h4, h5, h6, p, subtitle1 {
    font-family: ${(props: TemplateSettings) => props.fontFamily}, sans-serif;
    font-size: ${(props: TemplateSettings) => props.resumeFontSize}px;
  }

  h2 {
    font-family: ${(props: TemplateSettings) => props.fontFamily}, sans-serif;
    color: ${(props: TemplateSettings) => props.headingFontColor};
    font-size: ${(props: TemplateSettings) => props.headingFontSize}px;
  }
`;

const HeaderSection = styled.div<HeaderSectionProps>`
  background-color: ${(props: HeaderSectionProps) => props.headerColor};
  padding: 20px;

`;

const FooterSection = styled.div<FooterSectionProps>`
  background-color: ${(props: FooterSectionProps) => props.footerColor};
  padding: 20px;

`;

const WatermarkImage = styled.img`
position: absolute;
top: 50%;
left: 50%;
transform: translate(-50%, -50%);
opacity: 0.2;
width: 10%;
height: 10%;
`;

const ResumePreview: React.FC<{ onEdit: () => void }> = ({ onEdit }) => {
  const formState = useSelector((state: RootState) => state.form);
  const componentRef = useRef<ReactInstance | null>(null);
  
  const location = useLocation();
  
  const templateSettings: TemplateSettings = location.state?.templateSettings;
  const [watermark, setWatermark] = useState<string | null>(null);

  useEffect(()=> {
    console.log(location.state?.templateSettings)
    },[location])

    useEffect(() => {
        const fetchFile = async () => {
          const file = await getFile('watermarkFile');
          if (file) {
            const fileURL = URL.createObjectURL(file);
            setWatermark(fileURL);
          }
        };
    
        fetchFile();
      }, []);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current || null,
  });

  return (
        <Box sx={{ p: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Button variant="contained" onClick={onEdit}>
                    Edit
                    </Button>
                    {templateSettings && (
                    <Box>
                    <Typography variant="h5" component="h2">{templateSettings.templateName}</Typography>
                    </Box>
                    )}
                    <Button variant="contained" onClick={handlePrint}>
                    Download
                    </Button>

                 
            </Box>
            <ParentResumeModel elevation={1} ref={componentRef}>
                <ResumeSection fontFamily={templateSettings?.fontFamily} resumeFontSize={templateSettings?.resumeFontSize} headingFontSize={templateSettings?.headingFontSize}
                headingFontColor={templateSettings?.headingFontColor} headerSettings={templateSettings?.headerSettings} footerSettings={templateSettings?.footerSettings}
                templateName={templateSettings.templateName} watermark={templateSettings?.watermark} watermarkFile={templateSettings?.watermarkFile}>
                <Box>

                {watermark&& (
                    <WatermarkImage src={watermark} alt="Watermark" />
                )}
                <Grid container spacing={3}>

                    {/* Personal Information  */}
                    <Grid xs={12}>
                        <HeaderSection headerColor={templateSettings?.headerSettings.headerColor}>
                                <Typography variant="h4">
                                    {`${formState.firstName} ${formState.lastName}`}
                                </Typography>
                                <Typography variant="h6">{formState.position}</Typography>
                                <Typography variant="subtitle1">LinkedIn: {formState.linkedin}</Typography> 
                        </HeaderSection>
                    </Grid>
                    

                    {/* Summary */}
                    <Grid xs={12} p={4}>
                        <Box sx={{width: '100%', textAlign: 'justify' }}>
                            <Typography variant="subtitle1"> {formState.description}</Typography>
                        </Box>
                    </Grid>
                    

                    {/* Main center of Resume */}
                    <Grid item xs={12}>
                        <Grid container spacing={3}>
                            
                             {/* Experiences */}
                             <Grid item xs={12}>
                            <Header>
                                <Typography variant="h5" component="h2">
                                    Experiences
                                </Typography>
                            </Header>
                            <Divider />
                            {formState.experiences && formState.experiences.length > 0 &&
                                formState.experiences.map((instance, index) => (
                                <Content key={index}>
                                    <Typography variant="h6" component="h3">
                                    {instance.title}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                                        <Typography variant="h6" >{instance.company}</Typography>
                                        <Typography variant="body2">{instance?.startDate?.toDateString()}</Typography>
                                        <Typography variant="body2">{instance?.endDate?.toDateString()}</Typography>
                                    </Box>
                                    <Typography variant="body2">{instance.description}</Typography>
                                </Content>
                                ))}
                            </Grid>

                            {/* Skills */}
                            <Grid item xs={3}>
                            <ParentSkillSection>
                                <Typography variant="h5" component="h2">
                                Skills
                                </Typography>
                                <Divider />
                                {formState.skills && formState.skills.length > 0 &&
                                formState.skills.map((skill, index) => (
                                    <Box key={index} sx={{ mt: 1 }}>
                                        <Typography variant="subtitle1">{skill.name}</Typography>
                                        <Typography variant="body2">{`Score: ${skill.score}`}</Typography>
                                    </Box>
                                    ))}
                            </ParentSkillSection>
                            </Grid>

                            {/* Education */}
                            <Grid item xs={9}>
                            <Header>
                                <Typography variant="h5" component="h2">
                                Education
                                </Typography>
                            </Header>
                            <Divider />
                            {formState.education && formState.education.length > 0 &&
                                formState.education.map((instance, index) => (
                                <Content key={index}>
                                    <Typography variant="h6" component="h3">
                                    {instance.university}
                                    </Typography>
                                    <Typography variant="body2">Graduation Year: {instance?.endDate?.toDateString()}</Typography>
                                    <Typography variant="body2">{instance.degree}</Typography>
                                </Content>
                                ))}
                            </Grid>
 
                            {/* Certificates */}
                            <Grid item xs={12}>
                            <Header>
                                <Typography variant="h5" component="h2">
                                    Certificates
                                </Typography>
                            </Header>
                            <Divider />
                            {formState.certifications && formState.certifications.length > 0 &&
                                formState.certifications.map((instance, index) => (
                                <Content key={index}>
                                    <Typography variant="h6" component="h3">
                                    {instance.name}
                                    </Typography>
                                    <Typography variant="body2">{instance?.date?.toDateString()}</Typography>
                                </Content>
                                ))}
                            </Grid>

                            
                        </Grid>
                    </Grid>

                    {/* Footer  */}
                    <Grid xs={12}>
                        <FooterSection footerColor={templateSettings?.footerSettings.footerColor}>
                            <Typography variant="subtitle1">Phone Number: {formState.phoneNumber}</Typography> 
                            <Typography variant="subtitle1">Email: {formState.email}</Typography> 
                            <Typography variant="subtitle1">Address: {formState.address}</Typography>
                        </FooterSection>
                    </Grid>

                </Grid>
                </Box>
                </ResumeSection>
            </ParentResumeModel>
         
        </Box>

  );
};

export default ResumePreview;
