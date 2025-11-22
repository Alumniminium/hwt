import { createSignal } from 'solid-js';
import Modal from './Modal';
import { apiService } from '../../services/api';
import { gameState } from '../../stores/gameStore';

interface DevelopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DevelopModal(props: DevelopModalProps) {
  const [familyName, setFamilyName] = createSignal('');
  const [productName, setProductName] = createSignal('');
  const [socket, setSocket] = createSignal('DIP-4');
  const [productType, setProductType] = createSignal('CPU');
  const [price, setPrice] = createSignal(100);
  const [message, setMessage] = createSignal('');
  const [isDeveloping, setIsDeveloping] = createSignal(false);

  const handleDevelop = async () => {
    if (!gameState.gameId || !gameState.ceoId) return;
    if (!productName().trim()) {
      setMessage('Please enter a product name');
      return;
    }

    setIsDeveloping(true);
    setMessage('');

    try {
      const response = await apiService.developProduct({
        gameId: gameState.gameId,
        ceoId: gameState.ceoId,
        name: productName(),
        components: [], // TODO: Add component selection
        type: productType(),
        price: price(),
      });

      if (response.success) {
        setMessage(
          `Development started: ${productName()}. Will complete in ${response.secondsUntilDone} seconds.`
        );
        // Clear form
        setFamilyName('');
        setProductName('');
      } else {
        setMessage(`Failed to develop product: ${response.debugInfo}`);
      }
    } catch (error) {
      setMessage('Failed to develop product. Please try again.');
      console.error('Failed to develop product:', error);
    } finally {
      setIsDeveloping(false);
    }
  };

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="Develop Product">
      <div class="develop-modal-content">
        {message() && <div class="message">{message()}</div>}

        <div class="form-group">
          <label for="family-name">Family Name:</label>
          <input
            id="family-name"
            type="text"
            value={familyName()}
            onInput={(e) => setFamilyName(e.currentTarget.value)}
            placeholder="e.g., Pentium, Core"
            disabled={isDeveloping()}
          />
        </div>

        <div class="form-group">
          <label for="product-name">Product Name:</label>
          <input
            id="product-name"
            type="text"
            value={productName()}
            onInput={(e) => setProductName(e.currentTarget.value)}
            placeholder="e.g., i7-9700K"
            disabled={isDeveloping()}
          />
        </div>

        <div class="form-group">
          <label for="socket">Socket:</label>
          <select
            id="socket"
            value={socket()}
            onChange={(e) => setSocket(e.currentTarget.value)}
            disabled={isDeveloping()}
          >
            <option value="DIP-4">DIP-4</option>
            <option value="DIP-8">DIP-8</option>
            <option value="DIP-16">DIP-16</option>
          </select>
        </div>

        <div class="form-group">
          <label for="product-type">Product Type:</label>
          <select
            id="product-type"
            value={productType()}
            onChange={(e) => setProductType(e.currentTarget.value)}
            disabled={isDeveloping()}
          >
            <option value="CPU">CPU</option>
            <option value="GPU">GPU</option>
            <option value="MEMORY">Memory</option>
          </select>
        </div>

        <div class="form-group">
          <label for="price">Price ($):</label>
          <input
            id="price"
            type="number"
            value={price()}
            onInput={(e) => setPrice(parseInt(e.currentTarget.value) || 0)}
            min="1"
            disabled={isDeveloping()}
          />
        </div>

        <button
          class="develop-button"
          onClick={handleDevelop}
          disabled={isDeveloping()}
        >
          {isDeveloping() ? 'Developing...' : 'Start Development'}
        </button>

        <p class="note">
          Note: Component selection coming soon. Currently develops with default components.
        </p>
      </div>
    </Modal>
  );
}
