// F1 2024 Season Data
const F1_2024_RACES = [
    { id: 'bahrain', name: 'Bahrain Grand Prix', date: '2024-03-02' },
    { id: 'saudi', name: 'Saudi Arabian Grand Prix', date: '2024-03-09' },
    { id: 'australia', name: 'Australian Grand Prix', date: '2024-03-24' },
    { id: 'japan', name: 'Japanese Grand Prix', date: '2024-04-07' },
    { id: 'china', name: 'Chinese Grand Prix', date: '2024-04-21' },
    { id: 'miami', name: 'Miami Grand Prix', date: '2024-05-05' },
    { id: 'emilia', name: 'Emilia Romagna Grand Prix', date: '2024-05-19' },
    { id: 'monaco', name: 'Monaco Grand Prix', date: '2024-05-26' },
    { id: 'canada', name: 'Canadian Grand Prix', date: '2024-06-09' },
    { id: 'spain', name: 'Spanish Grand Prix', date: '2024-06-23' },
    { id: 'austria', name: 'Austrian Grand Prix', date: '2024-06-30' },
    { id: 'britain', name: 'British Grand Prix', date: '2024-07-07' },
    { id: 'hungary', name: 'Hungarian Grand Prix', date: '2024-07-21' },
    { id: 'belgium', name: 'Belgian Grand Prix', date: '2024-07-28' },
    { id: 'netherlands', name: 'Dutch Grand Prix', date: '2024-08-25' },
    { id: 'italy', name: 'Italian Grand Prix', date: '2024-09-01' },
    { id: 'azerbaijan', name: 'Azerbaijan Grand Prix', date: '2024-09-15' },
    { id: 'singapore', name: 'Singapore Grand Prix', date: '2024-09-22' },
    { id: 'usa', name: 'United States Grand Prix', date: '2024-10-20' },
    { id: 'mexico', name: 'Mexican Grand Prix', date: '2024-10-27' },
    { id: 'brazil', name: 'Brazilian Grand Prix', date: '2024-11-03' },
    { id: 'vegas', name: 'Las Vegas Grand Prix', date: '2024-11-23' },
    { id: 'qatar', name: 'Qatar Grand Prix', date: '2024-12-01' },
    { id: 'abu-dhabi', name: 'Abu Dhabi Grand Prix', date: '2024-12-08' }
];

const F1_2024_DRIVERS = [
    { id: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing' },
    { id: 'PER', name: 'Sergio Perez', team: 'Red Bull Racing' },
    { id: 'HAM', name: 'Lewis Hamilton', team: 'Mercedes' },
    { id: 'RUS', name: 'George Russell', team: 'Mercedes' },
    { id: 'LEC', name: 'Charles Leclerc', team: 'Ferrari' },
    { id: 'SAI', name: 'Carlos Sainz', team: 'Ferrari' },
    { id: 'NOR', name: 'Lando Norris', team: 'McLaren' },
    { id: 'PIA', name: 'Oscar Piastri', team: 'McLaren' },
    { id: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin' },
    { id: 'STR', name: 'Lance Stroll', team: 'Aston Martin' },
    { id: 'GAS', name: 'Pierre Gasly', team: 'Alpine' },
    { id: 'OCO', name: 'Esteban Ocon', team: 'Alpine' },
    { id: 'ALB', name: 'Alexander Albon', team: 'Williams' },
    { id: 'SAR', name: 'Logan Sargeant', team: 'Williams' },
    { id: 'BOT', name: 'Valtteri Bottas', team: 'Kick Sauber' },
    { id: 'ZHO', name: 'Guanyu Zhou', team: 'Kick Sauber' },
    { id: 'HUL', name: 'Nico Hulkenberg', team: 'Haas F1 Team' },
    { id: 'MAG', name: 'Kevin Magnussen', team: 'Haas F1 Team' },
    { id: 'RIC', name: 'Daniel Ricciardo', team: 'RB' },
    { id: 'TSU', name: 'Yuki Tsunoda', team: 'RB' }
];

// Points system
const POINTS = {
    correctPosition: 3,    // Points for correct position
    correctPodium: 1,      // Points for correct driver in wrong position
    perfectPodium: 5       // Bonus points for perfect podium prediction
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateRaceSelect();
    populateDriverSelects();
    loadUserPicks();
    setupEventListeners();
});

// Populate race dropdown
function populateRaceSelect() {
    const raceSelect = document.getElementById('race-select');
    F1_2024_RACES.forEach(race => {
        const option = document.createElement('option');
        option.value = race.id;
        option.textContent = race.name;
        raceSelect.appendChild(option);
    });
}

// Populate driver dropdowns
function populateDriverSelects() {
    const driverSelects = ['first-place', 'second-place', 'third-place'];
    driverSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        F1_2024_DRIVERS.forEach(driver => {
            const option = document.createElement('option');
            option.value = driver.id;
            option.textContent = `${driver.name} (${driver.team})`;
            select.appendChild(option);
        });
    });
}

// Load user's previous picks
async function loadUserPicks() {
    const currentRace = document.getElementById('race-select').value;
    if (!currentRace) return;

    try {
        const picksRef = ref(db, `picks/${currentRace}`);
        const snapshot = await get(picksRef);

        if (snapshot.exists()) {
            const picks = snapshot.val();
            document.getElementById('first-place').value = picks.first;
            document.getElementById('second-place').value = picks.second;
            document.getElementById('third-place').value = picks.third;
        }
    } catch (error) {
        console.error('Error loading picks:', error);
    }
}

// Save user's picks
async function savePicks() {
    const raceId = document.getElementById('race-select').value;
    const firstPlace = document.getElementById('first-place').value;
    const secondPlace = document.getElementById('second-place').value;
    const thirdPlace = document.getElementById('third-place').value;

    console.log('Saving picks:', { raceId, firstPlace, secondPlace, thirdPlace });

    if (!raceId || !firstPlace || !secondPlace || !thirdPlace) {
        alert('Please select a race and complete your podium picks!');
        return;
    }

    // Check for duplicate picks
    if (firstPlace === secondPlace || firstPlace === thirdPlace || secondPlace === thirdPlace) {
        alert('Please select different drivers for each position!');
        return;
    }

    try {
        const picksRef = ref(db, `picks/${raceId}`);
        console.log('Saving to path:', picksRef.toString());

        await set(picksRef, {
            first: firstPlace,
            second: secondPlace,
            third: thirdPlace,
            timestamp: serverTimestamp()
        });

        console.log('Picks saved successfully');

        // Add visual feedback
        const submitButton = document.getElementById('submit-picks');
        submitButton.textContent = 'Picks Saved!';
        submitButton.style.backgroundColor = '#28a745';
        
        // Add success animation to the picks container
        const picksContainer = document.querySelector('.podium-picks');
        picksContainer.classList.add('success-animation');
        
        // Reset button after 2 seconds
        setTimeout(() => {
            submitButton.textContent = 'Submit Picks';
            submitButton.style.backgroundColor = '#e10600';
            picksContainer.classList.remove('success-animation');
        }, 2000);
    } catch (error) {
        console.error('Error saving picks:', error);
        alert('Error saving picks. Please try again.');
    }
}

// Calculate points for a race
function calculatePoints(picks, results) {
    let points = 0;
    let correctPositions = 0;

    // Check each position
    for (let i = 0; i < 3; i++) {
        if (picks[i] === results[i]) {
            points += POINTS.correctPosition;
            correctPositions++;
        } else if (results.includes(picks[i])) {
            points += POINTS.correctPodium;
        }
    }

    // Bonus for perfect podium
    if (correctPositions === 3) {
        points += POINTS.perfectPodium;
    }

    return points;
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('race-select').addEventListener('change', loadUserPicks);
    document.getElementById('submit-picks').addEventListener('click', savePicks);
}

// Function to display standings (to be implemented)
function displayStandings() {
    // This will be implemented to show the leaderboard
    // We'll need to store results and calculate points for each user
} 