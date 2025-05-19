import {cards} from './scripts/displayCard.js'

// Get DOM elements
const editBtn = document.querySelector("#edit_btn");
const modal = document.getElementById("profileModal");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.querySelector(".cancel-btn");
const profileForm = document.getElementById("profileForm");
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profileImage = document.getElementById("profileImage");
const cardsContainer = document.querySelector('.cards')

// Get current profile data
const currentName = document.querySelector(".text1 h1").textContent;
const currentBio = document.querySelector(".text1 p").textContent;
const currentImage = document.querySelector(".avatar-image img");

// Open modal
editBtn.addEventListener("click", function () {
  modal.style.display = "block";
  // Populate form with current data
  profileName.value = currentName;
  profileBio.value = currentBio;
});

// Close modal functions
function closeModal() {
  modal.style.display = "none";
}

closeBtn.addEventListener("click", closeModal);
cancelBtn.addEventListener("click", closeModal);

// Close modal when clicking outside
window.addEventListener("click", function (event) {
  if (event.target === modal) {
    closeModal();
  }
});

// Handle form submission
profileForm.addEventListener("submit", function (e) {
  e.preventDefault();

  // Update profile information
  document.querySelector(".text1 h1").textContent = profileName.value;
  document.querySelector(".text1 p").textContent = profileBio.value;

  // Handle image upload
  const file = profileImage.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      currentImage.src = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  closeModal();
});

function displayCard(cards) {
    cardsContainer.innerHTML = ``;
    if (cards.length > 0) {
        cards.forEach(card => {
            const cardsItem = document.createElement('div');
            cardsItem.classList.add('card');
            cardsItem.innerHTML = `
                <img src="${card.image} "alt="${card.name}"/>
                <div class="card-text">
                    <p>${card.text}</p>
                    <img src="./assets/images/Union.svg" alt="love icon" />
                </div>
            `;
            cardsContainer.append(cardsItem)
            console.log('worked')
        })
    }
}

displayCard(cards)