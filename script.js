let TableauTaches = [];
let taskNumber = 1; // Initialisation du compteur de numéros

// Fonction pour ajouter une tâche
function AjouterTache() {
    const taskText = document.getElementById('new-task').value.trim();

    if (taskText === '') {
        alert("Veuillez entrer une tâche !");
        return;
    }

    // Ajouter la tâche au tableau TableauTaches
    TableauTaches.push({ text: taskText, isCompleted: false });
    console.log(TableauTaches);

    AjouterTacheHTML(taskText);
    document.getElementById('new-task').value = '';
}

// Fonction pour afficher la tâche dans le tableau HTML
function AjouterTacheHTML(taskText) {
    const taskContainer = document.getElementById('task-container');
    
    // Crée une nouvelle ligne de tableau pour la tâche
    const taskRow = document.createElement('tr');

    // Colonne pour le numéro de la tâche
    const numberCell = document.createElement('td');
    numberCell.textContent = taskNumber++; // Affiche et incrémente le numéro

    // Colonne pour la case à cocher
    const checkboxCell = document.createElement('td');
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.addEventListener('change', function () {
        MarquerTacheCommeTerminee(checkbox, taskRow, taskText);
    });
    checkboxCell.appendChild(checkbox);

    // Colonne pour la description de la tâche
    const descriptionCell = document.createElement('td');
    descriptionCell.textContent = taskText;

    // Colonne pour le bouton de suppression
    const actionsCell = document.createElement('td');
    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Supprimer';
    deleteBtn.addEventListener('click', function () {
        taskContainer.removeChild(taskRow);
        // Supprimer la tâche du tableau global si supprimée
        const index = TableauTaches.findIndex(t => t.text === taskText);
        if (index > -1) {
            TableauTaches.splice(index, 1);
        }
    });
    actionsCell.appendChild(deleteBtn);

    // Ajoute les cellules à la ligne de tableau
    taskRow.appendChild(numberCell);
    taskRow.appendChild(checkboxCell);
    taskRow.appendChild(descriptionCell);
    taskRow.appendChild(actionsCell);

    // Ajoute la ligne de tableau au tableau des tâches
    taskContainer.appendChild(taskRow);
}

// Fonction pour marquer une tâche comme terminée
function MarquerTacheCommeTerminee(checkbox, taskRow, taskText) {
    const taskIndex = TableauTaches.findIndex(t => t.text === taskText);
    if (taskIndex !== -1) {
        TableauTaches[taskIndex].isCompleted = checkbox.checked;
    }

    // Appliquer un style barré si la tâche est terminée
    const descriptionCell = taskRow.querySelector('td:nth-child(3)');
    if (checkbox.checked) {
        descriptionCell.style.textDecoration = 'line-through';
    } else {
        descriptionCell.style.textDecoration = 'none';
    }
}

// Fonction pour filtrer les tâches
function FiltrerTaches(filterType) {
  const taskRows = document.querySelectorAll('#task-container tr');
  taskRows.forEach(row => {
      const checkbox = row.querySelector('input[type="checkbox"]');
      if (checkbox) {
          const isChecked = checkbox.checked;
          if (filterType === 'all') {
              row.style.display = ''; // Afficher toutes les tâches
          } else if (filterType === 'completed' && isChecked) {
              row.style.display = ''; // Afficher les tâches complètes
          } else if (filterType === 'pending' && !isChecked) {
              row.style.display = ''; // Afficher les tâches en attente
          } else {
              row.style.display = 'none'; // Masquer les autres tâches
          }
      }
  });
}

// Ajouter un gestionnaire d'événement au bouton "Ajouter"
document.getElementById('add-task-btn').addEventListener('click', AjouterTache);

// Ajouter un gestionnaire d'événement au filtre (menu déroulant)
document.getElementById('task-filter').addEventListener('change', function () {
    const selectedValue = this.value;
    FiltrerTaches(selectedValue);
});
