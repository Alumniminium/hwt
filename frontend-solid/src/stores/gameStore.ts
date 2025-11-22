import { createStore } from 'solid-js/store';
import { createSignal, onCleanup } from 'solid-js';
import { apiService } from '../services/api';
import type { GameState, MarketProduct, NewspaperData } from '../types';

// Initialize state from localStorage
const initializeState = (): GameState => {
  const gameIdStr = localStorage.getItem('gameId');
  const ceoIdStr = localStorage.getItem('ceoId');

  return {
    gameId: gameIdStr ? parseInt(gameIdStr, 10) : null,
    ceoId: ceoIdStr ? parseInt(ceoIdStr, 10) : null,
    ceoName: localStorage.getItem('ceoName'),
    companyName: localStorage.getItem('companyName'),
    currentDate: null,
    money: 0,
    millisecondsPerDay: 0,
    gameSpeed: 0,
    marketProducts: [],
    seenProducts: new Set(),
  };
};

// Create the game store
const [gameState, setGameState] = createStore<GameState>(initializeState());

// Create signals for UI state
const [currentModal, setCurrentModal] = createSignal<string | null>(null);
const [newspaperData, setNewspaperData] = createSignal<NewspaperData | null>(null);

/**
 * Save game credentials to localStorage
 */
export function saveGameCredentials(
  gameId: number,
  ceoId: number,
  ceoName: string,
  companyName: string
) {
  localStorage.setItem('gameId', gameId.toString());
  localStorage.setItem('ceoId', ceoId.toString());
  localStorage.setItem('ceoName', ceoName);
  localStorage.setItem('companyName', companyName);

  setGameState({
    gameId,
    ceoId,
    ceoName,
    companyName,
  });
}

/**
 * Clear game state and localStorage
 */
export function clearGameState() {
  localStorage.clear();
  setGameState(initializeState());
}

/**
 * Check if user has valid game credentials
 */
export function hasGameCredentials(): boolean {
  return gameState.gameId != null && gameState.ceoId != null;
}

/**
 * Update game state from server response
 */
export function updateGameStateFromServer(data: {
  date: string;
  money: number;
  millisecondsPerDay: number;
  marketProducts: MarketProduct[];
}) {
  const newDate = new Date(data.date);

  setGameState({
    currentDate: newDate,
    money: data.money,
    millisecondsPerDay: data.millisecondsPerDay,
    marketProducts: data.marketProducts,
  });

  // Check for new products in market
  checkForNewProducts(data.marketProducts, newDate);
}

/**
 * Check for new products and show newspaper
 */
function checkForNewProducts(products: MarketProduct[], date: Date) {
  products.forEach((product) => {
    if (!gameState.seenProducts.has(product.name)) {
      setGameState('seenProducts', (prev) => new Set(prev).add(product.name));

      // Show newspaper for new product
      setNewspaperData({
        productName: product.name,
        company: product.company,
        price: product.price,
        description: product.description,
        date,
      });
      setCurrentModal('newspaper');
    }
  });
}

/**
 * Update game speed
 */
export async function updateGameSpeed(speed: number) {
  if (!gameState.gameId || !gameState.ceoId) {
    console.error('Cannot update speed: missing game credentials');
    return;
  }

  try {
    await apiService.updateGameSpeed({
      gameId: gameState.gameId,
      ceoId: gameState.ceoId,
      gameSpeed: speed,
    });

    setGameState('gameSpeed', speed);
  } catch (error) {
    console.error('Failed to update game speed:', error);
  }
}

/**
 * Fetch and update game state from server
 */
export async function fetchGameState() {
  if (!gameState.gameId || !gameState.ceoId) {
    return;
  }

  try {
    const data = await apiService.getGameState(gameState.gameId, gameState.ceoId);
    updateGameStateFromServer(data);
  } catch (error) {
    if (error instanceof Error && error.message === 'GAME_NOT_FOUND') {
      console.error('Game not found, clearing state');
      clearGameState();
    } else {
      console.error('Failed to fetch game state:', error);
    }
  }
}

/**
 * Start polling game state
 */
export function startGameStatePolling(interval: number = 1000) {
  const timerId = setInterval(fetchGameState, interval);
  onCleanup(() => clearInterval(timerId));
  return timerId;
}

// Export store and signals
export { gameState, currentModal, setCurrentModal, newspaperData, setNewspaperData };
