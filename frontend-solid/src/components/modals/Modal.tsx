import { Show, createSignal, onMount, type JSX } from 'solid-js';
import './Modal.css';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: JSX.Element;
}

export default function Modal(props: ModalProps) {
  let modalRef: HTMLDivElement | undefined;
  let headerRef: HTMLDivElement | undefined;

  const [position, setPosition] = createSignal({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = createSignal(false);
  const [dragOffset, setDragOffset] = createSignal({ x: 0, y: 0 });

  onMount(() => {
    // Center modal on mount
    if (modalRef) {
      const rect = modalRef.getBoundingClientRect();
      setPosition({
        x: (window.innerWidth - rect.width) / 2,
        y: (window.innerHeight - rect.height) / 2,
      });
    }

    // Handle Escape key
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' || e.key === 'Esc') {
        props.onClose();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  });

  const handleMouseDown = (e: MouseEvent) => {
    if (!modalRef) return;

    setIsDragging(true);
    const rect = modalRef.getBoundingClientRect();
    setDragOffset({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging()) return;

    setPosition({
      x: e.clientX - dragOffset().x,
      y: e.clientY - dragOffset().y,
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  return (
    <Show when={props.isOpen}>
      <div
        class="modal-overlay"
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      >
        <div
          ref={modalRef}
          class="modal"
          style={{
            left: `${position().x}px`,
            top: `${position().y}px`,
            cursor: isDragging() ? 'grabbing' : 'default',
          }}
        >
          <div
            ref={headerRef}
            class="modalheader"
            onMouseDown={handleMouseDown}
            style={{ cursor: 'grab' }}
          >
            <h3>{props.title}</h3>
            <button class="modal-close-btn" onClick={props.onClose}>
              ×
            </button>
          </div>
          <div class="modal-content">{props.children}</div>
        </div>
      </div>
    </Show>
  );
}
