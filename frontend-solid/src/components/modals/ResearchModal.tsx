import { createSignal, createResource, For, Show } from 'solid-js';
import Modal from './Modal';
import { apiService } from '../../services/api';
import { gameState } from '../../stores/gameStore';

interface ResearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ResearchModal(props: ResearchModalProps) {
  const [isStarting, setIsStarting] = createSignal(false);
  const [message, setMessage] = createSignal('');

  const [researchList, { refetch }] = createResource(
    () => props.isOpen && gameState.gameId && gameState.ceoId,
    async () => {
      if (!gameState.gameId || !gameState.ceoId) return [];
      return apiService.getResearchList(gameState.gameId, gameState.ceoId);
    }
  );

  const handleStartResearch = async (projectName: string) => {
    if (!gameState.gameId || !gameState.ceoId || isStarting()) return;

    setIsStarting(true);
    setMessage('');

    try {
      const response = await apiService.startResearch({
        gameId: gameState.gameId,
        ceoId: gameState.ceoId,
        researchProject: projectName,
      });

      if (response.success) {
        setMessage(
          `Research started: ${projectName}. Will complete in ${response.secondsUntilDone} seconds.`
        );
        refetch();
      } else {
        setMessage(`Failed to start research: ${response.debugInfo}`);
      }
    } catch (error) {
      setMessage('Failed to start research. Please try again.');
      console.error('Failed to start research:', error);
    } finally {
      setIsStarting(false);
    }
  };

  const availableProjects = () =>
    researchList()?.filter((p) => p.price > 0) || [];
  const completedProjects = () =>
    researchList()?.filter((p) => p.price === 0) || [];

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="Research & Development">
      <div class="research-modal-content">
        <Show when={message()}>
          <div class="message">{message()}</div>
        </Show>

        <div class="research-section">
          <h4>Available Research</h4>
          <Show
            when={!researchList.loading}
            fallback={<div>Loading research projects...</div>}
          >
            <Show
              when={availableProjects().length > 0}
              fallback={<div>No research projects available.</div>}
            >
              <table class="research-table">
                <thead>
                  <tr>
                    <th>Icon</th>
                    <th>Name</th>
                    <th>Cost</th>
                    <th>Points</th>
                    <th>Description</th>
                  </tr>
                </thead>
                <tbody>
                  <For each={availableProjects()}>
                    {(project) => (
                      <tr
                        class="researchable-modal-item"
                        onClick={() => handleStartResearch(project.name)}
                        classList={{ disabled: isStarting() }}
                      >
                        <td>
                          <img
                            src="/images/raid-shadow-legends.jpeg"
                            alt="Research icon"
                            class="research-icon"
                          />
                        </td>
                        <td>{project.name}</td>
                        <td>${project.price.toLocaleString()}</td>
                        <td>{(project.price / 10).toLocaleString()}</td>
                        <td>{project.description}</td>
                      </tr>
                    )}
                  </For>
                </tbody>
              </table>
            </Show>
          </Show>
        </div>

        <div class="research-section">
          <h4>Completed Research</h4>
          <Show when={completedProjects().length > 0}>
            <div class="completed-research-list">
              <For each={completedProjects()}>
                {(project) => (
                  <div class="researched-modal-item">{project.name}</div>
                )}
              </For>
            </div>
          </Show>
        </div>
      </div>
    </Modal>
  );
}
