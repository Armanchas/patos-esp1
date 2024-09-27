let selectedHero = null;
let selectedEnemy = null;

document.querySelectorAll('#hero-options .character-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('#hero-options .character-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedHero = option.getAttribute('data-character');
  });
});

document.querySelectorAll('#enemy-options .character-option').forEach(option => {
  option.addEventListener('click', () => {
    document.querySelectorAll('#enemy-options .character-option').forEach(opt => opt.classList.remove('selected'));
    option.classList.add('selected');
    selectedEnemy = option.getAttribute('data-character');
  });
});

document.getElementById('start-game').addEventListener('click', () => {
  if (selectedHero && selectedEnemy) {
    localStorage.setItem('selectedHero', selectedHero);
    localStorage.setItem('selectedEnemy', selectedEnemy);
    console.log('Selected Hero:', selectedHero); // Debugging
    console.log('Selected Enemy:', selectedEnemy); // Debugging
    window.location.href = 'fight.html';
  } else {
    alert('Please select both a hero and an enemy!');
  }
});