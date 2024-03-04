import './Chart.css';
import "chart.js/auto";
import { Bar, Line } from "react-chartjs-2";
import { useState, useEffect, useContext } from 'react';
import { selectedLandPlotContext } from '../../pages/LandPlots';
import fetchLandPlotsData from '../../CustomHooks/FetchData.js';

       
function Chart(){

  const [plotData, setPlotData] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchLandPlotsData();
        console.log("Fetched data:", data);
        setPlotData(processApiData(data));
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
  
    fetchData();
  }, []);

  const processApiData = (apiData) => {
    const monthIndices = {
      "01": 0, "02": 1, "03": 2, "04": 3, "05": 4, "06": 5,
      "07": 6, "08": 7, "09": 8, "10": 9, "11": 10, "12": 11
      
    };
  
    const plotData = {};
  
    apiData.forEach(dataEntry => {
      const plot = dataEntry.Plot;
      const month = dataEntry.Date.value.slice(5, 7);
      const monthIndex = monthIndices[month];
  
      if (!plotData[plot]) {
        plotData[plot] = {
          temperature: Array(12).fill(0),
          moisture: Array(12).fill(0),
          phLevel: Array(12).fill(0),
          sunlight: Array(12).fill(0),
        };
      }
  
      plotData[plot].temperature[monthIndex] += dataEntry.Temp_C;
      plotData[plot].moisture[monthIndex] += dataEntry.AVG_Humidity__;
      plotData[plot].phLevel[monthIndex] += dataEntry.PH;
      plotData[plot].sunlight[monthIndex] += dataEntry.AVG_Light__;
    });
  
    // Calculate the average for each month
    for (const plot in plotData) {
      for (let i = 0; i < 12; i++) {
        plotData[plot].temperature[i] /= plotData[plot].counts[i];
        plotData[plot].moisture[i] /= plotData[plot].counts[i];
        plotData[plot].phLevel[i] /= plotData[plot].counts[i];
        plotData[plot].sunlight[i] /= plotData[plot].counts[i];
      }
    }
  
    return plotData;
  };

  
  const labels = ["January", "February", "March", "April", "May", "June","July","August","September","October","November","December"];
  
  // Initializes states for selected outcomes
  const {selectedLandPlot, setSelectedLandPlot} = useContext(selectedLandPlotContext);
  const [selectedOutcome, setSelectedOutcome] = useState('Temperature'); 
  const [selectedChartType, setSelectedChartType] = useState('Bar') 
  
  const dataForTemperature = {
    labels: labels,
    datasets: [
      {
        label: `Temperature - Plot ${selectedLandPlot}`, 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: plotData && plotData[selectedLandPlot] ? plotData[selectedLandPlot].temperature : Array(12).fill(0),
        borderWidth: 2
      },
    ],
  };

  const dataForMoisture = {
    labels: labels,
    datasets: [
      {
        label: `Moisture - Plot ${selectedLandPlot}`, 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: plotData && plotData[selectedLandPlot] ? plotData[selectedLandPlot].moisture : Array(12).fill(0),
        borderWidth: 2
      },
    ],
  };

  const dataForPHLevel = {
    labels: labels,
    datasets: [
      {
        label: `PH Level - Plot ${selectedLandPlot}`, 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: plotData && plotData[selectedLandPlot] ? plotData[selectedLandPlot].phLevel : Array(12).fill(0),
        borderWidth: 2
      },
    ],
  };

  const dataForSunlight = {
    labels: labels,
    datasets: [
      {
        label: `Sunlight - Plot ${selectedLandPlot}`, 
        backgroundColor: 'rgba(54, 162, 235, 1)',
        borderColor: "rgba(54, 162, 235, 1)",
        data: plotData && plotData[selectedLandPlot] ? plotData[selectedLandPlot].sunlight : Array(12).fill(0),
        borderWidth: 2
      },
    ],
  };

  const handleOutcomeChange = (event) => {
    setSelectedOutcome(event.target.value); // Update the outcome when user changes dropdown
  };

  const handleChartTypeChange = (event) => {
    setSelectedChartType(event.target.value); // Updates the type of chart shown when user changes the outcome
  }

  let data = {}; // Define a data variable based on the selected outcome

  if (selectedOutcome === 'Temperature') {
    data = dataForTemperature;
  } else if (selectedOutcome === 'Moisture') {
    data = dataForMoisture;
  } else if (selectedOutcome === 'PH Level') {
    data = dataForPHLevel;
  } else if (selectedOutcome === 'Sunlight') {
    data = dataForSunlight;
  }

  const ChartComponent = selectedChartType === 'Bar' ? Bar : Line;

  return (
    <div className = "chart">
      <div className="dropdowns">
        <select value={selectedOutcome} onChange={handleOutcomeChange}>
          <option value="Temperature">Temperature</option>
          <option value="Moisture">Moisture</option>
          <option value="PH Level">PH Level</option>
          <option value="Sunlight">Sunlight</option>
        </select>
        <select value={selectedChartType} onChange={handleChartTypeChange}>
          <option value="Bar">Bar Chart</option>
          <option value="Line">Line Chart</option>
        </select>
      </div>
      <ChartComponent data={data} />
    </div>
  );


};

  
export default Chart;