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
    populateBoardRaceSelect();
    loadUserPicks();
    updateSubmissionBoard();
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

// Populate board race select
function populateBoardRaceSelect() {
    const boardRaceSelect = document.getElementById('board-race-select');
    F1_2024_RACES.forEach(race => {
        const option = document.createElement('option');
        option.value = race.id;
        option.textContent = race.name;
        boardRaceSelect.appendChild(option);
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

// Get driver name by ID
function getDriverName(driverId) {
    const driver = F1_2024_DRIVERS.find(d => d.id === driverId);
    return driver ? driver.name : driverId;
}

// Load user's previous picks
async function loadUserPicks() {
    const currentRace = document.getElementById('race-select').value;
    const currentName = document.getElementById('name-select').value;
    const pickKey = `${currentRace}_${currentName}`;

    try {
        const picksRef = ref(db, `picks/${pickKey}`);
        const picksSnapshot = await get(picksRef);
        const picks = picksSnapshot.val();

        if (picks) {
            document.getElementById('first-place').value = picks.first;
            document.getElementById('second-place').value = picks.second;
            document.getElementById('third-place').value = picks.third;
        } else {
            // Reset selects if no picks exist
            document.getElementById('first-place').value = '';
            document.getElementById('second-place').value = '';
            document.getElementById('third-place').value = '';
        }
    } catch (error) {
        console.error('Error loading picks:', error);
        // Reset selects on error
        document.getElementById('first-place').value = '';
        document.getElementById('second-place').value = '';
        document.getElementById('third-place').value = '';
    }
}

// Save user's picks
async function savePicks() {
    const raceId = document.getElementById('race-select').value;
    const name = document.getElementById('name-select').value;
    const firstPlace = document.getElementById('first-place').value;
    const secondPlace = document.getElementById('second-place').value;
    const thirdPlace = document.getElementById('third-place').value;

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
        // Save to Firebase
        const pickKey = `${raceId}_${name}`;
        const picksRef = ref(db, `picks/${pickKey}`);
        await set(picksRef, {
            name: name,
            first: firstPlace,
            second: secondPlace,
            third: thirdPlace,
            timestamp: serverTimestamp()
        });

        // Add success animation
        const submitButton = document.getElementById('submit-picks');
        submitButton.classList.add('success-animation');
        setTimeout(() => {
            submitButton.classList.remove('success-animation');
        }, 500);

        // Update the submission board
        updateSubmissionBoard();
    } catch (error) {
        console.error('Error saving picks:', error);
        alert('Error saving picks. Please try again.');
    }
}

// Update submission board
async function updateSubmissionBoard() {
    const boardRaceSelect = document.getElementById('board-race-select');
    const selectedRace = boardRaceSelect.value;
    const tbody = document.querySelector('#submissions-table tbody');
    
    try {
        // Show loading state
        tbody.innerHTML = '<tr><td colspan="4" class="board-loading"></td></tr>';

        // Get picks for the selected race
        const picksRef = ref(db, 'picks');
        const picksSnapshot = await get(picksRef);
        const picks = picksSnapshot.val() || {};

        // Filter picks for the selected race
        const racePicks = Object.entries(picks)
            .filter(([key]) => key.startsWith(selectedRace + '_'))
            .map(([key, pick]) => ({
                name: pick.name,
                picks: [pick.first, pick.second, pick.third]
            }));

        // Clear existing rows
        tbody.innerHTML = '';

        if (racePicks.length === 0) {
            const row = document.createElement('tr');
            row.innerHTML = '<td colspan="4" class="empty-state">No picks submitted for this race yet</td>';
            tbody.appendChild(row);
            return;
        }

        // Add rows for each submission
        racePicks.forEach(({ name, picks }) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${getDriverName(picks[0])}</td>
                <td>${getDriverName(picks[1])}</td>
                <td>${getDriverName(picks[2])}</td>
            `;
            tbody.appendChild(row);
        });
    } catch (error) {
        console.error('Error updating submission board:', error);
        tbody.innerHTML = '<tr><td colspan="4" class="error">Error loading picks. Please try again.</td></tr>';
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('race-select').addEventListener('change', loadUserPicks);
    document.getElementById('name-select').addEventListener('change', loadUserPicks);
    document.getElementById('submit-picks').addEventListener('click', savePicks);
    document.getElementById('board-race-select').addEventListener('change', updateSubmissionBoard);
    document.getElementById('refresh-board').addEventListener('click', updateSubmissionBoard);
}

// Function to display standings (to be implemented)
function displayStandings() {
    // This will be implemented to show the leaderboard
    // We'll need to store results and calculate points for each user
}

// Save race results
async function saveRaceResults(raceId, firstPlace, secondPlace, thirdPlace) {
    try {
        const resultsRef = ref(db, `results/${raceId}`);
        await set(resultsRef, {
            first: firstPlace,
            second: secondPlace,
            third: thirdPlace,
            timestamp: serverTimestamp()
        });
        console.log('Race results saved successfully');
    } catch (error) {
        console.error('Error saving race results:', error);
        throw error;
    }
}

// Example usage:
// To save Bahrain results:
// saveRaceResults('bahrain', 'VER', 'PER', 'HAM'); 