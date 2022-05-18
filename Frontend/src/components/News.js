import React, { useEffect, useState } from 'react';
import { formatDistance } from 'date-fns';
import axios from 'axios';

const options = {
  method: 'GET',
  url: 'https://bing-news-search1.p.rapidapi.com/news/search?q=Cryptocurrency',
  params: { safeSearch: 'Off', textFormat: 'Raw', freshness: 'Day' },
  headers: {
    'X-BingApis-SDK': 'true',
    'X-RapidAPI-Host': 'bing-news-search1.p.rapidapi.com',
    'X-RapidAPI-Key': '70becd433cmshb2a121f67dbb62dp1dbb8bjsn5ae3bc519893',
  },
};

const initialState = {
  value: [],
};

export default function News() {
  const [data, setData] = useState(initialState);
  const [isFetching, setIsFetching] = useState(true);

  useEffect(() => {
    axios
      .request(options)
      .then(response => setData(response.data))
      .catch(error => console.error(error))
      .finally(() => setIsFetching(false));
  }, []);

  return (
    <div
      className="p-16 min-h-screen text-black"
      style={{ backgroundColor: '#f0f2f4' }}
    >
      <div className="flex justify-between mb-16 max-w-7xl mx-auto">
        <h1 className="text-2xl">Latest Crypto News</h1>
        <a>Show more</a>
      </div>

      {isFetching && (
        <div class="flex justify-center items-center py-10">
          <div
            class="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full  "
            role="status"
          ></div>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
        {data.value.map(news => (
          <a
            target="_blank"
            href={news.url}
            rel="noreferrer"
            key={news.name}
            className="p-6 h-64 mx-auto w-96 bg-white rounded-md flex flex-col justify-between"
          >
            <div className="flex mb-1">
              <h1 className="pr-3">{news.name}</h1>
              <img
                alt="news"
                src={news.image?.thumbnail.contentUrl}
                className="h-20 w-20 object-cover"
              />
            </div>
            <p className="text-sm">{news.description.slice(0, 76)}...</p>

            <div className="flex items-center justify-between">
              <div className="flex items-center text-sm">
                <img
                  alt={news.provider[0].name}
                  className="h-5 w-5 mr-2"
                  src={news.provider[0]?.image?.thumbnail?.contentUrl}
                />
                {news.provider[0].name}
              </div>

              <p className="text-sm">
                {formatDistance(new Date(news.datePublished), new Date(), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
