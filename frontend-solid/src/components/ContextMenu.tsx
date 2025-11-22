import { createSignal, Show } from 'solid-js';
import { clearGameState } from '../stores/gameStore';
import './ContextMenu.css';

interface ContextMenuProps {
  onOpenModal: (modalName: string) => void;
}

export default function ContextMenu(props: ContextMenuProps) {
  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = createSignal(false);

  const handleContextMenu = (e: MouseEvent) => {
    e.preventDefault();
    setPosition({ x: e.clientX, y: e.clientY });
    setIsVisible(true);
  };

  const handleClick = () => {
    setIsVisible(false);
  };

  const handleMenuItemClick = (action: string) => {
    setIsVisible(false);

    if (action === 'clear-storage') {
      clearGameState();
      window.location.href = '/';
    } else {
      props.onOpenModal(action);
    }
  };

  // Attach listeners
  if (typeof window !== 'undefined') {
    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('click', handleClick);
  }

  return (
    <Show when={isVisible()}>
      <div
        class="context-menu"
        style={{
          left: `${position().x}px`,
          top: `${position().y}px`,
        }}
      >
        <div
          class="context-menu-item"
          onClick={() => handleMenuItemClick('develop-product')}
        >
          Develop Product
        </div>
        <div
          class="context-menu-item"
          onClick={() => handleMenuItemClick('research')}
        >
          Research
        </div>
        <div
          class="context-menu-item"
          onClick={() => handleMenuItemClick('market-analysis')}
        >
          Market Analysis
        </div>
        <div
          class="context-menu-item"
          onClick={() => handleMenuItemClick('advertising-campaign')}
        >
          Advertising Campaign
        </div>
        <div class="context-menu-divider" />
        <div
          class="context-menu-item debug"
          onClick={() => handleMenuItemClick('clear-storage')}
        >
          Debug: Clear LocalStorage
        </div>
      </div>
    </Show>
  );
}
