
const cardsContainer = document.querySelector('.cards')

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

export {displayCard};
// displayCard()