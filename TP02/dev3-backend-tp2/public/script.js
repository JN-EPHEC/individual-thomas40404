// Récupère les éléments du DOM
const userList = document.getElementById("userList");
const userForm = document.getElementById("userForm");
const nomInput = document.getElementById("nom");
const prenomInput = document.getElementById("prenom");

// Fonction pour afficher les utilisateurs
async function fetchUsers() {
  userList.innerHTML = ""; // Vide la liste
  try {
    const res = await fetch("/api/users");
    const users = await res.json();
    users.forEach(user => {
      const li = document.createElement("li");
      li.className = "list-group-item d-flex justify-content-between align-items-center";

      const span = document.createElement("span");
      span.textContent = `${user.nom} ${user.prenom || ""}`;

      const deleteBtn = document.createElement("button");
      deleteBtn.textContent = "X";
      deleteBtn.className = "btn btn-danger btn-sm";

      deleteBtn.addEventListener("click", async () => {
        try {
          const res = await fetch(`/api/users/${user.id}`, {
            method: "DELETE",
          });

          if (!res.ok) throw new Error("Erreur lors de la suppression");

          fetchUsers(); // Rafraîchir la liste après suppression
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

// Soumission du formulaire
userForm.addEventListener("submit", async (e) => {
  e.preventDefault(); // Empêche le rechargement de la page
  const nom = nomInput.value.trim();
  const prenom = prenomInput.value.trim();

  if (!nom) return alert("Le nom est requis");

  try {
    const res = await fetch("/api/users", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ nom, prenom }),
    });

    if (!res.ok) throw new Error("Erreur lors de l'ajout de l'utilisateur");

    nomInput.value = "";
    prenomInput.value = "";

    fetchUsers(); // Rafraîchit la liste
  } catch (err) {
    console.error(err);
    alert("Impossible d'ajouter l'utilisateur");
  }
});

// Charger les utilisateurs au démarrage
fetchUsers();