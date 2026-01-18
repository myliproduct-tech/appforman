import { useReducer } from 'react';

// State type definition
export interface DashboardState {
    modals: {
        showIntelModal: boolean;
        showMissionModal: boolean;
    };
}

// Action types
export type DashboardAction =
    | { type: 'TOGGLE_INTEL_MODAL' }
    | { type: 'SET_INTEL_MODAL'; value: boolean }
    | { type: 'TOGGLE_MISSION_MODAL' }
    | { type: 'SET_MISSION_MODAL'; value: boolean }
    | { type: 'CLOSE_ALL_MODALS' };

// Initial state factory
export const createInitialState = (): DashboardState => ({
    modals: {
        showIntelModal: false,
        showMissionModal: false,
    },
});

// Reducer function
export const dashboardReducer = (state: DashboardState, action: DashboardAction): DashboardState => {
    switch (action.type) {
        case 'TOGGLE_INTEL_MODAL':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showIntelModal: !state.modals.showIntelModal,
                },
            };

        case 'SET_INTEL_MODAL':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showIntelModal: action.value,
                },
            };

        case 'TOGGLE_MISSION_MODAL':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showMissionModal: !state.modals.showMissionModal,
                },
            };

        case 'SET_MISSION_MODAL':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    showMissionModal: action.value,
                },
            };

        case 'CLOSE_ALL_MODALS':
            return {
                ...state,
                modals: {
                    showIntelModal: false,
                    showMissionModal: false,
                },
            };

        default:
            return state;
    }
};

// Custom hook
export const useDashboardReducer = () => {
    const [state, dispatch] = useReducer(dashboardReducer, createInitialState());
    return { state, dispatch };
};
