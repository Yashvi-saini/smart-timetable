import { SectionEvent } from "./types";

export interface EventLayout {
    left: number; 
    width: number; 
    top: number; 
    height: number; 
}

export function computeEventLayouts(
    sections: SectionEvent[],
    dayStartHour: number = 8
): Record<string, EventLayout> {
   
    const days: Record<string, SectionEvent[]> = {};
    sections.forEach((s) => {
        const dateKey = new Date(s.startTime).toDateString();
        if (!days[dateKey]) days[dateKey] = [];
        days[dateKey].push(s);
    });

    const layouts: Record<string, EventLayout> = {};

    Object.values(days).forEach((daySections) => {
        
        daySections.sort((a, b) => {
            const startA = new Date(a.startTime).getTime();
            const startB = new Date(b.startTime).getTime();
            if (startA !== startB) return startA - startB;
            const durA = new Date(a.endTime).getTime() - startA;
            const durB = new Date(b.endTime).getTime() - startB;
            return durB - durA;
        });

        const clusters: SectionEvent[][] = [];
        let currentCluster: SectionEvent[] = [];
        let clusterEnd = 0;

        daySections.forEach((s) => {
            const start = new Date(s.startTime).getTime();
            const end = new Date(s.endTime).getTime();

            if (currentCluster.length === 0) {
                currentCluster.push(s);
                clusterEnd = end;
            } else {
                if (start < clusterEnd) {
                    currentCluster.push(s);
                    clusterEnd = Math.max(clusterEnd, end);
                } else {
                    clusters.push(currentCluster);
                    currentCluster = [s];
                    clusterEnd = end;
                }
            }
        });
        if (currentCluster.length > 0) clusters.push(currentCluster);

        clusters.forEach((cluster) => {
            placeCluster(cluster, layouts, dayStartHour);
        });
    });

    return layouts;
}

function placeCluster(
    cluster: SectionEvent[],
    layouts: Record<string, EventLayout>,
    dayStartHour: number
) {
   
    const columns: SectionEvent[][] = [];

    cluster.forEach((event) => {
        let placed = false;
        const eventStart = new Date(event.startTime).getTime();

        for (let i = 0; i < columns.length; i++) {
            const col = columns[i];
            const lastInCol = col[col.length - 1];
            const lastEnd = new Date(lastInCol.endTime).getTime();

            if (eventStart >= lastEnd) {
                col.push(event);
                placed = true;
                break;
            }
        }

        if (!placed) {
            columns.push([event]);
        }
    });

    const numCols = columns.length;
    const colWidth = 100 / numCols;

    columns.forEach((col, colIndex) => {
        col.forEach((event) => {
            const start = new Date(event.startTime);
            const end = new Date(event.endTime);

            const baseDate = new Date(start);
            baseDate.setHours(dayStartHour, 0, 0, 0);

            const topMinutes = (start.getTime() - baseDate.getTime()) / 60000;
            const heightMinutes = (end.getTime() - start.getTime()) / 60000;

            layouts[event.id] = {
                left: colIndex * colWidth,
                width: colWidth,
                top: topMinutes,
                height: heightMinutes,
            };
        });
    });
}
