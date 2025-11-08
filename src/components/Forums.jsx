import React, { useState } from "react";
import "./Forums.css";
import { MessageSquare, Home, Megaphone, User, Plus } from "lucide-react";

export default function Forums({ forums, onNavigate, onCreateForum, onSelectForum }) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;
    onCreateForum(title, description);
    setTitle("");
    setDescription("");
    setShowForm(false);
  };

  return (
    <div className="dashboard">
      <button className="hamburger" onClick={toggleSidebar}>☰ EtudConnect</button>
      <nav className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
        <h2></h2>
        <ul>
          <li onClick={() => onNavigate("home")}>
            <Home size={18} /> <span>Accueil</span>
          </li>
          <li onClick={() => onNavigate("forums")}>
            <MessageSquare size={18} /> <span>Forums</span>
          </li>
          <li onClick={() => onNavigate("annonces")}>
            <Megaphone size={18} /> <span>Annonces</span>
          </li>
          <li onClick={() => onNavigate("profil")}>
            <User size={18} /> <span>Profil</span>
          </li>
        </ul>
        <div className="sidebar-footer">© 2025 EtudConnect</div>
      </nav>

      <div className={`main-content ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
        <div className="hero">
          <img
            src="https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?auto=format&fit=crop&w=1200&q=80"
            alt="Forums"
            className="hero-image"
          />
          <div className="hero-overlay">
            <h2>Forums EtudConnect 💬</h2>
            <p>Échangez, collaborez et partagez vos idées</p>
          </div>
        </div>

        <div className="forums-container">
          {forums.map((forum) => (
            <div key={forum.id} className="forum-card" onClick={() => onSelectForum(forum)}>
              <div>
                <h3>{forum.title}</h3>
                <p>{forum.description}</p>
              </div>
              <span className="posts-count">{forum.messages.length} messages</span>
            </div>
          ))}
        </div>

        <div className="actions-card">
          <h3>Créer un nouveau forum</h3>
          {showForm ? (
            <form onSubmit={handleSubmit} className="forum-form">
              <input
                type="text"
                placeholder="Titre du forum"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button type="submit">Créer</button>
            </form>
          ) : (
            <button className="action-btn" onClick={() => setShowForm(true)}>
              <Plus size={16} /> Nouveau forum
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
