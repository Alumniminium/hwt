import { Show } from 'solid-js';
import Modal from './Modal';
import { newspaperData } from '../../stores/gameStore';
import { formatNewspaperDate } from '../../utils/formatting';

interface NewspaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function NewspaperModal(props: NewspaperModalProps) {
  const data = newspaperData();

  return (
    <Modal isOpen={props.isOpen} onClose={props.onClose} title="The Tech Times">
      <Show when={data}>
        <div class="newspaper-modal-content">
          <div class="newspaper-header">
            <div class="datetime">{formatNewspaperDate(data!.date)}</div>
          </div>

          <div class="newspaper-body">
            <div class="product-column">
              <img
                class="product-image"
                src={`/images/${data!.company}/${data!.productName}.webp`}
                alt={data!.productName}
                onError={(e) => {
                  // Fallback image if product image doesn't exist
                  e.currentTarget.src = '/images/placeholder.png';
                }}
              />

              <h2 class="headline hl3">
                {data!.company.toUpperCase()} RELEASED THE{' '}
                {data!.productName.toUpperCase()}
              </h2>

              <p class="article">{data!.description}</p>

              <h3 class="headline hl4">
                Available now for ${data!.price.toLocaleString()}
              </h3>
            </div>
          </div>
        </div>
      </Show>
    </Modal>
  );
}
