import Swal from "sweetalert2";

const BookingRow = ({ booking, handleDelete, handleBookingConfirm }) => {
    const { _id, img, service, email, price, date, status } = booking;

    return (
        <tr>
            <th>
                <label>
                    <button onClick={() => handleDelete(_id)} className="btn btn-circle btn-outline">
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                    </button>
                </label>
            </th>
            <td>
                <div className="avatar">
                    <div className="mask mask-squircle w-12 h-12">
                        <img src={img || "https://img.daisyui.com/tailwind-css-component-profile-5@56w.png"} alt="Avatar Tailwind CSS Component" />
                    </div>
                </div>
            </td>
            <td>
                {service}
            </td>
            <td>{email}</td>
            <td>${price}</td>
            <td>{date}</td>
            <td>
                {
                    status === "confirm" ?
                        <span className="font-bold text-primary">Confirmed</span>
                        :
                        <button onClick={() => handleBookingConfirm(_id)} title="click to change status">Please Confirm</button>
                }
            </td>
        </tr>
    );
};

export default BookingRow;