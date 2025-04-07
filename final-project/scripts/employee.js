document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const employeeContent = document.getElementById('employee-content');
    const trainingList = document.getElementById('training-list');
  
    let currentEmployee = null;
  
    loginForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      const user = document.getElementById('username').value;
      const pass = document.getElementById('password').value;
  
      const res = await fetch('data/employees.json');
      const employees = await res.json();
  
      const found = employees.find(emp => emp.username === user && emp.password === pass);
  
      if (found) {
        currentEmployee = found;
        loginForm.style.display = 'none';
        employeeContent.style.display = 'block';
        loadTraining(found.training);
      } else {
        alert('Invalid credentials.');
      }
    });
  
    function loadTraining(trainingModules) {
        const trainingList = document.getElementById('training-list');
        trainingList.innerHTML = '';
        trainingModules.forEach(mod => {
          const row = document.createElement('tr');
      
          const titleCell = document.createElement('td');
          titleCell.textContent = mod.title;
      
          const statusCell = document.createElement('td');
          statusCell.textContent = mod.status;
      
          row.appendChild(titleCell);
          row.appendChild(statusCell);
          trainingList.appendChild(row);
        });
    }
  
    document.getElementById('clock-in').addEventListener('click', () => {
      if (currentEmployee) {
        alert(`${currentEmployee.name} clocked in!`);
      }
    });
  
    document.getElementById('clock-out').addEventListener('click', () => {
      if (currentEmployee) {
        alert(`${currentEmployee.name} clocked out!`);
      }
    });
  });
  