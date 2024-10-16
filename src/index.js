// index.js

// Callbacks
const handleClick = (ramen) => {
  // Set the ramen detail display
  document.querySelector(".detail-image").src = ramen.image;
  document.querySelector(".name").textContent = ramen.name;
  document.querySelector(".restaurant").textContent = ramen.restaurant;
  document.getElementById("rating-display").textContent = ramen.rating;
  document.getElementById("comment-display").textContent = ramen.comment;
};

const addSubmitListener = () => {
  const form = document.getElementById("new-ramen");
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    
    const name = document.getElementById("new-name").value;
    const restaurant = document.getElementById("new-restaurant").value;
    const image = document.getElementById("new-image").value;
    const rating = document.getElementById("new-rating").value;
    const comment = document.getElementById("new-comment").value;

    const newRamen = {
      name,
      restaurant,
      image,
      rating: Number(rating), // Convert to number
      comment,
    };
    
    addRamenToMenu(newRamen);
    form.reset(); // Clear the form
  });
};

const addRamenToMenu = (ramen) => {
  const ramenMenu = document.getElementById("ramen-menu");
  const img = document.createElement("img");
  img.src = ramen.image;
  img.alt = ramen.name;
  img.addEventListener("click", () => handleClick(ramen));
  ramenMenu.appendChild(img);
};

const displayRamens = () => {
  fetch("http://localhost:3000/ramens")
    .then(response => response.json())
    .then(ramens => {
      ramens.forEach(ramen => {
        const img = document.createElement("img");
        img.src = ramen.image;
        img.alt = ramen.name;
        img.addEventListener("click", () => handleClick(ramen));
        document.getElementById("ramen-menu").appendChild(img);
      });
    })
    .catch(error => console.error("Error fetching ramens:", error));
};

const main = () => {
  displayRamens();
  addSubmitListener();
}

main();

// Export functions for testing
export {
  displayRamens,
  addSubmitListener,
  handleClick,
  main,
};

