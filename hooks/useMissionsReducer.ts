import { useReducer } from 'react';
import { Task, TaskCategory } from '../types';

// State type definition
export interface MissionsState {
    tabs: {
        activeTab: 'active' | 'postponed' | 'history';
    };
    modals: {
        showCustomForm: boolean;
        schedulingTask: Task | null;
        scheduleMode: 'restore' | 'postpone';
    };
    filters: {
        category: TaskCategory | 'all';
        week: number | 'all';
        month: number | 'all';
    };
    archive: {
        mode: 'completed' | 'missed';
    };
    ui: {
        isExporting: boolean;
    };
}

// Action types
export type MissionsAction =
    // Tab actions
    | { type: 'SET_ACTIVE_TAB'; value: 'active' | 'postponed' | 'history' }

    // Modal actions
    | { type: 'TOGGLE_CUSTOM_FORM' }
    | { type: 'SET_CUSTOM_FORM'; value: boolean }
    | { type: 'OPEN_SCHEDULE_MODAL'; task: Task; mode: 'restore' | 'postpone' }
    | { type: 'CLOSE_SCHEDULE_MODAL' }

    // Filter actions
    | { type: 'SET_FILTER_CATEGORY'; value: TaskCategory | 'all' }
    | { type: 'SET_FILTER_WEEK'; value: number | 'all' }
    | { type: 'SET_FILTER_MONTH'; value: number | 'all' }
    | { type: 'RESET_FILTERS' }

    // Archive actions
    | { type: 'SET_ARCHIVE_MODE'; value: 'completed' | 'missed' }

    // UI actions
    | { type: 'SET_EXPORTING'; value: boolean };

// Initial state factory
export const createInitialState = (): MissionsState => ({
    tabs: {
        activeTab: 'active',
    },
    modals: {
        showCustomForm: false,
        schedulingTask: null,
        scheduleMode: 'restore',
    },
    filters: {
        category: 'all',
        week: 'all',
        month: 'all',
    },
    archive: {
        mode: 'completed',
    },
    ui: {
        isExporting: false,
    },
});

// Reducer function
export const missionsReducer = (state: MissionsState, action: MissionsAction): MissionsState => {
    switch (action.type) {
        // Tab actions
        case 'SET_ACTIVE_TAB':
            return {
                ...state,
                tabs: { activeTab: action.value },
            };

        // Modal actions
        case 'TOGGLE_CUSTOM_FORM':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showCustomForm: !state.modals.showCustomForm,
                },
            };

        case 'SET_CUSTOM_FORM':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showCustomForm: action.value,
                },
            };

        case 'OPEN_SCHEDULE_MODAL':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    schedulingTask: action.task,
                    scheduleMode: action.mode,
                },
            };

        case 'CLOSE_SCHEDULE_MODAL':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    schedulingTask: null,
                },
            };

        // Filter actions
        case 'SET_FILTER_CATEGORY':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    category: action.value,
                },
            };

        case 'SET_FILTER_WEEK':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    week: action.value,
                },
            };

        case 'SET_FILTER_MONTH':
            return {
                ...state,
                filters: {
                    ...state.filters,
                    month: action.value,
                    // Reset week when month changes (if not 'all')
                    week: action.value !== 'all' ? 'all' : state.filters.week,
                },
            };

        case 'RESET_FILTERS':
            return {
                ...state,
                filters: {
                    category: 'all',
                    week: 'all',
                    month: 'all',
                },
            };

        // Archive actions
        case 'SET_ARCHIVE_MODE':
            return {
                ...state,
                archive: { mode: action.value },
            };

        // UI actions
        case 'SET_EXPORTING':
            return {
                ...state,
                ui: { isExporting: action.value },
            };

        default:
            return state;
    }
};

// Custom hook
export const useMissionsReducer = () => {
    const [state, dispatch] = useReducer(missionsReducer, createInitialState());
    return { state, dispatch };
};
