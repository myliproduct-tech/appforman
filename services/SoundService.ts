// Simplified sound service - play sounds directly without preloading
class SoundService {
    private sounds = {
        click: 'click.wav',
        sonar: 'sonar.wav',
        notification: 'notification.wav'
    };

    private getAssetPath(filename: string): string {
        const origin = window.location.origin;
        const pathname = window.location.pathname;

        if (pathname.includes('/appforman/')) {
            return `${origin}/appforman/${filename}`;
        }

        return `${origin}/${filename}`;
    }

    public play(soundName: 'click' | 'sonar' | 'notification') {
        try {
            const filename = this.sounds[soundName];
            const url = this.getAssetPath(filename);

            console.log(`🔊 Attempting to play: ${soundName} from ${url}`);

            // Create fresh audio element each time
            const audio = new Audio();

            // Set source
            audio.src = url;

            // Try to play
            const playPromise = audio.play();

            if (playPromise !== undefined) {
                playPromise
                    .then(() => {
                        console.log(`✅ Successfully playing: ${soundName}`);
                    })
                    .catch(err => {
                        console.error(`❌ Failed to play ${soundName}:`, err);
                        console.error('Error details:', {
                            name: err.name,
                            message: err.message,
                            code: err.code
                        });
                    });
            }
        } catch (error) {
            console.error(`❌ Error in play function for ${soundName}:`, error);
        }
    }

    public playClick() {
        this.play('click');
    }

    public playSonar() {
        this.play('sonar');
    }

    public playNotification() {
        this.play('notification');
    }
}

// Export singleton instance
export const soundService = new SoundService();
