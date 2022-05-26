import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import { UseNavigate } from "react-router-dom";
import {
  Container,
  LinearProgress,
  ThemeProvider,
  Typography,
  TableContainer,
  Paper,
} from "@material-ui/core";
import {
  TwitterIcon,
  TwitterShareButton,
  WhatsappIcon,
  WhatsappShareButton,
  LinkedinIcon,
  LinkedinShareButton,
} from "react-share";

import { useNavigate } from "react-router-dom";
export function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export default function Portfolio() {
  const navigate = useNavigate();

  const [stocks, setStocks] = useState([]);
  const [favourites, setFavourites] = useState(
    JSON.parse(localStorage.getItem("favourites")) ?? []
  );
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setLoading(true);
      axios
        .get(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=gbp&order=market_cap_desc&per_page=100&page=1&sparkline=false`
        )
        .then((result) => {
          setStocks(result.data);
        });
      setLoading(false);
    } else {
      navigate("/Login");
    }
  }, []);
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
  const handleSubmit = async (e) => {
    if (favourites.includes(e)) {
      var fav = favourites.filter((d) => d !== e).map((d) => d);
    } else {
      fav = [...favourites, e];
    }
    const response = await fetch("https://expressapp111.herokuapp.com/api/auth/update", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        _id: localStorage.getItem("_id"),
        favourites: fav,
      }),
    });
    const json = await response.json();
    setFavourites(json.favourites);
    console.log(json);
    localStorage.setItem("favourites", JSON.stringify(json?.favourites));
  };
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
                      {stocks
                        ?.filter((d) => favourites.includes(d?.id))
                        .map((stock) => (
                          <tr
                            onClick={() => navigate(`/coins/${stock.id}`)}
                            className={classes.row}
                            key={stock.name}
                          >
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-10 w-10">
                                  <img
                                    className="h-10 w-10 rounded-full"
                                    src={stock.image}
                                    alt=""
                                  />
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                    {stock.name}
                                  </div>
                                </div>
                                <div className="ml-4">
                                  <div className="text-sm font-medium text-gray-900">
                                  
                                    <TwitterShareButton
                                      title={"Here is My favorite stock"}
                                      url={window.location.href}
                                      quote={stock.name}
                                      style={{ paddingLeft: "5px" }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <TwitterIcon size={32} round />
                                    </TwitterShareButton>
                                    <WhatsappShareButton
                                      title={"Here is My favorite stock"}
                                      url={window.location.href}
                                      quote={stock.name}
                                      style={{ paddingLeft: "5px" }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <WhatsappIcon size={32} round />
                                    </WhatsappShareButton>
                                    <LinkedinShareButton
                                      title={"Here is My favorite stock"}
                                      url={window.location.href}
                                      quote={stock.name}
                                      style={{ paddingLeft: "5px" }}
                                      onClick={(e) => e.stopPropagation()}
                                    >
                                      <LinkedinIcon size={32} round />
                                    </LinkedinShareButton>
                                  </div>
                                </div>
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <div className="text-sm text-gray-900">
                                £ {stock.current_price}
                              </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap">
                              <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                {stock.price_change_percentage_24h} %
                              </span>
                            </td>
                            <td
                              className="px-6 py-4 whitespace-nowrap"
                              onClick={(e) => {
                                e.stopPropagation();
                                handleSubmit(stock.id);
                              }}
                              style={{ zIndex: "0" }}
                            >
                              <div className="text-sm text-gray-900">
                                {favourites.includes(stock?.id) ? (
                                  <img
                                    src={require("../assets/icons/filled-star.png")}
                                    alt=""
                                    style={{ height: "25px", width: "25px" }}
                                  />
                                ) : (
                                  <img
                                    src={require("../assets/icons/unfilled-star.png")}
                                    alt=""
                                    style={{ height: "25px", width: "25px" }}
                                  />
                                )}
                              </div>
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
