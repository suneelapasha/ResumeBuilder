import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { updateForm } from '../features/form/formSlice';
import { AppDispatch, RootState } from '../app/store';
import { RemoveCircleOutline } from '@mui/icons-material';
import styled from 'styled-components';

interface Props {
  handleNext: () => void;
  handleBack: () => void;
}

const StyledIconButton = styled(IconButton)`
  &:hover {
    background-color: transparent !important;
    color:  #535bf2;
  },
  &:focus {
    outline: none !important;
  }
`;


const CertificationsForm: React.FC<Props> = ({ handleNext, handleBack }) => {
  const dispatch: AppDispatch = useDispatch();
  const certifications = useSelector((state: RootState) => state.form.certifications);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newCertifications = [...certifications];
    newCertifications[index] = { ...newCertifications[index], [name]: value };
    dispatch(updateForm({ certifications: newCertifications }));
  };

  const handleDateChange = (index: number, name: string, date: Date | null) => {
    const newCertifications = [...certifications];
    newCertifications[index] = { ...newCertifications[index], [name]: date };
    dispatch(updateForm({ certifications: newCertifications }));
  };


  const handleAddCertification = () => {
    const newCertifications = [...certifications, { name: '', date: null }];
    dispatch(updateForm({ certifications: newCertifications }));
  };

  const handleRemoveCertification = (index: number) => {
    const newCertifications = certifications.filter((_, i) => i !== index);
    dispatch(updateForm({ certifications: newCertifications }));
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
       <LocalizationProvider dateAdapter={AdapterDateFns}>
      {certifications.map((cert, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="name" label="Certification Name" value={cert.name} onChange={(e) => handleChange(index, e)} />
          <DatePicker
            label="Date"
            value={cert.date}
            onChange={(date) => handleDateChange(index, 'date', date)}
          />
          <StyledIconButton onClick={() => handleRemoveCertification(index)}>
            <RemoveCircleOutline />
          </StyledIconButton>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddCertification}>
        Add Certification
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </Box>
      </LocalizationProvider>
    </Box>
  );
};

export default CertificationsForm;
