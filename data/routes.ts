export interface Lugar {
  id: string;
  name: string;
  description: string;
  coords: [number, number]; // [lat, lng]
}

export const ILOILO_ROUTES: Lugar[] = [
  {
    id: "1",
    name: "CALAPARAN CALUMPANG – ILOILO CITY PROPER",
    description: "ROUTE 2 VILLA PLAZA TO CITY PROPER VIA CALUMPANG LOOP",
    coords: [10.7202, 122.5621],
  },
];
