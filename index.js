const fs = require('fs');

// ⚠️ CHANGE THIS TO YOUR USERNAME
const GITHUB_USERNAME = 'GIGABOIZ'; 

async function fetchGitHubStats() {
    try {
        console.log(`Fetching stats for ${GITHUB_USERNAME}...`);
        const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100`);
        const repos = await response.json();

        const totalStars = repos.reduce((acc, repo) => acc + repo.stargazers_count, 0);
        const totalRepos = repos.length;

        updateReadme(totalStars, totalRepos);
    } catch (error) {
        console.error("Error fetching GitHub stats:", error);
    }
}

function updateReadme(stars, repos) {
    const date = new Date().toLocaleDateString('en-US', { 
        weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' 
    });

    const readmeContent = `
# 📊 My Dynamic GitHub Stats

Welcome to my profile! This README is updated **automatically** every day.

### 📈 Live Stats
* **Total Public Repositories:** ${repos}
* **Total Earned Stars:** ${stars} ⭐

_Last updated automatically on: ${date}_
    `;

    fs.writeFileSync('README.md', readmeContent.trim());
    console.log("✅ README.md updated successfully!");
}

fetchGitHubStats();