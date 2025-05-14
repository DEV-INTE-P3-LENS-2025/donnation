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
  const container = document.getElementById('liste-donneurs');  // Utilisation de l'ID correct
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

// Filtres
document.getElementById('tout-lemonde').addEventListener('click', () => {  // Correctement lié avec l'ID "tout-lemonde"
  displayDonors(donors);
});

document.getElementById('filtrer-Hommes').addEventListener('click', () => {  // Correctement lié avec l'ID "filtrer-Hommes"
  displayDonors(donors.filter(d => d.gender === 'male'));
});

document.getElementById('filtrer-Femmes').addEventListener('click', () => {  // Correctement lié avec l'ID "filtrer-Femmes"
  displayDonors(donors.filter(d => d.gender === 'female'));
});

// Tri
document.getElementById('montant').addEventListener('click', () => {  // Correctement lié avec l'ID "montant"
  sortByAmountAsc = !sortByAmountAsc;
  const sorted = [...donors].sort((a, b) =>
    sortByAmountAsc ? a.amount - b.amount : b.amount - a.amount
  );
  displayDonors(sorted);
});

document.getElementById('ordre-alphabetique').addEventListener('click', () => {  // Correctement lié avec l'ID "ordre-alphabetique"
  const sorted = [...donors].sort((a, b) =>
    a.name.localeCompare(b.name)
  );
  displayDonors(sorted);
});
