document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('birthday-form');
    const dateInput = document.getElementById('birthday-input');
    const resultContainer = document.getElementById('result-container');
    const loadingEl = document.getElementById('loading');
    const errorEl = document.getElementById('error-message');
    
    // Result elements
    const titleEl = document.getElementById('apod-title');
    const dateEl = document.getElementById('apod-date');
    const mediaContainer = document.getElementById('media-container');
    const explanationEl = document.getElementById('apod-explanation');

    // Set max date to today
    const today = new Date().toISOString().split('T')[0];
    dateInput.max = today;
    
    // Backend URL
    const API_URL = 'http://127.0.0.1:8000/api/apod';

    form.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const selectedDate = dateInput.value;
        if (!selectedDate) return;

        // Reset UI state
        errorEl.classList.add('hidden');
        resultContainer.classList.add('hidden');
        loadingEl.classList.remove('hidden');

        try {
            const response = await fetch(API_URL, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ date: selectedDate })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.detail || 'Failed to fetch APOD data');
            }

            const data = await response.json();
            displayResult(data);
            
        } catch (error) {
            console.error('Error fetching APOD:', error);
            errorEl.textContent = error.message || 'An error occurred while reaching the cosmos. Please try again.';
            errorEl.classList.remove('hidden');
        } finally {
            loadingEl.classList.add('hidden');
        }
    });

    function displayResult(data) {
        // Clear previous media
        mediaContainer.innerHTML = '';

        titleEl.textContent = data.title;
        
        // Format date beautifully
        const dateObj = new Date(data.date);
        const options = { year: 'numeric', month: 'long', day: 'numeric', timeZone: 'UTC' };
        dateEl.textContent = dateObj.toLocaleDateString(undefined, options);

        // Handle Image vs Video
        if (data.media_type === 'video') {
            const iframe = document.createElement('iframe');
            iframe.src = data.url;
            iframe.title = data.title;
            iframe.setAttribute('allowfullscreen', '');
            iframe.setAttribute('frameborder', '0');
            mediaContainer.appendChild(iframe);
        } else {
            const img = document.createElement('img');
            img.src = data.url; // url (could use hdurl but url loads faster)
            img.alt = data.title;
            // Add a lovely fade-in load effect
            img.style.opacity = '0';
            img.onload = () => {
                img.style.transition = 'opacity 0.5s ease';
                img.style.opacity = '1';
            };
            mediaContainer.appendChild(img);
        }

        explanationEl.textContent = data.explanation;

        // Show container with animation
        resultContainer.classList.remove('hidden');
        
        // Scroll slightly to bring it into view if on small screens
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
});
