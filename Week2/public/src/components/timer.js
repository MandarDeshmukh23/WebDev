import { useState, useEffect } from 'react';

function TimeSpent() {
    const [seconds, setSeconds] = useState(0);

    useEffect(() => {
        // Set up the interval
        const interval = setInterval(() => {
            setSeconds(prev => prev + 1);
        }, 1000);

        // Clean up the interval on unmount
        return () => clearInterval(interval);
    }, []);

    return (
        <header className=''>
            <p className="text-sm text-gray-600 font-medium px-4 py-2 mt-[60px] decoration-[#50d71e] fixed bg-black text-red-500">
                ⏱ Time Spent on this site: <span className="font-bold">{seconds}</span> second{seconds !== 1 ? 's' : ''}
            </p>
        </header>
    );
}

export default TimeSpent;
