document.addEventListener('DOMContentLoaded', () => {
    const openBtn = document.getElementById('open-how-it-works');
    const closeBtn = document.getElementById('close-how-it-works');
    const modal = document.getElementById('how-it-works-modal');
    const video = document.getElementById('modal-video');

    const videoUrl = 'https://www.youtube.com/embed/dQw4w9WgXcQ'; // Placeholder

    if (openBtn && modal && video) {
        openBtn.addEventListener('click', () => {
            video.src = videoUrl;
            modal.classList.add('active');
        });
    }

    const closeModal = () => {
        modal.classList.remove('active');
        video.src = ''; // Stop video playback by clearing the source
    };

    if (closeBtn) {
        closeBtn.addEventListener('click', closeModal);
    }

    if (modal) {
        modal.addEventListener('click', (e) => {
            if (e.target === modal) {
                closeModal();
            }
        });
    }
});