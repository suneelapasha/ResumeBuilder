import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box } from '@mui/material';
import { updateForm } from '../features/form/formSlice';
import { AppDispatch, RootState } from '../app/store';

interface Props {
  handleBack: () => void;
  handleSubmit: () => void;
}

const SummaryForm: React.FC<Props> = ({ handleBack, handleSubmit }) => {
  const dispatch: AppDispatch = useDispatch();
  const form = useSelector((state: RootState) => state.form);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    dispatch(updateForm({ [name]: value }));
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      <TextField
        name="description"
        label="Prodession Summary"
        multiline
        rows={4}
        value={form.description}
        onChange={handleChange}
      />
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleSubmit}>
          Preview
        </Button>
      </Box>
    </Box>
  );
};

export default SummaryForm;
