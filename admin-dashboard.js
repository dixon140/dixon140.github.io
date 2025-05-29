// F1 2024 Races Data
const F1_2024_RACES = [
    { id: 'bahrain', name: 'Bahrain Grand Prix' },
    { id: 'saudi', name: 'Saudi Arabian Grand Prix' },
    { id: 'australia', name: 'Australian Grand Prix' },
    { id: 'japan', name: 'Japanese Grand Prix' },
    { id: 'china', name: 'Chinese Grand Prix' },
    { id: 'miami', name: 'Miami Grand Prix' },
    { id: 'emilia', name: 'Emilia Romagna Grand Prix' },
    { id: 'monaco', name: 'Monaco Grand Prix' },
    { id: 'canada', name: 'Canadian Grand Prix' },
    { id: 'spain', name: 'Spanish Grand Prix' },
    { id: 'austria', name: 'Austrian Grand Prix' },
    { id: 'britain', name: 'British Grand Prix' },
    { id: 'hungary', name: 'Hungarian Grand Prix' },
    { id: 'belgium', name: 'Belgian Grand Prix' },
    { id: 'netherlands', name: 'Dutch Grand Prix' },
    { id: 'italy', name: 'Italian Grand Prix' },
    { id: 'azerbaijan', name: 'Azerbaijan Grand Prix' },
    { id: 'singapore', name: 'Singapore Grand Prix' },
    { id: 'usa', name: 'United States Grand Prix' },
    { id: 'mexico', name: 'Mexican Grand Prix' },
    { id: 'brazil', name: 'Brazilian Grand Prix' },
    { id: 'vegas', name: 'Las Vegas Grand Prix' },
    { id: 'qatar', name: 'Qatar Grand Prix' },
    { id: 'abu-dhabi', name: 'Abu Dhabi Grand Prix' }
];

// F1 2024 Drivers Data
const F1_2024_DRIVERS = [
    { id: 'ver', name: 'Max Verstappen', team: 'Red Bull Racing' },
    { id: 'per', name: 'Sergio Perez', team: 'Red Bull Racing' },
    { id: 'ham', name: 'Lewis Hamilton', team: 'Mercedes' },
    { id: 'rus', name: 'George Russell', team: 'Mercedes' },
    { id: 'lec', name: 'Charles Leclerc', team: 'Ferrari' },
    { id: 'sai', name: 'Carlos Sainz', team: 'Ferrari' },
    { id: 'nor', name: 'Lando Norris', team: 'McLaren' },
    { id: 'pia', name: 'Oscar Piastri', team: 'McLaren' },
    { id: 'alo', name: 'Fernando Alonso', team: 'Aston Martin' },
    { id: 'str', name: 'Lance Stroll', team: 'Aston Martin' },
    { id: 'gas', name: 'Pierre Gasly', team: 'Alpine' },
    { id: 'oco', name: 'Esteban Ocon', team: 'Alpine' },
    { id: 'alb', name: 'Alexander Albon', team: 'Williams' },
    { id: 'sar', name: 'Logan Sargeant', team: 'Williams' },
    { id: 'tsu', name: 'Yuki Tsunoda', team: 'RB' },
    { id: 'ric', name: 'Daniel Ricciardo', team: 'RB' },
    { id: 'hul', name: 'Nico Hulkenberg', team: 'Haas F1 Team' },
    { id: 'mag', name: 'Kevin Magnussen', team: 'Haas F1 Team' },
    { id: 'bot', name: 'Valtteri Bottas', team: 'Kick Sauber' },
    { id: 'zho', name: 'Guanyu Zhou', team: 'Kick Sauber' }
];

// Check authentication
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'admin-login.html';
    }
});

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    console.log('Initializing dashboard...');
    console.log('Races:', F1_2024_RACES);
    console.log('Drivers:', F1_2024_DRIVERS);
    
    populateRaceSelect();
    populateDriverSelects();
    loadRaceResults();
    loadSubmissions();
    setupEventListeners();
});

// Populate race dropdown
function populateRaceSelect() {
    console.log('Populating race select...');
    const raceSelect = document.getElementById('admin-race-select');
    raceSelect.innerHTML = '<option value="">Choose a race...</option>';
    
    F1_2024_RACES.forEach(race => {
        const option = document.createElement('option');
        option.value = race.id;
        option.textContent = race.name;
        raceSelect.appendChild(option);
    });
}

// Populate driver dropdowns
function populateDriverSelects() {
    console.log('Populating driver selects...');
    const driverSelects = ['admin-first-place', 'admin-second-place', 'admin-third-place'];
    
    driverSelects.forEach(selectId => {
        const select = document.getElementById(selectId);
        select.innerHTML = '<option value="">Select driver...</option>';
        
        F1_2024_DRIVERS.forEach(driver => {
            const option = document.createElement('option');
            option.value = driver.id;
            option.textContent = `${driver.name} (${driver.team})`;
            select.appendChild(option);
        });
    });
}

// Load race results
async function loadRaceResults() {
    const currentRace = document.getElementById('admin-race-select').value;
    if (!currentRace) return;

    const saveButton = document.getElementById('save-results');
    saveButton.classList.add('loading');

    try {
        const resultsRef = ref(db, `results/${currentRace}`);
        const snapshot = await get(resultsRef);

        if (snapshot.exists()) {
            const results = snapshot.val();
            document.getElementById('admin-first-place').value = results.first;
            document.getElementById('admin-second-place').value = results.second;
            document.getElementById('admin-third-place').value = results.third;
        } else {
            // Clear the selections if no results exist
            document.getElementById('admin-first-place').value = '';
            document.getElementById('admin-second-place').value = '';
            document.getElementById('admin-third-place').value = '';
        }
    } catch (error) {
        console.error('Error loading results:', error);
        alert('Error loading results. Please try again.');
    } finally {
        saveButton.classList.remove('loading');
    }
}

// Save race results
async function saveRaceResults() {
    const raceId = document.getElementById('admin-race-select').value;
    const firstPlace = document.getElementById('admin-first-place').value;
    const secondPlace = document.getElementById('admin-second-place').value;
    const thirdPlace = document.getElementById('admin-third-place').value;

    if (!raceId || !firstPlace || !secondPlace || !thirdPlace) {
        alert('Please select a race and complete the podium results!');
        return;
    }

    // Check for duplicate positions
    if (firstPlace === secondPlace || firstPlace === thirdPlace || secondPlace === thirdPlace) {
        alert('Please select different drivers for each position!');
        return;
    }

    const saveButton = document.getElementById('save-results');
    saveButton.classList.add('loading');

    try {
        // Save race results
        const resultsRef = ref(db, `results/${raceId}`);
        await set(resultsRef, {
            first: firstPlace,
            second: secondPlace,
            third: thirdPlace,
            timestamp: serverTimestamp()
        });

        // Update points for all users
        await updateUserPoints(raceId, [firstPlace, secondPlace, thirdPlace]);
        
        // Add success animation
        saveButton.classList.add('success-animation');
        setTimeout(() => {
            saveButton.classList.remove('success-animation');
        }, 500);

        alert('Results saved successfully!');
    } catch (error) {
        console.error('Error saving results:', error);
        alert('Error saving results. Please try again.');
    } finally {
        saveButton.classList.remove('loading');
    }
}

// Load user submissions
async function loadSubmissions() {
    const submissionsList = document.getElementById('submissions-list');
    const currentRace = document.getElementById('admin-race-select').value;
    if (!currentRace) return;

    submissionsList.innerHTML = '<div class="loading-message">Loading submissions...</div>';

    try {
        // Get all submissions for the current race
        const submissionsRef = ref(db, `picks/${currentRace}`);
        const snapshot = await get(submissionsRef);

        submissionsList.innerHTML = '';
        
        if (snapshot.exists()) {
            const submissions = snapshot.val();
            const resultsRef = ref(db, `results/${currentRace}`);
            const resultsSnapshot = await get(resultsRef);
            const results = resultsSnapshot.exists() ? resultsSnapshot.val() : null;

            // Create a submission card for each user
            Object.entries(submissions).forEach(([userId, picks]) => {
                const submissionCard = document.createElement('div');
                submissionCard.className = 'submission-card';
                
                let points = 0;
                if (results) {
                    points = calculatePoints(
                        [picks.first, picks.second, picks.third],
                        [results.first, results.second, results.third]
                    );
                }

                const race = F1_2024_RACES.find(r => r.id === currentRace);
                const firstDriver = F1_2024_DRIVERS.find(d => d.id === picks.first);
                const secondDriver = F1_2024_DRIVERS.find(d => d.id === picks.second);
                const thirdDriver = F1_2024_DRIVERS.find(d => d.id === picks.third);
                
                submissionCard.innerHTML = `
                    <h3><i class="fas fa-flag-checkered"></i> ${race?.name || currentRace}</h3>
                    <div class="podium-picks">
                        <p class="first-place">
                            <i class="fas fa-medal" style="color: gold;"></i>
                            ${firstDriver?.name || picks.first}
                            <span class="team">${firstDriver?.team || ''}</span>
                        </p>
                        <p class="second-place">
                            <i class="fas fa-medal" style="color: silver;"></i>
                            ${secondDriver?.name || picks.second}
                            <span class="team">${secondDriver?.team || ''}</span>
                        </p>
                        <p class="third-place">
                            <i class="fas fa-medal" style="color: #cd7f32;"></i>
                            ${thirdDriver?.name || picks.third}
                            <span class="team">${thirdDriver?.team || ''}</span>
                        </p>
                    </div>
                    ${points > 0 ? `
                        <div class="points">
                            <i class="fas fa-star"></i>
                            Points: ${points}
                        </div>
                    ` : ''}
                `;
                
                submissionsList.appendChild(submissionCard);
            });
        } else {
            submissionsList.innerHTML = '<div class="no-submissions">No submissions for this race yet.</div>';
        }
    } catch (error) {
        console.error('Error loading submissions:', error);
        submissionsList.innerHTML = '<div class="error-message">Error loading submissions. Please try again.</div>';
    }
}

// Update user points
async function updateUserPoints(raceId, results) {
    try {
        const picksRef = ref(db, `picks/${raceId}`);
        const snapshot = await get(picksRef);

        if (snapshot.exists()) {
            const submissions = snapshot.val();
            
            // Update points for each user
            for (const [userId, picks] of Object.entries(submissions)) {
                const points = calculatePoints(
                    [picks.first, picks.second, picks.third],
                    results
                );

                const pointsRef = ref(db, `points/${raceId}/${userId}`);
                await set(pointsRef, {
                    points: points,
                    timestamp: serverTimestamp()
                });
            }
        }
    } catch (error) {
        console.error('Error updating points:', error);
    }
}

// Setup event listeners
function setupEventListeners() {
    document.getElementById('admin-race-select').addEventListener('change', () => {
        loadRaceResults();
        loadSubmissions();
    });
    
    document.getElementById('save-results').addEventListener('click', saveRaceResults);
    
    document.getElementById('logout-button').addEventListener('click', async (e) => {
        e.preventDefault();
        const logoutButton = e.target;
        logoutButton.classList.add('loading');
        
        try {
            await signOut(auth);
            window.location.href = 'admin-login.html';
        } catch (error) {
            console.error('Error signing out:', error);
            alert('Error signing out. Please try again.');
        } finally {
            logoutButton.classList.remove('loading');
        }
    });
} 