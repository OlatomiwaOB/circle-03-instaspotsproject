


// Get DOM elements
const editBtn = document.querySelector("#edit_btn");
const modal = document.getElementById("profileModal");
const closeBtn = document.querySelector(".close");
const cancelBtn = document.querySelector(".cancel-btn");
const profileForm = document.getElementById("profileForm");
const profileName = document.getElementById("profileName");
const profileBio = document.getElementById("profileBio");
const profileImage = document.getElementById("profileImage");

let cards = []
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

async function getCardsItems () {
    try {
        const response = await fetch('cards.json');
        if (!response.ok) {
            throw new Error(`Error while fetching card details: ${response.status}`)
        }
        const data = response.json()
        return data
    } catch(err) {
        console.error('Error:', err)
        return null
    }
}

getCardsItems()
    .then(async data => {
        if (data) {
            cards = data
            // console.log(cards)
            const {displayCard } = await import ("./scripts/displayCard.js");
            displayCard(cards)
        }
    }
    ).catch(error => (error.message));