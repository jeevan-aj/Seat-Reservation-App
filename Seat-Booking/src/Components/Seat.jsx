import { useSelector } from "react-redux"


// eslint-disable-next-line react/prop-types
const Seat = ({key,value}) => {
  

    
  return (
    <button
    key={key}
    className={` max-w-[50px] lg:px-10 py-3 flex justify-center items-center`}
  >
    <p>{value}</p>
  </button>
  )
}

export default Seat