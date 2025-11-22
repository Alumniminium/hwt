import Modal from './Modal';

interface MarketModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function MarketModal(props: MarketModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="Market Analysis">
      <div class="market-modal-content">
        <p>Market analysis interface coming soon...</p>
        <p>This will show all products in the market and their performance.</p>
      </div>
    </Modal>
  );
}
