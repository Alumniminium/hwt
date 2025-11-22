import type {
  LoginRequest,
  LoginResponse,
  UpdateRequest,
  SimulationUpdate,
  ResearchProject,
  ResearchRequest,
  ResearchResponse,
  DevelopRequest,
  DevelopResponse,
} from '../types';

// API base URL - configure this based on environment
const API_BASE_URL = 'http://localhost:5001/api';

/**
 * API service for communicating with the backend
 */
export class APIService {
  /**
   * Create a new game
   */
  async createGame(request: LoginRequest): Promise<LoginResponse> {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to create game: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Get current game state
   */
  async getGameState(gameId: string, ceoId: string): Promise<SimulationUpdate> {
    const response = await fetch(
      `${API_BASE_URL}/update?gameId=${gameId}&ceoId=${ceoId}`
    );

    if (!response.ok) {
      if (response.status === 404 || response.status === 400) {
        // Game not found - clear localStorage
        throw new Error('GAME_NOT_FOUND');
      }
      throw new Error(`Failed to get game state: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Update game speed
   */
  async updateGameSpeed(request: UpdateRequest): Promise<void> {
    const response = await fetch(`${API_BASE_URL}/update`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to update game speed: ${response.statusText}`);
    }
  }

  /**
   * Get list of research projects
   */
  async getResearchList(
    gameId: string,
    ceoId: string
  ): Promise<ResearchProject[]> {
    const response = await fetch(
      `${API_BASE_URL}/research?gameId=${gameId}&ceoId=${ceoId}`
    );

    if (!response.ok) {
      throw new Error(`Failed to get research list: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Start a research project
   */
  async startResearch(request: ResearchRequest): Promise<ResearchResponse> {
    const response = await fetch(`${API_BASE_URL}/research`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to start research: ${response.statusText}`);
    }

    return response.json();
  }

  /**
   * Develop a new product
   */
  async developProduct(request: DevelopRequest): Promise<DevelopResponse> {
    const response = await fetch(`${API_BASE_URL}/develop`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      throw new Error(`Failed to develop product: ${response.statusText}`);
    }

    return response.json();
  }
}

// Export a singleton instance
export const apiService = new APIService();
