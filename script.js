const totalRent = 3850;
let smallRoomPrice = 750;
const smallRoomMin = 0;
const smallRoomMax = 750;

function updatePrices() {
  const premiumPercent = parseFloat(document.getElementById("masterPremium").value);
  document.getElementById("premiumValue").textContent = premiumPercent;

  const premiumMultiplier = 1 + premiumPercent / 100;
  const remaining = totalRent - smallRoomPrice;
  const sharedRooms = 4; // 3 regular + 1 master

  const baseCost = remaining / (sharedRooms - 1 + premiumMultiplier);
  const masterRoom = baseCost * premiumMultiplier;
  const regularRoom = baseCost;

  const roomHTML = `
    <div class="room-box"><h3>Room 1</h3>$${regularRoom.toFixed(2)}</div>
    <div class="room-box"><h3>Room 2</h3>$${regularRoom.toFixed(2)}</div>
    <div class="room-box"><h3>Room 3</h3>$${regularRoom.toFixed(2)}</div>
    <div class="room-box"><h3>Master Room</h3>$${masterRoom.toFixed(2)}</div>
  `;

  document.getElementById("roomDisplay").innerHTML = roomHTML;
  document.getElementById("smallRoomDisplay").textContent = smallRoomPrice.toFixed(2);
}

function decreaseBid() {
  if (smallRoomPrice - 25 >= smallRoomMin) {
    smallRoomPrice -= 25;
    updatePrices();
  }
}

function increaseBid() {
  if (smallRoomPrice + 25 <= smallRoomMax) {
    smallRoomPrice += 25;
    updatePrices();
  }
}

function setCustomBid() {
  const value = parseFloat(document.getElementById("customBidInput").value);
  if (isNaN(value)) {
    alert("Please enter a valid number.");
    return;
  }
  if (value < smallRoomMin || value > smallRoomMax) {
    alert(`Bid must be between $${smallRoomMin} and $${smallRoomMax}.`);
    return;
  }
  smallRoomPrice = value;
  updatePrices();
}

window.onload = updatePrices;
