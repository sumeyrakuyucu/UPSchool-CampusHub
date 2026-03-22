import React, { useState } from 'react';
import { MessageCircle, Heart, Share2, MoreHorizontal, Send, Sparkles } from 'lucide-react';
import toast from 'react-hot-toast';
import { getGeminiResponse } from '../services/gemini';
import './DiscussionCard.css';

const DiscussionCard = ({ user, university, time, question, tags, likes, comments }) => {
  const [likeCount, setLikeCount] = useState(likes);
  const [isLiked, setIsLiked] = useState(false);
  
  const [commentCount, setCommentCount] = useState(comments);
  const [showReply, setShowReply] = useState(false);
  const [replyText, setReplyText] = useState('');
  const [replies, setReplies] = useState([]);
  const [isAiLoading, setIsAiLoading] = useState(false);

  const handleLike = () => {
    if (isLiked) {
      setLikeCount(prev => prev - 1);
      setIsLiked(false);
    } else {
      setLikeCount(prev => prev + 1);
      setIsLiked(true);
    }
  };

  const handleSendReply = () => {
    if (!replyText.trim()) return;
    
    setReplies([...replies, {
      text: replyText,
      time: 'Şimdi',
      user: 'Sen',
      isAi: false
    }]);
    
    setCommentCount(prev => prev + 1);
    setReplyText('');
    setShowReply(false);
  };

  const handleAskAI = async () => {
    setIsAiLoading(true);
    toast('Gemini AI soruyu çözüyor...', { icon: '🤖' });
    
    try {
      const prompt = `Aşağıdaki soruyu bir üniversite öğrencisine yardımcı olacak şekilde kısaca açıkla veya çöz: \n"${question}"\nEtiketler: ${tags?.join(', ')}`;
      const aiResponse = await getGeminiResponse(prompt);
      
      setReplies(prev => [...prev, {
        text: aiResponse,
        time: 'Şimdi',
        user: 'Kampüs AI (Gemini)',
        isAi: true
      }]);
      setCommentCount(prev => prev + 1);
      toast.success('Yapay Zeka sorunuzu yanıtladı!');
    } catch (err) {
      toast.error('AI yanıtı alınamadı.');
    } finally {
      setIsAiLoading(false);
      setShowReply(false);
    }
  };

  return (
    <div className="discussion-card animate-fade-in">
      <div className="discussion-header">
        <div className="discussion-user">
          <div className="avatar">{user.charAt(0)}</div>
          <div className="user-info">
            <h4>{user}</h4>
            <span>{university} • {time}</span>
          </div>
        </div>
        <button className="btn-icon"><MoreHorizontal size={20} /></button>
      </div>
      
      <div className="discussion-body">
        <p>{question}</p>
        {tags && tags.length > 0 && (
          <div className="discussion-tags">
            {tags.map((tag, index) => (
              <span key={index} className="tag">#{tag}</span>
            ))}
          </div>
        )}
      </div>
      
      <div className="discussion-footer">
        <div className="discussion-actions-left">
          <button 
            className={`action-btn ${isLiked ? 'liked' : ''}`} 
            onClick={handleLike}
            style={{ color: isLiked ? '#ef4444' : '' }}
          >
            <Heart size={18} fill={isLiked ? '#ef4444' : 'none'} /> {likeCount}
          </button>
          <button className="action-btn" onClick={() => setShowReply(!showReply)}>
            <MessageCircle size={18} /> {commentCount} Yorum
          </button>
          <button 
            className="action-btn ai-btn" 
            onClick={handleAskAI}
            disabled={isAiLoading}
            style={{ color: 'var(--primary-color)', fontWeight: 600 }}
          >
            <Sparkles size={18} /> {isAiLoading ? 'Düşünüyor...' : 'AI\'a Sor'}
          </button>
        </div>
        <div className="discussion-actions-right">
          <button className="action-btn">
            <Share2 size={18} /> Paylaş
          </button>
          <button className="btn btn-primary btn-sm" onClick={() => setShowReply(!showReply)}>
            Cevapla
          </button>
        </div>
      </div>

      {replies.length > 0 && (
        <div className="replies-list" style={{ marginTop: '1.5rem', borderTop: '1px solid var(--border-color)', paddingTop: '1rem' }}>
          {replies.map((reply, idx) => (
            <div key={idx} style={{ 
              marginBottom: '1rem', 
              padding: '1rem', 
              backgroundColor: reply.isAi ? 'rgba(139, 92, 246, 0.1)' : 'var(--bg-color)', 
              borderRadius: '8px',
              border: reply.isAi ? '1px solid var(--primary-color)' : '1px solid transparent'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <strong style={{ fontSize: '0.9rem', color: reply.isAi ? 'var(--primary-color)' : 'var(--text-main)' }}>
                  {reply.user}
                </strong>
                <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>{reply.time}</span>
              </div>
              <p style={{ fontSize: '0.95rem', color: 'var(--text-main)' }}>{reply.text}</p>
            </div>
          ))}
        </div>
      )}

      {showReply && (
        <div className="reply-area animate-fade-in" style={{ marginTop: '1.5rem', display: 'flex', gap: '1rem' }}>
          <input 
            type="text" 
            autoFocus
            style={{ flex: 1, padding: '0.75rem 1rem', borderRadius: '8px', border: '1px solid var(--border-color)', outline: 'none', background: 'transparent', color: 'var(--text-main)' }}
            placeholder="Cevabınızı veya çözümünüzü yazın..." 
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendReply()}
          />
          <button className="btn btn-primary" onClick={handleSendReply}>
            <Send size={18} /> Gönder
          </button>
        </div>
      )}
    </div>
  );
};

export default DiscussionCard;
