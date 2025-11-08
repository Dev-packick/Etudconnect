import React, { useState } from "react";
import "./ForumDetail.css";
import { Home, MessageSquare, Megaphone, User } from "lucide-react";

export default function ForumDetail({ forum, onNavigate, onAddMessage, onAddReply }) {
  const [message, setMessage] = useState("");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSend = (e) => {
    e.preventDefault();
    if (!message.trim()) return;
    onAddMessage(forum.id, "Moi", message);
    setMessage("");
  };

  return (
    <div className="dashboard">
      <button className="hamburger" onClick={toggleSidebar}>
        ☰ EtudConnect
      </button>

      
      <nav className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2></h2>
        <ul>
          <li onClick={() => onNavigate("home")}>
            <Home size={18} /> <a href="#accueil">Accueil</a>
          </li>
          <li onClick={() => onNavigate("forums")} className="active">
            <MessageSquare size={18} /> <a href="#forums">Forums</a>
          </li>
          <li>
            <Megaphone size={18} /> <a href="#annonces">Annonces</a>
          </li>
          <li>
            <User size={18} /> <a href="#profil">Profil</a>
          </li>
        </ul>
        <div className="sidebar-footer">© 2025 EtudConnect</div>
      </nav>

 
      <div className={`main-content ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
        <div className="forum-detail">
          <button className="back-btn" onClick={() => onNavigate("forums")}>
            ← Retour aux forums
          </button>
          <h2 className="forum-title">{forum.title}</h2>
          <p className="forum-desc">{forum.description}</p>
          <div className="messages-section">
            {forum.messages.length > 0 ? (
              forum.messages.map((msg) => (
                <div key={msg.id} className="message-card">
                  <div className="message-header">
                    <div className="avatar">{msg.author.charAt(0)}</div>
                    <p className="author">{msg.author}</p>
                  </div>
                  <p className="message-text">{msg.text}</p>
                  <div className="replies">
                    {msg.replies.map((r) => (
                      <div key={r.id} className="reply-card">
                        <div className="avatar small">{r.author.charAt(0)}</div>
                        <p>
                          <strong>{r.author} :</strong> {r.text}
                        </p>
                      </div>
                    ))}
                  </div>
                  <ReplyForm
                    forumId={forum.id}
                    messageId={msg.id}
                    onAddReply={onAddReply}
                  />
                </div>
              ))
            ) : (
              <p className="no-message">Aucun message pour l’instant. Soyez le premier à écrire !</p>
            )}
          </div>
          <form onSubmit={handleSend} className="new-message-form">
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Écrivez un message..."
            />
            <button type="submit">Envoyer</button>
          </form>
        </div>
      </div>
    </div>
  );
}

function ReplyForm({ forumId, messageId, onAddReply }) {
  const [reply, setReply] = useState("");
  const handleReply = (e) => {
    e.preventDefault();
    if (!reply.trim()) return;
    onAddReply(forumId, messageId, "Moi", reply);
    setReply("");
  };

  return (
    <form onSubmit={handleReply} className="reply-form">
      <input
        type="text"
        value={reply}
        onChange={(e) => setReply(e.target.value)}
        placeholder="Répondre..."
      />
      <button type="submit">↩️</button>
    </form>
  );
}
