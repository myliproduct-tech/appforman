// Helper function to get correct asset path for GitHub Pages and other environments
export function getAssetPath(filename: string): string {
    // Get base path from current location
    const pathname = window.location.pathname;

    // Check if we're on GitHub Pages (contains /appforman/ in path)
    if (pathname.includes('/appforman/')) {
        return `/appforman/${filename}`;
    }

    // For local dev or other hosting (Render.com)
    return `/${filename}`;
}

// Pre-create Audio objects for better mobile support
export function createAudio(filename: string): HTMLAudioElement {
    const audio = new Audio(getAssetPath(filename));

    // Preload for mobile
    audio.preload = 'auto';

    return audio;
}

// Play sound with error handling
export function playSound(filename: string): void {
    try {
        const audio = createAudio(filename);
        audio.play().catch(err => {
            console.warn(`Failed to play sound: ${filename}`, err);
        });
    } catch (error) {
        console.error(`Error creating audio: ${filename}`, error);
    }
}
