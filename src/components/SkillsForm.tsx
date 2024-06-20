import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TextField, Button, Box, IconButton } from '@mui/material';
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


const SkillsForm: React.FC<Props> = ({ handleNext, handleBack }) => {
  const dispatch: AppDispatch = useDispatch();
  const { skills } = useSelector((state: RootState) => state.form);

  const handleChange = (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    const newSkills = [...skills];
    newSkills[index] = { ...newSkills[index], [name]: value };
    dispatch(updateForm({ skills: newSkills }));
  };

  const handleAddSkill = () => {
    const newSkills = [...skills, { name: '', score: 0 }];
    dispatch(updateForm({ skills: newSkills }));
  };

  const handleRemoveSkill = (index: number) => {
    const newSkills = skills.filter((_, i) => i !== index);
    dispatch(updateForm({ skills: newSkills }));
  };

  return (
    <Box component="form" sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
      {skills.map((skill, index) => (
        <Box key={index} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          <TextField name="name" label="Skill Name" value={skill.name} onChange={(e) => handleChange(index, e)} />
          <TextField name="score" label="Score" type="number" value={skill.score} onChange={(e) => handleChange(index, e)} inputProps={{ min: 0, max: 10 }} />
          <StyledIconButton onClick={() => handleRemoveSkill(index)}>
            <RemoveCircleOutline />
          </StyledIconButton>
        </Box>
      ))}
      <Button variant="contained" color="primary" onClick={handleAddSkill}>
        Add Skill
      </Button>
      <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Button variant="contained" onClick={handleBack}>
          Back
        </Button>
        <Button variant="contained" color="primary" onClick={handleNext}>
          Next
        </Button>
      </Box>
    </Box>
  );
};

export default SkillsForm;
