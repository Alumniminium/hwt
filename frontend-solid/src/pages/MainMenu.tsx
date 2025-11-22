import { createSignal, Show } from 'solid-js';
import { useNavigate } from '@solidjs/router';
import { apiService } from '../services/api';
import { saveGameCredentials } from '../stores/gameStore';
import './MainMenu.css';

export default function MainMenu() {
  const navigate = useNavigate();

  const [showCreateCompany, setShowCreateCompany] = createSignal(false);
  const [showSettings, setShowSettings] = createSignal(false);
  const [companyName, setCompanyName] = createSignal('');
  const [ceoName, setCeoName] = createSignal('');
  const [difficulty, setDifficulty] = createSignal(0);
  const [isLoading, setIsLoading] = createSignal(false);
  const [error, setError] = createSignal('');

  const handleStartGame = async () => {
    const company = companyName().trim();
    const ceo = ceoName().trim();

    if (!company || !ceo) {
      setError('Please fill in all fields');
      return;
    }

    setIsLoading(true);
    setError('');

    try {
      const response = await apiService.createGame({
        companyName: company,
        ceoName: ceo,
        difficulty: difficulty(),
      });

      // Check for valid response (gameId can be 0, so use != null)
      if (response.gameId != null && response.ceoId != null) {
        saveGameCredentials(response.gameId, response.ceoId, ceo, company);
        navigate('/game');
      } else {
        setError('Invalid response from server. Please try again.');
      }
    } catch (err) {
      console.error('Failed to create game:', err);

      if (err instanceof TypeError && err.message.includes('fetch')) {
        setError('Cannot connect to game server. Please ensure the backend API is running on http://localhost:5001');
      } else {
        setError(`Failed to create game: ${err instanceof Error ? err.message : 'Unknown error'}`);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div class="main-menu-container">
      <div class="main-menu-content">
        <Show when={!showSettings()}>
          <h1 class="main-menu-title">Hardware Tycoon</h1>

          <div class="main-menu-buttons">
            <button
              class="menu-button"
              onClick={() => setShowCreateCompany(true)}
            >
              New Game
            </button>
            <button
              class="menu-button"
              onClick={() => setShowSettings(true)}
            >
              Settings
            </button>
          </div>

          <Show when={showCreateCompany()}>
            <div class="create-company-panel">
              <h2>Create Your Company</h2>

              <div class="form-group">
                <label for="company-name">Company Name:</label>
                <input
                  id="company-name"
                  type="text"
                  value={companyName()}
                  onInput={(e) => setCompanyName(e.currentTarget.value)}
                  placeholder="Enter company name"
                  disabled={isLoading()}
                />
              </div>

              <div class="form-group">
                <label for="ceo-name">CEO Name:</label>
                <input
                  id="ceo-name"
                  type="text"
                  value={ceoName()}
                  onInput={(e) => setCeoName(e.currentTarget.value)}
                  placeholder="Enter CEO name"
                  disabled={isLoading()}
                />
              </div>

              <div class="form-group">
                <label>Difficulty:</label>
                <div class="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="difficulty"
                      checked={difficulty() === 0}
                      onChange={() => setDifficulty(0)}
                      disabled={isLoading()}
                    />
                    Easy
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="difficulty"
                      checked={difficulty() === 1}
                      onChange={() => setDifficulty(1)}
                      disabled={isLoading()}
                    />
                    Normal
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="difficulty"
                      checked={difficulty() === 2}
                      onChange={() => setDifficulty(2)}
                      disabled={isLoading()}
                    />
                    Hard
                  </label>
                </div>
              </div>

              <Show when={error()}>
                <div class="error-message">{error()}</div>
              </Show>

              <div class="button-group">
                <button
                  class="menu-button"
                  onClick={handleStartGame}
                  disabled={isLoading()}
                >
                  {isLoading() ? 'Creating...' : 'Start Game'}
                </button>
                <button
                  class="menu-button secondary"
                  onClick={() => setShowCreateCompany(false)}
                  disabled={isLoading()}
                >
                  Back
                </button>
              </div>
            </div>
          </Show>
        </Show>

        <Show when={showSettings()}>
          <div class="settings-panel">
            <h2>Settings</h2>
            <p>Settings functionality coming soon...</p>
            <button
              class="menu-button"
              onClick={() => setShowSettings(false)}
            >
              Back
            </button>
          </div>
        </Show>
      </div>
    </div>
  );
}
