const t = "16s";


// const r = "#e57373";
// const y = "#ffd166";
// const g = "#66bb6a";

const r = "#efaaaa";
const y = "#ffe5a3";
const g = "#a8d5ab";


const lab = <>
    <animate attributeName="stroke-width" values="1.15;3.65;1.15" dur={t} repeatCount="indefinite"/>
    
</>
const laf = <>
    <animate attributeName="stroke-width" values="1;3.5;1" dur={t} repeatCount="indefinite"/>
    <animate attributeName="stroke" values={[r,y,g,g,y,r].join(";")} dur={t} repeatCount="indefinite"/>
</>
const laib = <>
    <animate attributeName="stroke-width" values="3.65;1.15;3.65" dur={t} repeatCount="indefinite"/>
</>
const laif = <>
<animate attributeName="stroke-width" values="3.5;1;3.5" dur={t} repeatCount="indefinite"/>
<animate attributeName="stroke" values={[g,y,r,r,y,g].join(";")} dur={t} repeatCount="indefinite"/>
</>

const ma = <animateTransform href="#marker-shape" attributeName="transform" type="scale" values="0.5;0.3;0.5" dur={t} repeatCount="indefinite"/>

const mai = <animateTransform href="#marker-i-shape" attributeName="transform" type="scale" values="0.3;0.5;0.3" dur={t} repeatCount="indefinite"/>


const w = [30,61.109715,30];

const ra = <>
    <animate attributeName="width" values={w.join(";")} dur={t} repeatCount="indefinite"/>
    <animate attributeName="fill" values={[r,y,g,g,y,r].join(";")} dur={t} repeatCount="indefinite"/>
</>

export function Iterate() {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="-5 0 145 112"
      >
        <defs>
          <marker
            id="marker"
            style={{ overflow: "visible" }}
            refX="0"
            refY="0"
            orient="auto-start-reverse"
            markerWidth="3.8870001"
            markerHeight="4.3637118"
            viewBox="0 0 5.8874262 6.6094758"
            preserveAspectRatio="xMidYMid"
            markerUnits="strokeWidth"
          >
            <path
              id="marker-shape"
              transform="scale(0.5)"
              fill="context-stroke"
              fillRule="evenodd"
              stroke="context-stroke"
              strokeWidth="1pt"
              d="m 6,0 c -3,1 -7,3 -9,5 0,0 0,-4 2,-5 -2,-1 -2,-5 -2,-5 2,2 6,4 9,5 z"
            />
            {ma}
          </marker>
          <marker
            id="marker-i"
            style={{ overflow: "visible" }}
            refX="0"
            refY="0"
            orient="auto-start-reverse"
            markerWidth="3.8870001"
            markerHeight="4.3637118"
            viewBox="0 0 5.8874262 6.6094758"
            preserveAspectRatio="xMidYMid"
            markerUnits="strokeWidth"
          >
            <path
              id="marker-i-shape"
              transform="scale(0.5)"
              fill="context-stroke"
              fillRule="evenodd"
              stroke="context-stroke"
              strokeWidth="1pt"
              d="m 6,0 c -3,1 -7,3 -9,5 0,0 0,-4 2,-5 -2,-1 -2,-5 -2,-5 2,2 6,4 9,5 z"
            />
            {mai}
          </marker>
        </defs>
  
        <g transform="translate(-23.159575,-37.202571)">
          {/* Database icon */}
          <g
            transform="matrix(0.9705369,0,0,0.9705369,53.311584,51.922211)"
            fill="none"
            stroke="#333"
            strokeWidth="0.545231"
          >
            <path d="M 4,18 V 6" strokeLinecap="round" />
            <path d="M 20,6 V 18" strokeLinecap="round" />
            <path d="M 12,10 C 16.4183,10 20,8.20914 20,6 20,3.79086 16.4183,2 12,2 7.58172,2 4,3.79086 4,6 c 0,2.20914 3.58172,4 8,4 z" />
            <path d="m 20,12 c 0,2.2091 -3.5817,4 -8,4 -4.41828,0 -8,-1.7909 -8,-4" />
            <path d="m 20,18 c 0,2.2091 -3.5817,4 -8,4 -4.41828,0 -8,-1.7909 -8,-4" />
          </g>
  
          {/* Circular workflow arrows */}
          <g
            fill="none"
            stroke="#333"
            strokeWidth="0.79375"
            strokeLinecap="round"
            markerEnd="url(#marker)"
          >
            <path
              id="path2452"
              d="m 23.999996,103.99999 a 40,40 0 0 1 20,-34.641014"
            >{lab}</path>
            <path
              id="path2452b"
              d="m 23.999996,103.99999 a 40,40 0 0 1 20,-34.641014"
            >{laf}</path>
            <path
              id="path2506"
              d="m 89.7115,134.64177 a 40,40 0 0 1 -51.423007,0"
            >{lab}</path>
            <path
              id="path2506b"
              d="m 89.7115,134.64177 a 40,40 0 0 1 -51.423007,0"
            >{laf}</path>
            <path
              id="path2508"
              d="M 83.999998,69.358977 A 40,40 0 0 1 104,103.99999"
            >{lab}</path>
            <path
              id="path2508b"
              d="M 83.999998,69.358977 A 40,40 0 0 1 104,103.99999"
            >{laf}</path>
          </g>
  
          {/* Internet icon */}
          <g
            transform="matrix(0.35464046,0,0,0.35464046,147.17977,62.479539)"
            fill="none"
            stroke="#333"
            strokeWidth="1.49212"
          >
            <circle r="29" cx="0" cy="0" />
            <ellipse rx="13" ry="29" cx="0" cy="0" />
            <path d="M -29,0 H 29 M -25,-14 Q 0,0 25,-14 M -25,14 Q 0,0 25,14"/>
          </g>
  
          {/* Labels */}
          <g
            fontStyle="italic"
            fontSize="4.23333"
            fontFamily="'TeX Gyre Schola', serif"
            textAnchor="middle"
            fill="#333"
            stroke="none"
          >
            <text x="65.135826" y="78.507088">
              Internal Data
            </text>
            <text x="147.29829" y="79.42057">
              Internet
            </text>
            <text x="105.40139" y="121.67614">
              Workflows
            </text>
            <text x="29.61964" y="122.46777">
              Curate
            </text>
          </g>
  
          {/* Internet → Workflows */}
          <path
            id="path3869"
            transform="scale(-1,1)"
            fill="none"
            stroke="#333"
            strokeWidth="0.79375"
            strokeLinecap="round"
            markerEnd="url(#marker-i)"
            d="m -133.29628,69.358977 a 40,40 0 0 1 20,34.641013"
            >{laib}</path>
        <path
            id="path3869"
            transform="scale(-1,1)"
            fill="none"
            stroke="#333"
            strokeWidth="0.79375"
            strokeLinecap="round"
            markerEnd="url(#marker-i)"
            d="m -133.29628,69.358977 a 40,40 0 0 1 20,34.641013"
            >{laif}</path>
  
          {/* Moat score */}
          <rect
            id="rect4047"
            x="75.898117"
            y="37.731735"
            width="61.109715"
            height="7.4373631"
            ry="3.7186816"
            fill="#ffffff"
            stroke="#333"
            strokeWidth="1.05833"
            strokeLinecap="round"
          />
          <rect
            id="rect4051"
            x="75.898117"
            y="37.731735"
            width="61.109715"
            height="7.4373631"
            ry="3.7186816"
            fill="#ffffff"
            stroke="none"
          />
          <rect
            id="rect4049"
            x="75.898117"
            y="37.731735"
            width="31.189716"
            height="7.4373631"
            ry="3.7186816"
            fill="#ffdd55"
            stroke="none"
          >{ra}</rect>
          <text
            x="90.764771"
            y="42.978649"
            fontStyle="italic"
            fontSize="4.23333"
            fontFamily="'TeX Gyre Schola', serif"
            textAnchor="middle"
            fill="#333"
            stroke="none"
          >
            Moat Score
          </text>
        </g>
      </svg>
    );
  }