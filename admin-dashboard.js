// Constants
const RACES = {
    'bahrain': 'Bahrain Grand Prix',
    'saudi': 'Saudi Arabian Grand Prix',
    'australia': 'Australian Grand Prix',
    'japan': 'Japanese Grand Prix',
    'china': 'Chinese Grand Prix',
    'miami': 'Miami Grand Prix',
    'emilia': 'Emilia Romagna Grand Prix',
    'monaco': 'Monaco Grand Prix',
    'canada': 'Canadian Grand Prix',
    'spain': 'Spanish Grand Prix',
    'austria': 'Austrian Grand Prix',
    'britain': 'British Grand Prix',
    'hungary': 'Hungarian Grand Prix',
    'belgium': 'Belgian Grand Prix',
    'netherlands': 'Dutch Grand Prix',
    'italy': 'Italian Grand Prix',
    'azerbaijan': 'Azerbaijan Grand Prix',
    'singapore': 'Singapore Grand Prix',
    'united_states': 'United States Grand Prix',
    'mexico': 'Mexican Grand Prix',
    'brazil': 'Brazilian Grand Prix',
    'las_vegas': 'Las Vegas Grand Prix',
    'abu_dhabi': 'Abu Dhabi Grand Prix'
};

const DRIVERS = {
    'VER': 'Max Verstappen',
    'PER': 'Sergio Perez',
    'HAM': 'Lewis Hamilton',
    'RUS': 'George Russell',
    'LEC': 'Charles Leclerc',
    'SAI': 'Carlos Sainz',
    'NOR': 'Lando Norris',
    'PIA': 'Oscar Piastri',
    'ALO': 'Fernando Alonso',
    'STR': 'Lance Stroll',
    'GAS': 'Pierre Gasly',
    'OCO': 'Esteban Ocon',
    'ALB': 'Alexander Albon',
    'SAR': 'Logan Sargeant',
    'BOT': 'Valtteri Bottas',
    'ZHO': 'Guanyu Zhou',
    'HUL': 'Nico Hulkenberg',
    'MAG': 'Kevin Magnussen',
    'TSU': 'Yuki Tsunoda',
    'RIC': 'Daniel Ricciardo'
};

// Points system
const POINTS = {
    CORRECT_POSITION: 3,
    CORRECT_DRIVER: 1
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// DOM Elements
const raceSelect = document.getElementById('race-select');
const firstPlaceSelect = document.getElementById('first-place');
const secondPlaceSelect = document.getElementById('second-place');
const thirdPlaceSelect = document.getElementById('third-place');
const saveResultsBtn = document.getElementById('save-results');
const leaderboardTable = document.getElementById('leaderboard-table');
const leaderboardBody = document.getElementById('leaderboard-body');

// Populate race select
Object.entries(RACES).forEach(([id, name]) => {
    const option = document.createElement('option');
    option.value = id;
    option.textContent = name;
    raceSelect.appendChild(option);
});

// Populate driver selects
Object.entries(DRIVERS).forEach(([code, name]) => {
    [firstPlaceSelect, secondPlaceSelect, thirdPlaceSelect].forEach(select => {
        const option = document.createElement('option');
        option.value = code;
        option.textContent = `${code} - ${name}`;
        select.appendChild(option);
    });
});

// Save race results
async function saveResults() {
    const raceId = raceSelect.value;
    const firstPlace = firstPlaceSelect.value;
    const secondPlace = secondPlaceSelect.value;
    const thirdPlace = thirdPlaceSelect.value;

    if (!raceId || !firstPlace || !secondPlace || !thirdPlace) {
        alert('Please select all podium positions');
        return;
    }

    if (firstPlace === secondPlace || firstPlace === thirdPlace || secondPlace === thirdPlace) {
        alert('Please select different drivers for each position');
        return;
    }

    try {
        const resultsRef = ref(db, `results/${raceId}`);
        await set(resultsRef, {
            first: firstPlace,
            second: secondPlace,
            third: thirdPlace,
            timestamp: serverTimestamp()
        });

        // Update leaderboard
        await updateLeaderboard(raceId);

        // Show success message
        saveResultsBtn.textContent = 'Results Saved!';
        saveResultsBtn.style.backgroundColor = '#28a745';
        setTimeout(() => {
            saveResultsBtn.textContent = 'Save Results';
            saveResultsBtn.style.backgroundColor = '#e10600';
        }, 2000);
    } catch (error) {
        console.error('Error saving results:', error);
        alert('Error saving results. Please try again.');
    }
}

// Calculate points for a user's picks
function calculatePoints(picks, results) {
    let points = 0;
    
    // Check first place
    if (picks.first === results.first) {
        points += POINTS.CORRECT_POSITION;
    } else if (picks.first === results.second || picks.first === results.third) {
        points += POINTS.CORRECT_DRIVER;
    }

    // Check second place
    if (picks.second === results.second) {
        points += POINTS.CORRECT_POSITION;
    } else if (picks.second === results.first || picks.second === results.third) {
        points += POINTS.CORRECT_DRIVER;
    }

    // Check third place
    if (picks.third === results.third) {
        points += POINTS.CORRECT_POSITION;
    } else if (picks.third === results.first || picks.third === results.second) {
        points += POINTS.CORRECT_DRIVER;
    }

    return points;
}

// Update leaderboard
async function updateLeaderboard(raceId) {
    try {
        // Show loading state
        leaderboardBody.innerHTML = '<tr><td colspan="4" class="leaderboard-loading"></td></tr>';

        // Get race results
        const resultsRef = ref(db, `results/${raceId}`);
        const resultsSnapshot = await get(resultsRef);
        const results = resultsSnapshot.val();

        if (!results) {
            leaderboardBody.innerHTML = '<tr><td colspan="4">No results available for this race</td></tr>';
            return;
        }

        // Get all picks for this race
        const picksRef = ref(db, `picks/${raceId}`);
        const picksSnapshot = await get(picksRef);
        const picks = picksSnapshot.val();

        if (!picks) {
            leaderboardBody.innerHTML = '<tr><td colspan="4">No picks available for this race</td></tr>';
            return;
        }

        // Calculate points for each user
        const leaderboard = Object.entries(picks).map(([userId, userPicks]) => ({
            name: userPicks.name,
            picks: userPicks,
            points: calculatePoints(userPicks, results)
        }));

        // Sort by points
        leaderboard.sort((a, b) => b.points - a.points);

        // Update table
        leaderboardBody.innerHTML = leaderboard.map((entry, index) => `
            <tr>
                <td>${index + 1}</td>
                <td>${entry.name}</td>
                <td>
                    <div class="picks-results">
                        <div class="pick-result">
                            <span>1st: ${DRIVERS[entry.picks.first]}</span>
                            ${entry.picks.first === results.first ? 
                                '<span class="correct-position">✓</span>' : 
                                entry.picks.first === results.second || entry.picks.first === results.third ?
                                '<span class="correct-driver">△</span>' : ''}
                        </div>
                        <div class="pick-result">
                            <span>2nd: ${DRIVERS[entry.picks.second]}</span>
                            ${entry.picks.second === results.second ? 
                                '<span class="correct-position">✓</span>' : 
                                entry.picks.second === results.first || entry.picks.second === results.third ?
                                '<span class="correct-driver">△</span>' : ''}
                        </div>
                        <div class="pick-result">
                            <span>3rd: ${DRIVERS[entry.picks.third]}</span>
                            ${entry.picks.third === results.third ? 
                                '<span class="correct-position">✓</span>' : 
                                entry.picks.third === results.first || entry.picks.third === results.second ?
                                '<span class="correct-driver">△</span>' : ''}
                        </div>
                    </div>
                </td>
                <td class="points">${entry.points}</td>
            </tr>
        `).join('');

    } catch (error) {
        console.error('Error updating leaderboard:', error);
        leaderboardBody.innerHTML = '<tr><td colspan="4">Error loading leaderboard</td></tr>';
    }
}

// Event Listeners
raceSelect.addEventListener('change', () => updateLeaderboard(raceSelect.value));
saveResultsBtn.addEventListener('click', saveResults);

// Initial leaderboard load
updateLeaderboard(raceSelect.value); 