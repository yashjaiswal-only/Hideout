import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import styled from 'styled-components';
import Spinner from './Spinner';
const articles = [
  {
    source: {
      id: "techcrunch-cn",
      name: "TechCrunch (CN)",
    },
    author: "Brian Heater",
    title: "盘点 2019 年消失的明星创业公司 | TechCrunch 中文版",
    description:
      "创业公司会因为各种原因而失败，但有一点不会改变：创业是极其困难的事。想要创办一家成功的公司，需要的不仅仅是热情，以及找到合适的人才（尽管很明显这两点很重要）。成功的创业者需要在许许多多细节上做到完美。\r\n\r\n粗略地回顾下今年的创业公司，可以发现并没有什么公司能带来像去年Theranos那样的轰动性故事。Theranos的故事被写成了畅销书，改编成了纪录片，相关电影也即将上映。不过某些公司，例如MoviePass，可能已经逐渐接近。\r\n\r\n通常来说，每看到一家Theranos，我们同时也会看到数十位辛勤创业者的故事…",
    url: "https://techcrunch.cn/2019/12/27/startups-lost-in-2019/",
    urlToImage:
      "https://files.techcrunch.cn/2019/12/gettyimages-829632570.jpg?w=1200",
    publishedAt: "2019-12-27T16:46:58Z",
    content:
      "Theranos Theranos MoviePass\r\n Theranos\r\n 2019 \r\nAnki2010 2019 \r\n1.82 \r\n2013 WWDC Overdrive iPhone \r\n3 Anki CozmoAnki 2018 Vector 2019 4 Anki 150 “”Cozmo \r\nChariot2014 2019 \r\n300 2017 \r\nChariot “” \r\n … [+1085 chars]",
  },
];
const Container=styled.div`
  width:100%;
  /* margin-top:3rem; */
  background-color: #e1f2f7;

`
const NewsContainer=styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;  
  width:100%;

  >button{
    padding: 0.5rem 1rem;
    border: none;
    margin: 1rem;
    border-radius: 10px;
    background-color:  #0dcaf0;
    font-size:1.1rem;
    cursor: pointer;
  }
`

const News = ({category,query}) => {
  const apikey=import.meta.env.VITE_NEWS_API;
  const [loading,setLoading]=useState(false);
  const [articles,setArticles]=useState([]);
  const [total,setTotal]=useState(0);
  const [pgno,setPgno]=useState(1);
  const [pageS,setPageS]=useState(9);
  const updateNews=async(pg)=> {
    console.log("updating");
    // this.props.setProgress(10);
    let url;
    if (category === "") {
      //when there is query
      url = `https://newsapi.org/v2/top-headlines?q=${query}&apiKey=${apikey}&page=${pg}&pageSize=${pageS}`;
    } else {
      //when there is category
      url = `https://newsapi.org/v2/top-headlines?country=in&category=${category}&apiKey=${apikey}&page=${pg}&pageSize=${pageS}`;
    }
    // this.props.setProgress(20);
    // console.log(this.state.pgno+"aftercall")
    setLoading(true)

    let data = await fetch(url);
    let parsedData = await data.json();
    // this.props.setProgress(50);
    console.log(parsedData); 
    setArticles(parsedData.articles)
    setTotal(parsedData.totalResults)
    if(parsedData.status==='ok')  setLoading(false)
    // this.props.setProgress(100);
  }
  const nextpg = async () => {
    updateNews(pgno+1);
    setPgno(pgno + 1); //this was creating problem when updated earlier
  };
  const prevpg = async () => {
    updateNews(pgno-1);
    setPgno(pgno - 1);
  };
  useEffect(()=>{
    console.log(category)
    updateNews(1);
  },[category])
  return (
    <Container>
         <NewsContainer >
            {loading?<Spinner/>:articles.map((element) => {
                return (
                    <NewsItem
                    tittle={element.title}
                    description={element.description}
                    imageUrl={element.urlToImage}
                    url={element.url}
                    author={element.author}
                    date={element.publishedAt}
                    source={element.source.name}
                    />
                    );
                })}
            </NewsContainer> 
            
            {/* <div className="bottom d-flex justify-content-between my-3 "> */}
            <NewsContainer>
                <button
                disabled={pgno <= 1}
                type="button"
                className="btn btn-info"
                onClick={prevpg}
                >
                &larr; Previous
                </button>
                <button
                disabled={
                    pgno + 1 >
                    Math.ceil(total /pageS)
                }
                type="button"
                className="btn btn-info"
                onClick={nextpg}
                >
                Next &rarr;
                </button>
            </NewsContainer>

            {/* </div>  */}
    </Container>
  )
}

export default News
