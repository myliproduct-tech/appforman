import { ConsumableItem } from '../types';
import { notificationService } from './NotificationService';

/**
 * Service for scheduling and sending vitamin notifications at specific times
 */
class VitaminNotificationScheduler {
    private sentNotificationsKey = 'vitamin_notifications_sent';

    /**
     * Check if it's time to send notifications and send them
     */
    checkAndSendNotifications(consumables: ConsumableItem[] | undefined, notificationsEnabled: boolean) {
        if (!consumables || !notificationsEnabled) return;

        const now = new Date();
        const currentTime = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}`;
        const today = now.toISOString().split('T')[0];

        consumables.forEach(item => {
            if (!item.notificationTimes || item.notificationTimes.length === 0) return;

            item.notificationTimes.forEach(scheduledTime => {
                if (this.shouldSendNotification(item, currentTime, scheduledTime, today)) {
                    notificationService.send(
                        `💊 ${item.name}`,
                        `Čas na užití! Nezapomeň potvrdit v aplikaci.`
                    );
                    this.markNotificationSent(item.id, scheduledTime, today);
                }
            });
        });
    }

    /**
     * Check if notification should be sent
     */
    private shouldSendNotification(
        item: ConsumableItem,
        currentTime: string,
        scheduledTime: string,
        today: string
    ): boolean {
        // Check if current time matches scheduled time
        if (currentTime !== scheduledTime) return false;

        // Check if notification was already sent today
        if (this.wasNotificationSent(item.id, scheduledTime, today)) return false;

        // Check if item has quantity
        if (item.quantity <= 0) return false;

        return true;
    }

    /**
     * Mark notification as sent
     */
    private markNotificationSent(itemId: string, time: string, date: string) {
        const sent = this.getSentNotifications();
        const key = `${itemId}_${time}_${date}`;
        sent[key] = true;
        localStorage.setItem(this.sentNotificationsKey, JSON.stringify(sent));
    }

    /**
     * Check if notification was already sent
     */
    private wasNotificationSent(itemId: string, time: string, date: string): boolean {
        const sent = this.getSentNotifications();
        const key = `${itemId}_${time}_${date}`;
        return !!sent[key];
    }

    /**
     * Get sent notifications from localStorage
     */
    private getSentNotifications(): Record<string, boolean> {
        try {
            const data = localStorage.getItem(this.sentNotificationsKey);
            return data ? JSON.parse(data) : {};
        } catch {
            return {};
        }
    }

    /**
     * Clean up old notification records (older than 7 days)
     */
    cleanupOldRecords() {
        const sent = this.getSentNotifications();
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
        const cutoffDate = sevenDaysAgo.toISOString().split('T')[0];

        const cleaned: Record<string, boolean> = {};
        Object.keys(sent).forEach(key => {
            const date = key.split('_')[2];
            if (date && date >= cutoffDate) {
                cleaned[key] = sent[key];
            }
        });

        localStorage.setItem(this.sentNotificationsKey, JSON.stringify(cleaned));
    }
}

export const vitaminNotificationScheduler = new VitaminNotificationScheduler();
