
export interface UserStats {
  email: string; // New: Unique identifier for LocalSave
  partnerName: string; // New: Custom name for the partner (e.g., Velitelka, Mamina, Láska)
  points: number;
  level: number;
  completedTasks: string[];
  badges: UnlockedBadge[]; // Changed from Badge[] to store unlock date
  logs: LogEntry[];
  timeCapsule: TimeCapsuleEntry[];
  lastEngagementDate: string | null;
  streak: number;
  userName: string | null;
  dueDate: string | null;
  gearChecklist: string[];
  hospitalBagChecklist: string[]; // New: Tracks hospital bag items
  // dailyMissions is now computed dynamically, but we track completed daily IDs
  completedDailyMissionIds: string[];
  dailyMissions: Task[];
  dailyMissionsDate: string | null;

  // New Mission Management Fields
  customMissions: Task[]; // User created missions
  postponedMissions: Task[]; // Missions moved to backlog
  missionHistory: Task[]; // Full log of completed missions

  hospitalTarget?: string; // New: Stores the hospital address/name for navigation
  backupContacts?: { id: string; name: string; phone: string; }[]; // Changed: Array of contacts
  partnerPhone?: string; // New: Partner's phone number for Emergency Card
  pediatricianContact?: { name: string; phone: string; address: string; }; // New: Pediatrician info
  visitorStatus?: 'bunker' | 'family' | 'open'; // New: Gatekeeper protocol status
  musicPreference?: string; // New: Junior's favorite music genre
  parkingInfo?: string; // New: Notes about parking at the hospital
  gbsStatus?: 'positive' | 'negative' | 'unknown'; // New: GBS screening result
  bloodPressureLog?: { sys: number; dia: number; date: string }[]; // New: Track BP
  amnioticFluidLog?: { time: string; color: 'clear' | 'green' | 'blood' | 'unknown' } | null; // New: Water Break status

  babyNames?: BabyName[]; // New: List of name candidates
  budgetPlan?: BudgetPlan; // New: Financial calculator data
  accountCreated?: string; // New: Date when account was created (for Deserter logic)
  customGear?: CustomGearItem[]; // New: User defined inventory items
  onboardingCompleted?: boolean; // Track if user saw/interacted with onboarding tour
  onboardingFinished?: boolean; // New: Track if user actually COMPLETED the tour (for achievement)
  tourCompleted?: {
    missions: boolean;
    achievements: boolean;
    recon: boolean;
    budget: boolean;
  }; // Track which section tours have been completed
  vehicleModel?: string; // New: Model of the assembled stroller/vehicle
  vehicleConfirmed?: boolean; // New: Track if stroller model was confirmed (for achievement)
  firstKickDetected?: boolean; // New: Track first felt kick achievement
  medicalInfo?: MedicalInfo; // New: Medical information (blood types, checkup dates)
  lastProcessedDayIndex?: number; // New: Tracking pointer for missed missions synchronization
  operationalPrepChecklist?: string[]; // New: Operational preparation checklist
  soundEnabled?: boolean; // New: Toggle for sound effects
  vysadekClicked?: boolean; // New: Track if user clicked Vysadek button
  notificationsEnabled?: boolean; // New: Toggle for browser notifications
  manualViewsCount?: number; // New: Tracks how many times communication manual was opened
  manualEntriesRead?: number[]; // New: Tracks which manual entries were read/expanded (by index)
  emergencyProtocolsViewed?: boolean; // New: Tracks if emergency protocols were viewed
  iceCardViewed?: boolean; // New: Tracks if ICE card was viewed
  nightWatchTriggered?: boolean; // New: Tracks if user opened app at night
  speedBuildScores?: Record<string, number>; // New: Sync of mini-game best scores
  soundIDStats?: {
    totalAttempts: number;
    correctAnswers: number;
    streakValue: number;
    bestStreakValue: number;
  }; // New: Sync of sound ID stats
  customHospitalBagGear?: CustomGearItem[]; // New: User defined items for hospital bag
  customOperationalPrepGear?: CustomGearItem[]; // New: User defined items for operational prep
  contractions?: Contraction[]; // New: History of contractions
}

export interface Contraction {
  id: string;
  startTime: string; // ISO string
  duration: number; // seconds
  interval?: number; // seconds since previous contraction start
}
export interface GearItem {
  id: string;
  label: string;
  week: number;
  endWeek?: number;
  tip?: string;
  condition?: "Bazar" | "Vždy NOVÁ!" | "Bazar / Nové" | "Bazar (postel) / NOVÁ (matrace)";
  warning?: string;
}

export interface CustomGearItem {
  id: string;
  label: string;
  bought: boolean;
  category?: string; // Optional category for custom items
}

export interface ConsumableItem {
  id: string; // e.g., "g54", "g51", "g23", or custom ID
  name: string; // e.g., "Vitamíny pro partnerku", "Čaj pro těhotné"
  quantity: number; // Current stock count
  lastUpdated: string; // ISO date string of last quantity update
  lastConfirmedDate?: string; // ISO date string of last manual confirmation (when user clicked "Vzala dnes")
  isCustom: boolean; // true for user-added vitamins
}

export interface BudgetPlan {
  totalBudget: number;
  stroller: number;
  carSeat: number;
  furniture: number;
  clothes: number;
  cosmetics: number;
  other: number;
  consumables?: ConsumableItem[]; // New: Track consumable items (teas, vitamins)
}

export interface BabyName {
  id: string;
  name: string;
  rating: number; // 1 (Best) - 5 (Worst)
  gender: 'boy' | 'girl';
  selected?: boolean;
}

export interface UserProfile {
  email: string;
  name: string;
  dueDate: string;
}

export interface LogEntry {
  id: string;
  date: string;
  content: string;
  mood: string;
}

export interface TimeCapsuleEntry {
  id: string;
  date: string;
  content: string;
  mediaUrl?: string;
  type: 'message' | 'photo';
}

export type BadgeRarity = 'common' | 'rare' | 'epic' | 'legendary';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  howToUnlock: string; // Návod, jak odznak získat
  icon: string;
  rarity: BadgeRarity;
  condition: (stats: UserStats, currentWeek?: number) => boolean;
  xpReward: number;
  progress?: (stats: UserStats) => { current: number; total: number }; // Volitelný progress pro achievementy s počítadlem
}

export interface UnlockedBadge {
  id: string;
  unlockedDate: string;
}


export type TaskCategory =
  | 'perimetr'
  | 'údržba'
  | 'trezor'
  | 'zásoby'
  | 'strategie'
  | 'průzkum'
  | 'medik'
  | 'servis'
  | 'briefing'
  | 'stavba'
  | 'logistika'
  | 'transport'
  | 'junior_update'
  | 'velká_mise'
  | 'hardware'
  | 'vlastní_rozkaz'; // New category

export interface Task {
  id: string;
  title: string;
  description: string;
  points: number;
  category: TaskCategory;
  completed?: boolean;
  weekRange?: number[];
  isDaily?: boolean; // New flag for daily missions
  completedDate?: string; // Timestamp when completed
  scheduledDate?: string; // New: YYYY-MM-DD date for when the task should appear
  restoredCount?: number; // Number of times restored from archive
  priority?: 'normal' | 'highest'; // For visual urgency
  failed?: boolean; // New: True if restored mission was missed again
  manualFail?: boolean; // New: True if user manually failed the mission (vs auto-fail)
}



export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

export interface CommunicationEntry {
  situation: string;
  meaning: string;
}

export type Tab = 'dashboard' | 'missions' | 'recon' | 'budget' | 'achievements' | 'extra';

// Trunk Tetris Game Types
export interface TrunkGameObject {
  id: string;
  name: string;
  width: number;
  height: number;
  weight: 'light' | 'medium' | 'heavy';
  isFragile?: boolean;
  color: string;
}

export interface PlacedTrunkObject extends TrunkGameObject {
  x: number;
  y: number;
  rotation: 0 | 90 | 180 | 270;
  isBroken?: boolean;
}

export type TrunkDifficultyLevel = 'easy' | 'medium' | 'hard';

// Medical Information Types
export interface CheckupDate {
  id: string;
  date: string;
  note: string;
}

export interface MedicalInfo {
  partnerBloodType?: string;
  userBloodType?: string;
  checkupDates?: CheckupDate[];
  notes?: string;
}

