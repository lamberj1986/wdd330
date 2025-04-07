document.addEventListener('DOMContentLoaded', () => {
    fetch('data/menu.json')
      .then((response) => response.json())
      .then((data) => {
        const list = document.getElementById('product-list');
        data.forEach((item) => {
          const li = document.createElement('li');
          li.textContent = `${item.name} - $${item.price}`;
          list.appendChild(li);
        });
      });
  });  