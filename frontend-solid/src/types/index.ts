// API Request/Response Types

export interface LoginRequest {
  companyName: string;
  ceoName: string;
  difficulty: number;
}

export interface LoginResponse {
  gameId: string;
  ceoId: string;
}

export interface UpdateRequest {
  gameId: string;
  ceoId: string;
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
  gameId: string;
  ceoId: string;
  researchProject: string;
}

export interface ResearchResponse {
  success: boolean;
  secondsUntilDone: number;
  debugInfo: string;
}

export interface DevelopRequest {
  gameId: string;
  ceoId: string;
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
  gameId: string | null;
  ceoId: string | null;
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
