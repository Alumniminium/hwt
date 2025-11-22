import Modal from './Modal';

interface AdvertisingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AdvertisingModal(props: AdvertisingModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="Advertising Campaign">
      <div class="advertising-modal-content">
        <p>Advertising campaign interface coming soon...</p>
        <p>This will allow you to create marketing campaigns for your products.</p>
      </div>
    </Modal>
  );
}
