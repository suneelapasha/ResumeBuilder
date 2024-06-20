import React, { useState } from 'react';
import { Stepper, Step, StepLabel, Box, Button,  useMediaQuery, useTheme  } from '@mui/material';
import PersonalInfoForm from './PersonalInfoForm';
import ExperiencesForm from './ExperiencesForm';
import EducationForm from './EducationForm';
import CertificationsForm from './CertificationsForm';
import SkillsForm from './SkillsForm';
import SummaryForm from './SummaryForm';
import ResumePreview from './ResumePreview';
import styled from 'styled-components';

const steps: string[] = [
  'Personal Information',
  'Experiences',
  'Education',
  'Certifications',
  'Skills',
  'Summary'
];

const CenteredContainer = styled(Box)`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  padding: 16px;
  box-sizing: border-box;
`;

const MultiStepForm: React.FC = () => {
  const [activeStep, setActiveStep] = useState<number>(0);
  const [showPreview, setShowPreview] = useState<boolean>(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handleNext = (): void => {
    setActiveStep(prevActiveStep => prevActiveStep + 1);
  };

  const handleBack = (): void => {
    setActiveStep(prevActiveStep => prevActiveStep - 1);
  };

  const handleSubmit = (): void => {
    setShowPreview(true);
  };

  const getStepContent = (step: number): React.ReactNode => {
    switch (step) {
      case 0:
        return <PersonalInfoForm handleNext={handleNext} />;
      case 1:
        return <ExperiencesForm handleNext={handleNext} handleBack={handleBack} />;
      case 2:
        return <EducationForm handleNext={handleNext} handleBack={handleBack} />;
      case 3:
        return <CertificationsForm handleNext={handleNext} handleBack={handleBack} />;
      case 4:
        return <SkillsForm handleNext={handleNext} handleBack={handleBack} />;
      case 5:
        return <SummaryForm handleBack={handleBack} handleSubmit={handleSubmit} />;
      default:
        return 'Unknown step';
    }
  };

  return (
    <CenteredContainer>
    <Box sx={{ width: '100%',  maxWidth: { xs: '100%', sm: '50%' }}}>
      
      {!showPreview && (
      <>
        <Stepper activeStep={activeStep} orientation={isMobile ? 'vertical' : 'horizontal'} alternativeLabel={!isMobile}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box sx={{ mt: 2 }}>
          {getStepContent(activeStep)}
        </Box>
      </>
      )}

      {showPreview &&  <ResumePreview  onEdit={() => setShowPreview(false)} />}

    </Box>
    </CenteredContainer>
  );
};

export default MultiStepForm;
