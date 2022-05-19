import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {UseNavigate} from'react-router-dom'
import {
  Container,
  LinearProgress,
  ThemeProvider,
  Typography,
  TableContainer,
  Paper,
} from "@material-ui/core";

import { useNavigate  } from "react-router-dom";
import { Autocomplete } from '@material-ui/lab';
import SearchComponent from './SearchComponent';
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const Homepage = () => {
  const navigate= useNavigate();

  const [stocks, setStocks] = useState([]);
  const [loading, setLoading] = useState(false);
  const getData = (coins=[]) => {
    if(localStorage.getItem('token')){
      setLoading(true)
       axios.get( `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false&ids=${coins.join(',')}`)
       .then(result => {
           setStocks(result.data)
       })
       setLoading(false)}
       else{
         navigate('/Login')
       }
  }
     useEffect(() => {
      getData();
    },[]);
    const useStyles = makeStyles({
      row: {
        backgroundColor: "#ffffff",
        cursor: "pointer",
        "&:hover": {
          backgroundColor: "#72737B",
        },
        fontFamily: "Montserrat",
      },
      pagination: {
        "& .MuiPaginationItem-root": {
          color: "gold",
        },
      },
    });
    
    
    const classes = useStyles();
    
    return (
      <ThemeProvider>
      <Container style={{ textAlign: "center" }}>
        <Typography
          variant="h4"
          style={{ margin: 18, fontFamily: "Montserrat" }}
        >
          Cryptocurrency Prices by Market Cap
        </Typography>

        <SearchComponent
          url="https://api.coingecko.com/api/v3/search?query="
          dataString="coins"
          onSelection={(values) => getData(values.map((ele)=> ele.id))}
        ></SearchComponent>
      
        <TableContainer component={Paper}>
          {loading ? (
            <LinearProgress style={{ backgroundColor: "gold" }} />
          ) : (
            
     <div className="-my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
       <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
         <div className="shadow overflow-hidden border-b border-gray-200 sm:rounded-lg">
           <table className="min-w-full divide-y divide-gray-200">
             <thead className="bg-gray-50">
               <tr>
                 <th
                   scope="col"
                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                 >
                   Name
                 </th>
                 <th
                   scope="col"
                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                 >
                   Price
                 </th>
                 <th
                   scope="col"
                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                 >
                   Change in 24 hr
                 </th>
                 
                 
               </tr>
             </thead>
             <tbody className="bg-white divide-y divide-gray-200">
               {stocks?.map((stock) => (
                 <tr 
                 onClick={() => navigate(`/coins/${stock.id}`)}
                 className={classes.row}
                 key={stock.name}>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10">
                         <img className="h-10 w-10 rounded-full" src={stock.image} alt="" />
                       </div>
                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">{stock.name}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="text-sm text-gray-900">£ {stock.current_price}</div>
                   </td>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                       {stock.price_change_percentage_24h} %
                     </span>
                   </td>
                   
                 </tr>
               ))}
             </tbody>
           </table>
         </div>
       </div>
     </div>
   
          )}
        </TableContainer>

        {/* Comes from @material-ui/lab */}
        
      </Container>
      </ThemeProvider>
    );
}

export default Homepage;
