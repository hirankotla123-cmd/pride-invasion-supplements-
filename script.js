let cart = [];
const cartCount = document.getElementById('cart-count');
const cartList = document.getElementById('cart-list');
const totalDisplay = document.getElementById('total');

document.querySelectorAll('.add-cart').forEach(button => {
  button.addEventListener('click', () => {
    const name = button.getAttribute('data-name');
    const price = parseInt(button.getAttribute('data-price'));
    cart.push({ name, price });
    updateCart();
  });
});

function updateCart() {
  cartList.innerHTML = '';
  let total = 0;
  cart.forEach(item => {
    total += item.price;
    const li = document.createElement('li');
    li.textContent = `${item.name} - ₹${item.price}`;
    cartList.appendChild(li);
  });
  cartCount.textContent = cart.length;
  totalDisplay.textContent = `Total: ₹${total}`;
}

// PHONEPE PAYMENT
const phonepeBtn = document.getElementById('phonepe-btn');
phonepeBtn.addEventListener('click', () => {
  let total = 0;
  cart.forEach(item => total += item.price);
  const upiLink = `upi://pay?pa=7671078991@upi&pn=PrideInvasion&am=${total}&cu=INR&tn=Pride%20Invasion%20Order`;
  window.location.href = upiLink;
});
