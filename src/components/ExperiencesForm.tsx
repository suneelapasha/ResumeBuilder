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

const ExperiencesForm: React.FC<Props> = ({ handleNext, handleBack }) => {
  const dispatch: AppDispatch = useDispatch();
  const  experiences  = useSelector((state: RootState) => state.form.experiences);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [name]: value };
    dispatch(updateForm({ experiences: newExperiences }));
  };

  const handleDateChange = (index: number, name: string, date: Date | null) => {
    const newExperiences = [...experiences];
    newExperiences[index] = { ...newExperiences[index], [name]: date };
    dispatch(updateForm({ experiences: newExperiences }));
  };

  const handleAddExperience = () => {
    const newExperiences = [...experiences, { title: '', company: '', location: '', startDate: null, endDate: null, description: '' }];
    dispatch(updateForm({ experiences: newExperiences }));
  };

  const handleRemoveExperience = (index: number) => {
    const newExperiences = experiences.filter((_, i) => i !== index);
    dispatch(updateForm({ experiences: newExperiences }));
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
       <LocalizationProvider dateAdapter={AdapterDateFns}>
      {experiences.map((exp, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="title" label="Title" value={exp.title} onChange={(e) => handleChange(index, e)} />
          <TextField name="company" label="Company" value={exp.company} onChange={(e) => handleChange(index, e)} />
          <TextField name="location" label="Location" value={exp.location} onChange={(e) => handleChange(index, e)} />
          <DatePicker
            label="Start Date"
            value={exp.startDate}
            onChange={(date) => handleDateChange(index, 'startDate', date)}
          />
            <DatePicker
            label="End Date"
            value={exp.endDate}
            onChange={(date) => handleDateChange(index, 'endDate', date)}
          />
          
          <TextField name="description" label="Description" value={exp.description} onChange={(e) => handleChange(index, e)} />
          <StyledIconButton onClick={() => handleRemoveExperience(index)}>
              <RemoveCircleOutline />
          </StyledIconButton>
        </Box>
      ))}

      <Button variant="contained" color="primary" onClick={handleAddExperience}>
        Add Experience
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

export default ExperiencesForm;
