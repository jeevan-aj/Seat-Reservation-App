import { DatePicker } from "antd";
import dayjs from "dayjs";
import { useDispatch, useSelector } from "react-redux";
import {
  setCurrentDate,
  setIsOpen,
  setSelectedSeat,
} from "../Redux/InitialSlice";
import AddBooking from "./AddBooking";

const SeatMap = () => {
  const SeatCounts = 100;
  const { curentDate, bookings } = useSelector((state) => state.initialSlice);

  const dispatch = useDispatch();

  const onDateChange = (newDate) => {
    dispatch(setCurrentDate(newDate));
  };

  const handleBooking = (id) => {
    dispatch(setSelectedSeat(id));
    dispatch(setIsOpen(true));
  };

  return (
    <>
      <DatePicker
        defaultValue={dayjs()}
        disabledDate={(current) => {
          return (
            dayjs().add(-1, "days") >= current ||
            dayjs().add(1, "month") <= current
          );
        }}
        onChange={onDateChange}
      />

      <div className="lg:max-w-[700px] flex flex-wrap gap-5 justify-center items-center">
        {[...Array(SeatCounts)].map((_, idx) => {
          const isBooked = bookings.some(
            (booking) =>
              dayjs(booking.BookingDate).isSame(curentDate, "day") &&
              booking.seatNo === idx
          );

          return (
            <button
              key={idx}
              className={`${
                isBooked ? "bg-red-500 cursor-not-allowed" : "bg-green-500"
              } max-w-[50px] lg:px-10 py-3 flex justify-center items-center`}
              onClick={() => !isBooked && handleBooking(idx)}
            >
              <p>{idx + 1}</p>
            </button>
          );
        })}
      </div>
      <AddBooking />
    </>
  );
};

export default SeatMap;
