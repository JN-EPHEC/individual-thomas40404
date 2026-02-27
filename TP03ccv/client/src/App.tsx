import { useEffect, useState, FormEvent } from "react";
import './App.css';
// Interface représentant un utilisateur
interface User {
  id: number;
  nom: string;
  prenom: string;
}

function App() {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [nom, setNom] = useState<string>("");
  const [prenom, setPrenom] = useState<string>("");
  const [submitError, setSubmitError] = useState<string | null>(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  // -- AJOUT DU USEEFFECT POUR LES EFFETS FESTIFS --
  useEffect(() => {
    const createConfetti = () => {
      const confetti = document.createElement('div');
      confetti.className = 'confetti';
      confetti.style.left = Math.random() * window.innerWidth + 'px';
      confetti.style.backgroundColor = `hsl(${Math.random() * 360}, 100%, 50%)`;
      document.getElementById('effects')?.appendChild(confetti);
      setTimeout(() => confetti.remove(), 4000);
    };

    const createSparkle = () => {
      const sparkle = document.createElement('div');
      sparkle.className = 'sparkle';
      const title = document.querySelector('h1');
      if (!title) return;
      const rect = title.getBoundingClientRect();
      sparkle.style.left = rect.left + Math.random() * rect.width + 'px';
      sparkle.style.top = rect.top + Math.random() * rect.height + 'px';
      document.getElementById('effects')?.appendChild(sparkle);
      setTimeout(() => sparkle.remove(), 1500);
    };

    const createFirework = () => {
      const title = document.querySelector('h1');
      if (!title) return;
      const rect = title.getBoundingClientRect();
      const x = rect.left + rect.width / 2;
      const y = rect.top + rect.height / 2;

      for (let i = 0; i < 20; i++) {
        const fw = document.createElement('div');
        fw.className = 'firework';
        fw.style.left = x + 'px';
        fw.style.top = y + 'px';
        fw.style.setProperty('--x', (Math.random() - 0.5) * 200 + 'px');
        fw.style.setProperty('--y', (Math.random() - 0.5) * 200 + 'px');
        document.getElementById('effects')?.appendChild(fw);
        setTimeout(() => fw.remove(), 1000);
      }
    };

    const confettiInterval = setInterval(createConfetti, 20);
    const sparkleInterval = setInterval(createSparkle, 30);
    const fireworkInterval = setInterval(createFirework, 200);

    return () => {
      clearInterval(confettiInterval);
      clearInterval(sparkleInterval);
      clearInterval(fireworkInterval);
    };
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/api/users");
      if (!response.ok) throw new Error("Erreur lors de la récupération des utilisateurs");
      const data: User[] = await response.json();
      setUsers(data);
    } catch (err) {
      setError("Impossible de charger les utilisateurs.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!nom.trim() || !prenom.trim()) {
      setSubmitError("Nom et prénom obligatoires");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nom, prenom }),
      });

      if (!response.ok) throw new Error("Erreur lors de la création de l'utilisateur");

      const newUser: User = await response.json();
      setUsers([...users, newUser]);
      setNom("");
      setPrenom("");
    } catch (err) {
      setSubmitError("Impossible de créer l'utilisateur.");
      console.error(err);
    }
  };

  const handleDeleteUser = async (id: number) => {
    try {
      const response = await fetch(`http://localhost:3000/api/users/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Erreur lors de la suppression de l'utilisateur");
      setUsers(users.filter(user => user.id !== id));
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <p>Chargement des utilisateurs...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <div id="effects"></div>
      <h1>Liste des utilisateurs</h1>

      <form onSubmit={handleSubmit} style={{ marginBottom: "1rem" }}>
        <input
          type="text"
          placeholder="Nom"
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <input
          type="text"
          placeholder="Prénom"
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          style={{ marginRight: "0.5rem" }}
        />
        <button type="submit">Créer utilisateur</button>
      </form>
      {submitError && <p style={{ color: "red" }}>{submitError}</p>}

      {users.length === 0 ? (
        <p>Aucun utilisateur trouvé.</p>
      ) : (
        <ul>
          {users.map((user) => (
            <li key={user.id} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span>{user.nom} {user.prenom}</span>
              <button 
                onClick={() => handleDeleteUser(user.id)} 
                style={{ background: 'none', border: 'none', color: 'red', cursor: 'pointer', fontSize: '1.2rem' }}
                aria-label={`Supprimer ${user.nom} ${user.prenom}`}
              >
                ❌
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
    
  );
}


export default App;