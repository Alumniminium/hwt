// API Request/Response Types

export interface LoginRequest {
  companyName: string;
  ceoName: string;
  difficulty: number;
}

export interface LoginResponse {
  gameId: number;
  ceoId: number;
}

export interface UpdateRequest {
  gameId: number;
  ceoId: number;
  gameSpeed: number;
}

export interface SimulationUpdate {
  date: string;
  money: number;
  millisecondsPerDay: number;
  marketProducts: MarketProduct[];
}

export interface MarketProduct {
  name: string;
  company: string;
  price: number;
  description: string;
  releaseDate?: string;
}

export interface ResearchProject {
  name: string;
  price: number;
  description: string;
  completed?: boolean;
}

export interface ResearchRequest {
  gameId: number;
  ceoId: number;
  researchProject: string;
}

export interface ResearchResponse {
  success: boolean;
  secondsUntilDone: number;
  debugInfo: string;
}

export interface DevelopRequest {
  gameId: number;
  ceoId: number;
  name: string;
  components: any[];
  type: string;
  price: number;
}

export interface DevelopResponse {
  success: boolean;
  secondsUntilDone: number;
  debugInfo: string;
}

// Game State Types

export interface GameState {
  gameId: number | null;
  ceoId: number | null;
  ceoName: string | null;
  companyName: string | null;
  currentDate: Date | null;
  money: number;
  millisecondsPerDay: number;
  gameSpeed: number;
  marketProducts: MarketProduct[];
  seenProducts: Set<string>;
}

export interface ResearchProgress {
  name: string;
  startDate: Date;
  finishDate: Date;
}

// UI State Types

export type ModalType =
  | 'research'
  | 'develop-product'
  | 'market-analysis'
  | 'advertising-campaign'
  | 'newspaper';

export interface NewspaperData {
  productName: string;
  company: string;
  price: number;
  description: string;
  date: Date;
}
