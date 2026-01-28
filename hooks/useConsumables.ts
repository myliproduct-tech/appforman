import React, { useEffect } from 'react';
import { UserStats, ConsumableItem } from '../types';
import { parseLocalDate } from '../utils';
import { DEFAULT_CONSUMABLES } from '../constants';
import { notificationService } from '../services/NotificationService';

/**
 * Custom hook for managing consumables (teas, vitamins)
 * Handles daily deduction and inventory management
 */
export const useConsumables = (
    stats: UserStats,
    setStats: React.Dispatch<React.SetStateAction<UserStats>>,
    effectiveDate: string
) => {
    // Migration: Remove teas (g51, g23) from existing user data (one-time cleanup)
    useEffect(() => {
        if (stats.budgetPlan?.consumables && stats.budgetPlan.consumables.length > 0) {
            const hasTeaItems = stats.budgetPlan.consumables.some(c => c.id === 'g51' || c.id === 'g23');

            if (hasTeaItems) {
                setStats(prev => {
                    const updatedConsumables = prev.budgetPlan?.consumables?.filter(c =>
                        c.id !== 'g51' && c.id !== 'g23'
                    ) || [];

                    // Also remove tea items from gearChecklist
                    const updatedGearChecklist = prev.gearChecklist.filter(id =>
                        id !== 'g51' && id !== 'g23'
                    );

                    return {
                        ...prev,
                        budgetPlan: { ...prev.budgetPlan!, consumables: updatedConsumables },
                        gearChecklist: updatedGearChecklist
                    };
                });
            }
        }
    }, [stats.email]); // Run only when user changes

    // Daily notification reminder for consumables (no auto-deduction)
    useEffect(() => {
        if (stats.budgetPlan?.consumables && stats.budgetPlan.consumables.length > 0 && stats.email) {
            const effectiveToday = effectiveDate;

            // Check if any item needs confirmation today
            const needsConfirmation = stats.budgetPlan.consumables.filter(item => {
                const lastConfirmed = item.lastConfirmedDate?.split('T')[0];
                return !lastConfirmed || lastConfirmed !== effectiveToday;
            });

            // Send notification if enabled and there are unconfirmed items
            if (needsConfirmation.length > 0 && stats.notificationsEnabled) {
                const names = needsConfirmation.map(i => i.name).join(', ');
                notificationService.send(
                    '💊 Připomínka vitamínů',
                    `Nezapomeň potvrdit: ${names}`
                );
            }

            // Check for low stock and send warning
            const lowStockItems = stats.budgetPlan.consumables.filter(c => c.quantity < 5 && c.quantity > 0);
            if (lowStockItems.length > 0 && stats.notificationsEnabled) {
                const names = lowStockItems.map(i => i.name).join(', ');
                notificationService.send(
                    '⚠️ Docházející zásoby',
                    `Dochází ti: ${names}. Zbývá méně než 5 kusů!`
                );
            }


            // Auto-uncheck items with low stock (only vitamins now)
            let newGearChecklist = stats.gearChecklist;

            const lowStockVitamins = lowStockItems.filter(c => c.isCustom);
            if (lowStockVitamins.length > 0 && newGearChecklist.includes('g54')) {
                newGearChecklist = newGearChecklist.filter(id => id !== 'g54');
            }

            if (newGearChecklist !== stats.gearChecklist) {
                setStats(prev => ({
                    ...prev,
                    gearChecklist: newGearChecklist
                }));
            }
        }
    }, [stats.email, effectiveDate]);

    // Handler: Update consumable quantity
    const handleUpdateConsumable = (id: string, quantity: number) => {
        setStats(prev => {
            const consumables = prev.budgetPlan?.consumables || [];
            const existingIndex = consumables.findIndex(c => c.id === id);

            let updated: ConsumableItem[];
            if (existingIndex >= 0) {
                updated = consumables.map(c =>
                    c.id === id ? { ...c, quantity, lastUpdated: effectiveDate } : c
                );
            } else {
                const defaultItem = DEFAULT_CONSUMABLES.find(d => d.id === id);
                if (defaultItem) {
                    updated = [...consumables, {
                        ...defaultItem,
                        quantity,
                        lastUpdated: effectiveDate
                    }];
                } else {
                    updated = consumables;
                }
            }

            // Auto-check in gearChecklist if quantity > 0
            let newGearChecklist = prev.gearChecklist;
            if (quantity > 0) {
                // If it's a custom vitamin (isCustom: true), auto-check g54
                const item = updated.find(c => c.id === id);
                if (item?.isCustom && !newGearChecklist.includes('g54')) {
                    newGearChecklist = [...newGearChecklist, 'g54'];
                }
            }

            return {
                ...prev,
                budgetPlan: { ...prev.budgetPlan!, consumables: updated },
                gearChecklist: newGearChecklist
            };
        });
    };

    // Handler: Add custom consumable (vitamins)
    const handleAddCustomConsumable = (name: string, quantity: number) => {
        setStats(prev => {
            const consumables = prev.budgetPlan?.consumables || [];
            const newItem: ConsumableItem = {
                id: `custom_${Date.now()}`,
                name,
                quantity,
                lastUpdated: effectiveDate,
                isCustom: true
            };

            const updatedConsumables = [...consumables, newItem];

            // Auto-check g54 (Vitamíny pro partnerku) if adding first custom vitamin
            const hasCustomVitamins = updatedConsumables.some(c => c.isCustom);
            let newGearChecklist = prev.gearChecklist;

            if (hasCustomVitamins && quantity > 0 && !newGearChecklist.includes('g54')) {
                newGearChecklist = [...newGearChecklist, 'g54'];
            }

            return {
                ...prev,
                budgetPlan: { ...prev.budgetPlan!, consumables: updatedConsumables },
                gearChecklist: newGearChecklist
            };
        });
    };

    // Handler: Delete consumable
    const handleDeleteConsumable = (id: string) => {
        setStats(prev => {
            const consumables = prev.budgetPlan?.consumables || [];
            const updatedConsumables = consumables.filter(c => c.id !== id);

            // Auto-uncheck g54 if no custom vitamins remain
            const hasCustomVitamins = updatedConsumables.some(c => c.isCustom);
            let newGearChecklist = prev.gearChecklist;

            if (!hasCustomVitamins && newGearChecklist.includes('g54')) {
                newGearChecklist = newGearChecklist.filter(id => id !== 'g54');
            }

            return {
                ...prev,
                budgetPlan: { ...prev.budgetPlan!, consumables: updatedConsumables },
                gearChecklist: newGearChecklist
            };
        });
    };

    // Handler: Confirm consumption (manual deduction)
    const handleConfirmConsumption = (id: string) => {
        setStats(prev => {
            const consumables = prev.budgetPlan?.consumables || [];
            const item = consumables.find(c => c.id === id);

            if (!item || item.quantity <= 0) {
                return prev;
            }

            const updatedConsumables = consumables.map(c =>
                c.id === id
                    ? {
                        ...c,
                        quantity: c.quantity - 1,
                        lastConfirmedDate: effectiveDate,
                        lastUpdated: effectiveDate
                    }
                    : c
            );

            // Check for low stock after deduction
            let newGearChecklist = prev.gearChecklist;
            const updatedItem = updatedConsumables.find(c => c.id === id);

            if (updatedItem && updatedItem.quantity < 5) {
                // Uncheck g54 if any custom vitamin is low stock
                if (updatedItem.isCustom && newGearChecklist.includes('g54')) {
                    newGearChecklist = newGearChecklist.filter(gid => gid !== 'g54');
                }
            }

            return {
                ...prev,
                budgetPlan: { ...prev.budgetPlan!, consumables: updatedConsumables },
                gearChecklist: newGearChecklist
            };
        });
    };

    return {
        handleUpdateConsumable,
        handleAddCustomConsumable,
        handleDeleteConsumable,
        handleConfirmConsumption,
    };
};
