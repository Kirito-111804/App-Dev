const categorySelect = document.getElementById('category');
const exerciseSelect = document.getElementById('exercise');



const exerciseTypes = {
    "Endurance": ["Running", "Swimming", "Cycling"],
    "Strength": ["Weightlifting", "Bodyweight exercises", "Yoga"],
    "Balance": ["Tai Chi", "Pilates", "Yoga"],
    "Flexibility": ["Stretching", "Yoga", "Pilates"],
    "Cardio": ["Running", "Swimming", "Cycling"]
};

function populateExercises() {
    const selectedCategory = categorySelect.value;
    const exerciseOptions = exerciseTypes[selectedCategory];

    // Clear existing options
    exerciseSelect.innerHTML = '';

    // Add options based on the selected category
    if (exerciseOptions) {
        exerciseOptions.forEach(exercise => {
            const option = document.createElement('option');
            option.value = exercise;
            option.text = exercise;
            exerciseSelect.appendChild(option);
        });
    }
}

categorySelect.addEventListener('change', populateExercises);

const table = document.querySelector('table');
const addRowButton = document.getElementById('addRow');

addRowButton.addEventListener('click', () => {
    const row = table.insertRow(-1);
    const cell1 = row.insertCell(0);
    const cell2 = row.insertCell(1);
    const cell3 = row.insertCell(2);
    const cell4 = row.insertCell(3);


    // Clone the select elements

    const categorySelectClone = categorySelect.cloneNode(true);
    const exerciseSelectClone = exerciseSelect.cloneNode(true);
    const durationInputClone = document.getElementById('duration').cloneNode(true);

    cell1.appendChild(categorySelectClone);
    cell2.appendChild(exerciseSelectClone);
    cell3.appendChild(durationInputClone);


    const categorySelectCloneEvent = categorySelectClone.querySelector('select');
    const exerciseSelectCloneEvent = exerciseSelectClone.querySelector('select');

    categorySelectCloneEvent.addEventListener('change', () => {
        const selectedCategory = categorySelectCloneEvent.value;
        const exerciseOptions = exerciseTypes[selectedCategory];

        // Clear existing options
        exerciseSelectCloneEvent.innerHTML = '';

        // Add options based on the selected category
        if (exerciseOptions) {
            exerciseOptions.forEach(exercise => {
                const option = document.createElement('option');
                option.value = exercise;
                option.text = exercise;
                exerciseSelectCloneEvent.appendChild(option);
            });
        }
    });
});
// Add event listeners for the edit and delete buttons
const editButtons = document.querySelectorAll('.edit-btn');
const deleteButtons = document.querySelectorAll('.delete-btn');

editButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // TO DO: implement edit functionality
        console.log('Edit button clicked');
    });
});

deleteButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // TO DO: implement delete functionality
        console.log('Delete button clicked');
    });
});

// Get the table
const historyTable = document.getElementById('history-table');

// Create an array to store the history data
let historyData = [];

// Add an event listener to the "SAVE" button
document.getElementById('save-btn').addEventListener('click', () => {
    // Get the form data
    const category = document.getElementById('category').value;
    const exercise = document.getElementById('exercise').value;
    const duration = document.getElementById('duration').value;

    // Create a new history item
    const historyItem = {
        category: category,
        exercise: exercise,
        duration: duration
    };

    // Add the history item to the array
    historyData.push(historyItem);

    // Clear the form
    document.getElementById('category').value = '';
    document.getElementById('exercise').value = '';
    document.getElementById('duration').value = '';

    // Update the history table
    updateHistoryTable();
});

// Function to update the history table
function updateHistoryTable() {
    // Clear the table
    historyTable.innerHTML = '';

    // Create the table header
    const tableHeader = `
    <tr>
      <th>Category</th>
      <th>Exercise</th>
      <th>Duration</th>
      <th>Edit</th>
      <th>Delete</th>
    </tr>
  `;
    historyTable.innerHTML = tableHeader;

    // Create the table rows
    historyData.forEach((historyItem, index) => {
        const tableRow = `
      <tr>
        <td>${historyItem.category}</td>
        <td>${historyItem.exercise}</td>
        <td>${historyItem.duration}</td>
        <td><button class="edit-btn" onclick="editHistoryItem(${index})">Edit</button></td>
        <td><button class="delete-btn" onclick="deleteHistoryItem(${index})">Delete</button></td>
      </tr>
    `;
        historyTable.innerHTML += tableRow;
    });
}

// Function to edit a history item
function editHistoryItem(index) {
    // Get the history item
    const historyItem = historyData[index];

    // Populate the form with the history item data
    document.getElementById('category').value = historyItem.category;
    document.getElementById('exercise').value = historyItem.exercise;
    document.getElementById('duration').value = historyItem.duration;
}

// Function to delete a history item
function deleteHistoryItem(index) {
    // Remove the history item from the array
    historyData.splice(index, 1);

    // Update the history table
    updateHistoryTable();
}

// Get the menu links
const menuLinks = document.querySelectorAll('.Menu a');

// Add an event listener to each menu link
menuLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    // Prevent the default link behavior
    e.preventDefault();

    // Get the link's href attribute
    const href = link.getAttribute('href');

    // Load the corresponding HTML content
    fetch(href)
      .then((response) => response.text())
      .then((html) => {
        // Get the main content element
        const mainContent = document.querySelector('main');

        // Update the main content with the new HTML
        mainContent.innerHTML = html;
      });
  });
});