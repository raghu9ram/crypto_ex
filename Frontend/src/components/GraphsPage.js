import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import ReactHtmlParser from "react-html-parser";
import { LinearProgress, makeStyles, Typography, CircularProgress,
    createTheme,
    ThemeProvider, } from "@material-ui/core";
import SelectButton from "./SelectButton";

import { chartDays } from "../config/data";
import { Chart as ChartJS, registerables } from 'chart.js';
import { Chart , Line} from 'react-chartjs-2'
ChartJS.register(...registerables);
const Graphspage = () => {
    const {id} = useParams()
    const [stock,setStocks] = useState()
    const [days, setDays] = useState(1);
    const [historicData, setHistoricData] = useState();
  const [flag,setflag] = useState(false);


    console.log(stock)
    console.log("stock",historicData)
    useEffect(() => {
         axios.get( `https://api.coingecko.com/api/v3/coins/${id}`)
         .then(result => {
             setStocks(result.data)
         })
     },[])
     const fetchHistoricData = async () => {
        const { data } = await axios.get(`https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=gbp&days=${days}`);
        setflag(true);
        setHistoricData(data.prices);
      };
    
      console.log(stock);
    
      useEffect(() => {
        fetchHistoricData();
      }, [days]);

const useStyles = makeStyles((theme) => ({
    container: {
      display: "flex",
      [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        alignItems: "center",
      },
    },
    sidebar: {
      width: "30%",
      [theme.breakpoints.down("md")]: {
        width: "100%",
      },
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      marginTop: 25,
      borderRight: "2px solid grey",
    },
    heading: {
      fontWeight: "bold",
      marginBottom: 20,
      fontFamily: "Montserrat",
    },
    description: {
      width: "100%",
      fontFamily: "Montserrat",
      padding: 25,
      paddingBottom: 15,
      paddingTop: 0,
      textAlign: "justify",
    },
    marketData: {
      alignSelf: "start",
      padding: 25,
      paddingTop: 10,
      width: "100%",
      [theme.breakpoints.down("md")]: {
        display: "flex",
        justifyContent: "space-around",
      },
      [theme.breakpoints.down("sm")]: {
        flexDirection: "column",
        alignItems: "center",
      },
      [theme.breakpoints.down("xs")]: {
        alignItems: "start",
      },
    },
    graph: {
        width: "75%",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 25,
        padding: 40,
        [theme.breakpoints.down("md")]: {
          width: "100%",
          marginTop: 0,
          padding: 20,
          paddingTop: 0,
        },
      },
  }));
  const darkTheme = createTheme({
    palette: {
      primary: {
        main: "#CFD0DC",
      },
      type: "dark",
    },
  });
const classes = useStyles()

    return (
        <div className = {classes.container}> 
        <div className={classes.sidebar}>
        <img
          src={stock?.image.large}
          alt={stock?.name}
          height="200"
          style={{ marginBottom: 20 }}
        />
        <Typography variant="h3" className={classes.heading}>
          {stock?.name}
        </Typography>
        <Typography variant="subtitle1" className={classes.description}>
        {ReactHtmlParser(stock?.description.en.split(". ")[0])}. 
        </Typography>
       
        </div>
        
        <ThemeProvider theme={darkTheme}>
      <div className={classes.graph}>
        {!historicData | flag===false ? (
          <CircularProgress
            style={{ color: "gold" }}
            size={250}
            thickness={1}
          />
        ) : (
          <>
            <Line
              data={{
                labels: historicData.map((stock) => {
                  let date = new Date(stock[0]);
                  let time =
                    date.getHours() > 12
                      ? `${date.getHours() - 12}:${date.getMinutes()} PM`
                      : `${date.getHours()}:${date.getMinutes()} AM`;
                  return days === 1 ? time : date.toLocaleDateString();
                }),

                datasets: [
                  {
                    data: historicData.map((stock) => stock[1]),
                    label: `Price ( Past ${days} Days ) in GBP`,
                    borderColor: "#CFD0DC",
                  },
                ],
              }}
              options={{
                elements: {
                  point: {
                    radius: 1,
                  },
                },
              }}
            />
            <div
              style={{
                display: "flex",
                marginTop: 20,
                justifyContent: "space-around",
                width: "100%",
              }}
            >
              {chartDays.map((day) => (
                <SelectButton
                  key={day.value}
                  onClick={() => {setDays(day.value);
                    setflag(false);
                  }}
                  selected={day.value === days}
                >
                  {day.label}
                </SelectButton>
              ))}
            </div>
          </>
        )}
      </div>
    </ThemeProvider>
        
           
        </div>
    );
}

export default Graphspage;
