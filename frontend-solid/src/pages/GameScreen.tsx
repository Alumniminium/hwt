import { createSignal, onMount, onCleanup, Show, createEffect } from 'solid-js';
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
import GarageBackground from '../components/GarageBackground';
import ContextMenu from '../components/ContextMenu';
import ResearchModal from '../components/modals/ResearchModal';
import DevelopModal from '../components/modals/DevelopModal';
import MarketModal from '../components/modals/MarketModal';
import AdvertisingModal from '../components/modals/AdvertisingModal';
import NewspaperModal from '../components/modals/NewspaperModal';
import WaferDesignerModal from '../components/modals/WaferDesignerModal';
import './GameScreen.css';

export default function GameScreen() {
  const navigate = useNavigate();
  const [activeSpeed, setActiveSpeed] = createSignal(0);
  const [localDate, setLocalDate] = createSignal<Date | null>(null);
  let clockTimerId: number | undefined;

  onMount(() => {
    // Check if user has game credentials
    if (!hasGameCredentials()) {
      navigate('/');
      return;
    }

    // Start polling game state
    const timerId = setInterval(fetchGameState, 1000);
    fetchGameState(); // Initial fetch

    onCleanup(() => {
      clearInterval(timerId);
      if (clockTimerId !== undefined) clearInterval(clockTimerId);
    });
  });

  // Effect to sync activeSpeed with gameState.gameSpeed
  createEffect(() => {
    if (gameState.gameSpeed !== undefined) {
      setActiveSpeed(gameState.gameSpeed);
    }
  });

  // Effect to sync local date with game state date
  createEffect(() => {
    if (gameState.currentDate) {
      setLocalDate(new Date(gameState.currentDate));
    }
  });

  // Effect to manage local clock based on game speed
  createEffect(() => {
    // Clear existing clock timer
    if (clockTimerId !== undefined) {
      clearInterval(clockTimerId);
      clockTimerId = undefined;
    }

    // Start new clock timer if game is running
    if (gameState.millisecondsPerDay > 0 && gameState.gameSpeed > 0) {
      clockTimerId = window.setInterval(() => {
        setLocalDate((prev) => {
          if (!prev) return prev;
          const newDate = new Date(prev);
          newDate.setDate(newDate.getDate() + 1);
          return newDate;
        });
      }, gameState.millisecondsPerDay) as unknown as number;
    }
  });

  const handleSpeedChange = (speed: number) => {
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
      <GarageBackground />
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
              <Show when={localDate()} fallback="Loading...">
                {formatDate(localDate()!)}
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
      <WaferDesignerModal
        isOpen={currentModal() === 'wafer-designer'}
        onClose={handleCloseModal}
      />
    </div>
  );
}
