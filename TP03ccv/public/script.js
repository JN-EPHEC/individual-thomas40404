async function fetchUsers() {
  const ul = document.getElementById('user-list');
  ul.innerHTML = '';

  try {
    const res = await fetch('/api/users');
    const users = await res.json();

    users.forEach(user => {
      const li = document.createElement('li');
      li.className = 'list-group-item d-flex justify-content-between align-items-center';
      li.textContent = `${user.nom} ${user.prenom}`;
      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = 'X';
      deleteBtn.className = 'btn btn-danger btn-sm';
       deleteBtn.onclick = async () => {
          try {
              const res = await fetch(`/api/users/${user.id}`, { method: 'DELETE' });
              if (res.ok) {
                  fetchUsers(); // rafraîchir la liste après suppression
              } else {
                  console.error('Erreur lors de la suppression de l’utilisateur');
              }
          } catch (err) {
              console.error('Erreur réseau lors de la suppression:', err);
          }
      };
      li.appendChild(deleteBtn);
      ul.appendChild(li);
      
    });
  } catch (err) {
    console.error('Erreur lors de la récupération des utilisateurs:', err);
  }
}

async function handleForm(event) {
  event.preventDefault();

  const nomInput = document.getElementById('nom');
  const prenomInput = document.getElementById('prenom');

  const data = {
    nom: nomInput.value,
    prenom: prenomInput.value
  };

  try {
    const res = await fetch('/api/users', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data)
    });

    if (res.ok) {
      nomInput.value = '';
      prenomInput.value = '';
      fetchUsers();
    } else {
      console.error('Erreur lors de la création de l’utilisateur');
    }
  } catch (err) {
    console.error('Erreur réseau :', err);
  }
}

document.addEventListener('DOMContentLoaded', () => {
  fetchUsers();
  const form = document.getElementById('user-form');
  form.addEventListener('submit', handleForm);
});
