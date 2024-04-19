export interface MapProps {
  data: {
    id: number;
    toaDo: string;
    ten: string;
    // Add other properties as needed based on your data structure
  }[];
  selectedMarkerId: number | null; // Include the 'selectedMarkerId' property
}