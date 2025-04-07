document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('account-form');
    const orderList = document.getElementById('order-history');
  
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = document.getElementById('name').value;
      const email = document.getElementById('email').value;
      localStorage.setItem('customerInfo', JSON.stringify({ name, email }));
      alert('Profile updated!');
    });
  
    const savedInfo = JSON.parse(localStorage.getItem('customerInfo'));
    if (savedInfo) {
      document.getElementById('name').value = savedInfo.name;
      document.getElementById('email').value = savedInfo.email;
    }
  
    fetch('data/orders.json')
      .then((res) => res.json())
      .then((orders) => {
        orders.forEach((order) => {
          const li = document.createElement('li');
          li.textContent = `${order.date} - ${order.items.join(', ')} - ${order.status}`;
          orderList.appendChild(li);
        });
      });
  });
  