// Get the elements
const logContainer = document.getElementById('log-container');
const exerciseForm = document.getElementById('exercise-form');
const categorySelect = document.getElementById('category');
const exerciseSelect = document.getElementById('exercise');
const durationInput = document.getElementById('duration');
const setsInput = document.getElementById('sets');
const repsInput = document.getElementById('reps');

// Add event listeners
exerciseForm.addEventListener('submit', saveExercise);

// Function to add a new log
function addNewLog(category, exercise, sets, reps, duration) {
    // Check if any input is empty
    const isEmpty = !category || !exercise || !sets || !reps || !duration;

    let status;
    if (isEmpty) {
        status = 'Pending';
    } else {
        const dueDate = new Date(duration); // Use the duration input as the due date
        const today = new Date();

        // Set the status based on the due date
        status = today < dueDate ? 'Ongoing' : 'Done';
    }

    // Create a new table row
    const newRow = document.createElement('tr');
    newRow.innerHTML = `
        <td></td>
        <td>${category || 'N/A'}</td>
        <td>${exercise || 'N/A'}</td>
        <td>${sets || 'N/A'}</td>
        <td>${reps || 'N/A'}</td>
        <td>${duration || 'N/A'}</td>
        <td>${getCurrentDate()}</td>
        <td>${status}</td>
        <td><button class="delete">DELETE</button></td>
    `;

    // Add the new row to the table
    logContainer.querySelector('tbody').appendChild(newRow);

    // Add delete functionality to the new button
    const deleteButton = newRow.querySelector('.delete');
    deleteButton.addEventListener('click', function() {
        newRow.remove();
    });
}

// Function to save an exercise
function saveExercise(event) {
    event.preventDefault();

    // Get the form data
    const category = categorySelect.value;
    const exercise = exerciseSelect.value;
    const duration = durationInput.value; // This should be the due date
    const sets = setsInput.value;
    const reps = repsInput.value;

    // Add a new log to the table
    addNewLog(category, exercise, sets, reps, duration);

    // Reset the form
    exerciseForm.reset(); // This line resets the form without affecting the table
}

// Function to get the current date in YYYY-MM-DD format
function getCurrentDate() {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// Function to populate exercise options based on category
function populateExerciseOptions(category) {
    const exerciseOptions = getExerciseOptions(category);

    // Clear the exercise select options
    exerciseSelect.innerHTML = '';

    // Add the exercise options to the select
    exerciseOptions.forEach(option => {
        const newOption = document.createElement('option');
        newOption.value = option;
        newOption.textContent = option;
        exerciseSelect.appendChild(newOption);
    });
}

// Function to get exercise options for a category
function getExerciseOptions(category) {
    const exerciseOptions = {
        'Endurance': ["Select an exercise", 'Running', 'Swimming', 'Cycling'],
        'Strength': ["Select an exercise", 'Weightlifting', 'Bodyweight', 'Resistance Band'],
        'Flexibility': ["Select an exercise", 'Yoga', 'Pilates', 'Stretching'],
        'Cardio': ["Select an exercise", "Jumping jacks", "Jogging", "HighKnee"]
    };

    return exerciseOptions[category] || [];
}

// Add event listener to category select
categorySelect.addEventListener('change', event => {
    populateExerciseOptions(event.target.value);
});
