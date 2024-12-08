import styled from "styled-components"
import { useEffect, useState } from "react";
import { authSlice } from "../../features/authSlice";
import { useDispatch } from "react-redux";
import Chart from 'chart.js/auto';
import Global from "../../styles/Global";
const Page = styled.div`
    ${Global.Animations.SlideInTop};
    width: 400px;
    display: grid;
    align-items: center;
    justify-content: center;
`
/*

*/
export default function Dashboard(){
  const dispatch = useDispatch();
  const [chartCount, setChartCount] = useState(1);

  const [graph, setGraph] = useState([<canvas id = "chart1"></canvas>, <canvas id = "chart2"></canvas>])

  const next = () => {
    if(chartCount >= 0 && chartCount < graph.length-1){
      console.log("next")
      setChartCount(chartCount + 1);
    } 
  }

  const previous = () => {
    if(chartCount > 0 && chartCount <= graph.length-1){
      console.log("previous")
      setChartCount(chartCount - 1);
    }
  }



  useEffect(()=>{
    dispatch(authSlice.actions.checkToken());

      new Chart(document.getElementById('chart1'), {
        type: 'bar',
        data: {
          labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
          datasets: [{
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
            borderWidth: 1
          }]
        },
        options: {
          scales: {
            y: {
              beginAtZero: true
            }
          }
        }
      });
  },[])
    return (
        <Page>
          <canvas id = {"chart1"}></canvas>

        </Page>
    )
}