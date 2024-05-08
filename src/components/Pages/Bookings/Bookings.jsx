import React, { useContext, useEffect, useState } from 'react';
import { AuthContex } from '../../Provider/AuthProvider';
import BookingRow from './BookingRow';
import Swal from 'sweetalert2';
import axios from 'axios';

const Bookings = () => {
    const { user } = useContext(AuthContex);
    const url = `http://localhost:4500/bookings?email=${user?.email}`;
    const [bookings, setBookings] = useState([]);

    useEffect(() => {
        axios.get(url, { withCredentials: true })
            .then(res => {
                setBookings(res.data);
            })
        // fetch(url)
        //     .then(res => res.json())
        //     .then(data => {
        //         console.log(data);
        //         setBookings(data);
        //     })
    }, [url])

    const handleDelete = id => {
        const proceed = confirm("Are you sure to delete?")
        if (proceed) {
            fetch(`http://localhost:4500/bookings/${id}`, {
                method: "DELETE"
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data);
                    if (data.deletedCount > 0) {
                        Swal.fire("Data Deleted")
                        const remaining = bookings.filter(booking => booking._id !== id);
                        setBookings(remaining)
                    }
                })
        }
    }

    const handleBookingConfirm = id => {
        fetch(`http://localhost:4500/bookings/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': "application/json"
            },
            body: JSON.stringify({ status: "confirm" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.modifiedCount > 0) {
                    //update state
                    const remaining = bookings.filter(booking => booking._id !== id);
                    const updated = bookings.find(booking => booking._id === id);
                    updated.status = "confirm";
                    const newBookings = [updated, ...remaining];
                    setBookings(newBookings);
                }
            })
    }
    return (
        <div>
            <h1 className='text-5xl'>Your Bookings: {bookings.length}</h1>
            <div>
                <div className="overflow-x-auto">
                    <table className="table">
                        {/* head */}
                        <thead>
                            <tr>
                                <th>
                                    <label>
                                        <input type="checkbox" className="checkbox" />
                                    </label>
                                </th>
                                <th>Service Photo</th>
                                <th>Customer Name</th>
                                <th>Email</th>
                                <th>Price</th>
                                <th>Date</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {/* row 1 */}
                            {
                                bookings.map((booking, idx) => <BookingRow booking={booking} key={booking._id} handleDelete={handleDelete} handleBookingConfirm={handleBookingConfirm}></BookingRow>)
                            }
                        </tbody>


                    </table>
                </div>
            </div>
        </div>
    );
};

export default Bookings;