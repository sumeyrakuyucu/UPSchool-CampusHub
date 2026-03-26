import React, { useState, useRef } from 'react';
import { X, UploadCloud, CheckCircle, File, Loader } from 'lucide-react';
import { useData } from '../context/DataContext';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import './UploadModal.css';

const UploadModal = ({ isOpen, onClose }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [formType, setFormType] = useState('soru'); // soru, not, cikmis
  const fileInputRef = useRef(null);
  const { addQuestion, addResource } = useData();
  const { user } = useAuth();

  if (!isOpen) return null;

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      setFile(e.dataTransfer.files[0]);
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUploadClick = () => {
    fileInputRef.current?.click();
  };

  const handleRemoveFile = (e) => {
    e.stopPropagation(); // Dosya tıklama balonunu engelle
    setFile(null);
  };

  const handleSubmit = (e) => {
    if (!user) {
      toast.error('Paylaşım yapabilmek için önce giriş yapmalısın!');
      return;
    }

    const form = e.target.closest('.modal-content');
    const titleInput = form.querySelector('input[name="title"]');
    const universityInput = form.querySelector('input[name="university"]');
    const detailTextarea = form.querySelector('textarea[name="detail"]');

    if (!titleInput.value || !detailTextarea.value || !universityInput.value) {
      toast.error('Lütfen tüm alanları doldurur musun?');
      return;
    }

    // Fake upload process start
    setIsUploading(true);
    
    setTimeout(() => {
      const newItem = {
        title: titleInput.value,
        content: detailTextarea.value,
        university: universityInput.value,
        author: user.name,
        authorEmail: user.email,
        fileName: file ? file.name : null,
        type: formType
      };

      if (formType === 'soru') {
        addQuestion(newItem);
      } else {
        addResource(newItem);
      }

      setIsUploading(false);
      setIsSuccess(true);
      
      // Modal'ı kapat ve state'leri temizle (başarılı animasyonunu göstermek için 1.5 saniye bekle)
      setTimeout(() => {
        setIsSuccess(false);
        setFile(null);
        onClose();
      }, 1500);
      
    }, 1500); // 1.5 Saniye yükleme simülasyonu
  };

  return (
    <div className="modal-overlay animate-fade-in">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Yeni Bir Şey Paylaş</h3>
          <button className="close-btn" onClick={onClose} disabled={isUploading}>
            <X size={24} />
          </button>
        </div>
        
        {!isSuccess && !isUploading && (
          <div className="modal-tabs">
            <button className={`tab ${formType === 'soru' ? 'active' : ''}`} onClick={() => setFormType('soru')}>Soru Sor</button>
            <button className={`tab ${formType === 'not' ? 'active' : ''}`} onClick={() => setFormType('not')}>Not Yükle</button>
            <button className={`tab ${formType === 'cikmis' ? 'active' : ''}`} onClick={() => setFormType('cikmis')}>Çıkmış Soru</button>
          </div>
        )}
        
        <div className="modal-body">
          {isSuccess ? (
            <div className="success-state animate-fade-in" style={{ textAlign: 'center', padding: '3rem 0' }}>
              <CheckCircle size={64} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.5rem', color: '#10b981', marginBottom: '0.5rem' }}>Başarıyla Yüklendi!</h3>
              <p style={{ color: 'var(--text-muted)' }}>Teşekkürler, paylaşımın topluluğa çok yardımcı olacak.</p>
            </div>
          ) : isUploading ? (
            <div className="uploading-state animate-fade-in" style={{ textAlign: 'center', padding: '4rem 0' }}>
              <Loader size={48} color="var(--primary-color)" className="spin-animation" style={{ margin: '0 auto 1rem auto' }} />
              <h3 style={{ fontSize: '1.25rem', color: 'var(--text-main)' }}>Yükleniyor... Lütfen bekleyin.</h3>
            </div>
          ) : (
             <>
               <div className="form-group">
                 <label>Başlık</label>
                  <input type="text" name="title" placeholder={formType === 'soru' ? "Örn: Calculus vizeleri çok zorluyor, nasıl çalışmalıyım?" : "Örn: Fizik 101 İkinci Vize Çıkmış Sorular"} className="form-input" />
               </div>

               <div className="form-group">
                 <label>Üniversite</label>
                  <input type="text" name="university" placeholder="Örn: İTÜ, ODTÜ, Boğaziçi..." className="form-input" defaultValue={user?.university || ''} />
               </div>
               
               <div className="form-group">
                 <label>Detaylar / Sorunuz</label>
                  <textarea name="detail" placeholder="Sorununuzu veya paylaşmak istediğiniz detayı buraya yazın..." className="form-textarea" rows="4"></textarea>
               </div>
               
               <div 
                 className={`upload-area ${dragActive ? 'active' : ''} ${file ? 'has-file' : ''}`}
                 onDragEnter={handleDrag}
                 onDragLeave={handleDrag}
                 onDragOver={handleDrag}
                 onDrop={handleDrop}
                 onClick={handleUploadClick}
               >
                 <input 
                   type="file" 
                   ref={fileInputRef} 
                   onChange={handleFileChange} 
                   style={{ display: 'none' }} 
                   accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                 />
                 
                 {file ? (
                   <div className="file-info" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.5rem' }}>
                     <File size={40} color="var(--primary-color)" />
                     <p style={{ margin: 0, fontWeight: 600 }}>{file.name}</p>
                     <p style={{ fontSize: '0.8rem', margin: 0 }}>{(file.size / 1024 / 1024).toFixed(2)} MB</p>
                     <button 
                       className="btn btn-sm btn-outline" 
                       style={{ marginTop: '0.5rem', padding: '0.2rem 0.5rem', fontSize: '0.8rem' }}
                       onClick={handleRemoveFile}
                     >Dosyayı Kaldır
                     </button>
                   </div>
                 ) : (
                   <>
                     <UploadCloud size={48} className="upload-icon" />
                     <p>Dosyaları buraya sürükle veya <span>bilgisayarından seç</span></p>
                     <span className="upload-hint">PDF, DOCX, JPG veya PNG formatları desteklenir. (Max 50MB)</span>
                   </>
                 )}
               </div>
             </>
          )}
        </div>
        
        {!isSuccess && !isUploading && (
          <div className="modal-footer">
            <button className="btn btn-outline" onClick={onClose}>İptal</button>
            <button className="btn btn-primary" onClick={handleSubmit}>Paylaş / Yükle</button>
          </div>
        )}
      </div>
      <style>{`
        .spin-animation {
          animation: spin 1s linear infinite;
        }
        @keyframes spin { 100% { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default UploadModal;
