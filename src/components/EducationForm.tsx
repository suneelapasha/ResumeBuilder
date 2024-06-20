import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, IconButton } from '@mui/material';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { updateForm, selectForm } from '../features/form/formSlice';
import { AppDispatch, RootState } from '../app/store';
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material';
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


const EducationForm: React.FC<Props> = ({ handleNext, handleBack }) => {
  const dispatch: AppDispatch = useDispatch();
  const  education  = useSelector((state: RootState) => state.form.education);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [name]: value }; // Update the specific experience object
    // newEducation[index][name] = value;
    dispatch(updateForm({ education: newEducation }));
  };

  const handleDateChange = (index: number, name: string, date: Date | null) => {
    const newEducation = [...education];
    newEducation[index] = { ...newEducation[index], [name]: date };
    dispatch(updateForm({ education: newEducation }));
  };


  const handleAddEducation = () => {
    const newEducation = [...education, { degree: '', major: '', university: '', location: '', startDate: null, endDate: null, description: '' }];
    dispatch(updateForm({ education: newEducation }));
  };

  const handleRemoveEducation = (index: number) => {
    const newEducation = education.filter((_, i) => i !== index);
    dispatch(updateForm({ education: newEducation }));
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <LocalizationProvider dateAdapter={AdapterDateFns}>
      {education.map((edu, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="degree" label="Degree" value={edu.degree} onChange={(e) => handleChange(index, e)} />
          <TextField name="major" label="Major" value={edu.major} onChange={(e) => handleChange(index, e)} />
          <TextField name="university" label="University" value={edu.university} onChange={(e) => handleChange(index, e)} />
          <TextField name="location" label="Location" value={edu.location} onChange={(e) => handleChange(index, e)} />
          <DatePicker
            label="Start Date"
            value={edu.startDate}
            onChange={(date) => handleDateChange(index, 'startDate', date)}
            // renderInput={(params) => <TextField {...params} />}
          />
            <DatePicker
            label="End Date"
            value={edu.endDate}
            onChange={(date) => handleDateChange(index, 'endDate', date)}
            // renderInput={(params) => <TextField {...params} />}
          />
          {/* <TextField name="startDate" label="Start Date" value={edu.startDate} onChange={(e) => handleChange(index, e)} />
          <TextField name="endDate" label="End Date" value={edu.endDate} onChange={(e) => handleChange(index, e)} /> */}
          <TextField name="description" label="Description" value={edu.description} onChange={(e) => handleChange(index, e)} />
          <StyledIconButton onClick={() => handleRemoveEducation(index)}>
            <RemoveCircleOutline />
          </StyledIconButton>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddEducation}>
        Add Education
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

export default EducationForm;
