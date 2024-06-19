import { createSlice } from "@reduxjs/toolkit";
import dayjs from "dayjs";

const initialState = {
  curentDate: dayjs(),
  selectedSeat: null,
  bookings: [
    { id: 1, seatNo: 2, BookingDate: dayjs(), BookedBy: "jeevan" },
    {
      id: 5,
      seatNo: 5,
      BookingDate: dayjs().add(1, "Day"),
      BookedBy: "jeevan",
    },
  ],
  isOpen: false,
  isCurrentUser:false
};

export const InitialSlice = createSlice({
  name: "initialSlice",
  initialState,
  reducers: {
    setCurrentDate: (state, action) => {
      state.curentDate = action.payload;
    },
    setSelectedSeat: (state, action) => {
      state.selectedSeat = action.payload;
    },
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setBooking: (state, action) => {
      state.bookings.push(action.payload);
    },
    setCurrentUser:(state,action) => {
      state.isCurrentUser = action.payload
    }
  },
});

export const { setCurrentDate, setSelectedSeat, setIsOpen, setBooking,setCurrentUser} =InitialSlice.actions;
export default InitialSlice.reducer;
