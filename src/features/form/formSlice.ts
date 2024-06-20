import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface Experience {
  title: string;
  company: string;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
}

interface Education {
  degree: string;
  major: string;
  university: string;
  location: string;
  startDate: Date | null;
  endDate: Date | null;
  description: string;
}

interface Certification {
  name: string;
  date: Date | null;
}

interface Skill {
  name: string;
  score: number;
}

interface FormState {
  firstName: string;
  lastName: string;
  email: string;
  position: string;
  phoneNumber: string;
  address: string;
  linkedin: string;
  experiences: Experience[];
  education: Education[];
  certifications: Certification[];
  description: string;
  skills: Skill[];
}

const initialState: FormState = {
  firstName: '',
  lastName: '',
  email: '',
  position:'',
  phoneNumber: '',
  address: '',
  linkedin: '',
  experiences: [],
  education: [],
  certifications: [],
  description: '',
  skills: [],
};

const formSlice = createSlice({
  name: 'form',
  initialState,
  reducers: {
    updateForm: (state, action: PayloadAction<Partial<FormState>>) => {
      // return { ...state, ...action.payload };
      const {

        firstName,
        lastName,
        email,
        position,
        phoneNumber,
        address,
        linkedin,
        experiences,
        education,
        certifications,
        description,
        skills
       
      } = action.payload;

      if (firstName) {
        state.firstName = firstName;
      }
      if (lastName) {
        state.lastName = lastName;
      }
      if (email) {
        state.email = email;
      }
      if (position) {
        state.position = position;
      }
      if (phoneNumber) {
        state.phoneNumber = phoneNumber;
      }
      if (address) {
        state.address = address;
      }
      if (linkedin) {
        state.linkedin = linkedin;
      }
      if (experiences) {
        // state.experiences = experiences;
        state.experiences = experiences.map(exp => ({
          ...exp,
          startDate: exp.startDate ? new Date(exp.startDate) : null,
          endDate: exp.endDate ? new Date(exp.endDate) : null,
        }));
      }
      if (education) {
        state.education = education.map(edu => ({
          ...edu,
          startDate: edu.startDate ? new Date(edu.startDate) : null,
          endDate: edu.endDate ? new Date(edu.endDate) : null,
        }));
      }
      if (certifications) {
        state.certifications = certifications.map(cert => ({
          ...cert,
          date: cert.date ? new Date(cert.date) : null,
        }));
      }
      if (description) {
        state.description = description;
      }
      if (skills) {
        state.skills = skills;
      }
    },
  },
});

export const { updateForm } = formSlice.actions;

export const selectForm = (state: RootState) => state.form;

export default formSlice.reducer;
