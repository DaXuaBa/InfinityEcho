import '../style/StateResult.css';
import { useState, useEffect } from 'react';
import data from "../data/usa-map-dimensions";
import moment from 'moment';

const StateResult = () => {
  const statesData = data();
  const [sentiData, setSentiData] = useState([]);
  const [stateTime, setStateTime] = useState({});

  const battlegroundStates = ["FL", "PA", "OH", "MI", "WI", "NC", "AZ", "GA", "IA", "NH"];
  const trumpSupportStates = ["TX", "SC", "AL", "MS", "WY", "OK", "WV", "KY", "AR", "LA"];
  const bidenSupportStates = ["CA", "NY", "MA", "IL", "MD", "VT", "DE", "RI", "HI", "WA"];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response1 = await fetch('http://localhost:8000/get_data');
        const data1 = await response1.json();
        if (Array.isArray(data1)) {
          setSentiData(data1);
        } else {
          console.error('Error: Data received is not an array');
        }

        const response2 = await fetch('http://localhost:8000/get_time');
        const data2 = await response2.json();

        const stateTimes = {};
        data2.forEach(item => {
          stateTimes[item.state_code] = item.time;
        });
        setStateTime(stateTimes);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getCardInfo = (stateAbbr) => {
    const stateEntries = Array.isArray(sentiData) ? sentiData.filter(entry => entry.state_code === stateAbbr) : [];
    if (stateEntries.length === 0) return { candidateName: "", bidenTotal: 0, trumpTotal: 0, bidenPercentage: 0, trumpPercentage: 0, time: "", isFlip: false };

    const bidenTotal = stateEntries.filter(entry => entry.name === 'biden').reduce((acc, curr) => acc + curr.total, 0);
    const trumpTotal = stateEntries.filter(entry => entry.name === 'trump').reduce((acc, curr) => acc + curr.total, 0);

    const totalVotes = bidenTotal + trumpTotal;
    const bidenPercentage = totalVotes > 0 ? ((bidenTotal / totalVotes) * 100).toFixed(1) : 0;
    const trumpPercentage = totalVotes > 0 ? ((trumpTotal / totalVotes) * 100).toFixed(1) : 0;

    const candidateName = bidenTotal > trumpTotal ? 'Biden' : 'Trump';
    const candidateColor = bidenTotal > trumpTotal ? '#8B93FF' : '#FF71CD';
    const formattedTime = moment(stateTime[stateAbbr]).format('DD MMM YYYY HH:mm:ss');

    const isFlip = (
      (trumpSupportStates.includes(stateAbbr) && bidenTotal > trumpTotal) ||
      (bidenSupportStates.includes(stateAbbr) && trumpTotal > bidenTotal)
    );

    return { candidateName, bidenTotal, trumpTotal, bidenPercentage, trumpPercentage, candidateColor, formattedTime, isFlip };
  };

  return (
    <div className="card-container">
      {Object.keys(statesData).map((stateKey) => {
        const state = statesData[stateKey];
        const { candidateName, bidenTotal, trumpTotal, bidenPercentage, trumpPercentage, candidateColor, formattedTime, isFlip } = getCardInfo(state.abbreviation);
        const cardClass = bidenTotal > trumpTotal ? 'card biden' : 'card trump';
        const isBattleground = battlegroundStates.includes(state.abbreviation);

        return (
          <div key={state.abbreviation} className={cardClass}>
            {isBattleground && 
              <div className="absolute bg-yellow-300 text-black p-[2px] rounded font-bold text-[7px] -mt-[9px] -ml-[13px]">
                BATTLEGROUND
              </div>}
            <p className="text-lg font-bold mb-2.5 text-gray-800">{state.name}
              <span className="inline-block">{isFlip && (
                <img
                  src="./icon-partyflip.svg"
                  alt="Flip"
                  className="w-4 h-4 ml-1"
                />
              )}
              </span>
            </p>
            <p className="font-bold text-xl" style={{ color: candidateColor }}>
              <span className="inline-block rounded-full w-4 h-4 mr-2" style={{ backgroundColor: candidateName === 'Biden' ? '#8B93FF' : '#FF71CD' }}></span>{candidateName}
            </p>
            <p className="text-sm text-gray-600 mt-1">Biden: {bidenTotal} ({bidenPercentage}%)</p>
            <p className="text-sm text-gray-600 mt-1">Trump: {trumpTotal} ({trumpPercentage}%)</p>
            <p className="text-xs text-gray-400 mt-2">Updated: {formattedTime}</p>
          </div>
        );
      })}
    </div>
  );
};

export default StateResult;
