import React, { useEffect, useState } from "react";
import "./Accueil.css";
import "./Annonce.css";
import { MessageSquare, TrendingUp, Megaphone, Home, User } from "lucide-react";

export default function Annonce({ onNavigate }) {
  const [annonces, setAnnonces] = useState([]);
  const [filtered, setFiltered] = useState([]);
  const [search, setSearch] = useState("");
  const [categorie, setCategorie] = useState("Toutes");
  const [sortOrder, setSortOrder] = useState("recent");
  const [showModal, setShowModal] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const [newAnnonce, setNewAnnonce] = useState({
    titre: "",
    description: "",
    categorie: "",
    auteur: "",
  });

  // stock des données directement React sans passer par json-server
  useEffect(() => {
    const fakeData = [
      {
        id: 1,
        titre: "Stage React disponible",
        description: "Entreprise X recherche un stagiaire en développement web.",
        categorie: "Stage",
        auteur: "Admin",
        date: "2025-11-01",
        vues: 12,
        epingler: true,
      },
      {
        id: 2,
        titre: "Événement Hackathon",
        description: "Participez au hackathon ITIC 2025 !",
        categorie: "Événement",
        auteur: "ITIC",
        date: "2025-10-28",
        vues: 25,
        epingler: false,
      },
      {
        id: 3,
        titre: "Plateforme d'échange Etudiants",
        description: "Echanger, publier des annonces, discuter, et interagir autour de différents sujets liés à la vie étudiante",
        categorie: "Projet",
        auteur: "ITIC DEVS",
        date: "2025-11-07",
        vues: 5,
        epingler: false,
      },

    ];
    setAnnonces(fakeData);
    setFiltered(fakeData);
  }, []);

  // --- Filtres + recherche + tri
  useEffect(() => {
    let result = annonces.filter((a) =>
      a.titre.toLowerCase().includes(search.toLowerCase())
    );

    if (categorie !== "Toutes") {
      result = result.filter((a) => a.categorie === categorie);
    }

    result.sort((a, b) => {
      if (sortOrder === "recent") return new Date(b.date) - new Date(a.date);
      else return new Date(a.date) - new Date(b.date);
    });

    setFiltered(result);
  }, [search, categorie, sortOrder, annonces]);

  const toggleEpingler = (id) => {
    const updated = annonces.map((a) =>
      a.id === id ? { ...a, epingler: !a.epingler } : a
    );
    setAnnonces(updated);
  };

  // --- Publication d'une annonce (simulation)
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!newAnnonce.titre || !newAnnonce.description || !newAnnonce.categorie) {
      alert("Veuillez remplir tous les champs !");
      return;
    }

    const annonceToAdd = {
      ...newAnnonce,
      id: Date.now(),
      date: new Date().toISOString().split("T")[0],
      vues: 0,
      epingler: false,
    };

    setAnnonces([annonceToAdd, ...annonces]);
    setShowModal(false);
    setNewAnnonce({ titre: "", description: "", categorie: "", auteur: "" });
  };

  return (
    <div className="dashboard">
      {/* --- Bouton hamburger --- */}
      <button className="hamburger" onClick={() => setSidebarOpen(!sidebarOpen)}>
        ☰ EtudConnect
      </button>

      {/* --- Sidebar identique à Accueil --- */}
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


      {/* --- Contenu principal --- */}
      <div className={`main-content ${sidebarOpen ? "with-sidebar" : "full-width"}`}>
        
        {/* --- Hero (même que dans Accueil) --- */}
        <div className="hero">
          <img
            src="https://images.unsplash.com/photo-1693011142814-aa33d7d1535c?auto=format&fit=crop&w=1200&q=80"
            alt="Campus"
            className="hero-image"
          />
          <div className="hero-overlay">
            <h2>Annonces EtudConnect</h2>
            <p>Découvrez ou publiez des opportunités pour la communauté ITIC</p>
          </div>
        </div>

        {/* --- Bloc annonces --- */}
        <main className="annonce-container">
          <div className="annonce-header">
            <div>
              <h2>Annonces</h2>
              <p>Partagez des opportunités avec la communauté</p>
            </div>
            <button className="btn-publier" onClick={() => setShowModal(true)}>
              + Publier une annonce
            </button>
          </div>

          {/* Barre de recherche */}
          <div className="search-bar">
            <input
              type="text"
              placeholder="Rechercher une annonce..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          {/* Filtres */}
          <div className="filters">
            {["Toutes", "Événement", "Stage", "Projet", "Important", "Général"].map(
              (cat) => (
                <button
                  key={cat}
                  className={`filter-btn ${categorie === cat ? "active" : ""}`}
                  onClick={() => setCategorie(cat)}
                >
                  {cat}
                </button>
              )
            )}

            <select
              className="tri-select"
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value)}
            >
              <option value="recent">Plus récentes</option>
              <option value="ancien">Plus anciennes</option>
            </select>
          </div>

          {/* Liste des annonces */}
          <div className="annonce-list">
            {filtered.map((a) => (
              <div
                key={a.id}
                className={`annonce-card ${a.epingler ? "epinglee" : ""}`}
              >
                <div className="annonce-info">
                  <div className="annonce-top">
                    <h3>{a.titre}</h3>
                    <span className={`badge cat-${a.categorie.toLowerCase()}`}>
                      {a.categorie}
                    </span>
                  </div>
                  <p>{a.description}</p>
                  <div className="annonce-meta">
                    <span>{a.auteur}</span>
                    <span>• {new Date(a.date).toLocaleDateString()}</span>
                    <span>• {a.vues} vues</span>
                  </div>
                </div>
                <button
                  className="btn-epingle"
                  onClick={() => toggleEpingler(a.id)}
                >
                  {a.epingler ? "★ Épinglée" : "☆ Épingler"}
                </button>
              </div>
            ))}
          </div>
        </main>
      </div>

      {/* --- Modal publication --- */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Publier une nouvelle annonce</h3>
            <form onSubmit={handleSubmit}>
              <input
                type="text"
                placeholder="Titre de votre annonce"
                value={newAnnonce.titre}
                onChange={(e) =>
                  setNewAnnonce({ ...newAnnonce, titre: e.target.value })
                }
              />
              <textarea
                placeholder="Décrivez votre annonce"
                value={newAnnonce.description}
                onChange={(e) =>
                  setNewAnnonce({
                    ...newAnnonce,
                    description: e.target.value,
                  })
                }
              />
              <select
                value={newAnnonce.categorie}
                onChange={(e) =>
                  setNewAnnonce({ ...newAnnonce, categorie: e.target.value })
                }
              >
                <option value="">Choisir une catégorie</option>
                <option value="Événement">Événement</option>
                <option value="Stage">Stage</option>
                <option value="Projet">Projet</option>
                <option value="Important">Important</option>
                <option value="Général">Général</option>
              </select>
              <input
                type="text"
                placeholder="Auteur"
                value={newAnnonce.auteur}
                onChange={(e) =>
                  setNewAnnonce({ ...newAnnonce, auteur: e.target.value })
                }
              />
              <div className="modal-actions">
                <button type="submit" className="btn-submit">
                  Publier
                </button>
                <button
                  type="button"
                  className="btn-cancel"
                  onClick={() => setShowModal(false)}
                >
                  Annuler
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}