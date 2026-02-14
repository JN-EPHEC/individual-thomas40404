const userList = document.getElementById("userList");
const userForm = document.getElementById("userForm");

const nomInput = document.getElementById("nom");
const prenomInput = document.getElementById("prenom");
const usernameInput = document.getElementById("username");
const passwordInput = document.getElementById("password");

// Affiche la liste des utilisateurs
async function fetchUsers() {
  userList.innerHTML = "";
  try {
    const res = await fetch("/api/users");
    const users = await res.json();

    users.forEach(user => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      const span = document.createElement("span");
      span.textContent = `nom: ${user.nom} prenom: ${user.prenom || ""} - username: ${user.username} - password: ${user.password}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "btn btn-danger btn-sm";

      deleteBtn.addEventListener("click", async () => {
        try {
          const res = await fetch(`/api/users/${user.id}`, { method: "DELETE" });
          if (!res.ok) throw new Error("Erreur lors de la suppression");
          fetchUsers();
        } catch (err) {
          console.error(err);
          alert("Impossible de supprimer l'utilisateur");
        }
      });

      li.appendChild(span);
      li.appendChild(deleteBtn);
      userList.appendChild(li);
    });

  } catch (err) {
    console.error("Erreur lors de la récupération des utilisateurs :", err);
  }
}

// Ajouter un utilisateur
userForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const nom = nomInput.value.trim();
  const prenom = prenomInput.value.trim();
  const username = usernameInput.value.trim();
  const password = passwordInput.value.trim();

  if (!nom || !username || !password) return alert("Nom, username et password sont requis");

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom, username, password })
    });

    if (!res.ok) throw new Error("Erreur lors de l'ajout de l'utilisateur");

    // Réinitialiser le formulaire
    nomInput.value = "";
    prenomInput.value = "";
    usernameInput.value = "";
    passwordInput.value = "";

    fetchUsers();
  } catch (err) {
    console.error(err);
    alert("Impossible d'ajouter l'utilisateur");
  }
});

// Charger la liste au démarrage
fetchUsers();