import { Range } from "react-date-range";
import Calendar from "../components/inputs/Calendar";
import Button from "../components/Button";

interface ListingReservationProps {
  price: number;
  dateRange: Range;
  totalPrice: number;
  onChangeDate: (value: Range) => void;
  onSubmit: () => void;
  disabled?: boolean;
  disabledDates: Date[];
}

const ListingReservation: React.FC<ListingReservationProps> = ({
  price,
  dateRange,
  totalPrice,
  onChangeDate,
  onSubmit,
  disabled,
  disabledDates,
}) => {
  return (
    <div
      className="bg-white
    rounded-xl
    border-[1px]
    border-neutral-200
    overflow-hidden"
    >
      <div className="flex flex-row items-center gap-1 p-4">
        <div className="text-2xl font-semibold">$ {price}</div>
        <div className="font-light text-neutral-600">night</div>
      </div>
      <hr />
      <Calendar
        value={dateRange}
        disabledDates={disabledDates}
        onChange={(value) => onChangeDate(value.selection)}
      />
      <hr />
      <div className="p-4">
        <Button disabled={disabled} label="Reserve" onClick={onSubmit} />
      </div>
      <div
        className="p-4 flex flex-row items-center justify-between
      font-semibold text-lg"
      >
        <div>Total</div>
        <div>$ {totalPrice}</div>
      </div>

      {/* -------- Допълнителна инфо секция -------- */}
      {/* <hr /> */}

      <div className="px-4 pb-6 space-y-3 text-sm text-neutral-700">
        <div className="bg-rose-100 p-3 rounded-lg border-l-4 border-rose-500">
          Check-in is available after 3:00 PM. Please respect quiet hours after
          10:00 PM.
        </div>

        <div className="bg-rose-100 p-3 rounded-lg border-l-4 border-rose-500">
          A valid government-issued ID is required upon arrival for
          verification.
        </div>

        {/* <div className="bg-rose-100 p-3 rounded-lg border-l-4 border-rose-500">
          Pets are not allowed on the property unless otherwise agreed.
        </div> */}

        <div className="bg-rose-100 p-3 rounded-lg border-l-4 border-rose-500 italic">
          “This place exceeded our expectations. Super clean and well located.”
          — Recent guest
        </div>
      </div>
    </div>
  );
};

export default ListingReservation;
