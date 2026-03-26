import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      const parsedUser = JSON.parse(savedUser);
      // Migration: Give starter points to existing users who have 0 (eskisi gibi 1250)
      if (parsedUser.kp === undefined || parsedUser.kp === 0 || parsedUser.kp === 250) {
        parsedUser.kp = 1250;
        localStorage.setItem('currentUser', JSON.stringify(parsedUser));
        
        // Update users list as well
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const idx = users.findIndex(u => u.id === parsedUser.id);
        if (idx !== -1) {
          users[idx].kp = 1250;
          localStorage.setItem('users', JSON.stringify(users));
        }
      }
      setUser(parsedUser);
    }
    setLoading(false);
  }, []);

  const register = (userData) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      
      // Check if email already exists
      if (users.find(u => u.email === userData.email)) {
        throw new Error('Bu e-posta adresi zaten kullanımda.');
      }

      const newUser = {
        ...userData,
        id: Date.now().toString(),
        createdAt: new Date().toISOString(),
        kp: 1250 // Başlangıç hediyesi (Eskisi gibi)
      };

      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      
      // Auto login after registration
      setUser(newUser);
      localStorage.setItem('currentUser', JSON.stringify(newUser));
      return { success: true };
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const login = (email, password) => {
    try {
      const users = JSON.parse(localStorage.getItem('users') || '[]');
      const foundUser = users.find(u => u.email === email && u.password === password);

      if (foundUser) {
        // Migration: Add KP if it doesn't exist for old users (Eskisi gibi 1250)
        if (foundUser.kp === undefined || foundUser.kp === 0 || foundUser.kp === 250) {
          foundUser.kp = 1250;
        }
        
        setUser(foundUser);
        localStorage.setItem('currentUser', JSON.stringify(foundUser));
        return { success: true };
      } else {
        throw new Error('E-posta veya şifre hatalı.');
      }
    } catch (error) {
      return { success: false, message: error.message };
    }
  };

  const updateKp = (amount) => {
    if (!user) return;
    
    const users = JSON.parse(localStorage.getItem('users') || '[]');
    const userIndex = users.findIndex(u => u.id === user.id);
    
    if (userIndex !== -1) {
      const updatedUser = { ...user, kp: (user.kp || 0) + amount };
      users[userIndex] = updatedUser;
      
      localStorage.setItem('users', JSON.stringify(users));
      localStorage.setItem('currentUser', JSON.stringify(updatedUser));
      setUser(updatedUser);
      
      const icon = amount > 0 ? '✨' : '📉';
      toast(`${amount > 0 ? '+' : ''}${amount} Kampüs Puanı!`, { icon });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  return (
    <AuthContext.Provider value={{ user, register, login, logout, updateKp, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
