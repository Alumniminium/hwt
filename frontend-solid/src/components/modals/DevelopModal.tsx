import Modal from './Modal';

interface DevelopModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function DevelopModal(props: DevelopModalProps) {
  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="Develop Product">
      <div class="develop-modal-content">
        <p>Product development interface coming soon...</p>
        <p>This will allow you to create new products using researched components.</p>
      </div>
    </Modal>
  );
}
