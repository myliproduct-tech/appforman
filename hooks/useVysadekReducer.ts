import { useReducer } from 'react';

// State type definition
export interface VysadekState {
    tabs: {
        activeTab: 'logistika' | 'porod' | 'zlatahodinka';
    };
    ui: {
        isProtocolOpen: boolean;
        showCompletionModal: boolean;
        babyGender: 'boy' | 'girl';
    };
}

// Action types
export type VysadekAction =
    | { type: 'SET_ACTIVE_TAB'; value: 'logistika' | 'porod' | 'zlatahodinka' }
    | { type: 'TOGGLE_PROTOCOL' }
    | { type: 'SET_PROTOCOL_OPEN'; value: boolean }
    | { type: 'TOGGLE_COMPLETION_MODAL' }
    | { type: 'SET_COMPLETION_MODAL'; value: boolean }
    | { type: 'SET_BABY_GENDER'; value: 'boy' | 'girl' };

// Initial state factory
export const createInitialState = (): VysadekState => ({
    tabs: {
        activeTab: 'logistika',
    },
    ui: {
        isProtocolOpen: false,
        showCompletionModal: false,
        babyGender: 'boy',
    },
});

// Reducer function
export const vysadekReducer = (state: VysadekState, action: VysadekAction): VysadekState => {
    switch (action.type) {
        case 'SET_ACTIVE_TAB':
            return {
                ...state,
                tabs: { activeTab: action.value },
            };

        case 'TOGGLE_PROTOCOL':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isProtocolOpen: !state.ui.isProtocolOpen,
                },
            };

        case 'SET_PROTOCOL_OPEN':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    isProtocolOpen: action.value,
                },
            };

        case 'TOGGLE_COMPLETION_MODAL':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    showCompletionModal: !state.ui.showCompletionModal,
                },
            };

        case 'SET_COMPLETION_MODAL':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    showCompletionModal: action.value,
                },
            };

        case 'SET_BABY_GENDER':
            return {
                ...state,
                ui: {
                    ...state.ui,
                    babyGender: action.value,
                },
            };

        default:
            return state;
    }
};

// Custom hook
export const useVysadekReducer = () => {
    const [state, dispatch] = useReducer(vysadekReducer, createInitialState());
    return { state, dispatch };
};
