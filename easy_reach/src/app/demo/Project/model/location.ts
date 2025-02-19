export interface Location {
    locationId: number;
    siteId: number;
    siteName: string;
    locationName: string;
    locationTag: string;
    latitude: number;
    longitude: number;
    areaId: number;
    areaName: string;
    areaTags: string;
    assetCount: number;
    lastUpdateOn: string | null; // ISO date string
    detectedOn: string | null;   // ISO date string or null
    status: string | null;       // Status if available
    timeSpend: string | null;    // Time spent if applicable
    movedOn: string | null; 
}
