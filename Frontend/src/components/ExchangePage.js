import React, {useState,useEffect} from 'react';
import axios from 'axios';
import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  LinearProgress,
  ThemeProvider,
  Typography,
  TableContainer,
  Paper,
  TablePagination,
} from "@material-ui/core";

import { useNavigate  } from "react-router-dom";
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}
const ExchangePage = () => {
  const navigate= useNavigate();

  const [exchanges, setExchanges] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState(null);
  const getData = (pageNumber, perPage=25) => {
    if(localStorage.getItem('token')){
        setLoading(true)
         axios.get( `https://api.coingecko.com/api/v3/exchanges?page=${pageNumber}&per_page=${perPage}`)
         .then(result => {
             setExchanges(result.data);
             setPagination({
                 count: Number(result.headers['total']),
                 rowsPerPage: Number(result.headers['per-page']),
                 page:pageNumber
            });
         })
         setLoading(false)}
         else{
           navigate('/Login')
         }
  }
     useEffect(() => {
      getData(1);
    },[])
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
          Cryptocurrency Exchanges
        </Typography>
      
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
                   Website
                 </th>
                 <th
                   scope="col"
                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                 >
                   Country
                 </th>
                
                 <th
                   scope="col"
                   className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                 >
                   Trust Rank
                 </th>
                 
                 
               </tr>
             </thead>
             <tbody className="bg-white divide-y divide-gray-200">
               {exchanges?.map((exchange) => (
                 <tr 
                 onClick={() => navigate(`#`)}
                 className={classes.row}
                 key={exchange.name}>
                   <td className="px-6 py-4 whitespace-nowrap">
                     <div className="flex items-center">
                       <div className="flex-shrink-0 h-10 w-10">
                         <img className="h-10 w-10 rounded-full" src={exchange.image} alt="" />
                       </div>
                       <div className="ml-4">
                         <div className="text-sm font-medium text-gray-900">{exchange.name}</div>
                       </div>
                     </div>
                   </td>
                   <td className="px-6 py-4 text-left whitespace-nowrap">
                     <a href={exchange.url} target="_blank" rel="noreferrer">{exchange.url}</a>
                   </td>
                   <td className="px-6 py-4 text-left whitespace-nowrap">
                     {exchange.country}
                   </td>
                  
                   <td className="px-6 py-4 text-left">
                    {exchange.trust_score_rank}
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

        {pagination && <TablePagination
            component={Paper}
            count={pagination.count}
            page={pagination.page-1}
            rowsPerPage={pagination.rowsPerPage}
            onPageChange={(e, page) => {
                getData(page+1);
            }}
            onRowsPerPageChange={(e) => {
                getData(pagination.page, e.target.value)
            }}
        ></TablePagination>}

        {/* Comes from @material-ui/lab */}
        
      </Container>
      </ThemeProvider>
    );
}

export default ExchangePage;
