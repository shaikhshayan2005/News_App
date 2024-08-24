import React, { useEffect, useState } from 'react';
import NewsItems from './NewsItems';
import DownLoad from './DownLoad';
import PropTypes from 'prop-types';
import InfiniteScroll from "react-infinite-scroll-component";

const News = (props) => {

  const capitalizeFirstLetter = (string) => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [totalResults, setTotalResults] = useState(0);

  const updateNews = async () => {
    props.setProgress(10); // setting progress bar values to zero when updating 
    let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page}&pageSize=${props.pageSize}`;
    setLoading(true); //loading kro jb tk data fetch ho rha hay 
    let data = await fetch(url);
    console.log(data)
    props.setProgress(40); // setting progress bar value to 40 when data is being fetched 
    let parsedData = await data.json();
    props.setProgress(80); // setting the value to 80 when data has been parsed 
    setArticles(parsedData.articles);
    setTotalResults(parsedData.totalResults);
    setLoading(false)  //loading false hu jai jb sare articles khtm hu jain

    props.setProgress(100); // finally when all done seet the value to 100
  }

  useEffect(() => {
    updateNews();   // in replace of component didmount 
  }, []);

  // const fetchMoreData = async () => {
  //   let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${page + 1}&pageSize=${props.pageSize}`;
  //   setPage(page + 1);
  //   let data = await fetch(url);
  //   console.log(data)
  //   let parsedData = await data.json();
  //   console.log(parsedData)
  //   setArticles(parsedData.articles);
  //   setTotalResults(parsedData.totalResults);


  // };
  const fetchMoreData = async () => {
        let nextPage = page + 1;
        let url = `https://newsapi.org/v2/top-headlines?country=${props.country}&category=${props.category}&apiKey=${props.apiKey}&page=${nextPage}&pageSize=${props.pageSize}`;
        let data = await fetch(url);
        let parsedData = await data.json();
      
        if (Array.isArray(parsedData.articles)) {
          setArticles([...articles, ...parsedData.articles]);
          setTotalResults(parsedData.totalResults);
          setPage(nextPage);
        } else {
          console.error("Error: Articles not found in API response.");
          
        }
      };
  return (
    <div className="container my-3">
      <h1 className='text-center' style={{ margin: '39px,15px', marginTop: '90px' }}>NewsWay - Top HeadLines - {capitalizeFirstLetter(props.category)} </h1>
      {loading && <DownLoad />}
      <InfiniteScroll
        dataLength={articles.length}
        next={fetchMoreData}
        hasMore={articles.length !== totalResults}
        loader={<DownLoad />}
      >
        <div className='container'>
          <div className="row">
            {articles.map((element,index) => {
              // if the loading is going on then dont show the articles and when done then show the articles above code syntax means 
              return <div className='col md-4' key={element.url}>
                <NewsItems title={element.title ? element.title.slice(0, 45) : ""} description={element.description ? element.description.slice(0, 88) : ""} imageUrl={element.urlToImage} newsUrl={element.url} author={element.author} date={element.publishedAt} source={element.source.name} />
              </div>
            })}
            
          </div>
        </div>
      </InfiniteScroll>
    </div>
  );
}

News.defaultProps = { // this is the way made propstypes in function  based components 
  country: 'us',       // asining the values to the props 
  pageSize: 8,
  category: 'general'
}
News.propTypes = {   // defining types of porps 
  country: PropTypes.string,
  pageSize: PropTypes.number,
  category: PropTypes.string
}

export default News;
