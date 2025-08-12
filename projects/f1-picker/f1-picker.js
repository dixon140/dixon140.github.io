// F1 2024 Season Data
const F1_2024_RACES = [
    { id: 'australia', name: 'Australian Grand Prix', date: '2025-03-16' },
    { id: 'china', name: 'Chinese Grand Prix', date: '2025-03-23' },
    { id: 'japan', name: 'Japanese Grand Prix', date: '2025-04-06' },
    { id: 'bahrain', name: 'Bahrain Grand Prix', date: '2025-04-13' },
    { id: 'saudi', name: 'Saudi Arabian Grand Prix', date: '2025-04-20' },
    { id: 'miami', name: 'Miami Grand Prix', date: '2025-05-04' },
    { id: 'emilia', name: 'Emilia Romagna Grand Prix', date: '2025-05-18' },
    { id: 'monaco', name: 'Monaco Grand Prix', date: '2025-05-25' },
    { id: 'spain', name: 'Spanish Grand Prix', date: '2025-06-01' },
    { id: 'canada', name: 'Canadian Grand Prix', date: '2025-06-15' },
    { id: 'austria', name: 'Austrian Grand Prix', date: '2025-06-29' },
    { id: 'britain', name: 'British Grand Prix', date: '2025-07-06' },
    { id: 'belgium', name: 'Belgian Grand Prix', date: '2025-07-27' },
    { id: 'hungary', name: 'Hungarian Grand Prix', date: '2025-08-03' },
    { id: 'netherlands', name: 'Dutch Grand Prix', date: '2025-08-31' },
    { id: 'italy', name: 'Italian Grand Prix', date: '2025-09-07' },
    { id: 'azerbaijan', name: 'Azerbaijan Grand Prix', date: '2025-09-21' },
    { id: 'singapore', name: 'Singapore Grand Prix', date: '2025-10-05' },
    { id: 'usa', name: 'United States Grand Prix', date: '2025-10-19' },
    { id: 'mexico', name: 'Mexican Grand Prix', date: '2025-10-26' },
    { id: 'brazil', name: 'Brazilian Grand Prix', date: '2025-11-09' },
    { id: 'vegas', name: 'Las Vegas Grand Prix', date: '2025-11-22' },
    { id: 'qatar', name: 'Qatar Grand Prix', date: '2025-11-30' },
    { id: 'abu-dhabi', name: 'Abu Dhabi Grand Prix', date: '2025-12-07' }
];

const F1_2024_DRIVERS = [
    { id: 'VER', name: 'Max Verstappen', team: 'Red Bull Racing' },
    { id: 'TSU', name: 'Yuki Tsunoda', team: 'Red Bull Racing' },
    { id: 'HAM', name: 'Lewis Hamilton', team: 'Ferrari' },
    { id: 'LEC', name: 'Charles Leclerc', team: 'Ferrari' },
    { id: 'ANT', name: 'Kimi Antonelli', team: 'Mercedes' },
    { id: 'RUS', name: 'George Russell', team: 'Mercedes' },
    { id: 'ALO', name: 'Fernando Alonso', team: 'Aston Martin' },
    { id: 'STR', name: 'Lance Stroll', team: 'Aston Martin' },
    { id: 'NOR', name: 'Lando Norris', team: 'McLaren' },
    { id: 'PIA', name: 'Oscar Piastri', team: 'McLaren' },
    { id: 'ALB', name: 'Alexander Albon', team: 'Williams' },
    { id: 'SAI', name: 'Carlos Sainz', team: 'Williams' },
    { id: 'COL', name: 'Franco Colapinto', team: 'Alpine' },
    { id: 'GAS', name: 'Pierre Gasly', team: 'Alpine' },
    { id: 'HUL', name: 'Nico Hulkenberg', team: 'Stake F1 Team' },
    { id: 'BOR', name: 'Gabriel Bortoleto', team: 'Stake F1 Team' },
    { id: 'BEA', name: 'Oliver Bearman', team: 'Haas F1 Team' },
    { id: 'OCO', name: 'Estaban Ocon', team: 'Haas F1 Team' },
    { id: 'HAD', name: 'Isack Hadjar', team: 'Visa Cash App RB' },
    { id: 'LAW', name: 'Liam Lawson', team: 'Visa Cash App RB' }
];

// Points system
const POINTS = {
    correctPosition: 3,    // Points for correct position
    correctPodium: 1,      // Points for correct driver in wrong position
    perfectPodium: 0       // Bonus points for perfect podium prediction
};

// Calculate points for a race
function calculatePoints(picks, results) {
    if (!picks || !results) return 0;
    
    let points = 0;
    let correctPositions = 0;

    // Check first place
    if (picks.first === results.first) {
        points += POINTS.correctPosition;
        correctPositions++;
    } else if (picks.first === results.second || picks.first === results.third) {
        points += POINTS.correctPodium;
    }

    // Check second place
    if (picks.second === results.second) {
        points += POINTS.correctPosition;
        correctPositions++;
    } else if (picks.second === results.first || picks.second === results.third) {
        points += POINTS.correctPodium;
    }

    // Check third place
    if (picks.third === results.third) {
        points += POINTS.correctPosition;
        correctPositions++;
    } else if (picks.third === results.first || picks.third === results.second) {
        points += POINTS.correctPodium;
    }

    // Add bonus for perfect podium
    if (correctPositions === 3) {
        points += POINTS.perfectPodium;
    }

    return points;
}

// Update season points
async function updateSeasonPoints() {
    const tbody = document.querySelector('#season-points-table tbody');
    
    try {
        // Show loading state
        tbody.innerHTML = '<tr><td colspan="3" class="board-loading">Loading...</td></tr>';

        // Get all picks
        const picksRef = ref(db, 'picks');
        const picksSnapshot = await get(picksRef);
        const picks = picksSnapshot.val() || {};

        // Get all results
        const resultsRef = ref(db, 'results');
        const resultsSnapshot = await get(resultsRef);
        const results = resultsSnapshot.val() || {};

        // Calculate totals dynamically for each player
        const totals = {};

        // Calculate points for each race
        Object.entries(picks).forEach(([key, pick]) => {
            const raceId = String(key).split('_')[0];
            const displayName = (pick && pick.name ? String(pick.name).trim() : 'Unknown');
            const raceResults = results[raceId];
            if (!raceResults) return;

            const points = calculatePoints(pick, raceResults);
            if (!totals[displayName]) totals[displayName] = { points: 0 };
            totals[displayName].points += points;
        });

        // Sort by points
        const sortedTotals = Object.entries(totals)
            .map(([name, data]) => ({ name, ...data }))
            .sort((a, b) => b.points - a.points);

        // Clear and update table
        tbody.innerHTML = '';

        // Add rows to table
        sortedTotals.forEach((data, index) => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${index + 1}</td>
                <td>${data.name}</td>
                <td>${data.points}</td>
            `;
            tbody.appendChild(row);
        });

        // If no data was found, show a message
        if (Object.keys(picks).length === 0 || Object.keys(results).length === 0) {
            tbody.innerHTML = '<tr><td colspan="3" class="empty-state">No data available yet</td></tr>';
        }
    } catch (error) {
        console.error('Error updating season points:', error);
        tbody.innerHTML = '<tr><td colspan="3" class="error">Error loading season points. Please try again.</td></tr>';
    }
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    populateRaceSelect();
    populateDriverSelects();
    populateBoardRaceSelect();
    
    // Set Monaco as default race
    document.getElementById('race-select').value = 'hungary';
    document.getElementById('board-race-select').value = 'hungary';
    
    // Prefill name from local storage
    try {
        const savedName = localStorage.getItem('f1PickerName');
        if (savedName) {
            const input = document.getElementById('name-input');
            if (input) input.value = savedName;
        }
    } catch (_) {}

    loadUserPicks();
    updateSubmissionBoard();
    updateSeasonPoints();
    setupEventListeners();
});

// Populate race dropdown
function populateRaceSelect() {
    const raceSelect = document.getElementById('race-select');
    const boardRaceSelect = document.getElementById('board-race-select');
    
    // Clear existing options
    raceSelect.innerHTML = '';
    boardRaceSelect.innerHTML = '';
    
    F1_2024_RACES.forEach(race => {
        // Add to main race select
        const option = document.createElement('option');
        option.value = race.id;
        option.textContent = race.name;
        if (race.id === 'hungary') {
            option.selected = true;
        }
        raceSelect.appendChild(option);
        
        // Add to board race select
        const boardOption = document.createElement('option');
        boardOption.value = race.id;
        boardOption.textContent = race.name;
        if (race.id === 'hungary') {
            boardOption.selected = true;
        }
        boardRaceSelect.appendChild(boardOption);
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
        // Clear existing options
        select.innerHTML = '';
        
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

// Helpers for typed names
function sanitizeKeyName(name) {
    if (!name) return '';
    const trimmed = String(name).trim();
    // Firebase RTDB keys cannot contain . # $ [ ] /
    return trimmed
        .replace(/[.#$\[\]\/]/g, '-')
        .replace(/\s+/g, '-')
        .toLowerCase();
}

function getTypedName() {
    const input = document.getElementById('name-input');
    return input ? input.value.trim() : '';
}

// Load user's previous picks
async function loadUserPicks() {
    const currentRace = document.getElementById('race-select').value;
    const typedName = getTypedName();
    if (!typedName) {
        document.getElementById('first-place').value = '';
        document.getElementById('second-place').value = '';
        document.getElementById('third-place').value = '';
        return;
    }

    const pickKey = `${currentRace}_${sanitizeKeyName(typedName)}`;

    try {
        const picksRef = ref(db, `picks/${pickKey}`);
        const picksSnapshot = await get(picksRef);
        const picks = picksSnapshot.val();

        if (picks) {
            document.getElementById('first-place').value = picks.first;
            document.getElementById('second-place').value = picks.second;
            document.getElementById('third-place').value = picks.third;
        } else {
            document.getElementById('first-place').value = '';
            document.getElementById('second-place').value = '';
            document.getElementById('third-place').value = '';
        }
    } catch (error) {
        console.error('Error loading picks:', error);
        document.getElementById('first-place').value = '';
        document.getElementById('second-place').value = '';
        document.getElementById('third-place').value = '';
    }
}

// Save user's picks
async function savePicks() {
    const raceId = document.getElementById('race-select').value;
    const name = getTypedName();
    const firstPlace = document.getElementById('first-place').value;
    const secondPlace = document.getElementById('second-place').value;
    const thirdPlace = document.getElementById('third-place').value;

    if (!name) {
        alert('Please enter your name.');
        return;
    }

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
        const pickKey = `${raceId}_${sanitizeKeyName(name)}`;
        const picksRef = ref(db, `picks/${pickKey}`);
        await set(picksRef, {
            name: name,
            first: firstPlace,
            second: secondPlace,
            third: thirdPlace,
            timestamp: serverTimestamp()
        });

        try { localStorage.setItem('f1PickerName', name); } catch (_) {}

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

// Helper function to check if a driver is on the podium
function isOnPodium(driverId, results) {
    return results && (driverId === results.first || driverId === results.second || driverId === results.third);
}

// Helper function to get driver name with appropriate color
function getColoredDriverName(driverId, position, results) {
    if (!results) return getDriverName(driverId);
    
    const driverName = getDriverName(driverId);
    let color = 'red'; // Default color for not on podium
    
    if (isOnPodium(driverId, results)) {
        if (position === 'first' && driverId === results.first) {
            color = '#00FF00'; // Bright, vibrant green
        } else if (position === 'second' && driverId === results.second) {
            color = '#00FF00'; // Bright, vibrant green
        } else if (position === 'third' && driverId === results.third) {
            color = '#00FF00'; // Bright, vibrant green
        } else {
            color = '#FFD700'; // Gold color
        }
    }
    
    return `<span style="color: ${color}">${driverName}</span>`;
}

// Update the submission board to show points and results
async function updateSubmissionBoard() {
    const tbody = document.querySelector('#submissions-table tbody');
    const resultsDiv = document.querySelector('#race-results');
    const resultsSection = document.querySelector('.results-section');
    const selectedRace = document.getElementById('board-race-select').value;
    
    try {
        // Show loading state
        tbody.innerHTML = '<tr><td colspan="5" class="board-loading">Loading...</td></tr>';
        resultsDiv.innerHTML = '<div class="board-loading">Loading...</div>';

        // Get picks for the selected race
        const picksRef = ref(db, 'picks');
        const picksSnapshot = await get(picksRef);
        const picks = picksSnapshot.val() || {};

        // Get results for the selected race
        const resultsRef = ref(db, 'results');
        const resultsSnapshot = await get(resultsRef);
        const results = resultsSnapshot.val() || {};

        // Display race results if available
        if (results[selectedRace]) {
            const raceResults = results[selectedRace];
            resultsSection.style.display = 'block';
            resultsDiv.innerHTML = `
                <div class="results-grid">
                    <div class="result-item">
                        <span class="position">1st</span>
                        <span class="driver">${getDriverName(raceResults.first)}</span>
                    </div>
                    <div class="result-item">
                        <span class="position">2nd</span>
                        <span class="driver">${getDriverName(raceResults.second)}</span>
                    </div>
                    <div class="result-item">
                        <span class="position">3rd</span>
                        <span class="driver">${getDriverName(raceResults.third)}</span>
                    </div>
                </div>
            `;
        } else {
            resultsSection.style.display = 'none';
        }

        // Filter picks for the selected race
        const racePicks = Object.entries(picks)
            .filter(([key]) => key.startsWith(selectedRace + '_'))
            .map(([key, pick]) => ({
                name: pick.name,
                picks: pick
            }));

        // Clear and update table
        tbody.innerHTML = '';

        // Add rows for each submission with points
        for (const { name, picks } of racePicks) {
            const points = calculatePoints(picks, results[selectedRace]);
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${name}</td>
                <td>${getColoredDriverName(picks.first, 'first', results[selectedRace])}</td>
                <td>${getColoredDriverName(picks.second, 'second', results[selectedRace])}</td>
                <td>${getColoredDriverName(picks.third, 'third', results[selectedRace])}</td>
                <td>${points} pts</td>
            `;
            tbody.appendChild(row);
        }

        // If no picks were found, show a message
        if (racePicks.length === 0) {
            tbody.innerHTML = '<tr><td colspan="5" class="empty-state">No picks submitted for this race yet</td></tr>';
        }
    } catch (error) {
        console.error('Error updating submission board:', error);
        tbody.innerHTML = '<tr><td colspan="5" class="error">Error loading picks. Please try again.</td></tr>';
        resultsSection.style.display = 'none';
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('race-select').addEventListener('change', loadUserPicks);
    const nameInput = document.getElementById('name-input');
    if (nameInput) {
        nameInput.addEventListener('input', loadUserPicks);
        nameInput.addEventListener('blur', () => {
            try { localStorage.setItem('f1PickerName', nameInput.value.trim()); } catch (_) {}
        });
    }
    document.getElementById('submit-picks').addEventListener('click', savePicks);
    document.getElementById('board-race-select').addEventListener('change', updateSubmissionBoard);
    document.getElementById('refresh-board').addEventListener('click', updateSubmissionBoard);
}