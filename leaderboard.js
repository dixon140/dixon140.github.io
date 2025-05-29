// Import Firebase functions
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getDatabase, ref, get } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-database.js";

// Firebase configuration
const firebaseConfig = {
    databaseURL: "https://f1-picker-2024-default-rtdb.firebaseio.com"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

// Points system
const POINTS = {
    correctPosition: 3,    // Points for correct position
    correctPodium: 1,      // Points for correct driver in wrong position
    perfectPodium: 5       // Bonus points for perfect podium prediction
};

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    updateLeaderboard();
});

// Calculate points for a single race
function calculateRacePoints(picks, results) {
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

// Update the leaderboard
async function updateLeaderboard() {
    const tbody = document.querySelector('#leaderboard-table tbody');
    
    try {
        // Show loading state
        tbody.innerHTML = '<tr><td colspan="4" class="board-loading">Loading...</td></tr>';

        // Get all picks
        const picksRef = ref(db, 'picks');
        const picksSnapshot = await get(picksRef);
        const picks = picksSnapshot.val() || {};

        // Get all results
        const resultsRef = ref(db, 'results');
        const resultsSnapshot = await get(resultsRef);
        const results = resultsSnapshot.val() || {};

        // Calculate totals for each player
        const totals = {
            Calvin: { points: 0, perfectPodiums: 0 },
            Ethan: { points: 0, perfectPodiums: 0 }
        };

        // Calculate points for each race
        Object.entries(picks).forEach(([key, pick]) => {
            const [raceId, name] = key.split('_');
            const raceResults = results[raceId];
            
            if (!raceResults) return;

            const points = calculateRacePoints(pick, raceResults);
            totals[name].points += points;

            // Check for perfect podium (9 points for positions + 5 bonus)
            if (points >= POINTS.correctPosition * 3 + POINTS.perfectPodium) {
                totals[name].perfectPodiums++;
            }
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
                <td>${data.perfectPodiums}</td>
            `;
            tbody.appendChild(row);
        });

        // If no data was found, show a message
        if (Object.keys(picks).length === 0 || Object.keys(results).length === 0) {
            tbody.innerHTML = '<tr><td colspan="4" class="empty-state">No data available yet</td></tr>';
        }
    } catch (error) {
        console.error('Error updating leaderboard:', error);
        tbody.innerHTML = '<tr><td colspan="4" class="error">Error loading leaderboard. Please try again.</td></tr>';
    }
} 