import { menuArray } from "./data.js";

const containerDiv = document.getElementById("container");

const removeList = document.getElementById("order-paragraph");
let orderSection = document.getElementById("ordered-items");
let totalPrice = document.getElementById("total-usd");
const submitPayment = document.getElementById("payment-form");
const cardBtn = document.getElementById("card");

let selectedItems = [];
let counter = 0;

document.addEventListener("click", function (e) {
  if (e.target.dataset.add) {
    handleMenuItems(e.target.dataset.add);
  } else if (e.target.dataset.remove) {
    removeOrder(e.target.dataset.remove);
  }
});

function handleMenuItems(itemId) {
  const targetMenuObj = menuArray.filter(function (menu) {
    return menu.id === Number(itemId);
  })[0];
  selectedItems.push(targetMenuObj);
  counter++;
  //console.log(counter);
  renderOrder();
}

function removeOrder(indexToDelete) {
  // you need to remove passing the index of the item to delete

  delete selectedItems[indexToDelete];
  // console.log(counter);
  counter--;
  renderOrder();
  if (counter === 0) {
    resetItems();
  }
}

// Render HTML
function getHtml() {
  let feedHtml = "";

  menuArray.forEach(function (menu) {
    feedHtml += `

    <section class="food second-food">
          <span class="food-emoji"/>${menu.emoji}</span>
          <div class="menu">
            <h2 class="food-title">${menu.name}</h2>
            <p>${menu.ingredients}</p>
            <h3 class="price">$${menu.price}</h3>
          </div>
          <span>
          <i class="fa-solid fa-circle-plus" data-add="${menu.id}"></i>
</span>

        </section> 
   `;
  });

  return feedHtml;
}

function getOrderedItems() {
  let total = 0;

  let orderedItems = `
  <h2 class="your-order">Your order</h2>
  `;

  selectedItems.forEach(function (menu, index) {
    // you need the index here for your data-remove
    document.getElementById("ordered-items").style.display = "block";

    total += menu.price;
    orderedItems += `
    <div class="order-div" id="order-div">  
      <h3 class="order-name">${menu.name}</h3>
      <p class="order-paragraph" id="order-paragraph" data-remove="${index}">remove</p>
      <h4 class="order-price">$${menu.price}</h4>
      </div>
     
        `;
  });

  orderedItems += `
  <hr />
  <div class="order-div2" id="order-div2">  
  <h3 class="total-amount">Total Price</h3>
  <h4 id="total-usd">$${total}</h4>
  </div>
  
  <button class="complete" id="complete">Complete Order</button>

  `;

  return orderedItems;
}

// Render menu items
function renderMenu() {
  document.getElementById("container").innerHTML = getHtml();
}
renderMenu();
let name;
// Preventing default
submitPayment.addEventListener("submit", function (e) {
  e.preventDefault();

  const submitPaymentFormData = new FormData(submitPayment);
  name = submitPaymentFormData.get("clientName");
  console.log(submitPaymentFormData);
});

// Rendering order
function renderOrder() {
  document.getElementById("ordered-items").innerHTML = getOrderedItems();

  const completeBtn = document.getElementById("complete");

  completeBtn.addEventListener("click", function (e) {
    cardBtn.style.display = "block";
  });

  const payBtn = document.getElementById("payment-form");
  payBtn.addEventListener("submit", function () {
    cardBtn.style.display = "none";

    setTimeout(function () {
      document.getElementById("ordered-items").innerHTML = `
    
    <p class="saving-info"> Saving info...</p>
    `;
    }, 1500);

    setTimeout(function () {
      document.getElementById("ordered-items").innerHTML = `
      <p class="waiting-order" id="waiting-order">Thanks, ${name}! Your order is on its way!</p>
    ; `;
    }, 3000);
  });
}

renderOrder();

// Close button for input form
const closeBtn = document.getElementById("close-btn");
closeBtn.addEventListener("click", function () {
  cardBtn.style.display = "none";
});

function resetItems() {
  orderSection.innerHTML = "";
}
