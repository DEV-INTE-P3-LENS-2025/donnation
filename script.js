
let donors = [];
let sortByAmountAsc = true;

fetch('https://randomuser.me/api/?results=50')
  .then(res => res.json())
  .then(data => {
    donors = data.results.map(user => ({
      name: `${user.name.first} ${user.name.last}`,
      gender: user.gender,
      city: user.location.city,
      country: user.location.country,
      phone: user.phone,
      picture: user.picture.medium,
      amount: Math.floor(Math.random() * 500) + 50
    }));
    displayDonors(donors);
  });

function displayDonors(list) {
  const container = document.getElementById('liste-donneurs');  
  container.innerHTML = '';
  list.forEach(donor => {
    const card = document.createElement('div');
    card.className = 'donor-card';
    card.innerHTML = `
      <div class="amount">${donor.amount},00 €</div>
      <img src="${donor.picture}" alt="Photo de ${donor.name}">
      <p><strong>${donor.name}</strong></p>
      <p class="location">📍 ${donor.city}, <em>${donor.country}</em></p>
      <p>📞 ${donor.phone}</p>
    `;
    container.appendChild(card);
  });
}


document.getElementById('tout-lemonde').addEventListener('click', () => { 
  displayDonors(donors);
});

document.getElementById('filtrer-Hommes').addEventListener('click', () => {  
  displayDonors(donors.filter(d => d.gender === 'male'));
});

document.getElementById('filtrer-Femmes').addEventListener('click', () => {  
  displayDonors(donors.filter(d => d.gender === 'female'));
});



document.getElementById('sort-asc').addEventListener('click', () => {
  const sorted = [...donors].sort((a, b) => a.amount - b.amount);
  displayDonors(sorted);
});


document.getElementById('sort-desc').addEventListener('click', () => {
  const sorted = [...donors].sort((a, b) => b.amount - a.amount);
  displayDonors(sorted);
});

document.getElementById('ordre-alphabetique').addEventListener('click', () => { 
  const sorted = [...donors].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  displayDonors(sorted);
});
