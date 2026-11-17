import "./SeatsClock.css";

// Ported from the uploaded Uiverse clock, recoloured and paired with a "seats left" label.
export default function SeatsClock({ label, seatsLeft, seatsTotal }) {
  return (
    <div className="seats-clock-wrap">
      <div className="face" role="img" aria-label="Clock">
        <p className="v-index">II</p>
        <p className="h-index">II</p>
        <div className="hour" />
        <div className="minute" />
        <div className="second" />
      </div>
      <div>
        <h3>{label}</h3>
        <p className="seats-count"><strong>{seatsLeft}</strong> of {seatsTotal} seats left in the next batch</p>
      </div>
    </div>
  );
}
