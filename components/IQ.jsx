import * as d3 from "d3";


const gauss_scale = 4.5;
const gauss_width = 0.25;
const n = 24; // 48 / 2
const t_trans = 2;
const t_hold = 0.1;
const r_label = 15;
const text_hold_ratio1 = 0.015; // how long into (or at the end of) the t_trans should opacity start increasing
const text_hold_ratio2 = 0.25; // how close to the peak should the label be at full opacity in terms of t_trans


const d = [
    {label: "Materials", theta: 1.75*Math.PI},
    {label: "Pharma", theta: 0.25*Math.PI},
    {label: "Energy", theta: 1.25*Math.PI},
    {label: "Semis", theta: 1.65*Math.PI},
    {label: "Bio", theta: 0.35*Math.PI},
    {label: "Quantum", theta: 0.75*Math.PI}
]

const thetas = [];
for (let theta=0; theta <= 2*Math.PI; theta += Math.PI/n) {
    thetas.push(theta);
}

const lcg = d3.randomLcg(9);
const normal = d3.randomNormal.source(lcg)(0,0.3);
const radii_base = thetas.map(_=>10+normal());

const line = d3.lineRadial()
    .angle((_,i)=>thetas[i])
    .radius(r=>r)
    .curve(d3.curveBasisClosed);
const d_base = line(radii_base);
const d_public = line(radii_base.map(r=>r-0.5));
const gauss = (t,u) => gauss_scale*Math.exp(-0.5*((t-u)/gauss_width)**2);

d.map(di=>{
    di.radii = radii_base.map( (r,i)=>r+gauss(thetas[i],di.theta) );
    di.d = line(di.radii);
});


const dur = (d.length + 1) * (t_trans + t_hold);
const values = [d_base];
const keyTimes = [0];
const keySplines = [];
let t = 0;
d.forEach(di=>{
    di.t_start = (t+ t_trans * text_hold_ratio1) / dur;
    t += t_trans;
    values.push(di.d);
    keyTimes.push(t / dur);
    keySplines.push("0.65 0 0.35 1");
    di.t_full1 = (t - t_trans * text_hold_ratio2) / dur;
    t += t_hold;
    di.t_full2 = (t + t_trans * text_hold_ratio2) / dur;
    values.push(di.d);
    keyTimes.push(t / dur);
    keySplines.push("0 0 1 1");
    di.t_end = (t +t_trans - t_trans * text_hold_ratio1) / dur;

    di.opacityValues = [0, 0, 1, 1, 0, 0].join(";");
    di.keyTimes = [0, di.t_start, di.t_full1, di.t_full2, di.t_end, 1].join(";");
    

    const [x,y] = d3.pointRadial(di.theta, r_label);
    di.x = x;
    di.y = y;

    di.anchor = di.theta < Math.PI ? "start" : "end";
    di.baseline = Math.PI/2 < di.theta && di.theta < 1.5 * Math.PI ? "hanging" : "auto";

});
t += t_trans;
values.push(d_base);
keyTimes.push(t / dur);
keySplines.push("0 0 0.85 1");
t += t_hold;
values.push(d_base);
keyTimes.push(t / dur);
keySplines.push("0 0 1 1");


export function IQ() {
    return (
        <svg viewBox={`-23 -15 48 30`}>
            <path d={d_public} fill="none" stroke="#de640d" strokeWidth="0.5"/>
            <path d={d_base} fill="none" stroke="#66b" strokeWidth="0.5">
                <animate 
                    attributeName="d"
                    dur={`${dur}s`}
                    repeatCount="indefinite"
                    values={values.join(";")}
                    keyTimes={keyTimes.join(";")}
                    calcMode="spline"
                    keySplines={keySplines.join(";")}
                />
            </path>
            {d.map(di => {
                return (
                    <text
                        key={di.label}
                        x={di.x}
                        y={di.y}
                        textAnchor={di.anchor}
                        dominantBaseline={di.baseline}
                        fontSize={2.5}
                        fontWeight={700}
                        fill="currentColor"
                        opacity={1}
                    >
                        {di.label}
                        <animate
                            attributeName="opacity"
                            dur={`${dur}s`}
                            repeatCount="indefinite"
                            values={di.opacityValues}
                            keyTimes={di.keyTimes}
                        />
                    </text>
                )
            })}

            <text x={0} y={0} textAnchor="middle" dominantBaseline="middle" fontSize={6} fontWeight={400} fill="currentColor">
            IQ
            </text>
        </svg>
    );
}