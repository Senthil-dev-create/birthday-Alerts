let birthdays = [];

// Load birthdays from localStorage on page load
window.onload = function() {
  loadFromLocalStorage();
  renderBirthdayList();
}

// Show Add Birthday Form
function showAddForm() {
  document.getElementById('addBirthdayForm').style.display = 'block';
  document.getElementById('birthdayList').style.display = 'none';
}

// Hide Add Birthday Form
function hideAddForm() {
  document.getElementById('addBirthdayForm').style.display = 'none';
}

// Show Birthday List
function showBirthdayList() {
  document.getElementById('birthdayList').style.display = 'block';
  document.getElementById('addBirthdayForm').style.display = 'none';
  renderBirthdayList();
}

// Hide Birthday List
function hideBirthdayList() {
  document.getElementById('birthdayList').style.display = 'none';
}

// Add Birthday
function addBirthday() {
  const name = document.getElementById('name').value;
  const birthday = document.getElementById('birthday').value;

  if (name === "" || birthday === "") {
    alert("Please fill in all fields.");
    return;
  }

  // Save birthday to the array
  birthdays.push({ name, birthday });

  // Save to localStorage
  saveToLocalStorage();

  // Clear form inputs
  document.getElementById('name').value = "";
  document.getElementById('birthday').value = "";

  // Show the birthday list
  showBirthdayList();
}

// Render Birthday List (sorted by month and date)
function renderBirthdayList() {
  const ul = document.getElementById('birthdayListUl');
  ul.innerHTML = "";

  // Sort the birthdays by date (ascending)
  birthdays.sort((a, b) => new Date(a.birthday) - new Date(b.birthday));

  birthdays.forEach((birthday, index) => {
    const li = document.createElement('li');
    const birthdayDate = new Date(birthday.birthday);
    const formattedDate = birthdayDate.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'long',
      year: 'numeric'
    });

    li.innerHTML = `
      <span>${birthday.name} - ${formattedDate}</span>
      <button onclick="deleteBirthday(${index})">Delete</button>
    `;
    ul.appendChild(li);
  });
}

// Delete Birthday
function deleteBirthday(index) {
  birthdays.splice(index, 1);
  saveToLocalStorage(); // Save updated list to local storage
  renderBirthdayList();
}

// Save birthdays to localStorage
function saveToLocalStorage() {
  localStorage.setItem('birthdays', JSON.stringify(birthdays));
}

// Load birthdays from localStorage
function loadFromLocalStorage() {
  const savedBirthdays = localStorage.getItem('birthdays');
  if (savedBirthdays) {
    birthdays = JSON.parse(savedBirthdays);
  }
}
