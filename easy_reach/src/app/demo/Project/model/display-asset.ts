export interface DisplayAsset {

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
        assetCount?: number | null;
        lastUpdateOn?: Date | null;
        detectedOn?: Date | null;
        status?: string | null;
        timeSpend?: string | null;
        movedOn?: Date | null;
}



