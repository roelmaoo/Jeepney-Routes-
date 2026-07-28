export interface Lugar {
  id: string;
  name: string;
  description: string;
  active: boolean;
  color: string;
  route: [number, number][];
}

export interface PlaceSuggestion {
  id: string;
  label: string;
  area: string;
  description: string;
  keywords: string[];
  routeIds: string[];
}

export const ILOILO_ROUTES: Lugar[] = [
  {
    id: "1",
    name: "CALAPARAN CALUMPANG – ILOILO CITY PROPER",
    description: "Villa Plaza to City Proper via Calumpang Loop",
    active: false,
    color: "#2563eb",
    route: [
      [10.68706300207493, 122.51663000695484],
      [10.680269053153129, 122.5174440483621],
      [10.6806464316484, 122.52866332819629],
      [10.681742148362089, 122.53825771083959],
      [10.688300985185341, 122.54782916144455],
      [10.691484601668837, 122.54939910290204],
      [10.692054888360195, 122.54934599787796],
      [10.692536659417403, 122.55467291399442],
      [10.693709649524449, 122.55660224053007],
      [10.693254499320306, 122.55869245495843],
      [10.696416387263763, 122.56901043009681],
    ],
  },
  {
    id: "2",
    name: "MOLO – CITY PROPER",
    description: "Molo to City Proper via Baluarte Loop",
    active: false,
    color: "#f97316",
    route: [
      [10.69700209054978, 122.54616519655104],
      [10.695983701267465, 122.54447138864825],
      [10.694458469266307, 122.54564476034217],
      [10.692470006322731, 122.54776279576502],
      [10.691994534111217, 122.54886035632173],
      [10.692319374651944, 122.55043531699248],
      [10.692514918444681, 122.55437402686552],
      [10.692794162009735, 122.55523605268148],
      [10.694491960373366, 122.55502668963302],
      [10.694611773304414, 122.55512339591132],
      [10.693881469918328, 122.55613358019362],
      [10.693348941862457, 122.55868128899712],
      [10.696479853593264, 122.56890787331984],
      [10.696291470628495, 122.56910860926524],
      [10.692050835337572, 122.56911750116232],
      [10.692095780043426, 122.57069986182923],
      [10.691673503721566, 122.5736096351175],
      [10.691844962471302, 122.57377274342959],
      [10.69271167078527, 122.57292226691625],
      [10.693279396145195, 122.5720550760727],
      [10.69390683166693, 122.57098050877536],
      [10.694767854343008, 122.57048432543024],
      [10.696668223437454, 122.56905621137868],
      [10.701333546970256, 122.56904210753983],
      [10.701576019207973, 122.56876107230443],
      [10.700356854499148, 122.56041829120835],
      [10.699932641596803, 122.55588010073537],
      [10.69916204312447, 122.54996978188572],
      [10.697052361514242, 122.54622377821411],
      [10.69850010444231, 122.54567811089714],
      [10.697322856660715, 122.5434000276967],
      [10.69596853529839, 122.54445156061757],
      [10.694465411687125, 122.54559288422968],
      [10.692422083255428, 122.54782575346174],
      [10.69198527124752, 122.54879317315262],
      [10.692057360709263, 122.54936731954989],
      [10.692297095771892, 122.55046450710259],
      [10.69250925834407, 122.554592069544],
      [10.692810152855767, 122.55537035688253],
      [10.693679067326022, 122.55659006480411],
      [10.69327787572917, 122.55864423293099],
      [10.696415474581931, 122.56901188248352],
      [10.692012741312237, 122.56905445811914],
      [10.691121504245675, 122.56903177713187],
    ],
  },
  {
    id: "3",
    name: "MOHON – ILOILO CITY PROPER",
    description: "Mohon to City Proper Loop",
    active: false,
    color: "#10b981",
    route: [
      [10.68706300207493, 122.51663000695484],
      [10.680269053153129, 122.5174440483621],
      [10.6806464316484, 122.52866332819629],
      [10.681742148362089, 122.53825771083959],
      [10.688300985185341, 122.54782916144455],
      [10.691484601668837, 122.54939910290204],
      [10.692054888360195, 122.54934599787796],
      [10.692536659417403, 122.55467291399442],
      [10.693709649524449, 122.55660224053007],
      [10.693254499320306, 122.55869245495843],
      [10.696416387263763, 122.56901043009681],
    ],
  },
];

export const ILOILO_PLACES: PlaceSuggestion[] = [
  {
    id: "city-proper",
    label: "Iloilo City Proper",
    area: "Downtown Iloilo",
    description: "Best for downtown offices, markets, old CBD, and transfer points.",
    keywords: ["city proper", "downtown", "iloilo city", "central market", "cbd", "jm basa", "plaza libertad"],
    routeIds: ["1", "2", "3"],
  },
  {
    id: "molo-plaza",
    label: "Molo Plaza",
    area: "Molo District",
    description: "Use the Molo line for plaza, church, Baluarte, and nearby streets.",
    keywords: ["molo", "molo plaza", "molo church", "baluarte", "molo mansion"],
    routeIds: ["2"],
  },
  {
    id: "baluarte",
    label: "Baluarte",
    area: "Molo District",
    description: "Served by the Molo–City Proper route loop.",
    keywords: ["baluarte", "molo baluarte", "baluarte loop"],
    routeIds: ["2"],
  },
  {
    id: "villa-plaza",
    label: "Villa Plaza",
    area: "Arevalo / Villa",
    description: "Take Calaparan Calumpang or Mohon routes toward City Proper.",
    keywords: ["villa", "villa plaza", "arevalo", "villa beach"],
    routeIds: ["1", "3"],
  },
  {
    id: "calumpang",
    label: "Calumpang",
    area: "Molo / Villa side",
    description: "Served by the Calaparan Calumpang route to City Proper.",
    keywords: ["calumpang", "calaparan", "calumpang loop"],
    routeIds: ["1"],
  },
  {
    id: "mohon-terminal",
    label: "Mohon Terminal",
    area: "Arevalo",
    description: "Board the Mohon–Iloilo City Proper loop from the terminal area.",
    keywords: ["mohon", "mohon terminal", "terminal", "transport terminal"],
    routeIds: ["3"],
  },
];
