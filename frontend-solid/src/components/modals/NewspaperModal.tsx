import { Show } from 'solid-js';
import Modal from './Modal';
import { newspaperData } from '../../stores/gameStore';
import './Newspaper.css';

interface NewspaperModalProps {
  isOpen: boolean;
  onClose: () => void;
}

function formatNewspaperDate(date: Date): string {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  const dayName = days[date.getDay()];
  const monthName = months[date.getMonth()];
  const day = date.getDate();
  const year = date.getFullYear();

  return `${dayName}, ${monthName} ${day}, ${year}`;
}

export default function NewspaperModal(props: NewspaperModalProps) {
  const data = newspaperData();

  return (
    <Modal
      isOpen={props.isOpen}
      onClose={props.onClose}
      title="Newspaper"
      width="70%"
    >
      <Show when={data}>
        <div id="newspaper">
          <div class="newspaper-head">
            <div class="newspaper-headerobjectswrapper">
              <div class="weatherforcastbox">
                <span style="font-style: italic;">
                  Weather forecast for the next 24 hours: Plenty of Sunshine
                </span>
                <br />
                <span>Wind: 7km/h SSE; Temp: 21°C; Hum: 82%</span>
              </div>
              <header class="newspaper-large-header">Newpost York</header>
            </div>

            <div class="newspaper-subhead" id="datetime">
              {formatNewspaperDate(data!.date)} - Technology Section
            </div>
          </div>

          <div class="newspaper-content">
            <div class="newspaper-columns">
              <div class="newspaper-column" id="product-column">
                <div class="newspaper-head">
                  <img
                    id="product-image"
                    class="product-image"
                    src={`/images/${data!.company}/${data!.productName}.webp`}
                    alt={data!.productName}
                    onError={(e) => {
                      e.currentTarget.src = '/images/cpu-factory.jpeg';
                    }}
                  />
                  <span class="headline hl3">
                    {data!.company.toUpperCase()} RELEASED THE{' '}
                    {data!.productName.toUpperCase()}
                  </span>
                  <p>
                    <span class="headline hl4">
                      AVAILABLE NOW FOR ${data!.price.toLocaleString()}
                    </span>
                  </p>
                  <p class="newspaper-article" id="article">
                    {data!.description}
                    <br />
                    <br />
                    This represents a significant milestone in the technology
                    industry and showcases the innovative capabilities of{' '}
                    {data!.company}. Industry analysts predict this product
                    will have a major impact on the market.
                  </p>
                </div>
              </div>
            </div>

            <div class="newspaper-columns">
              <div class="newspaper-column" id="ad-column">
                <div class="newspaper-head">
                  <span class="headline hl3">Hardware Tycoon</span>
                  <p>
                    <span class="headline hl4">The Future of Business Gaming</span>
                  </p>
                </div>
                <p>
                  Experience the thrill of building a tech empire from the ground
                  up. Research cutting-edge technology, develop revolutionary
                  products, and compete against industry giants. The future is in
                  your hands!
                </p>
              </div>

              <div class="newspaper-column" id="news-column">
                <div class="newspaper-head">
                  <span class="headline hl3">Industry Update</span>
                  <p>
                    <span class="headline hl4">Market Trends</span>
                  </p>
                </div>
                <p>
                  The semiconductor industry continues to evolve at a rapid pace.
                  With each passing year, transistor sizes shrink and performance
                  increases. Companies that can innovate and adapt will thrive in
                  this competitive landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </Show>
    </Modal>
  );
}
