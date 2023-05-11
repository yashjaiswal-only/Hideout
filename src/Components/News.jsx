import React, { useEffect, useState } from 'react'
import NewsItem from './NewsItem';
import styled from 'styled-components';
import Spinner from './Spinner';
const articles = [
  {
    source: {
      id: "business-insider",
      name: "Business Insider",
    },
    author: "Paris Marx",
    title:
      "Why have Netflix, Hulu, and the rest of streaming TV gotten so boring?",
    description:
      "We have dozens of streaming apps, hundreds of new TV shows, and thousands of movies at our fingertips. So why is there nothing to watch?",
    url: "http://www.businessinsider.com/why-streaming-tv-got-boring-netflix-hulu-hbo-max-cable-2022-12",
    urlToImage:
      "https://i.insider.com/63977fbea3bebb0018b41b46?width=1200&format=jpeg",
    publishedAt: "2022-12-15T12:03:00Z",
    content:
      "When Netflix took off, we were promised an entertainment revolution: Vast libraries of compelling content would be available with just a few clicks, all for a small monthly fee. But scrolling through… [+12079 chars]",
  },
  {
    source: {
      id: "business-insider-uk",
      name: "Business Insider (UK)",
    },
    author: "Paris Marx",
    title:
      "Why have Netflix, Hulu, and the rest of streaming TV gotten so boring?",
    description:
      "We have dozens of streaming apps, hundreds of new TV shows, and thousands of movies at our fingertips. So why is there nothing to watch?",
    url: "http://uk.businessinsider.com/why-streaming-tv-got-boring-netflix-hulu-hbo-max-cable-2022-12",
    urlToImage:
      "https://i.insider.com/63977fbea3bebb0018b41b46?width=1200&format=jpeg",
    publishedAt: "2022-12-15T12:03:00Z",
    content:
      "When Netflix took off, we were promised an entertainment revolution: Vast libraries of compelling content would be available with just a few clicks, all for a small monthly fee. But scrolling through… [+12079 chars]",
  },
  {
    source: {
      id: "polygon",
      name: "Polygon",
    },
    author: "Oli Welsh",
    title: "Henry Cavill out as Superman, James Gunn writing new reboot",
    description:
      "Man of Steel 2 will no longer be happening, as new DC Studios co-CEO James Gunn announced that he is writing a movie about a younger version of the character who will not be played by Cavill",
    url: "https://www.polygon.com/23510632/henry-cavill-superman-man-of-steel-2-canceled-james-gunn-reboot",
    urlToImage:
      "https://cdn.vox-cdn.com/thumbor/1vYiR0wPzeZg1_6owLAu1R0dLIk=/0x0:1000x524/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24136629/superman.jpg",
    publishedAt: "2022-12-15T11:50:48Z",
    content:
      "Just three weeks after announcing he was back as Superman, Henry Cavill has been forced to reveal that he wont be playing the character in future after all.\r\nInstead, the Man of Steel will be reboote… [+3971 chars]",
  },
  {
    source: {
      id: "entertainment-weekly",
      name: "Entertainment Weekly",
    },
    author: "Devan Coggan",
    title:
      "James Gunn is writing a Superman movie that won't star Henry Cavill",
    description:
      '"My turn to wear the cape has passed," Cavill wrote on Instagram.',
    url: "https://ew.com/movies/james-gunn-writing-superman-movie-henry-cavill-update/",
    urlToImage:
      "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=232%2C27%2C1832%2C827&poi=%5B1040%2C53%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2019%2F11%2Fman-of-steel-2000.jpg",
    publishedAt: "2022-12-15T07:44:37Z",
    content:
      "It's a bird, it's a plane, it's a… new Superman actor!\r\nIn October, DC Studios announced that Suicide Squad director James Gunn and producer Peter Safran would be taking over the studio, serving as c… [+2626 chars]",
  },
  {
    source: {
      id: "reddit-r-all",
      name: "Reddit /r/all",
    },
    author: "Matt Donnelly",
    title:
      "James Gunn Writing New 'Superman' Movie, Henry Cavill Will Not Return",
    description:
      "Things are heating up in Metropolis, as DC Studios co-head James Gunn has announced he is writing a new feature film about Superman. In step with the new project, Gunn has also revealed that Henry Cavill will not return as the hero. “Peter & I have a DC slate…",
    url: "https://variety.com/2022/film/news/james-gunn-writing-superman-movie-henry-cavill-out-1235461889/",
    urlToImage:
      "https://variety.com/wp-content/uploads/2022/12/James-Gunn-Henry-Cavill-Superman-DC-2.jpg?w=1000&h=562&crop=1",
    publishedAt: "2022-12-15T01:50:42Z",
    content:
      "Things are heating up in Metropolis, as DC Studios co-head James Gunn has announced he is writing a new feature film about Superman. In step with the new project, Gunn has also revealed that Henry Ca… [+2673 chars]",
  },
  {
    source: {
      id: "polygon",
      name: "Polygon",
    },
    author: "Tasha Robinson",
    title:
      "The Avatar video games are canon, but don’t tie into the Avatar movies",
    description:
      "Ubisoft’s Frontiers of Pandora and the mobile game Avatar: Reckoning are set outside the bounds of Avatar 2 and James Cameron’s upcoming Avatar sequels. Here’s what we know about the stories and settings for the games, coming in 2023.",
    url: "https://www.polygon.com/23500772/avatar-2-games-frontiers-of-pandora-reckoning-vs-way-of-water",
    urlToImage:
      "https://cdn.vox-cdn.com/thumbor/Dgzi3XsMU6gi2jG4v5VZKe-GpD4=/0x0:2246x1176/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24277438/Frontiers.png",
    publishedAt: "2022-12-14T15:31:00Z",
    content:
      "With Avatar: The Way of Water the long-delayed sequel to James Camerons groundbreaking 2009 movie Avatar finally hitting theaters, fans may be wondering how the new wave of tie-ins and spinoffs might… [+3560 chars]",
  },
  {
    source: {
      id: "polygon",
      name: "Polygon",
    },
    author: "Matt Patches",
    title:
      "65 trailer: Adam Driver hunts dinos with laser gun, makes best movie ever",
    description:
      "65 comes from Sam Raimi and the writers of A Quiet Place. The movie, which releases in theaters on March 10, 2023, landed its first trailer in front of Avatar: The Way of Water for obvious reasons.",
    url: "https://www.polygon.com/23508940/65-trailer-adam-driver-dinosaurs-movie",
    urlToImage:
      "https://cdn.vox-cdn.com/thumbor/HBMMvk_qqll6wHLuvQMuY7YG_0A=/75x0:1213x596/fit-in/1200x630/cdn.vox-cdn.com/uploads/chorus_asset/file/24290869/65_driver_dinosaur.jpg",
    publishedAt: "2022-12-14T14:35:38Z",
    content: "Feeling very chill about the 65 trailer",
  },
  {
    source: {
      id: "entertainment-weekly",
      name: "Entertainment Weekly",
    },
    author: null,
    title: "12 must-watch classic Christmas movies",
    description:
      "For your viewing pleasure, EW looks beyond <em>It’s a Wonderful Life</em> for both notable and underrated black & white holiday treasures from the classic Hollywood era.",
    url: "https://ew.com/movies/essential-classic-christmas-movies/",
    urlToImage:
      "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C0%2C2000%2C1000&poi=%5B1040%2C39%5D&w=2000&h=1000&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2021%2F11%2F30%2FMBDSHAR_EC028.jpg",
    publishedAt: "2022-12-07T21:20:24Z",
    content:
      "Cary Grant's cinematic charm has always seemed otherworldly, but never more so than in his turn as an actual angel in The Bishop's Wife. David Niven is the young bishop who's gotten so tripped up by … [+1135 chars]",
  },
  {
    source: {
      id: "time",
      name: "Time",
    },
    author: "Stephanie Zacharek / Los Angeles",
    title: "Steven Spielberg Waited 60 Years to Tell This Story",
    description:
      "The movie details not just his beginnings as a precocious child filmmaker, but also a secret he shared with his mother Leah until her death.",
    url: "http://time.com/6234045/steven-spielberg-interview-the-fabelmans/",
    urlToImage:
      "https://api.time.com/wp-content/uploads/2022/11/steven-spielberg-the-fabelmans-tania-franco-klein.jpg?quality=85&crop=0px%2C492px%2C1800px%2C942px&resize=1200%2C628&strip",
    publishedAt: "2022-11-16T12:00:41Z",
    content:
      "This story contains spoilers for The Fabelmans\r\nWhen Steven Spielberg was a kid growing up in 1950s Arizona, watching westerns on his family’s 20-inch black-and-white Philco, he would creep right up … [+15983 chars]",
  },
  {
    source: {
      id: "entertainment-weekly",
      name: "Entertainment Weekly",
    },
    author: "Dan Snierson",
    title: "Your guide to the 2023 TV premiere dates",
    description:
      "We'll tell you how to watch all the new and returning series, plus streaming movies.",
    url: "https://ew.com/tv/2023-tv-premiere-dates/",
    urlToImage:
      "https://imagesvc.meredithcorp.io/v3/mm/image?q=60&c=sc&rect=0%2C114%2C2001%2C1115&poi=%5B980%2C598%5D&w=2001&h=1001&url=https%3A%2F%2Fstatic.onecms.io%2Fwp-content%2Fuploads%2Fsites%2F6%2F2022%2F11%2F02%2FSQ-TV-PREMIERES-2023.jpg",
    publishedAt: "2022-11-03T20:30:00Z",
    content:
      "Forget holiday shopping — much more important work awaits you! And that would be: Planning your TV-watching calendar for 2023.\r\nThe networks and streamers are already flipping their calendars ahead a… [+7690 chars]",
  },
  {
    source: {
      id: "ign",
      name: "IGN",
    },
    author: "Collier Jennings",
    title: "Best Action Movies on Netflix Right Now (September 2022) - IGN",
    description:
      "These are the best action movies on Netflix right now -- blockbusters, fight films, animated adventures and shootouts galore.",
    url: "https://www.ign.com/articles/best-action-movies-on-netflix-right-now",
    urlToImage:
      "https://assets-prd.ignimgs.com/2022/07/28/rrr-1659047262112.jpg?width=1280",
    publishedAt: "2022-09-01T18:03:14Z",
    content:
      "There is nothing like a good action movie on Netflix. The perfectly choreographed fight scenes that let you feel every punch and kick on screen; the shootouts that see bullets and bodies hitting the … [+11394 chars]",
  },
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
