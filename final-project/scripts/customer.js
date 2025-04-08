document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const errorMessage = document.getElementById('error-message');
    const accountInfoSection = document.getElementById('account-info');
    const pastOrdersSection = document.getElementById('past-orders');
    const preferencesSection = document.getElementById('preferences');
    const accountForm = document.getElementById('account-form');
    
    let currentUser = null;

    // Handle login form submission
    loginForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;

        fetch('data/users.json')
            .then(res => res.json())
            .then(users => {
                // Hide the login section
                const loginSection = document.getElementById('login-section');
                loginSection.style.display = 'none';
                
                const foundUser = users.find(user => user.username === username && user.password === password);
                
                if (foundUser) {
                    currentUser = foundUser;
                    localStorage.setItem('currentUser', JSON.stringify(currentUser));  // Store current user info

                    // Hide login section and show the account sections
                    loginForm.style.display = 'none';
                    errorMessage.style.display = 'none';  // Hide any error messages
                    accountInfoSection.style.display = 'block';
                    pastOrdersSection.style.display = 'block';
                    preferencesSection.style.display = 'block';

                    // Display user account info
                    document.getElementById('name').value = foundUser.name;
                    document.getElementById('email').value = foundUser.email;
                    document.getElementById('username').textContent = `Username: ${foundUser.username}`;

                    // Fetch and display past orders
                    loadOrders(foundUser.orderHistory);

                    // Display preferences
                    loadPreferences(foundUser.preferences);
                } else {
                    errorMessage.textContent = 'Invalid credentials. Please try again.';
                }
            })
            .catch(error => {
                errorMessage.textContent = 'An error occurred while trying to log in.';
            });
    });

    // Fetch and display past orders in a table
    function loadOrders(orderHistory) {
        fetch('data/orders.json')
            .then(res => res.json())
            .then(orders => {
                const ordersList = document.getElementById('orders-list');
                // Clear existing orders
                ordersList.innerHTML = '';

                orderHistory.forEach(orderId => {
                    const order = orders.find(order => order.orderID === orderId);
                    if (order) {
                        const row = document.createElement('tr');
                        
                        // Create table cells for each order property
                        const dateCell = document.createElement('td');
                        dateCell.textContent = order.date;
                        row.appendChild(dateCell);

                        const orderIdCell = document.createElement('td');
                        orderIdCell.textContent = order.orderID;
                        row.appendChild(orderIdCell);

                        const itemsCell = document.createElement('td');
                        itemsCell.textContent = order.items.join(', ');
                        row.appendChild(itemsCell);

                        const statusCell = document.createElement('td');
                        statusCell.textContent = order.status;
                        row.appendChild(statusCell);

                        // Append the row to the table
                        ordersList.appendChild(row);
                    }
                });
            });
    }

    // Load and display user preferences
    function loadPreferences(preferences) {
        const preferencesList = document.getElementById('preferences-list');
        preferencesList.innerHTML = '';

        if (preferences && preferences.favoriteItems) {
            const favoriteItems = document.createElement('p');
            favoriteItems.textContent = `Favorite Items: ${preferences.favoriteItems.join(', ')}`;
            preferencesList.appendChild(favoriteItems);
        }
    }
});
