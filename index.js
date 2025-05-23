const cards = [
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-6.png",
    text: "Val Thorens",
    name: "image of a Val Thorens",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-1.png",
    text: "Restaurant terrace",
    name: "image of a Restaurant",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-2.png",
    text: "An outdoor cafe",
    name: "love icon",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-3.png",
    text: "A very long bridge, over the forest...",
    name: "image of a bridge",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-4.png",
    text: "Tunnel with morning light",
    name: "image of a Tunnel",
  },
  {
    image: "assets/images/pexels-kassandre-pedro-8639743 1-5.png",
    text: "Mountain house",
    name: "image of a Mountain",
  },
];

// Get DOM elements
const editBtn = document.querySelector("#profile__edit-btn");
const modal = document.getElementById("profileModal");
const closeBtn = document.querySelector(".modal__close");
const cancelBtn = document.querySelector(".modal__cancel-btn");
const profileForm = document.getElementById("profileForm");
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profileImage = document.getElementById("profileImage");
const cardsContainer = document.querySelector(".cards");

// Get current profile data
const currentName = document.querySelector(".profile__name").textContent;
const currentBio = document.querySelector(".profile__bio").textContent;
const currentImage = document.querySelector(".profile__avatar-image");

// Open modal (add focus management)
editBtn.addEventListener("click", function () {
  modal.style.display = "block";
  modal.setAttribute("aria-modal", "true");
  modal.setAttribute("role", "dialog");
  modal.setAttribute("aria-label", "Edit Profile");
  // Populate form with current data
  profileName.focus();
  profileName.value = currentName;
  profileBio.value = currentBio;
});

// Close modal functions (return foucs)
function closeModal() {
  modal.style.display = "none";
  editBtn.focus();
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
  document.querySelector(".profile__name").textContent = profileName.value;
  document.querySelector(".profile__bio").textContent = profileBio.value;

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
// DisplayCard function: add accessibility to icons
function displayCard(cards) {
  cardsContainer.innerHTML = ``;
  if (cards.length > 0) {
    cards.forEach((card) => {
      const cardsItem = document.createElement("div");
      cardsItem.classList.add("card");
      cardsItem.innerHTML = `
                <img class="card__image" src="${card.image} "alt="${card.name}"/>
                <div class="card__content">
                    <p class="card__text">${card.text}</p>
                    <div class="card__icon-container">
                        <svg class="card__icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg> </div>
                </div>
            `;
      cardsContainer.append(cardsItem);
    });
  }
}
displayCard(cards);

// after rendering cards, add keyboard and ARIA support
document.querySelectorAll('.card__icon').forEach(icon => {
  icon.addEventListener('click', function (e) {
    e.stopPropagation(); // Prevent card click event from firing
    this.classList.toggle('card__icon--active');
    
    // toggle aria-pressed
    this.setAttribute('aria-pressed', this.classList.contains('card__icon--active'));
    this.classList.add('card__icon--animate');
    
    // Remove animation class after animation completes
    setTimeout(() => {
      this.classList.remove('card__icon--animate');
    }, 300);
  });
});
//Cards Modal
const cardElements = document.querySelectorAll(".card");

// Get card Modal Element
const modalImg = document.getElementById("modalImg");
const modalText = document.querySelector(".modal__text p");
const modalTextImg = document.querySelector(".modal__text img");
const imageModal = document.getElementById("imageModal");
const closeImgBtn = document.querySelector(".imgModal .imageModal__content .modal__close");

//mapping through cards
cardElements.forEach((card) => {
  // Getting each card properties
  const cardImg = card.querySelector("img");
  const cardText = card.querySelector(".card__text").textContent;
  const cardTextImg = card.querySelector(".card__icon");

  cardImg.addEventListener("click", () => {
    console.log('image clicked')
    imageModal.style.display = "block";
    //checking
    if (cardImg && cardText) {
      modalImg.src = cardImg.src;
      modalText.textContent = cardText;
      modalTextImg.src = cardTextImg.src;
      modalTextImg.alt = cardTextImg.alt;
    }
  });
});

// Close cardModal
function closeCardModal() {
  imageModal.style.display = "none";
}
closeImgBtn.addEventListener("click", closeCardModal);
// Close cardModal when clicking outside
window.addEventListener("click", (e) => {
  if (e.target === imageModal) {
    closeCardModal();
  }
});
