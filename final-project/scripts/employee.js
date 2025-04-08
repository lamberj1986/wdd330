document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const employeeContent = document.getElementById('employee-content');
    const trainingList = document.getElementById('training-list');
    const loggedInUsersList = document.getElementById('logged-in-users');
  
    let currentUser = null;
  
    loginForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const user = document.getElementById('username').value;
      const pass = document.getElementById('password').value;
  
      fetch('data/employees.json')
        .then(res => res.json())
        .then(employees => {
          const found = employees.find(emp => emp.username === user && emp.password === pass);
          if (found) {
            currentUser = found;
            loginForm.style.display = 'none';
            employeeContent.style.display = 'block';
            if (found.role === 'admin') {
              loadAllTrainings(employees);
              displayClockedInUsers(employees);
            } else {
              loadEmployeeTrainings(found);
            }
          } else {
            alert('Invalid credentials.');
          }
        });
    });
  
    document.getElementById('clock-in').addEventListener('click', () => {
      if (currentUser) {
        updateClockStatus(currentUser.username, true);
        alert('Clocked In');
      }
    });
  
    document.getElementById('clock-out').addEventListener('click', () => {
      if (currentUser) {
        updateClockStatus(currentUser.username, false);
        alert('Clocked Out');
      }
    });
  
    function loadEmployeeTrainings(user) {
      trainingList.innerHTML = '';
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `<th>Title</th><th>Status</th>`;
      trainingList.appendChild(headerRow);
  
      user.training.forEach(mod => {
        const row = document.createElement('tr');
        row.innerHTML = `<td>${mod.title}</td><td>${mod.status}</td>`;
        trainingList.appendChild(row);
      });
    }
  
    function loadAllTrainings(employees) {
      trainingList.innerHTML = '';
      const headerRow = document.createElement('tr');
      headerRow.innerHTML = `<th>Name</th><th>Title</th><th>Status</th>`;
      trainingList.appendChild(headerRow);
  
      employees.forEach(emp => {
        if (emp.training && emp.training.length > 0) {
          emp.training.forEach(mod => {
            const row = document.createElement('tr');
            row.innerHTML = `<td>${emp.name}</td><td>${mod.title}</td><td>${mod.status}</td>`;
            trainingList.appendChild(row);
          });
        }
      });
    }
  
    function updateClockStatus(username, status) {
      fetch('data/employees.json')
        .then(res => res.json())
        .then(employees => {
          const userIndex = employees.findIndex(emp => emp.username === username);
          if (userIndex !== -1) {
            employees[userIndex].clockedIn = status;
  
            fetch('update-employees', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(employees)
            })
              .then(res => res.json())
              .then(() => {
                if (currentUser.role === 'admin') {
                  displayClockedInUsers(employees);
                }
              });
          }
        });
    }
  
    function displayClockedInUsers(employees) {
      if (loggedInUsersList) {
        loggedInUsersList.innerHTML = '<h3>Employees Currently on the Clock:</h3>';
  
        const clockedIn = employees.filter(emp => emp.clockedIn);
  
        const table = document.createElement('table');
        table.classList.add('styled-table');
  
        const headerRow = document.createElement('tr');
        headerRow.innerHTML = '<th>Name</th><th>Username</th>';
        table.appendChild(headerRow);
  
        clockedIn.forEach(emp => {
          const row = document.createElement('tr');
          row.innerHTML = `<td>${emp.name}</td><td>${emp.username}</td>`;
          table.appendChild(row);
        });
  
        loggedInUsersList.appendChild(table);
      }
    }
  });
  