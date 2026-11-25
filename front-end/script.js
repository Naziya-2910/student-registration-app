
console.log("Student Registration App Started");

const studentForm = document.getElementById("studentForm");
const studentDetails = document.getElementById("studentDetails");

async function loadStudents() {

    const response = await fetch("http://localhost:8080/students");

    const students = await response.json();

    studentDetails.innerHTML = "";

    students.forEach(student => {

        studentDetails.innerHTML += `
            <div>
                <h3>${student.name}</h3>
                <p>Email: ${student.email}</p>
                <p>Phone: ${student.phone}</p>
                <p>Course: ${student.course}</p>
            </div>
            <hr>
        `;
    });
}

studentForm.addEventListener("submit", async function(event) {

    event.preventDefault();

    const student = {
        name: document.getElementById("studentName").value,
        email: document.getElementById("email").value,
        phone: document.getElementById("phone").value,
        course: document.getElementById("course").value
    };

    try {

        const response = await fetch("http://localhost:8080/students", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(student)
        });

        const result = await response.text();

        if (!response.ok) {
            throw new Error(result);
        }

        alert(result);

        studentForm.reset();

        loadStudents();

    } catch (error) {

        console.error("Error:", error);
        alert("Unable to register student. Please try again.");

    }

});

loadStudents();