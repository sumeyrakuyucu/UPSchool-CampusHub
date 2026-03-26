import React, { createContext, useContext, useState, useEffect } from 'react';

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [questions, setQuestions] = useState([]);
  const [resources, setResources] = useState([]);

  useEffect(() => {
    const savedQuestions = localStorage.getItem('questions');
    const savedResources = localStorage.getItem('resources');
    
    if (savedQuestions) setQuestions(JSON.parse(savedQuestions));
    if (savedResources) setResources(JSON.parse(savedResources));
  }, []);

  const addQuestion = (question) => {
    const newQuestion = {
      ...question,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      comments: 0,
      likes: 0
    };
    const updated = [newQuestion, ...questions];
    setQuestions(updated);
    localStorage.setItem('questions', JSON.stringify(updated));
  };

  const addResource = (resource) => {
    const newResource = {
      ...resource,
      id: Date.now().toString(),
      date: new Date().toISOString(),
      downloads: 0
    };
    const updated = [newResource, ...resources];
    setResources(updated);
    localStorage.setItem('resources', JSON.stringify(updated));
  };

  return (
    <DataContext.Provider value={{ questions, resources, addQuestion, addResource }}>
      {children}
    </DataContext.Provider>
  );
};

export const useData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within a DataProvider');
  }
  return context;
};
