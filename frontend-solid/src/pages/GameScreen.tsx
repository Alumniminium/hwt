import { createSignal, onMount, onCleanup, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import {
  gameState,
  hasGameCredentials,
  fetchGameState,
  updateGameSpeed,
  currentModal,
  setCurrentModal,
} from '../stores/gameStore';
import { formatMoney, formatDate } from '../utils/formatting';
import ContextMenu from '../components/ContextMenu';
import ResearchModal from '../components/modals/ResearchModal';
import DevelopModal from '../components/modals/DevelopModal';
import MarketModal from '../components/modals/MarketModal';
import AdvertisingModal from '../components/modals/AdvertisingModal';
import NewspaperModal from '../components/modals/NewspaperModal';
import './GameScreen.css';

export default function GameScreen() {
  const navigate = useNavigate();
  const [activeSpeed, setActiveSpeed] = createSignal(0);

  onMount(() => {
    // Check if user has game credentials
    if (!hasGameCredentials()) {
      navigate('/');
      return;
    }

    // Start polling game state
    const timerId = setInterval(fetchGameState, 1000);
    fetchGameState(); // Initial fetch

    onCleanup(() => clearInterval(timerId));
  });

  const handleSpeedChange = (speed: number) => {
    setActiveSpeed(speed);
    updateGameSpeed(speed);
  };

  const handleOpenModal = (modalName: string) => {
    setCurrentModal(modalName);
  };

  const handleCloseModal = () => {
    setCurrentModal(null);
  };

  return (
    <div class="game-container">
      <ContextMenu onOpenModal={handleOpenModal} />

      <div class="game-header">
        <div class="game-info">
          <div class="info-item">
            <span class="label">Company:</span>
            <span class="value">{gameState.companyName || 'Loading...'}</span>
          </div>
          <div class="info-item">
            <span class="label">CEO:</span>
            <span class="value">{gameState.ceoName || 'Loading...'}</span>
          </div>
          <div class="info-item">
            <span class="label">Date:</span>
            <span class="value" id="date">
              <Show
                when={gameState.currentDate}
                fallback="Loading..."
              >
                {formatDate(gameState.currentDate!)}
              </Show>
            </span>
          </div>
          <div class="info-item">
            <span class="label">Money:</span>
            <span class="value" id="money">
              {formatMoney(gameState.money)}
            </span>
          </div>
        </div>

        <div class="game-controls">
          <button
            id="0x"
            class="gamespeedbutton"
            classList={{ active: activeSpeed() === 0 }}
            onClick={() => handleSpeedChange(0)}
          >
            ⏸ Pause
          </button>
          <button
            id="1x"
            class="gamespeedbutton"
            classList={{ active: activeSpeed() === 1 }}
            onClick={() => handleSpeedChange(1)}
          >
            ▶ 1x
          </button>
          <button
            id="2x"
            class="gamespeedbutton"
            classList={{ active: activeSpeed() === 2 }}
            onClick={() => handleSpeedChange(2)}
          >
            ▶▶ 2x
          </button>
          <button
            id="6x"
            class="gamespeedbutton"
            classList={{ active: activeSpeed() === 6 }}
            onClick={() => handleSpeedChange(6)}
          >
            ▶▶▶ 6x
          </button>
        </div>
      </div>

      <div class="game-content">
        <div class="research-progress-container">
          <svg class="progress-ring" width="120" height="120">
            <circle
              class="progress-ring-circle"
              stroke-width="4"
              fill="transparent"
              r="52"
              cx="60"
              cy="60"
            />
          </svg>
          <div class="research-progress-text" id="research-progress">
            {/* Research project name will appear here */}
          </div>
        </div>
      </div>

      {/* Modals */}
      <ResearchModal
        isOpen={currentModal() === 'research'}
        onClose={handleCloseModal}
      />
      <DevelopModal
        isOpen={currentModal() === 'develop-product'}
        onClose={handleCloseModal}
      />
      <MarketModal
        isOpen={currentModal() === 'market-analysis'}
        onClose={handleCloseModal}
      />
      <AdvertisingModal
        isOpen={currentModal() === 'advertising-campaign'}
        onClose={handleCloseModal}
      />
      <NewspaperModal
        isOpen={currentModal() === 'newspaper'}
        onClose={handleCloseModal}
      />
    </div>
  );
}
