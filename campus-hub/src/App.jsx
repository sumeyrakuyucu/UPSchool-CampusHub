import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import Resources from './pages/Resources';
import Discussions from './pages/Discussions';
import StudyRooms from './pages/StudyRooms';
import AiAssistant from './components/AiAssistant';
import { AuthProvider } from './context/AuthContext';
import { DataProvider } from './context/DataContext';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <DataProvider>
        <Router>
          <div className="app-wrapper">
            <Toaster position="bottom-right" reverseOrder={false} />
            <Navbar />
            <AiAssistant />
            <main className="main-content">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/resources" element={<Resources />} />
                <Route path="/discussions" element={<Discussions />} />
                <Route path="/study-rooms" element={<StudyRooms />} />
              </Routes>
            </main>
            <Footer />
          </div>
        </Router>
      </DataProvider>
    </AuthProvider>
  );
}

export default App;
