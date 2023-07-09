import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import styled from 'styled-components';
import Spinner from './Spinner';
import axios from 'axios'; 
import PageLoader from './PageLoader';
import mobile from '../responsive';
const articles = [];
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
    ${mobile({
        fontSize:'0.5rem'
    })}
  }
`

const News = ({category,query}) => {
  const apikey=import.meta.env.VITE_NEWS_API;
  console.log(apikey)
  const [loading,setLoading]=useState(false);
  const [articles,setArticles]=useState( [
    {
        "source": {
            "id": "the-times-of-india",
            "name": "The Times of India"
        },
        "author": "TIMESOFINDIA.COM",
        "title": "Happy Birthday Dhoni: Ravichandran Ashwin sends birthday wishes to MS Dhoni with a 'disclaimer' | Cricket News - Indiatimes.com",
        "description": "Cricket News: One of the most unique wishes to Dhoni came from none other than Ravichandran Aswhin, who is known for his straightforward social media posts. Ashwin",
        "url": "https://timesofindia.indiatimes.com/sports/cricket/news/ravichandran-ashwin-sends-birthday-wishes-to-ms-dhoni-with-a-disclaimer/articleshow/101580257.cms",
        "urlToImage": "https://static.toiimg.com/thumb/msid-101580308,width-1070,height-580,imgsize-55806,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
        "publishedAt": "2023-07-07T15:54:00Z",
        "content": "MS Dhoni turns 42: A look at career, accomplishments of 'captain cool'Mahendra Singh Dhoni's journey is nothing short of inspirational, starting from his days as a ticket collector at a railway stati… [+62 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "The New Indian Express"
        },
        "author": "Sudhir Suryawanshi",
        "title": "Maharashtra power politics: Sharad Pawar chooses to play hardball with nephew - The New Indian Express",
        "description": "Sharad Pawar has got the signed affidavits of 19 MLAs who are with the Ajit Pawar faction of the NCP, say sources.",
        "url": "https://www.newindianexpress.com/nation/2023/jul/07/maharashtra-power-politics-sharad-pawar-chooses-to-play-hardball-with-nephew-2592421.html",
        "urlToImage": "https://images.newindianexpress.com/uploads/user/imagelibrary/2023/5/7/w600X390/Pawar_1.jpg",
        "publishedAt": "2023-07-07T15:15:00Z",
        "content": "MUMBAI: In the power struggle between the Pawars in Maharashtra, the senior Pawar appears to have chosen to play hardball with his nephew.\r\nThe 82-year-old seasoned politician Sharad Pawar has manage… [+4470 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Softonic"
        },
        "author": "Pedro Domínguez Rojas",
        "title": "India’s Space Aspirations Soar High: Targeting Moon and Beyond - Softonic EN",
        "description": "The Indian Space Research Organization will launch its new space mission next week, with which it intends to reach the Moon.",
        "url": "https://en.softonic.com/articles/india-intends-to-conquer-the-moon-and-space",
        "urlToImage": "https://articles-img.sftcdn.net/f_auto,t_article_cover_xl/auto-mapping-folder/sites/3/2023/07/Mision-Chandrayaan-3-1.jpg",
        "publishedAt": "2023-07-07T14:23:50Z",
        "content": "Space, the final frontier. Although we see it every day when we look up, very few have been able to leave our planet, and no one has been able to explore the far reaches of the universe like the crew… [+1480 chars]"
    },
    {
        "source": {
            "id": "the-times-of-india",
            "name": "The Times of India"
        },
        "author": "AP",
        "title": "NATO leaders set to offer Ukraine major support package but membership is off the table for now - Indiatimes.com",
        "description": "Europe News: NATO leaders will agree next week to help modernize Ukraine’s armed forces, create a new high-level forum for consultations and reaffirm that it will",
        "url": "https://timesofindia.indiatimes.com/world/europe/nato-leaders-set-to-offer-ukraine-major-support-package-but-membership-is-off-the-table-for-now/articleshow/101578412.cms",
        "urlToImage": "https://static.toiimg.com/thumb/msid-101578490,width-1070,height-580,imgsize-585726,resizemode-75,overlay-toi_sw,pt-32,y_pad-40/photo.jpg",
        "publishedAt": "2023-07-07T14:01:00Z",
        "content": "Top 6 zodiac signs who make good parents"
    },
    {
        "source": {
            "id": null,
            "name": "OpIndia"
        },
        "author": "OpIndia Staff",
        "title": "Balasore Train Accident: CBI arrests 3 Railway employees under charges of culpable homicide and destruction of evidence - OpIndia",
        "description": "Senior Section engineer Arun Kumar Mohanta, section engineer Mohammad Amir Khan and technician Pappu Kumar have been arrested in Balasore Train accident case",
        "url": "https://www.opindia.com/2023/07/balasore-train-accident-3-arrested-under-charges-of-culpable-homicide-and-destruction-of-evidence/",
        "urlToImage": "https://www.opindia.com/wp-content/uploads/2023/07/6.png",
        "publishedAt": "2023-07-07T13:56:30Z",
        "content": "On Friday, July 7, the Central Bureau of Investigations (CBI) arrested three Railway employees in connection to the Balasore train accident. The arrested persons have been identified as senior Sectio… [+2661 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Bar & Bench - Indian Legal News"
        },
        "author": "Satyendra Wankhade",
        "title": "Five grounds on which Gujarat High Court refused to stay conviction of Rahul Gandhi in defamation case [READ JUDGMENT] - Bar & Bench - Indian Legal News",
        "description": "The Gujarat High Court on Friday delivered its verdict on the plea by Congress leader Rahul Gandhi against the conviction and two-year jail term imposed on him",
        "url": "https://www.barandbench.com/news/five-grounds-gujarat-high-court-refused-stay-conviction-rahul-gandhi-defamation-judgment",
        "urlToImage": "https://gumlet.assettype.com/barandbench%2F2023-07%2F8a465720-4a8e-4513-b375-98be036fd389%2FWhatsApp_Image_2023_07_07_at_6_02_03_PM.jpeg?w=1200&auto=format%2Ccompress&ogImage=true&enlarge=true",
        "publishedAt": "2023-07-07T12:36:35Z",
        "content": "Speaking at a press conference, Congress leader, parliamentarian and Senior Advocate Abhishek Manu Singhvi, who represented Gandhi, expressed his disappointment at the judgment though he said that th… [+846 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "India.com"
        },
        "author": "https://www.india.com/author/sumaila-zaman/",
        "title": "NEET Counselling 2023 Date LIVE: NEET UG Schedule, PG Counselling Registration, Seat Matrix, Documents at mcc - India.com",
        "description": "<B>NEET Counselling 2023 Date LIVE: </B>Medical aspirants who have registered and qualified the entrance examination can apply for the NEET UG 2023 Round 1 Counselling on the official website — mcc.nic.in.",
        "url": "https://www.india.com/education/neet-counselling-2023-date-live-neet-ug-schedule-pg-counselling-registration-seat-matrix-documents-at-mcc-nic-in-direct-link-6152859/",
        "urlToImage": "https://static.india.com/wp-content/uploads/2023/06/WhatsApp-Image-2023-06-15-at-10.00.07-AM.jpeg",
        "publishedAt": "2023-07-07T12:01:05Z",
        "content": "NEET Counselling 2023 Date LIVE: What are the various fees to be paid at the time of registration?\r\nGoing by the NEET PG 2022 Counselling schedule, at the time of registration students must pay two k… [+581 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Indiablooms.com"
        },
        "author": "Indiablooms",
        "title": "Study finds older adults who remain more active have a better quality of life | Indiablooms - First Portal on Digital News Management - indiablooms",
        "description": "A reduction in the amount of time spent physically active when adults are over 60 years old is linked to lower quality of life, a Cambridge study of almost 1,500 adults has shown.",
        "url": "https://www.indiablooms.com/health-details/H/12849/study-finds-older-adults-who-remain-more-active-have-a-better-quality-of-life.html",
        "urlToImage": "https://www.indiablooms.com/health_pic/2023/0e8c961cef9aafb77ad8d8584f979246.jpg",
        "publishedAt": "2023-07-07T11:48:37Z",
        "content": "A reduction in the amount of time spent physically active when adults are over 60 years old is linked to lower quality of life, a Cambridge study of almost 1,500 adults has shown. The same was also t… [+4494 chars]"
    },
    {
        "source": {
            "id": null,
            "name": "Samsung.com"
        },
        "author": null,
        "title": "Samsung Launches Galaxy M34 5G in India with Monster Display, Camera and Battery at Just INR 16999 - Samsung",
        "description": "Galaxy M34 5G features Immersive 120Hz Super AMOLED display, 50MP No Shake Camera, Nightography and Monster 6000mAh Battery  Galaxy M34 5G supports up to 4 generations of OS upgrades and up to 5 years of security updates",
        "url": "https://news.samsung.com/in/samsung-launches-galaxy-m34-5g-in-india-with-monster-display-camera-and-battery-at-just-inr-16999",
        "urlToImage": "https://img.global.news.samsung.com/in/wp-content/uploads/2023/07/Galaxy-M34-5G-fEATURE.png",
        "publishedAt": "2023-07-07T10:15:22Z",
        "content": "Samsung, Indias largest electronics brand, today announced the launch of Galaxy M34 5G. The latest addition to Samsungs immensely popular Galaxy M series, promises to redefine smartphone photography … [+4770 chars]"
    }
]);
  const [total,setTotal]=useState(0);
  const [pgno,setPgno]=useState(1);
  const [pageS,setPageS]=useState(9);

  const updateNews=async(pg)=> {
    console.log("updating");
    let url;
    if (category === "") {
      //when there is query
      url = `https://news-ride-api.vercel.app/api?q=${query}&apiKey=${apikey}&page=${pg}&pageSize=${pageS}`;
    } else {
      //when there is category
      url = `https://news-ride-api.vercel.app/api?country=in&category=${category}&apiKey=${apikey}&page=${pg}&pageSize=${pageS}`;
    }
    setLoading(true)

    let res = await axios.get(url);
    console.log('geted')
    let parsedData = res.data;
    // console.log(parsedData); 
    setArticles(parsedData.articles)
    setTotal(parsedData.totalResults)
    if(parsedData.status==='ok')  setLoading(false)
  }

  const nextpg = async () => {
    updateNews(pgno+1);
    setPgno(pgno + 1); //this was creating problem when updated earlier
  };
  const prevpg = async () => {
    updateNews(pgno-1);
    setPgno(pgno - 1);
  };
  console.log(articles.length)
  useEffect(()=>{
    console.log(category+query)
    updateNews(1);
  },[category,query])
  return (
    <Container>
         <NewsContainer >
            {loading?<PageLoader/>:
                articles.length?articles.map((element) => {
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
                }):
                <div style={{display:'flex',flexDirection:'column',alignItems:'center',fontSize:'2rem'}}>
                'Nothing to show'
                <PageLoader/>
                </div>
              }
         </NewsContainer> 
            
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

    </Container>
  )
}

export default News
