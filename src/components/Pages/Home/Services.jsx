import React, { useEffect, useState } from 'react';
import ServiceCard from './ServiceCard';

const Services = () => {
    const [services, setServices] = useState([]);

    useEffect(() => {
        fetch('services.json')
            .then(res => res.json())
            .then(data => {
                console.log(data);
                setServices(data);
            })
    }, [])

    return (
        <div>
            <div className='text-center'>
                <h1 className="text-3xl text-orange-600">Services</h1>
                <h2 className="text-5xl">Our Service Area</h2>
                <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime ipsum et deleniti, recusandae necessitatibus dolorem natus aut eum inventore unde rem laboriosam illum magni eius est quibusdam sed odit dolorum.</p>
            </div>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8'>
                {
                    services.map(service => <ServiceCard key={service._id} service={service}></ServiceCard>)
                }
            </div>
        </div>
    );
};

export default Services;