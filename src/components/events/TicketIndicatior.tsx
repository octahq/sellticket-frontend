import React from 'react';

interface Props {
  ticketsLeft: number;
  totalTickets: number; 
}

// const TicketIndicator: React.FC<TicketIndicatorProps> = ({
//   ticketsLeft,
//   totalTickets = 10,
// }) => {
  
// };

export default function TicketIndicatior({ ticketsLeft, totalTickets }: Props) {
  const progress = ((totalTickets - ticketsLeft) / totalTickets) * 100;
  const size = 10;
  const strokeWidth = 2;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (progress / 100) * circumference;

  return (
    <div
      className="relative flex items-center justify-center overflow-visible"
      style={{ width: size, height: size }}
    >
      <svg className="absolute" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          className="fill-none"
        />
      </svg>
      <svg className="absolute" width={size} height={size}>
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          className="stroke-danger-500 rounded fill-none transition-all duration-500 ease-in-out"
          style={{ transform: 'rotate(-90deg)', transformOrigin: '50% 50%' }}
        />
      </svg>
    </div>
  );
}

