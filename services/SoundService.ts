// Sound Service using Web Audio API for better mobile support
class SoundService {
    private audioContext: AudioContext | null = null;
    private soundBuffers: Map<string, AudioBuffer> = new Map();
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

    private async initialize() {
        try {
            // Create AudioContext
            this.audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
            console.log('🔊 AudioContext initialized');

            // Preload all sounds
            await this.preloadSounds();
            this.isInitialized = true;
            console.log('✅ All sounds preloaded');
        } catch (error) {
            console.error('❌ Failed to initialize AudioContext:', error);
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

    private async preloadSounds() {
        const loadPromises = Object.entries(this.sounds).map(async ([key, filename]) => {
            try {
                const url = this.getAssetPath(filename);
                console.log(`📥 Loading sound: ${key} from ${url}`);

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error(`HTTP ${response.status}: ${response.statusText}`);
                }

                const arrayBuffer = await response.arrayBuffer();
                const audioBuffer = await this.audioContext!.decodeAudioData(arrayBuffer);

                this.soundBuffers.set(key, audioBuffer);
                console.log(`✅ Loaded: ${key}`);
            } catch (error) {
                console.error(`❌ Failed to load ${key}:`, error);
            }
        });

        await Promise.all(loadPromises);
    }

    public async play(soundName: 'click' | 'sonar' | 'notification') {
        // Initialize if not done yet
        if (!this.isInitialized) {
            await this.initialize();
        }

        if (!this.audioContext) {
            console.error('❌ AudioContext not available');
            return;
        }

        // Resume context if suspended (mobile requirement)
        if (this.audioContext.state === 'suspended') {
            await this.audioContext.resume();
        }

        const buffer = this.soundBuffers.get(soundName);
        if (!buffer) {
            console.error(`❌ Sound not loaded: ${soundName}`);
            return;
        }

        try {
            // Create source
            const source = this.audioContext.createBufferSource();
            source.buffer = buffer;
            source.connect(this.audioContext.destination);
            source.start(0);

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
