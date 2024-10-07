import { useState, useEffect } from 'react';
import "./index.scss"
import { Chart } from "react-google-charts";
import { cloneDeep } from 'lodash';
function getWindowDimensions() {
  const { innerWidth: width, innerHeight: height } = window;
  return {
    width,
    height
  };
}

function useWindowDimensions() {
  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions());
  useEffect(() => {
    function handleResize() {
      setWindowDimensions(getWindowDimensions());
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);
  return windowDimensions;
}

const BFTokenmetricsTab = ({ data }) => {
  let newData = cloneDeep(data.tokenmetrics);
  // Temp fix
  if(newData.length === 10){
    newData = [
      data.tokenmetrics[7],
      data.tokenmetrics[0],
      data.tokenmetrics[1],
      data.tokenmetrics[2],
      data.tokenmetrics[3],
      data.tokenmetrics[4],
      data.tokenmetrics[5],
      data.tokenmetrics[6],
      data.tokenmetrics[8],
      data.tokenmetrics[9],
    ]
  }
  const table = newData.map((item) => [
    item.name,
    {
      v: item.data,
      f: `${item.data}%`,
    }
  ])
  const { width } = useWindowDimensions();

  const options = {
    backgroundColor: "transparent",
    colors: ["#FCFC06", "#ebeb04", "#dada02", "#ebeb04", "#c1c102", "#a8a802", "#979700", "#717101"],
    chartArea:{
      height: "100%",
      width: width > 991 ? '80%' : "90%",
    },
    titleTextStyle: {
      color: "white",
      fontName: "Plateia, sans-serif"
    },
    pieSliceText: 'none',
    legend: {
      position: width > 767 ? 'labeled' : "bottom",
      labeledValueText: 'value', 
      textStyle: {
        color: "white",
        fontName: "Space Mono, sans-serif",
        fontSize: width > 767 ? "12px" : "8px"
      }
    },
    tooltip: {
      text: 'value'
    },
    is3D: true,
  };

  return <div className="bf-tokenmetrics">
    <Chart
      chartType="PieChart"
      data={[["Name", "Value"], ...table]}
      options={options}
      width={"100%"}
      height={"250px"}
      className="chart"
      formatters={[
        {
          type: "NumberFormat",
          column: 1,
          options: {
            fractionDigits: 2,
            suffix: "%",
            negativeParens: false,
          }
        }
      ]}
    />
  </div>
}
export default BFTokenmetricsTab