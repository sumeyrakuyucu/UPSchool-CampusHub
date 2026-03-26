import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Users, Coffee, Settings } from 'lucide-react';
import './StudyRooms.css';

const activeUsers = [
  { name: 'ZeynepK', status: 'Odaklanmış', time: '45dk', avatar: 'Z' },
  { name: 'MimarSinan', status: 'Mola', time: '5dk', avatar: 'M' },
  { name: 'CodeSlayer', status: 'Odaklanmış', time: '12dk', avatar: 'C' }
];

const StudyRooms = () => {
  const [workTime, setWorkTime] = useState(25);
  const [breakTime, setBreakTime] = useState(5);
  const [timeLeft, setTimeLeft] = useState(workTime * 60);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      setIsActive(false);
      const nextIsBreak = !isBreak;
      setIsBreak(nextIsBreak);
      setTimeLeft((nextIsBreak ? breakTime : workTime) * 60);
      toast(nextIsBreak ? 'Mola vakti!' : 'Çalışma vakti!', { icon: nextIsBreak ? '☕' : '🎯' });
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft, isBreak, workTime, breakTime]);

  const toggleTimer = () => setIsActive(!isActive);

  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const resetTimer = () => {
    setIsActive(false);
    setIsBreak(false);
    setTimeLeft(workTime * 60);
  };

  const handleSaveSettings = (newWork, newBreak) => {
    setWorkTime(newWork);
    setBreakTime(newBreak);
    setTimeLeft(newWork * 60);
    setIsActive(false);
    setIsBreak(false);
    setIsSettingsOpen(false);
    toast.success('Ayarlar kaydedildi!');
  };

  return (
    <div className="study-rooms animate-fade-in">
      <div className="container">
        <header className="room-header">
          <div>
            <h1>🧠 Genel Çalışma Odası</h1>
            <p>Sessizlik lütfen... Diğer 3 kişi ile birlikte çalışıyorsunuz.</p>
          </div>
          <button className="btn btn-outline" onClick={() => setIsSettingsOpen(true)} style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <Settings size={18} /> Ayarlar
          </button>
        </header>

        <div className="room-layout">
          <div className="timer-section">
            <div className={`timer-circle ${isActive ? 'timer-active' : ''} ${isBreak ? 'timer-break' : ''}`}>
              <h2 className="time-display">{formatTime(timeLeft)}</h2>
              <span className="timer-label">{isBreak ? 'Mola Vakti ☕' : 'Odaklanma 🎯'}</span>
            </div>
            
            <div className="timer-controls">
              <button className="btn-icon circle-btn" onClick={resetTimer} title="Sıfırla">
                <RotateCcw size={24} />
              </button>
              <button className="btn-icon circle-btn play-btn" onClick={toggleTimer} title={isActive ? "Durdur" : "Başlat"}>
                {isActive ? <Pause size={32} /> : <Play size={32} style={{marginLeft: '4px'}} />}
              </button>
              <button className="btn-icon circle-btn" onClick={() => { const next = !isBreak; setIsBreak(next); setTimeLeft((next ? breakTime : workTime) * 60); setIsActive(false); }} title="Mola/Çalışma Geçişi">
                <Coffee size={24} />
              </button>
            </div>
          </div>

          <div className="users-section">
            <div className="section-head">
              <h3><Users size={18} /> Odadakiler (4)</h3>
              <span className="live-badge">Canlı</span>
            </div>
            
            <div className="user-list">
              <div className="room-user current-user">
                <div className="avatar">S</div>
                <div className="r-user-info">
                  <strong>Sen</strong>
                  <span>{isBreak ? 'Mola Veriyor' : 'Çalışıyor'}</span>
                </div>
              </div>
              
              {activeUsers.map((user, idx) => (
                <div className="room-user" key={idx}>
                  <div className="avatar" style={{background: 'var(--border-color)', color: 'var(--text-main)'}}>{user.avatar}</div>
                  <div className="r-user-info">
                    <strong>{user.name}</strong>
                    <span>{user.status} • {user.time}</span>
                  </div>
                </div>
              ))}
            </div>
            
            <div className="room-chat">
              <div className="chat-messages">
                <div className="chat-msg system">ZeynepK odaya katıldı.</div>
                <div className="chat-msg">
                  <strong>CodeSlayer:</strong> Selam herkese, iyi çalışmalar!
                </div>
                <div className="chat-msg system">MimarSinan mola verdi.</div>
              </div>
              <input type="text" placeholder="Mesaj gönder (Sadece mola)..." className="chat-input" disabled={!isBreak} />
            </div>
          </div>
        </div>
      </div>

      {isSettingsOpen && (
        <div className="modal-overlay animate-fade-in" style={{zIndex: 10000}}>
          <div className="modal-content" style={{maxWidth: '400px'}}>
            <div className="modal-header">
              <h3>Zamanlayıcı Ayarları</h3>
              <button className="close-btn" onClick={() => setIsSettingsOpen(false)}><X size={24} /></button>
            </div>
            <div className="modal-body">
              <div className="form-group">
                <label>Çalışma Süresi (Dakika)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  defaultValue={workTime} 
                  onChange={(e) => setWorkTime(parseInt(e.target.value) || 25)}
                />
              </div>
              <div className="form-group">
                <label>Mola Süresi (Dakika)</label>
                <input 
                  type="number" 
                  className="form-input" 
                  defaultValue={breakTime}
                  onChange={(e) => setBreakTime(parseInt(e.target.value) || 5)}
                />
              </div>
              <button className="btn btn-primary" style={{width: '100%', marginTop: '1rem'}} onClick={() => handleSaveSettings(workTime, breakTime)}>
                Ayarları Uygula
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudyRooms;
