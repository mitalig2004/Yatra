import { mkdir, writeFile } from "node:fs/promises";

const palette = { ink: "#20211D", green: "#1F513F", sand: "#EDE4D2", paper: "#FCFBF7", blue: "#76949A", clay: "#B7795E", sage: "#9EAC98", ochre: "#B58A50" };
const line = `fill="none" stroke="${palette.ink}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"`;
const greenLine = `fill="none" stroke="${palette.green}" stroke-width="6" stroke-linecap="round" stroke-linejoin="round"`;

function art(title, number, body, background = palette.paper) {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 640 420" role="img" aria-labelledby="title desc">
  <title id="title">${title}</title><desc id="desc">Original YATRA travel-journal illustration.</desc>
  <rect width="640" height="420" rx="18" fill="${background}"/>
  <path d="M24 64H616M24 356H616" stroke="${palette.ink}" stroke-opacity=".16"/>
  <text x="28" y="43" fill="${palette.green}" font-family="Arial,sans-serif" font-size="12" font-weight="700" letter-spacing="3">YATRA FIELD NOTE ${number}</text>
  ${body}
  <circle cx="596" cy="382" r="17" ${greenLine}/><path d="m587 382 7 7 12-15" ${greenLine}/>
  </svg>`;
}

const assets = [
  ["traveler-preparing.svg", "Traveler preparing for a journey", "01", `
    <rect x="74" y="112" width="238" height="178" rx="12" fill="${palette.sand}"/>
    <path d="M120 286v-92c0-48 74-48 74 0v92M157 152v-38M139 114h36" ${line}/>
    <circle cx="157" cy="102" r="27" fill="${palette.clay}"/>
    <path d="M231 155h52v112h-52zM244 155v-20h26v20M243 188h28M243 216h28" ${line}/>
    <path d="M370 128h184v148H370z" fill="${palette.sage}" opacity=".42"/>
    <path d="m392 244 44-66 31 34 27-53 38 85" ${greenLine}/><circle cx="500" cy="151" r="14" fill="${palette.ochre}"/>
    <path d="m342 304 52-14 40 18 92-22" ${greenLine}/><circle cx="342" cy="304" r="8" fill="${palette.green}"/><circle cx="526" cy="286" r="8" fill="${palette.green}"/>
  `],
  ["friends-planning.svg", "Friends planning a trip", "02", `
    <ellipse cx="320" cy="246" rx="236" ry="70" fill="${palette.sand}"/>
    <rect x="228" y="178" width="184" height="108" rx="8" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="5"/>
    <path d="M245 200h66M245 222h104M245 245h81M352 202l28 28-28 28" ${greenLine}/>
    <circle cx="146" cy="154" r="37" fill="${palette.clay}"/><path d="M98 282c4-72 19-102 48-102s48 30 52 102" ${line}/>
    <circle cx="494" cy="154" r="37" fill="${palette.blue}"/><path d="M442 282c5-72 22-102 52-102s47 30 52 102" ${line}/>
    <path d="m165 204 68 35M475 204l-63 35" ${line}/><path d="M112 326h416" stroke="${palette.green}" stroke-width="6"/>
  `],
  ["goa-map.svg", "Illustrated Goa destination map", "03", `
    <path d="M294 86c62 6 101 49 82 96-13 31 22 48 8 91-11 36-55 62-103 54-48-7-88-35-82-75 5-34 39-45 34-78-6-42 9-94 61-88Z" fill="${palette.sand}" stroke="${palette.green}" stroke-width="6"/>
    <path d="M74 101v223h93c-30-28-39-58-25-89 13-29 42-43 32-75-9-29-7-50 6-59Z" fill="${palette.blue}" opacity=".42"/>
    <path d="M76 150c39 13 70 6 98-20M82 218c44 15 73 6 101-19M82 286c36 12 66 5 93-17" stroke="${palette.blue}" stroke-width="4" fill="none"/>
    <path d="M287 124c-12 37 42 41 19 78-17 27-45 26-38 66 5 26 28 37 57 42" ${greenLine} stroke-dasharray="10 12"/>
    <circle cx="287" cy="124" r="11" fill="${palette.green}"/><circle cx="306" cy="202" r="11" fill="${palette.clay}"/><circle cx="268" cy="268" r="11" fill="${palette.ochre}"/><circle cx="325" cy="310" r="11" fill="${palette.green}"/>
    <text x="432" y="134" fill="${palette.ink}" font-family="Georgia,serif" font-size="38">GOA</text><text x="432" y="163" fill="${palette.green}" font-family="Arial,sans-serif" font-size="12" letter-spacing="3">15.6° N</text>
  `],
  ["route-lines.svg", "Illustrated travel route", "04", `
    <path d="M72 282C134 98 220 323 303 161S472 303 566 111" ${greenLine} stroke-dasharray="14 14"/>
    <g fill="${palette.paper}" stroke="${palette.green}" stroke-width="6"><circle cx="72" cy="282" r="17"/><circle cx="210" cy="235" r="17"/><circle cx="357" cy="150" r="17"/><circle cx="493" cy="229" r="17"/><circle cx="566" cy="111" r="17"/></g>
    <g fill="${palette.green}" font-family="Arial" font-size="13" font-weight="700" text-anchor="middle"><text x="72" y="287">1</text><text x="210" y="240">2</text><text x="357" y="155">3</text><text x="493" y="234">4</text><text x="566" y="116">5</text></g>
    <path d="m89 113 27-27 27 27M116 87v63M100 151h32" ${line}/><text x="72" y="334" fill="${palette.ink}" font-family="Georgia" font-size="25">One day, connected.</text>
  `],
  ["beach-landscape.svg", "Goa beach landscape", "05", `
    <rect x="47" y="90" width="546" height="234" fill="${palette.blue}" opacity=".34"/>
    <circle cx="472" cy="147" r="42" fill="${palette.ochre}"/>
    <path d="M47 226c84-25 132 26 214 0 85-27 142 26 332-13v111H47Z" fill="${palette.sand}"/>
    <path d="M47 218c76-26 136 27 214 0 86-28 143 22 332-17" stroke="${palette.green}" stroke-width="6" fill="none"/>
    <path d="M160 219c-8-72 8-117 49-139M202 90c-39-15-65-9-82 19M202 91c30-28 61-32 91-13M192 110c-26 1-48 12-63 34M205 111c25-8 49-4 71 13" ${line}/>
    <path d="M411 290c24-11 46-11 66 0M438 279v28" ${line}/>
  `],
  ["cafe-destination.svg", "Coastal cafe destination", "06", `
    <path d="M107 168h426l-32-67H139Z" fill="${palette.clay}"/>
    <path d="M121 168v144h398V168M192 168v144M448 168v144" ${line}/>
    <rect x="230" y="202" width="178" height="74" fill="${palette.blue}" opacity=".28"/>
    <path d="M255 237h126M282 214v46M355 214v46" ${greenLine}/>
    <circle cx="319" cy="131" r="9" fill="${palette.paper}"/><path d="M91 312h458" stroke="${palette.green}" stroke-width="6"/>
    <path d="M84 110c19 0 19 27 38 27s19-27 38-27 19 27 38 27" ${line}/><text x="242" y="340" fill="${palette.green}" font-family="Georgia" font-size="27">shared favourite</text>
  `],
  ["travel-calendar.svg", "Travel calendar", "07", `
    <rect x="106" y="96" width="428" height="232" rx="14" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="5"/>
    <path d="M106 153h428M190 96v42M450 96v42" ${line}/>
    <g fill="${palette.sand}"><rect x="137" y="181" width="78" height="48"/><rect x="231" y="181" width="78" height="48"/><rect x="325" y="181" width="78" height="48"/><rect x="419" y="181" width="78" height="48"/></g>
    <g fill="${palette.green}" font-family="Georgia" font-size="26" text-anchor="middle"><text x="176" y="214">1</text><text x="270" y="214">2</text><text x="364" y="214">3</text><text x="458" y="214">4</text></g>
    <path d="M151 266h130M151 288h204M392 272h74" ${greenLine}/>
  `],
  ["budget-planning.svg", "Travel budget planning", "08", `
    <rect x="84" y="104" width="472" height="214" rx="14" fill="${palette.sand}"/>
    <path d="M120 274V176M187 274v-62M254 274V147M321 274v-83M388 274v-117M455 274v-46" stroke="${palette.green}" stroke-width="20"/>
    <path d="M110 288h364" ${line}/><circle cx="485" cy="146" r="48" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="5"/>
    <text x="485" y="157" text-anchor="middle" fill="${palette.green}" font-family="Arial" font-size="31" font-weight="700">₹</text>
    <text x="86" y="349" fill="${palette.ink}" font-family="Georgia" font-size="28">₹37,600 → ₹38,000</text>
  `],
  ["luggage.svg", "Luggage and travel accessories", "09", `
    <rect x="170" y="122" width="205" height="202" rx="22" fill="${palette.clay}" stroke="${palette.ink}" stroke-width="5"/>
    <path d="M230 122V91h85v31M219 159v128M327 159v128" ${line}/><circle cx="216" cy="337" r="14" fill="${palette.ink}"/><circle cx="329" cy="337" r="14" fill="${palette.ink}"/>
    <path d="M421 188h89l-12 113h-65Z" fill="${palette.sand}" stroke="${palette.ink}" stroke-width="5"/><path d="M438 188c0-45 55-45 55 0" ${greenLine}/>
    <path d="M90 155h56l-7 64H97Z" fill="${palette.blue}" opacity=".5"/><path d="M103 155c0-29 30-29 30 0" ${line}/>
  `],
  ["passport-stamps.svg", "Passport stamps", "10", `
    <g transform="translate(102 105) rotate(-8 92 92)"><circle cx="92" cy="92" r="78" fill="${palette.sand}" stroke="${palette.green}" stroke-width="5"/><circle cx="92" cy="92" r="61" fill="none" stroke="${palette.green}" stroke-width="2" stroke-dasharray="4 6"/><text x="92" y="84" text-anchor="middle" fill="${palette.green}" font-family="Georgia" font-size="31">GOA</text><text x="92" y="111" text-anchor="middle" fill="${palette.green}" font-family="Arial" font-size="11" letter-spacing="3">15.6° N</text></g>
    <g transform="translate(350 116) rotate(7 90 75)"><rect x="0" y="0" width="180" height="150" rx="8" fill="none" stroke="${palette.clay}" stroke-width="6"/><path d="M21 29h138M21 119h138" stroke="${palette.clay}" stroke-width="3"/><text x="90" y="81" text-anchor="middle" fill="${palette.clay}" font-family="Arial" font-size="22" font-weight="700">ARRIVAL</text><text x="90" y="103" text-anchor="middle" fill="${palette.clay}" font-family="Arial" font-size="10">OCT 19 · 2026</text></g>
  `],
  ["boarding-pass.svg", "Boarding pass and travel ticket", "11", `
    <path d="M70 123h500v184H70c12-16 12-32 0-48 12-16 12-32 0-48 12-16 12-32 0-48 12-14 12-27 0-40Z" fill="${palette.sand}" stroke="${palette.ink}" stroke-width="5"/>
    <path d="M416 123v184" stroke="${palette.ink}" stroke-width="3" stroke-dasharray="8 8"/>
    <text x="104" y="165" fill="${palette.green}" font-family="Arial" font-size="12" font-weight="700" letter-spacing="3">YATRA AIR · BOARDING PASS</text>
    <text x="104" y="230" fill="${palette.ink}" font-family="Georgia" font-size="48">BOM → GOI</text><text x="104" y="268" fill="${palette.ink}" font-family="Arial" font-size="12">19 OCT · 08:30 · WINDOW 12A</text>
    <g stroke="${palette.green}" stroke-width="5"><path d="M453 160v105M469 160v105M488 160v105M506 160v105M529 160v105"/></g>
  `],
  ["postcard.svg", "Goa travel postcard", "12", `
    <rect x="82" y="91" width="476" height="244" rx="8" fill="${palette.paper}" stroke="${palette.ink}" stroke-width="5"/>
    <rect x="105" y="114" width="250" height="194" fill="${palette.blue}" opacity=".32"/><path d="M105 250c65-30 120 34 250-13v71H105Z" fill="${palette.sand}"/><circle cx="294" cy="162" r="31" fill="${palette.ochre}"/><path d="M181 246c-5-62 6-95 39-114M215 144c-33-13-55-6-69 15M217 143c24-21 49-22 74-7" ${line}/>
    <path d="M390 135h132M390 160h132M390 211h118M390 235h118M390 259h90" stroke="${palette.ink}" stroke-width="3"/>
    <rect x="475" y="112" width="52" height="43" fill="${palette.clay}"/>
  `],
  ["destination-markers.svg", "Destination markers", "13", `
    <path d="M102 300c52-38 100-37 145-10 70 41 121 31 179-8 46-31 80-25 112 8" stroke="${palette.sage}" stroke-width="12" fill="none"/>
    <g><path d="M135 122c-42 0-70 31-70 69 0 56 70 111 70 111s70-55 70-111c0-38-28-69-70-69Z" fill="${palette.green}"/><circle cx="135" cy="190" r="24" fill="${palette.paper}"/></g>
    <g transform="translate(238 -14)"><path d="M135 122c-42 0-70 31-70 69 0 56 70 111 70 111s70-55 70-111c0-38-28-69-70-69Z" fill="${palette.clay}"/><circle cx="135" cy="190" r="24" fill="${palette.paper}"/></g>
    <g transform="translate(405 15) scale(.75)"><path d="M135 122c-42 0-70 31-70 69 0 56 70 111 70 111s70-55 70-111c0-38-28-69-70-69Z" fill="${palette.ochre}"/><circle cx="135" cy="190" r="24" fill="${palette.paper}"/></g>
  `],
  ["itinerary-conflict.svg", "Itinerary timing conflict", "14", `
    <path d="M84 210h472" stroke="${palette.ink}" stroke-width="4"/>
    <circle cx="151" cy="210" r="25" fill="${palette.green}"/><circle cx="331" cy="210" r="25" fill="${palette.ochre}"/><circle cx="492" cy="210" r="25" fill="${palette.clay}"/>
    <path d="M151 174v-48M331 174v-48M492 174v-48" ${line}/>
    <text x="151" y="107" text-anchor="middle" fill="${palette.ink}" font-family="Arial" font-size="13">CAFÉ ENDS</text><text x="151" y="91" text-anchor="middle" fill="${palette.green}" font-family="Georgia" font-size="25">5:00</text>
    <text x="331" y="107" text-anchor="middle" fill="${palette.ink}" font-family="Arial" font-size="13">TRAVEL</text><text x="331" y="91" text-anchor="middle" fill="${palette.ochre}" font-family="Georgia" font-size="25">20 MIN</text>
    <text x="492" y="107" text-anchor="middle" fill="${palette.ink}" font-family="Arial" font-size="13">RESERVATION</text><text x="492" y="91" text-anchor="middle" fill="${palette.clay}" font-family="Georgia" font-size="25">5:00</text>
    <path d="M465 279h55l-28 49Z" fill="${palette.ochre}"/><text x="320" y="319" text-anchor="middle" fill="${palette.ink}" font-family="Georgia" font-size="27">You’re 20 minutes short.</text>
  `],
  ["final-travel-scene.svg", "Final illustrated Goa travel scene", "15", `
    <rect x="42" y="82" width="556" height="248" fill="${palette.blue}" opacity=".35"/>
    <circle cx="470" cy="153" r="49" fill="${palette.ochre}"/>
    <path d="M42 252c87-28 145 34 234 1 102-38 168 24 322-15v92H42Z" fill="${palette.sand}"/>
    <path d="M42 242c87-30 145 34 234 0 102-39 168 22 322-17" ${greenLine}/>
    <path d="M152 246c-7-73 11-125 57-157M202 104c-38-19-72-13-100 18M207 105c34-31 69-35 104-12M198 130c-28-3-53 8-75 33M213 129c29-10 57-4 84 17" ${line}/>
    <path d="M355 291c0-45 60-45 60 0M372 254v-45M397 254v-45M366 207h38" ${line}/>
    <path d="M327 304h123" stroke="${palette.green}" stroke-width="7"/>
    <text x="319" y="369" text-anchor="middle" fill="${palette.green}" font-family="Georgia" font-size="30">The journey continues.</text>
  `],
];

await mkdir("public/case-study/illustrations", { recursive: true });
for (const [file, title, number, body, background] of assets) {
  await writeFile(`public/case-study/illustrations/${file}`, art(title, number, body, background));
  console.log(file);
}
