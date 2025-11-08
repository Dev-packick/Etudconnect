import React, { useState, useMemo } from "react";
import "./Accueil.css";
import { MessageSquare, TrendingUp, Megaphone, Home, User } from "lucide-react";
import Forums from "./forums";
import ForumDetail from "./ForumDetail";
import Annonce from "./Annonce";
import Profil from "./Profil";


export default function Accueil() {

  const [page, setPage] = useState("home");
  const [selectedForum, setSelectedForum] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);


  const [forums, setForums] = useState([
    {
      id: 1,
      title: "Projet de fin d'année",
      description: "Espace pour échanger sur le projet React",
      messages: [
        {
          id: 1,
          author: "Marie",
          text: "Quelqu’un a-t-il déjà commencé la partie API ?",
          replies: [
            { id: 1, author: "Jean", text: "Oui, je peux partager un exemple !" },
          ],
        },
      ],
    },
  ]);


  const addForum = (title, description) => {
    const newForum = {
      id: Date.now(),
      title,
      description,
      messages: [],
    };
    setForums([...forums, newForum]);
  };

  const addMessage = (forumId, author, text) => {
    const updatedForums = forums.map((f) =>
      f.id === forumId
        ? { ...f, messages: [...f.messages, { id: Date.now(), author, text, replies: [] }] }
        : f
    );
    setForums(updatedForums);

    if (selectedForum && selectedForum.id === forumId) {
      const updatedForum = updatedForums.find((f) => f.id === forumId);
      setSelectedForum(updatedForum);
    }
  };

  const addReply = (forumId, messageId, author, text) => {
    const updatedForums = forums.map((f) =>
      f.id === forumId
        ? {
            ...f,
            messages: f.messages.map((m) =>
              m.id === messageId
                ? { ...m, replies: [...m.replies, { id: Date.now(), author, text }] }
                : m
            ),
          }
        : f
    );
    setForums(updatedForums);

    if (selectedForum && selectedForum.id === forumId) {
      const updatedForum = updatedForums.find((f) => f.id === forumId);
      setSelectedForum(updatedForum);
    }
  };

  
  const recentForums = useMemo(() => {
    const sorted = [...forums].sort((a, b) => b.id - a.id);
    return sorted.slice(0, 4).map((f) => ({
      forumName: f.title,
      lastMessageTitle:
        f.messages.length > 0
          ? f.messages[f.messages.length - 1].text
          : "Aucun message pour l’instant",
      time: "Récemment créé",
      author:
        f.messages.length > 0
          ? f.messages[f.messages.length - 1].author
          : "—",
    }));
  }, [forums]);


  if (page === "home") {
    const stats = [
      { label: "Discussions actives", value: "45", icon: <TrendingUp />, color: "#4caf50" },
      { label: "Posts dans les forums", value: "128", icon: <MessageSquare />, color: "#2196f3" },
      { label: "Annonces récentes", value: "8", icon: <Megaphone />, color: "#9c27b0" },
    ];

    return (
      <div className="dashboard">
        <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>☰ EtudConnect</button>

        <nav className={`sidebar ${sidebarOpen ? "open" : "closed"}`}>
          <h2></h2>
          <ul>
            <li className="active"><Home size={18} /> <a href="#accueil">Accueil</a></li>
            <li onClick={() => setPage("forums")}><MessageSquare size={18} /> <a href="#forums">Forums</a></li>
            <li onClick={() => setPage("annonces")}><Megaphone size={18} /> <a href="#annonces">Annonces</a></li>
            <li onClick={() => setPage("profil")}><User size={18} /> <a href="#profil">Profil</a></li>
          </ul>
          <div className="sidebar-footer">© 2025 EtudConnect</div>
        </nav>
        <div className={`main-content ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
          <div className="hero">
            <img
              src="https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?auto=format&fit=crop&w=1200&q=80"
              alt="Campus"
              className="hero-image"
            />
            <div className="hero-overlay">
              <h2>Bienvenue sur EtudConnect 👋</h2>
              <p>Votre plateforme collaborative pour échanger, apprendre et réussir ensemble</p>
            </div>
          </div>

      
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <div key={index} className="stat-card">
                <div className="stat-info">
                  <p className="stat-label">{stat.label}</p>
                  <p className="stat-value">{stat.value}</p>
                </div>
                <div className="stat-icon" style={{ backgroundColor: stat.color }}>{stat.icon}</div>
              </div>
            ))}
          </div>


          <div className="activities-card">
            <h3>Forums récents</h3>
            {recentForums.map((forum, index) => (
              <div key={index} className="activity-item">
                <div className="avatar">{forum.author.charAt(0)}</div>
                <div className="activity-info">
                  <p className="activity-title">{forum.lastMessageTitle}</p>
                  <p className="activity-details">{forum.forumName} • {forum.author} • {forum.time}</p>
                </div>
              </div>
            ))}
          </div>

      
          <div className="actions-card">
            <h3>Actions rapides</h3>
            <div className="actions-grid">
              <button onClick={() => setPage("forums")} className="action-btn">
                🗨️ Accéder aux forums
                <p>Créer ou lire des discussions</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

if (page === "forums") {
  return (
    <Forums
      forums={forums}
      onNavigate={setPage}
      onCreateForum={addForum}
      onSelectForum={(f) => { setSelectedForum(f); setPage("forumDetail"); }}
      currentPage={page}
    />
  );
}

if (page === "forumDetail" && selectedForum) {
  return (
    <ForumDetail
      forum={selectedForum}
      onNavigate={setPage}   
      onAddMessage={addMessage}
      onAddReply={addReply}
      currentPage={page}     
    />
  );
}
  if (page === "annonces") {
  return <Annonce onNavigate={setPage} />;
}
if (page === "profil") {
  return (
    <Profil 
      onNavigate={(route) => setPage(route)} 
      currentPage="profil" 
    />
  );
}

  return null;
}
