// Helper function to get correct asset path for GitHub Pages and other environments
export function getAssetPath(filename: string): string {
    // Use absolute URL from current origin
    const origin = window.location.origin;
    const pathname = window.location.pathname;

    // Check if we're on GitHub Pages (contains /appforman/)
    if (pathname.includes('/appforman/')) {
        return `${origin}/appforman/${filename}`;
    }

    // For local dev or other hosting (Render.com)
    return `${origin}/${filename}`;
}

// Play sound with error handling
export function playSound(filename: string): void {
    try {
        const soundPath = getAssetPath(filename);
        console.log('🔊 Attempting to play sound:', soundPath);

        const audio = new Audio(soundPath);
        audio.preload = 'auto';

        audio.play().catch(err => {
            console.error(`❌ Failed to play sound: ${filename}`, err);
            console.error('Sound path was:', soundPath);
        });
    } catch (error) {
        console.error(`❌ Error creating audio: ${filename}`, error);
    }
}
