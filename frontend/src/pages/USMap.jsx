import './USMap.css';
import { useState, useEffect } from 'react';
import Tooltip from '@mui/material/Tooltip';
import data from "../data/usa-map-dimensions";
import moment from 'moment';

const USMap = () => {
  const statesData = data();
  const [tooltipContent, setTooltipContent] = useState(""); 
  const [sentiData, setSentiData] = useState([]);
  const [currentTime, setCurrentTime] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:8000/sys-be/tweet/all');
        const data = await response.json();
        setSentiData(data);

        const now = moment();
        const adjustedTime = now.subtract(5, 'hours');
        const formattedTime = adjustedTime.format("DD MMM YYYY HH:mm:ss");
        setCurrentTime(formattedTime);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };
    fetchData();
  }, []);

  const getFillColor = (stateAbbr) => {
    const stateEntries = sentiData.filter(entry => entry.state_code === stateAbbr);
    if (stateEntries.length === 0) return "bg-gray-400";
  
    const bidenTotal = stateEntries.filter(entry => entry.name === 'biden').reduce((acc, curr) => acc + curr.total, 0);
    const trumpTotal = stateEntries.filter(entry => entry.name === 'trump').reduce((acc, curr) => acc + curr.total, 0);
  
    return bidenTotal > trumpTotal ? '#8B93FF' : '#FF71CD';
  };

  const handleMouseEnter = (abbr) => {
    const stateName = statesData[abbr]?.name || "";
    const stateEntries = sentiData.filter(entry => entry.state_code === abbr);
    let bidenTotal = 0;
    let trumpTotal = 0;
    let candidateName = '';
    let candidateTotal = 0;
    let candidateColor = '';

    if (stateEntries.length > 0) {
      bidenTotal = stateEntries.filter(entry => entry.name === 'biden').reduce((acc, curr) => acc + curr.total, 0);
      trumpTotal = stateEntries.filter(entry => entry.name === 'trump').reduce((acc, curr) => acc + curr.total, 0);
      if (bidenTotal > trumpTotal) {
        candidateName = 'Biden';
        candidateTotal = bidenTotal;
        candidateColor = '#8B93FF';
      } else {
        candidateName = 'Trump';
        candidateTotal = trumpTotal;
        candidateColor = '#FF71CD';
      }
    }
    
    const tickIcon = (
      <svg xmlns="http://www.w3.org/2000/svg" height="20" viewBox="0 0 22 22" width="20" fill={candidateColor}>
        <path d="M0 0h24v24H0V0zm0 0h24v24H0V0z" fill="none"/>
        <path d="M16.59 7.58L10 14.17l-3.59-3.58L5 12l5 5 8-8zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8z"/>
      </svg>
    );
    
    const tick = candidateTotal > 0 ? tickIcon : '';
 
    const tooltipContent = (
        <div>
          <p className='text-base m-0 whitespace-nowrap'>President: {stateName} 
            <span className="ml-5 font-bold text-2xl" style={{ color: candidateColor }}>{candidateName}</span>
            <span className="inline-block">{tick}</span>
          </p>
          <p className='font-bold text-right text-xs mt-0 mr-2' style={{ color: candidateColor }}>PROJECTED WINNER</p>
          <div className="row candidate-header">
            <div className="candidate italic"><p>Candidate</p></div>
            <div className="vote-header italic text-right"><p>Votes</p></div>
          </div>
          <div className="row">
            <div className="candidate">
              <p>
                <span className="inline-block mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 24 24" width="10" fill="#8B93FF">
                    <circle cx="12" cy="12" r="10"/>
                  </svg> 
                </span>
                Biden {bidenTotal > trumpTotal && <span className="inline-block">{tick}</span>}
              </p>
            </div>
            <div className="text-right mr-3"><p>{bidenTotal}</p></div>
          </div>
          <div className="row">
            <div className="candidate">
              <p>
                <span className="inline-block mr-1">
                  <svg xmlns="http://www.w3.org/2000/svg" height="10" viewBox="0 0 24 24" width="10" fill="#FF71CD">
                    <circle cx="12" cy="12" r="10"/>
                  </svg> 
                </span>
                Trump {trumpTotal > bidenTotal && <span className="inline-block">{tick}</span>}
              </p>
            </div>
            <div className="text-right mr-3"><p>{trumpTotal}</p></div>
          </div>
          <p className='font-bold text-xs mt-1 ml-2'>VN. 99% ln</p>
          <p className='text-xs m-0 ml-2'>Update {currentTime}</p>
      </div>
      )
    setTooltipContent(tooltipContent);
  };

  const handleMouseLeave = () => {
    setTooltipContent(""); 
  };

  return (
    <svg width="960" height="600" viewBox="0 0 960 600" xmlns="http://www.w3.org/2000/svg">
      {Object.keys(statesData).map((stateKey) => {
        const state = statesData[stateKey];
        const { center_x, center_y } = state;
        return (
          <g key={state.abbreviation}>
            <Tooltip 
              key={state.abbreviation} 
              title={tooltipContent} 
              placement="top" 
              disableInteractive
              followCursor
            >
              <path
                d={state.dimensions}
                fill={getFillColor(state.abbreviation)}
                stroke="#FFF"
                strokeWidth="1.5"
                onMouseEnter={() => handleMouseEnter(state.abbreviation)}
                onMouseLeave={handleMouseLeave}
                className="pointer-events-auto hover:opacity-50 cursor-pointer stroke-current text-white"
              />
            </Tooltip>
            <text
              x={center_x}
              y={center_y}
              textAnchor="middle"
              alignmentBaseline="middle"
              fill="#000"
              fontSize="12"
              font-weight= "bold"
              pointerEvents="none"
            >
            {state.abbreviation}
            </text>
          </g>
        );
      })}
    </svg>
  );
};

export default USMap;