// Sound Service using HTML Audio API for better mobile compatibility
class SoundService {
    private audioElements: Map<string, HTMLAudioElement> = new Map();
    private isInitialized = false;

    // Sound file paths
    private sounds = {
        click: 'click.wav',
        sonar: 'sonar.wav',
        notification: 'notification.wav'
    };

    constructor() {
        // Initialize on first user interaction
        this.initOnUserGesture();
    }

    private initOnUserGesture() {
        const init = () => {
            if (!this.isInitialized) {
                this.initialize();
                document.removeEventListener('touchstart', init);
                document.removeEventListener('click', init);
            }
        };

        document.addEventListener('touchstart', init, { once: true });
        document.addEventListener('click', init, { once: true });
    }

    private initialize() {
        try {
            console.log('🔊 Initializing SoundService...');

            // Preload all sounds
            this.preloadSounds();
            this.isInitialized = true;

            console.log('✅ SoundService initialized');
        } catch (error) {
            console.error('❌ Failed to initialize SoundService:', error);
        }
    }

    private getAssetPath(filename: string): string {
        const origin = window.location.origin;
        const pathname = window.location.pathname;

        if (pathname.includes('/appforman/')) {
            return `${origin}/appforman/${filename}`;
        }

        return `${origin}/${filename}`;
    }

    private preloadSounds() {
        Object.entries(this.sounds).forEach(([key, filename]) => {
            try {
                const url = this.getAssetPath(filename);
                console.log(`📥 Preloading sound: ${key} from ${url}`);

                const audio = new Audio(url);
                audio.preload = 'auto';
                audio.load();

                // Handle load success
                audio.addEventListener('canplaythrough', () => {
                    console.log(`✅ Loaded: ${key}`);
                }, { once: true });

                // Handle load error
                audio.addEventListener('error', (e) => {
                    console.error(`❌ Failed to load ${key}:`, e);
                }, { once: true });

                this.audioElements.set(key, audio);
            } catch (error) {
                console.error(`❌ Error preloading ${key}:`, error);
            }
        });
    }

    public async play(soundName: 'click' | 'sonar' | 'notification') {
        // Initialize if not done yet
        if (!this.isInitialized) {
            this.initialize();
        }

        const audio = this.audioElements.get(soundName);
        if (!audio) {
            console.error(`❌ Sound not found: ${soundName}`);
            return;
        }

        try {
            // Reset to start if already playing
            audio.currentTime = 0;

            await audio.play();
            console.log(`🔊 Playing: ${soundName}`);
        } catch (error) {
            console.error(`❌ Failed to play ${soundName}:`, error);
        }
    }

    public async playClick() {
        await this.play('click');
    }

    public async playSonar() {
        await this.play('sonar');
    }

    public async playNotification() {
        await this.play('notification');
    }
}

// Export singleton instance
export const soundService = new SoundService();
