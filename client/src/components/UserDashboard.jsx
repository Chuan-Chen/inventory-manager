import styled from "styled-components"
import { useEffect, useState } from "react";
import { authSlice } from "../features/authSlice";
import { useDispatch } from "react-redux";
import Chart from 'chart.js/auto';
import Global from "../styles/Global";
import API from "../features/api"


const Page = styled.div`
    ${Global.Animations.SlideInTop};
    display: flex;
    height: 100%;
    width: 100%;
    align-items: center;
    justify-content: center;
    position: relative;

`

const Graph = styled.canvas`
  ${Global.Animations.TextFocusIn};
  max-height: 300px;
  max-width: 300px;
  flex: 1;
`
const GraphBtn = styled.button`
  position: absolute;
  transform: translate(0, -50%)
  z-index: 2;
  background: none;
  border: 1px solid black;
  border-radius: 3px;
  cursor: pointer;
  font-weight: bold;
  height: 32px;
      width: 32px;
      background-color: #fcfbff;
      border: none;
      border-radius: 4px;
      font-size: 1.2em;
      display: grid;
      justify-content: center;
      font-family: 'Martian Mono', monospace;
      align-items: center;
      cursor: pointer;  
      justify-self: start;
      align-self: center;
      box-shadow: 0px 15px 35px -5px rgba(50, 88, 130, 0.32);
      transition: background-color 0.3s linear;
      &:hover{
          box-shadow: 0px 15px 35px -5px rgba(23, 53, 87, 0.59);
          background: #1f202a;
          color: white;
          text-shadow: 0px 0px 10px white;
      }

`
const Title = styled.div`
  position: absolute;
  top: 10px;
`

/*

*/
export default function UserDashboard({type}){
  const dispatch = useDispatch();
  const [info, setinfo] = useState({
    "loaded" : false
  });
  
  const [Items, setItems] = useState([])
  const [display, setDisplay] = useState(0);
  const [totalGraphs, setTotalGraphs] = useState(0);
  const [months, setMonths] = useState(["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"])
  const getData = async () => {
    const param = {
      "Username": "123"
    };
  
  const options = {
      method: "POST",
      headers: {
          "Content-Type": "application/json"
      },
      body: JSON.stringify(param),
  };
    const stats = await fetch(API.SERVER+"/api/stats/user", options);
    const statsData = await stats.json();
    
    setinfo({...statsData , "loaded" : true})
    setItems(statsData.data.Items.ItemsCreatedByDate.map(item => {
      return {
        year: item._id,
        month: item.months.map(month => {
          return month.month;
        }),
        count: item.months.map(month => {
          return month.itemCount;
        }),
      };
    }))
    setTotalGraphs(2);
  }


  const next = (e) => {
    if(display < totalGraphs - 1){
      console.log(totalGraphs)
      setDisplay(display + 1)
    }
    

  }

  const prev = (e) => {
    if(display > 0){
      setDisplay(display - 1)
    }
  }

  useEffect(()=>{
    dispatch(authSlice.actions.checkToken());
    if(!info.loaded){
      getData();
    }else{
      if(type === "user" || undefined){
        /** 
        new Chart("general", {
          type: 'doughnut',
          data: {
            labels: ['Total Users', "Total Items"],
            datasets: [{
              label: 'TotalUsers',
              data: [info.data.Users.TotalUsers, info.data.Items.TotalItems],
              borderWidth: 1
            }]
          }
        });*/
        for(let i = 0; i < Items.length; i++){
          new Chart("stats" + i, {
            type: 'line',
            data: {
              //.map(eachmonth => {return months[Number(eachmonth)-1]})
              labels: (Items[i].month).map(eachmonth => {return months[Number(eachmonth)-1]}),
              datasets: [{
                label: 'Items Created in ' + Items[i].year + " by " + info.data.User.Username,
                data: Items[i].count,
                borderWidth: 1
              }]
            },
            options: {
              scales: {
                y: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Item Count"
                  }
                },
                x: {
                  beginAtZero: true,
                  title: {
                    display: true,
                    text: "Month"
                  }
                }
                
              }
            },
          });
      }
      }else{
  
        "";
      
      }
      }
      /**
            if(Chart.getChart("user")) {
        Chart.getChart("user")?.destroy()
        
      }
       */
    return () => {
      if(type === "user" || undefined){
        Chart.getChart("general")?.destroy()
        for(let i = 0; i < Items.length; i++){
          Chart.getChart("stats"+i)?.destroy();
        }
      }else{
        "";
      }

    }
  },[info])
//<button onClick={()=>{getData()}}>refresh</button>
      return (
      <Page>
          <Title>User Statistics</Title>
          <GraphBtn onClick={next} style = {{top: "50%", right: "6px"}}>{">"}</GraphBtn>
          <GraphBtn onClick={prev} style = {{top: "50%", left: "6px"}}>{"<"}</GraphBtn>
         
          {Items.map((item, index)=>{
            return <Graph key = {index} id = {"stats" + index} style = {{display: display == index ? "block" : "none" }}></Graph>
          })}
      </Page>
      )
}