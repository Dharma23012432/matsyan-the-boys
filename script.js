const firebaseConfig = {
    apiKey: "AIzaSyDIPLFVGVsVpIZ8p8v7rERfFQXxgEpIVRY",
    authDomain: "fish-market-price-tracker.firebaseapp.com",
    projectId: "fish-market-price-tracker",
    storageBucket: "fish-market-price-tracker.appspot.com",
    messagingSenderId: "388369632813",
    appId: "1:388369632813:web:1f81299c4160d8b96cf2a4"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  

const form = document.getElementById("priceForm");
const pricesList = document.getElementById("prices");

form.addEventListener("submit", async function (e) {
  e.preventDefault();

  const fish = document.getElementById("fishName").value;
  const market = document.getElementById("marketName").value;
  const price = parseFloat(document.getElementById("price").value);

  // Add to Firestore
  try {
    await db.collection("fishPrices").add({
      fishName: fish,
      marketName: market,
      price: price,
      timestamp: new Date()
    });
    alert("Price added successfully!");

    form.reset();
    fetchPrices(); // Refresh list
  } catch (error) {
    console.error("Error adding price: ", error);
  }
});

// Fetch and display prices from Firestore
async function fetchPrices() {
  pricesList.innerHTML = "";

  const snapshot = await db.collection("fishPrices").orderBy("timestamp", "desc").get();
  snapshot.forEach(doc => {
    const data = doc.data();
    const item = document.createElement("li");
    item.textContent = `${data.fishName} – ₹${data.price} at ${data.marketName}`;
    pricesList.appendChild(item);
  });
}

// Load prices on page load
fetchPrices();
