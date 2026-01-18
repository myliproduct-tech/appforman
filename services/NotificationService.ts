/**
 * Service for managing browser notifications.
 */
class NotificationService {
    private static instance: NotificationService;

    private constructor() { }

    public static getInstance(): NotificationService {
        if (!NotificationService.instance) {
            NotificationService.instance = new NotificationService();
        }
        return NotificationService.instance;
    }

    /**
     * Checks if notifications are supported by the browser
     */
    public isSupported(): boolean {
        return 'Notification' in window;
    }

    /**
     * Requests permission to show notifications
     * @returns Promise resolving to true if granted
     */
    public async requestPermission(): Promise<boolean> {
        if (!this.isSupported()) return false;

        try {
            const permission = await Notification.requestPermission();
            return permission === 'granted';
        } catch (error) {
            console.error('Error requesting notification permission:', error);
            return false;
        }
    }

    /**
     * Sends a browser notification
     * @param title Notification title
     * @param body Notification body text
     * @param icon Optional icon path
     */
    public send(title: string, body: string, icon: string = '/pwa-192x192.png'): void {
        if (!this.isSupported()) return;
        if (Notification.permission !== 'granted') return;

        try {
            new Notification(title, {
                body,
                icon,
                badge: icon,
                vibrate: [200, 100, 200]
            } as any);
        } catch (error) {
            console.error('Error sending notification:', error);
        }
    }
}

export const notificationService = NotificationService.getInstance();
