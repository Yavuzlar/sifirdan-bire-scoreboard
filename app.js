document.addEventListener('DOMContentLoaded', () => {
    // Initialize the application
    loadQuestions();
    loadScoreboard();
    setupNavigation();

    // Popup functionality
    const popup = document.getElementById('competitionEndPopup');
    const closeBtn = popup.querySelector('.popup-close');

    // Show popup when page loads
    setTimeout(() => {
        popup.classList.add('active');
    }, 500);

    // Close popup when close button is clicked
    closeBtn.addEventListener('click', () => {
        popup.classList.remove('active');
    });

    // Close popup when clicking outside
    popup.addEventListener('click', (e) => {
        if (e.target === popup) {
            popup.classList.remove('active');
        }
    });
});

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const pages = document.querySelectorAll('.page');

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');

            // Update active states
            navLinks.forEach(l => l.classList.remove('active'));
            link.classList.add('active');

            // Show target page
            pages.forEach(page => {
                page.classList.remove('active');
                if (page.id === targetPage) {
                    page.classList.add('active');
                }
            });
        });
    });
}

function loadQuestions() {
    const questionsList = document.getElementById('questionsList');

    questions.forEach(question => {
        const questionCard = document.createElement('div');
        questionCard.className = 'question-card';
        questionCard.innerHTML = `
            <h3 class="question-title">${question.title}</h3>
            <a href="${question.link}" class="solve-btn" target="_blank" rel="noopener noreferrer">Çöz</a>
        `;
        questionsList.appendChild(questionCard);
    });
}

function loadScoreboard() {
    const topThree = document.querySelector('.top-three');
    const scoreboardList = document.getElementById('scoreboardList');

    // Load top 3 users
    scoreboardData.slice(0, 3).forEach((user, index) => {
        const topUser = document.createElement('div');
        topUser.className = `top-user rank-${index + 1}`;
        topUser.innerHTML = `
            <div class="user-rank">#${index + 1}</div>
            <div class="user-name">${user.name}</div>
            <div class="user-score">${user.score}</div>
        `;
        topThree.appendChild(topUser);
    });

    // Load remaining users
    scoreboardData.slice(3).forEach((user, index) => {
        const scoreboardItem = document.createElement('div');
        scoreboardItem.className = 'scoreboard-item';
        scoreboardItem.innerHTML = `
            <div class="user-rank" style="color: var(--gold);">#${index + 4}</div>
            <div class="user-name">${user.name}</div>
            <div class="user-score">${user.score}</div>
        `;
        scoreboardList.appendChild(scoreboardItem);
    });
}

// Add smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
}); 