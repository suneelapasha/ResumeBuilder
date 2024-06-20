

import React from 'react';

import { Router, Route, Routes } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import CreateTemplatePage from './components/CreateTemplatePage';
import MultiStepForm from './components/MultiStepForm';

function App() {
//   const CenteredContainer = styled(Box)`
//   display: flex;
//   flex-direction: column;
//   align-items: center;
//   justify-content: center;
//   min-height: 100vh;
//   padding: 16px;
//   box-sizing: border-box;
// `;

  return (
      <>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/create-template" element={<CreateTemplatePage />} />
        <Route path="/resume-builder" element={<MultiStepForm />} />
      </Routes>
      </>
   
  )
}

export default App
