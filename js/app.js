const listStudentsButton = document.getElementById('listStudentsButton');
const createStudentForm = document.getElementById('createStudentForm');
const studentsContainer = document.getElementById('studentsContainer');

// Function to list students
async function listStudents() {
    const response = await fetch('https://pje4h805t4.execute-api.us-west-2.amazonaws.com/dev/students');
    const students = await response.json();
    displayStudents(students);
}

// Function to display students
function displayStudents(students) {
    studentsContainer.innerHTML = '';
    for (const student of students) {
        const studentCard = document.createElement('div');
        studentCard.classList.add('student-card');
        studentCard.innerHTML = `
            <h2>${student.nombre}</h2>
            <p>Address: ${student.direccion}</p>
            <p>Phone: ${student.telefono}</p>
        `;
        studentsContainer.appendChild(studentCard);
    }
}

// Function to create a student
async function createStudent(event) {
    event.preventDefault();
    const formData = new FormData(createStudentForm);
    const response = await fetch('https://pje4h805t4.execute-api.us-west-2.amazonaws.com/dev/students', {
        method: 'POST',
        body: JSON.stringify({
            name: formData.get('name'),
            address: formData.get('address'),
            phone: formData.get('phone'),
        }),
        headers: {
            'Content-Type': 'application/json',
        },
    });
    if (response.ok) {
        listStudents();
        createStudentForm.reset();
    }
}

// Event listeners
listStudentsButton.addEventListener('click', listStudents);
createStudentForm.addEventListener('submit', createStudent);

// Initial load
listStudents();