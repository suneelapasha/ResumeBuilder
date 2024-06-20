import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { updateForm, selectForm } from '../features/form/formSlice';
import { AppDispatch, RootState } from '../app/store';

interface Props {
  handleNext: () => void;
}

const PersonalInfoForm: React.FC<Props> = ({ handleNext }) => {
  const dispatch: AppDispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField name="firstName" label="First Name" value={form.firstName} onChange={handleChange} />
      <TextField name="lastName" label="Last Name" value={form.lastName} onChange={handleChange} />
      <TextField name="email" label="Email" value={form.email} onChange={handleChange} />
      <TextField name="position" label="Position" value={form.position} onChange={handleChange} />
      <TextField name="phoneNumber" label="Phone Number" value={form.phoneNumber} onChange={handleChange} />
      <TextField name="address" label="Address" value={form.address} onChange={handleChange} />
      <TextField name="linkedin" label="LinkedIn" value={form.linkedin} onChange={handleChange} />
      <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default PersonalInfoForm;
