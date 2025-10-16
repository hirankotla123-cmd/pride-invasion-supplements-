document.addEventListener('DOMContentLoaded', () => {

  // MOBILE MENU TOGGLE
  const mobileMenu = document.getElementById('mobile-menu');
  const navList = document.querySelector('.nav-list');
  mobileMenu.addEventListener('click', () => {
    navList.classList.toggle('active');
  });

  // CART
  let cart = [];
  const cartCount = document.getElementById('cart-count');
  const cartList = document.getElementById('cart-list');
  const totalDisplay = document.getElementById('total');
  const cartPanel = document.getElementById('cart-panel');
  const cartBtn = document.getElementById('cart-btn');
  const paytmBtn = document.getElementById('paytm-btn');

  // Add to Cart buttons with SARMs warning
  document.querySelectorAll('.add-cart').forEach(button => {
    button.addEventListener('click', () => {
      const name = button.getAttribute('data-name');
      const price = parseInt(button.getAttribute('data-price'));
      const warning = button.getAttribute('data-warning');

      if (warning) alert(warning); // show SARMs warning

      const existing = cart.find(item => item.name === name);
      if (existing) {
        existing.quantity += 1;
      } else {
        cart.push({ name, price, quantity: 1 });
      }

      updateCart();
      openCart();
    });
  });

  // Update cart display
  function updateCart() {
    cartList.innerHTML = '';
    let total = 0;

    cart.forEach((item, index) => {
      total += item.price * item.quantity;

      const li = document.createElement('li');
      li.classList.add('cart-item');

      const span = document.createElement('span');
      span.textContent = `${item.name} - ₹${item.price * item.quantity}`;
      li.appendChild(span);

      const qtyDiv = document.createElement('div');

      const minusBtn = document.createElement('button');
      minusBtn.textContent = '-';
      minusBtn.addEventListener('click', () => {
        if (item.quantity > 1) {
          item.quantity -= 1;
        } else {
          cart.splice(index, 1);
        }
        updateCart();
      });

      const qtySpan = document.createElement('span');
      qtySpan.textContent = item.quantity;
      qtySpan.style.margin = '0 8px';

      const plusBtn = document.createElement('button');
      plusBtn.textContent = '+';
      plusBtn.addEventListener('click', () => {
        item.quantity += 1;
        updateCart();
      });

      qtyDiv.appendChild(minusBtn);
      qtyDiv.appendChild(qtySpan);
      qtyDiv.appendChild(plusBtn);
      li.appendChild(qtyDiv);

      const removeBtn = document.createElement('button');
      removeBtn.textContent = '❌';
      removeBtn.style.marginLeft = '10px';
      removeBtn.addEventListener('click', () => {
        cart.splice(index, 1);
        updateCart();
      });

      li.appendChild(removeBtn);

      cartList.appendChild(li);
    });

    cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
    totalDisplay.textContent = `Total: ₹${total}`;
  }

  // Cart open/close
  function openCart() { cartPanel.style.right = '0'; }
  function closeCart() { cartPanel.style.right = '-400px'; }

  cartBtn.addEventListener('click', () => {
    if (cartPanel.style.right === '0px') {
      closeCart();
    } else {
      openCart();
    }
  });

  // PAYTM PAYMENT
  paytmBtn.addEventListener('click', () => {
    if (cart.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const paytmUPI = `upi://pay?pa=7671078991@pthdfc&pn=PrideInvasion&am=${total}&cu=INR&tn=Pride%20Invasion%20Order`;
    window.location.href = paytmUPI;
  });

  // EMAIL ORDER
  const emailOrderBtn = document.getElementById('email-order');

  emailOrderBtn.addEventListener('click', () => {
    if(cart.length === 0){
      alert('Your cart is empty!');
      return;
    }

    const name = document.getElementById('buyer-name').value.trim();
    const email = document.getElementById('buyer-email').value.trim();
    const phone = document.getElementById('buyer-phone').value.trim();
    const address = document.getElementById('buyer-address').value.trim();

    if(!name || !email || !phone || !address){
      alert('Please fill all fields!');
      return;
    }

    let orderText = `Order Details:\n\n`;
    cart.forEach(item => {
      orderText += `${item.name} x${item.quantity} - ₹${item.price * item.quantity}\n`;
    });

    const total = cart.reduce((sum,item)=>sum+item.price*item.quantity,0);
    orderText += `\nTotal: ₹${total}\n\n`;
    orderText += `Buyer Info:\nName: ${name}\nEmail: ${email}\nPhone: ${phone}\nAddress: ${address}`;

    const mailtoLink = `mailto:hitmanhitmanty@gmail.com?subject=Pride Invasion Order&body=${encodeURIComponent(orderText)}`;
    window.location.href = mailtoLink;
  });

});
