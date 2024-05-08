import React, { useContext } from 'react';
import { useLoaderData } from 'react-router-dom';
import { AuthContex } from '../../Provider/AuthProvider';
import Swal from 'sweetalert2';

const BookService = () => {

    const service = useLoaderData();
    const { title, _id, price, img } = service;
    const { user } = useContext(AuthContex);

    const handleBook = e => {
        e.preventDefault();
        const form = e.target;
        const name = form.name.value;
        const email = form.email.value;
        const date = form.date.value;
        const price = form.dueAmount.value;

        const bookingInfo = {
            customerName: name,
            email,
            date,
            service: title,
            service_id: _id,
            price: price,
            img
        }
        console.log(bookingInfo)
        fetch('http://localhost:4500/bookings', {
            method: "POST",
            headers: {
                "content-type": "application/json"
            },
            body: JSON.stringify(bookingInfo)
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.insertedId) {
                    Swal.fire({
                        title: "Success!",
                        text: "Service request Added Successfully!",
                        icon: "success"
                    });
                }
            })
    }
    return (
        <div>
            <h1>BookService : {title}</h1>
            <div>
                <div className="hero min-h-screen bg-base-200">
                    <div className="hero-content flex-col lg:flex-row-reverse">
                        <div className="card w-full shadow-2xl bg-base-100">
                            <form onSubmit={handleBook} className="card-body">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Name</span>
                                        </label>
                                        <input type="text" name="name" defaultValue={user?.displayName} placeholder="user Name" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Date</span>
                                        </label>
                                        <input type="date" name="date" placeholder="password" className="input input-bordered" required />
                                    </div>
                                </div>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Email</span>
                                        </label>
                                        <input type="email" name="email" defaultValue={user?.email} placeholder="email" className="input input-bordered" required />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text">Due Amount</span>
                                        </label>
                                        <input type="text" name="dueAmount" defaultValue={"$" + price} placeholder="password" className="input input-bordered" required />
                                    </div>
                                </div>
                                <div className="form-control mt-6">
                                    <input type="submit" className="btn btn-primary" value="Submit" />
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BookService;