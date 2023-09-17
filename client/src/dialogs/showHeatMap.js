import { HeatMapFunctionality } from '../heatMaps/heatMaps';

const heatMapFunctionality = new HeatMapFunctionality();

export const showHeatMapFunction = async () => {
    await heatMapFunctionality.showHeatMap(async () => {},
    () => { alert("התרחשה שגיאה בשליפת נתוני ההיסטוריה"); });
    let heatMapTable = document.getElementById("heatMapTable");
}