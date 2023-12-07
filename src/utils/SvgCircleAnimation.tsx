import { useEffect, useState } from 'react';

function SvgCircleAnimation(props: { number: any }) {
  const { number } = props;
  const [showText, setShowText] = useState(false);

  useEffect(() => {
    setShowText(true);
  }, []);

  const getColor = (number: number) => {
    if (number >= 0 && number < 5) {
      return '#FF453A';
    } else if (number >= 5 && number <= 8.5) {
      return '#EFDC31';
    } else if (number > 8.5 && number <= 10) {
      return '#30D158';
    }
    return '#496FFF';
  };

  const color = getColor(number);
  const outerRadius = 86;
  const innerRadius = 70;
  const gap = 10;

  return (
    <svg
      width='200'
      height='200'
      xmlns='http://www.w3.org/2000/svg'
    >
      <circle
        cx='100'
        cy='100'
        r={outerRadius}
        fill='none'
        stroke={color}
        strokeWidth='6'
        strokeLinecap='round'
        strokeDasharray={`${2 * Math.PI * outerRadius} ${2 * Math.PI * outerRadius}`}
        strokeDashoffset='0'
      >
        <animate
          attributeName='stroke-dashoffset'
          from={`${2 * Math.PI * outerRadius}`}
          to='0'
          dur='0.5s'
          begin='0s'
          fill='freeze'
        />
        <animate
          attributeName='opacity'
          from='0'
          to='1'
          dur='0.5s'
          begin='0s'
          fill='freeze'
        />
      </circle>
      <circle
        cx='100'
        cy='100'
        r={innerRadius}
        fill={color}
      >
        <animate
          attributeName='r'
          from='0'
          to={innerRadius}
          dur='0.5s'
          begin='0s'
          fill='freeze'
        />
      </circle>
      {showText && (
        <text
          x='100'
          y='110'
          textAnchor='middle'
          fontSize='32'
          fill='white'
        >
          {number.toFixed(1)}
        </text>
      )}
    </svg>
  );
}

export default SvgCircleAnimation;
