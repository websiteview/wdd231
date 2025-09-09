const url = 'https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json';

const cards = document.querySelector('#cards');

async function getPropehtData() {
    const response = await fetch('https://byui-cse.github.io/cse-ww-program/data/latter-day-prophets.json');
        const data = await response.json();
       // console.table(data.prophets); // For developement only
    displayProphets(data.prophets);
}



const displayProphets = (prophets) => {
    prophets.forEach((prophet) => {
    // card build code goes here
    // Create elements to add to the div.cards element
    let card = document.createElement('section');
    let fullName = document.createElement('h2'); // fill in the blank
    let dob = document.createElement('p');
    let pob = document.createElement('p');
    let portrait = document.createElement('img');

    // Build the h2 content out to show the prophet's full name
    fullName.textContent = `${prophet.name} ${prophet.lastname}`; // fill in the blank
    // Build the image portrait by setting all the relevant attributes
    portrait.setAttribute('src', prophet.imageurl);
    portrait.setAttribute('alt', `Portrait of ${prophet.name} ${prophet.lastname}`); // fill in the blank
    portrait.setAttribute('loading', 'lazy');
    portrait.setAttribute('width', '340');
    portrait.setAttribute('height', '440');

    // Append the section(card) with the created elements
    card.appendChild(fullName); //fill in the blank
    card.appendChild(dob);
    card.appendChild(pob);
    card.appendChild(portrait);

    cards.appendChild(card);
  }); 
}

getPropehtData();