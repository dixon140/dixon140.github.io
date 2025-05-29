// Check authentication
onAuthStateChanged(auth, (user) => {
    if (!user) {
        window.location.href = 'admin-login.html';
    }
});

// Initialize the dashboard
document.addEventListener('DOMContentLoaded', () => {
    populateRaceSelect();
    populateDriverSelects();
    loadRaceResults();
    loadSubmissions();
    setupEventListeners();
});

// Populate race dropdown
function populateRaceSelect() {
    const raceSelect = document.getElementById('admin-race-select');
    F1_2024_RACES.forEach(race => {
        const option = document.createElement('option');
        option.value = race.id;
        option.textContent = race.name;
        raceSelect.appendChild(option);
    });
}

// Populate driver dropdowns
function populateDriverSelects() {
    const driverSelects = ['admin-first-place', 'admin-second-place', 'admin-third-place'];
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

// Load race results
async function loadRaceResults() {
    const currentRace = document.getElementById('admin-race-select').value;
    if (!currentRace) return;

    try {
        const resultsDoc = await getDoc(doc(db, 'results', currentRace));

        if (resultsDoc.exists()) {
            const results = resultsDoc.data();
            document.getElementById('admin-first-place').value = results.first;
            document.getElementById('admin-second-place').value = results.second;
            document.getElementById('admin-third-place').value = results.third;
        }
    } catch (error) {
        console.error('Error loading results:', error);
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

    try {
        await setDoc(doc(db, 'results', raceId), {
            first: firstPlace,
            second: secondPlace,
            third: thirdPlace,
            timestamp: serverTimestamp()
        });

        // Update points for all users
        await updateUserPoints(raceId, [firstPlace, secondPlace, thirdPlace]);
        
        alert('Results saved successfully!');
    } catch (error) {
        console.error('Error saving results:', error);
        alert('Error saving results. Please try again.');
    }
}

// Load user submissions
async function loadSubmissions() {
    const submissionsList = document.getElementById('submissions-list');
    const currentRace = document.getElementById('admin-race-select').value;
    if (!currentRace) return;

    try {
        const picksDoc = await getDoc(doc(db, 'picks', currentRace));

        submissionsList.innerHTML = '';
        
        if (picksDoc.exists()) {
            const picks = picksDoc.data();
            const resultsDoc = await getDoc(doc(db, 'results', currentRace));
            
            const results = resultsDoc.exists() ? resultsDoc.data() : null;
            
            const submissionCard = document.createElement('div');
            submissionCard.className = 'submission-card';
            
            let points = 0;
            if (results) {
                points = calculatePoints(
                    [picks.first, picks.second, picks.third],
                    [results.first, results.second, results.third]
                );
            }
            
            submissionCard.innerHTML = `
                <h3>Race: ${F1_2024_RACES.find(r => r.id === currentRace)?.name || currentRace}</h3>
                <p>1st: ${F1_2024_DRIVERS.find(d => d.id === picks.first)?.name || picks.first}</p>
                <p>2nd: ${F1_2024_DRIVERS.find(d => d.id === picks.second)?.name || picks.second}</p>
                <p>3rd: ${F1_2024_DRIVERS.find(d => d.id === picks.third)?.name || picks.third}</p>
                ${points > 0 ? `<p class="points">Points: ${points}</p>` : ''}
            `;
            
            submissionsList.appendChild(submissionCard);
        }
    } catch (error) {
        console.error('Error loading submissions:', error);
    }
}

// Update user points
async function updateUserPoints(raceId, results) {
    try {
        const picksDoc = await getDoc(doc(db, 'picks', raceId));

        if (picksDoc.exists()) {
            const picks = picksDoc.data();
            const points = calculatePoints(
                [picks.first, picks.second, picks.third],
                results
            );

            await setDoc(doc(db, 'points', raceId), {
                points: points,
                timestamp: serverTimestamp()
            });
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
        try {
            await signOut(auth);
            window.location.href = 'admin-login.html';
        } catch (error) {
            console.error('Error signing out:', error);
        }
    });
} 