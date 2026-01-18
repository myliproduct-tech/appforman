import React, { useEffect } from 'react';
import { UserStats, ConsumableItem } from '../types';
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
    // Daily deduction for consumables
    useEffect(() => {
        if (stats.budgetPlan?.consumables && stats.budgetPlan.consumables.length > 0 && stats.email) {
            const effectiveToday = effectiveDate;

            // Check if any item needs deduction
            const needsUpdate = stats.budgetPlan.consumables.some(item => {
                const lastUpdated = item.lastUpdated.split('T')[0];
                const daysDiff = Math.floor((new Date(effectiveToday).getTime() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24));
                return daysDiff >= 1;
            });

            if (needsUpdate) {
                setStats(prev => {
                    if (!prev.budgetPlan?.consumables || prev.budgetPlan.consumables.length === 0) {
                        return prev;
                    }

                    const updatedConsumables = prev.budgetPlan.consumables.map(item => {
                        const lastUpdated = item.lastUpdated.split('T')[0];
                        const daysDiff = Math.floor((new Date(effectiveToday).getTime() - new Date(lastUpdated).getTime()) / (1000 * 60 * 60 * 24));

                        if (daysDiff >= 1) {
                            const newQuantity = Math.max(0, item.quantity - daysDiff);
                            return { ...item, quantity: newQuantity, lastUpdated: effectiveToday };
                        }
                        return item;
                    });

                    // Check for low stock and auto-uncheck in inventory
                    let newGearChecklist = prev.gearChecklist;

                    // For teas (g51, g23): uncheck if low stock
                    const lowStockTeas = updatedConsumables.filter(c =>
                        (c.id === 'g51' || c.id === 'g23') && c.quantity < 5
                    );
                    lowStockTeas.forEach(item => {
                        if (newGearChecklist.includes(item.id)) {
                            newGearChecklist = newGearChecklist.filter(id => id !== item.id);
                        }
                    });

                    // For vitamins (custom only): uncheck g54 if ANY custom vitamin is low stock
                    const lowStockVitamins = updatedConsumables.filter(c =>
                        c.isCustom && c.quantity < 5
                    );
                    if (lowStockVitamins.length > 0 && newGearChecklist.includes('g54')) {
                        newGearChecklist = newGearChecklist.filter(id => id !== 'g54');
                    }

                    // Send notifications if enabled
                    if (prev.notificationsEnabled) {
                        const lowStockItems = updatedConsumables.filter(c => c.quantity < 5 && c.quantity > 0);
                        if (lowStockItems.length > 0) {
                            const names = lowStockItems.map(i => i.name).join(', ');
                            notificationService.send(
                                '⚠️ Docházející zásoby',
                                `Dochází ti: ${names}. Zbývá méně než 5 kusů!`
                            );
                        }
                    }

                    return {
                        ...prev,
                        budgetPlan: { ...prev.budgetPlan, consumables: updatedConsumables },
                        gearChecklist: newGearChecklist
                    };
                });
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
                // If it's one of the standard teas (g51, g23)
                if ((id === 'g51' || id === 'g23') && !newGearChecklist.includes(id)) {
                    newGearChecklist = [...newGearChecklist, id];
                }
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

    return {
        handleUpdateConsumable,
        handleAddCustomConsumable,
        handleDeleteConsumable,
    };
};
