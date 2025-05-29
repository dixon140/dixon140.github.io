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
    updateLeaderboard();
    setupEventListeners();
});

// Populate race select
function populateRaceSelect() {
    const raceSelect = document.getElementById('leaderboard-race-select');
    F1_2024_RACES.forEach(race => {
        const option = document.createElement('option');
        option.value = race.id;
        option.textContent = race.name;
        raceSelect.appendChild(option);
    });
}

// Get driver name by ID
function getDriverName(driverId) {
    const driver = F1_2024_DRIVERS.find(d => d.id === driverId);
    return driver ? driver.name : driverId;
}

// Calculate points for a race
function calculatePoints(picks, results) {
    if (!picks || !results) return 0;
    
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

// Update leaderboard
function updateLeaderboard() {
    const selectedRace = document.getElementById('leaderboard-race-select').value;
    const savedPicks = JSON.parse(localStorage.getItem('f1Picks')) || {};
    const savedResults = JSON.parse(localStorage.getItem('f1Results')) || {};
    
    // Calculate season totals
    const seasonTotals = {
        Calvin: { points: 0, perfectPodiums: 0 },
        Ethan: { points: 0, perfectPodiums: 0 }
    };

    // Update season totals table
    const seasonTableBody = document.querySelector('#season-table tbody');
    seasonTableBody.innerHTML = '';

    // Calculate points for each race
    F1_2024_RACES.forEach(race => {
        const raceResults = savedResults[race.id];
        if (!raceResults) return;

        ['Calvin', 'Ethan'].forEach(name => {
            const pickKey = `${race.id}_${name}`;
            const picks = savedPicks[pickKey];
            if (!picks) return;

            const points = calculatePoints(picks, raceResults);
            seasonTotals[name].points += points;
            
            // Check for perfect podium
            if (points >= POINTS.correctPosition * 3 + POINTS.perfectPodium) {
                seasonTotals[name].perfectPodiums++;
            }
        });
    });

    // Sort by points
    const sortedTotals = Object.entries(seasonTotals)
        .map(([name, data]) => ({ name, ...data }))
        .sort((a, b) => b.points - a.points);

    // Add rows to season totals table
    sortedTotals.forEach((data, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${index + 1}</td>
            <td>${data.name}</td>
            <td>${data.points}</td>
            <td>${data.perfectPodiums}</td>
        `;
        seasonTableBody.appendChild(row);
    });

    // Update race results table
    const raceTableBody = document.querySelector('#race-table tbody');
    raceTableBody.innerHTML = '';

    F1_2024_RACES.forEach(race => {
        const raceResults = savedResults[race.id];
        if (!raceResults) return;

        const calvinPicks = savedPicks[`${race.id}_Calvin`];
        const ethanPicks = savedPicks[`${race.id}_Ethan`];
        
        const calvinPoints = calvinPicks ? calculatePoints(calvinPicks, raceResults) : 0;
        const ethanPoints = ethanPicks ? calculatePoints(ethanPicks, raceResults) : 0;
        
        const winner = calvinPoints > ethanPoints ? 'Calvin' : 
                      ethanPoints > calvinPoints ? 'Ethan' : 'Tie';

        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${race.name}</td>
            <td>${calvinPoints}</td>
            <td>${ethanPoints}</td>
            <td>${winner}</td>
        `;
        raceTableBody.appendChild(row);
    });
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('leaderboard-race-select').addEventListener('change', updateLeaderboard);
} 