import React, { useState, useEffect } from 'react';
import axios from 'axios';

const GetData = () => {
    const [trumpTotal, setTrumpTotal] = useState(0);
    const [bidenTotal, setBidenTotal] = useState(0);
    const [trumpPercentage, setTrumpPercentage] = useState(0);
    const [bidenPercentage, setBidenPercentage] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('http://localhost:8000/get_data');
                const data = response.data;

                let trump = 0;
                let biden = 0;
                data.forEach(item => {
                    if (item.name === 'trump') {
                        trump += item.total;
                    } else if (item.name === 'biden') {
                        biden += item.total;
                    }
                });
                const totalVotes = trump + biden;
                const trumpPercent = totalVotes ? (trump / totalVotes) * 100 : 0;
                const bidenPercent = totalVotes ? (biden / totalVotes) * 100 : 0;

                setTrumpTotal(trump);
                setBidenTotal(biden);
                setTrumpPercentage(trumpPercent);
                setBidenPercentage(bidenPercent);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, []);

    return (
        <div className="flex justify-center items-center mb-4">
          <div className="flex justify-between w-1/2 text-center">
            <div className="text-left">
              <div>
                <h2 className="text-5xl font-bold font-serif text-customRed">TRUMP <span className="text-base">REPUBLICAN</span></h2>
                <p className="text-4xl bg-customRed text-white p-3 rounded">{trumpPercentage.toFixed(2)}%
                  <span className="ml-20 text-3xl">{trumpTotal}</span>
                </p>
              </div>
            </div>
            <div className="text-right">
              <div>
                <h2 className="text-base font-bold font-serif text-customBlue">DEMOCRAF <span className="text-5xl">BIDEN</span></h2>
                <p className="text-3xl bg-customBlue text-white p-3 rounded">{bidenTotal}
                  <span className="ml-12 text-4xl">{bidenPercentage.toFixed(2)}%</span>
                </p>
              </div>
            </div>
          </div>
        </div>
    );
};

export default GetData;
