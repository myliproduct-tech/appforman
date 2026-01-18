import { useReducer, useEffect } from 'react';

// State type definition
export interface ReconState {
    modals: {
        showFirstAid: boolean;
        showGoldenHour: boolean;
        showIceCard: boolean;
        showHospitalBag: boolean;
        showNameList: boolean;
        showCommManual: boolean;
        showCrisisProtocol: boolean;
    };
    forms: {
        target: {
            input: string;
            isEditing: boolean;
        };
        contact: {
            name: string;
            phone: string;
            isAdding: boolean;
        };
        partner: {
            input: string;
            isEditing: boolean;
        };
        pediatrician: {
            name: string;
            phone: string;
            address: string;
            isEditing: boolean;
        };
        parking: {
            text: string;
            isEditing: boolean;
        };
    };
    ui: {
        selectedCipher: number | null;
        selectedCommEntry: any | null;
        iceTab: 'target' | 'medic' | 'contacts' | 'card';
        activeTool: 'none' | 'kicks' | 'contractions' | 'music' | 'bp' | 'water' | 'comm' | 'medical';
        activeGenre: string | null;
        isGeneratingImage: boolean;
    };
}

// Action types
export type ReconAction =
    // Modal actions
    | { type: 'TOGGLE_MODAL'; modal: keyof ReconState['modals'] }
    | { type: 'CLOSE_ALL_MODALS' }

    // Form actions - Target
    | { type: 'SET_TARGET_INPUT'; value: string }
    | { type: 'SET_TARGET_EDITING'; value: boolean }

    // Form actions - Contact
    | { type: 'SET_CONTACT_NAME'; value: string }
    | { type: 'SET_CONTACT_PHONE'; value: string }
    | { type: 'SET_CONTACT_ADDING'; value: boolean }
    | { type: 'RESET_CONTACT_FORM' }

    // Form actions - Partner
    | { type: 'SET_PARTNER_INPUT'; value: string }
    | { type: 'SET_PARTNER_EDITING'; value: boolean }

    // Form actions - Pediatrician
    | { type: 'SET_PEDIATRICIAN_NAME'; value: string }
    | { type: 'SET_PEDIATRICIAN_PHONE'; value: string }
    | { type: 'SET_PEDIATRICIAN_ADDRESS'; value: string }
    | { type: 'SET_PEDIATRICIAN_EDITING'; value: boolean }

    // Form actions - Parking
    | { type: 'SET_PARKING_TEXT'; value: string }
    | { type: 'SET_PARKING_EDITING'; value: boolean }

    // UI actions
    | { type: 'SET_SELECTED_CIPHER'; value: number | null }
    | { type: 'SET_SELECTED_COMM_ENTRY'; value: any | null }
    | { type: 'SET_ICE_TAB'; value: ReconState['ui']['iceTab'] }
    | { type: 'SET_ACTIVE_TOOL'; value: ReconState['ui']['activeTool'] }
    | { type: 'SET_ACTIVE_GENRE'; value: string | null }
    | { type: 'SET_GENERATING_IMAGE'; value: boolean };

// Initial state factory
export const createInitialState = (
    hospitalTarget?: string,
    partnerPhone?: string,
    pediatricianContact?: { name: string; phone: string; address: string },
    parkingInfo?: string,
    musicPreference?: string
): ReconState => ({
    modals: {
        showFirstAid: false,
        showGoldenHour: false,
        showIceCard: false,
        showHospitalBag: false,
        showNameList: false,
        showCommManual: false,
        showCrisisProtocol: false,
    },
    forms: {
        target: {
            input: hospitalTarget || '',
            isEditing: !hospitalTarget,
        },
        contact: {
            name: '',
            phone: '',
            isAdding: false,
        },
        partner: {
            input: partnerPhone || '',
            isEditing: !partnerPhone,
        },
        pediatrician: {
            name: pediatricianContact?.name || '',
            phone: pediatricianContact?.phone || '',
            address: pediatricianContact?.address || '',
            isEditing: !pediatricianContact?.name,
        },
        parking: {
            text: parkingInfo || '',
            isEditing: !parkingInfo,
        },
    },
    ui: {
        selectedCipher: null,
        selectedCommEntry: null,
        iceTab: 'target',
        activeTool: 'none',
        activeGenre: musicPreference || null,
        isGeneratingImage: false,
    },
});

// Reducer function
export const reconReducer = (state: ReconState, action: ReconAction): ReconState => {
    switch (action.type) {
        // Modal actions
        case 'TOGGLE_MODAL':
            return {
                ...state,
                modals: {
                    ...state.modals,
                    [action.modal]: !state.modals[action.modal],
                },
            };

        case 'CLOSE_ALL_MODALS':
            return {
                ...state,
                modals: {
                    showFirstAid: false,
                    showGoldenHour: false,
                    showIceCard: false,
                    showHospitalBag: false,
                    showNameList: false,
                    showCommManual: false,
                    showCrisisProtocol: false,
                },
            };

        // Target form
        case 'SET_TARGET_INPUT':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    target: { ...state.forms.target, input: action.value },
                },
            };

        case 'SET_TARGET_EDITING':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    target: { ...state.forms.target, isEditing: action.value },
                },
            };

        // Contact form
        case 'SET_CONTACT_NAME':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    contact: { ...state.forms.contact, name: action.value },
                },
            };

        case 'SET_CONTACT_PHONE':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    contact: { ...state.forms.contact, phone: action.value },
                },
            };

        case 'SET_CONTACT_ADDING':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    contact: { ...state.forms.contact, isAdding: action.value },
                },
            };

        case 'RESET_CONTACT_FORM':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    contact: { name: '', phone: '', isAdding: false },
                },
            };

        // Partner form
        case 'SET_PARTNER_INPUT':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    partner: { ...state.forms.partner, input: action.value },
                },
            };

        case 'SET_PARTNER_EDITING':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    partner: { ...state.forms.partner, isEditing: action.value },
                },
            };

        // Pediatrician form
        case 'SET_PEDIATRICIAN_NAME':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    pediatrician: { ...state.forms.pediatrician, name: action.value },
                },
            };

        case 'SET_PEDIATRICIAN_PHONE':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    pediatrician: { ...state.forms.pediatrician, phone: action.value },
                },
            };

        case 'SET_PEDIATRICIAN_ADDRESS':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    pediatrician: { ...state.forms.pediatrician, address: action.value },
                },
            };

        case 'SET_PEDIATRICIAN_EDITING':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    pediatrician: { ...state.forms.pediatrician, isEditing: action.value },
                },
            };

        // Parking form
        case 'SET_PARKING_TEXT':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    parking: { ...state.forms.parking, text: action.value },
                },
            };

        case 'SET_PARKING_EDITING':
            return {
                ...state,
                forms: {
                    ...state.forms,
                    parking: { ...state.forms.parking, isEditing: action.value },
                },
            };

        // UI actions
        case 'SET_SELECTED_CIPHER':
            return {
                ...state,
                ui: { ...state.ui, selectedCipher: action.value },
            };

        case 'SET_SELECTED_COMM_ENTRY':
            return {
                ...state,
                ui: { ...state.ui, selectedCommEntry: action.value },
            };

        case 'SET_ICE_TAB':
            return {
                ...state,
                ui: { ...state.ui, iceTab: action.value },
            };

        case 'SET_ACTIVE_TOOL':
            return {
                ...state,
                ui: { ...state.ui, activeTool: action.value },
            };

        case 'SET_ACTIVE_GENRE':
            return {
                ...state,
                ui: { ...state.ui, activeGenre: action.value },
            };

        case 'SET_GENERATING_IMAGE':
            return {
                ...state,
                ui: { ...state.ui, isGeneratingImage: action.value },
            };

        default:
            return state;
    }
};

// Custom hook
export const useReconReducer = (
    hospitalTarget?: string,
    partnerPhone?: string,
    pediatricianContact?: { name: string; phone: string; address: string },
    parkingInfo?: string,
    musicPreference?: string
) => {
    const [state, dispatch] = useReducer(
        reconReducer,
        createInitialState(hospitalTarget, partnerPhone, pediatricianContact, parkingInfo, musicPreference)
    );

    // Update forms when props change
    useEffect(() => {
        if (hospitalTarget !== state.forms.target.input) {
            dispatch({ type: 'SET_TARGET_INPUT', value: hospitalTarget || '' });
        }
    }, [hospitalTarget]);

    useEffect(() => {
        if (partnerPhone !== state.forms.partner.input) {
            dispatch({ type: 'SET_PARTNER_INPUT', value: partnerPhone || '' });
        }
    }, [partnerPhone]);

    return { state, dispatch };
};
