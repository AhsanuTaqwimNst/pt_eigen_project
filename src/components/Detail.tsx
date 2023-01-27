import React, { useState, useEffect } from "react";  
import { useParams } from "react-router-dom"; 
 
interface DataType { 
  title: string; 
  name: string;
  urlToImage: string; 
  url: string; 
  description: string; 
  content: string; 
  author: string; 
  publishedAt: string;
  source: { name: string }; 
} 
 
const Detail: React.FC = () => { 
  const { title } = useParams();  

  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);

  const detailData = () => {
    if (loading) {
      return;
    }
    setLoading(true);

    fetch('https://newsapi.org/v2/top-headlines?country=id&from=2023-01-26&sortBy=popularity&apiKey=f96b874151124dd3b4c1c5d313b3a3e8')    
    
      .then((res) => res.json())
      .then((body) => {
        setData([...data, ...body.articles]);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  };


    useEffect(() => {
      detailData();
    }, []);

  return ( 

    <> 

      <h2 className='App'>detail<span className='color'>news</span></h2>

      <div> 
        {data?.map((item) => ( 
          <div className="p-3"> 
            {item.title === title && ( 
              <> 
                <h2 className="judul">{item.title}</h2> 
                <img src={item.urlToImage} className="img" /> 
                <h2 style={{color: "rgb(238, 28, 28)"}}> 
                  Source :{" "} 
                  <a className="name"> 
                    {item.source.name} 
                  </a> 
                </h2> 
                <h3 style={{color:"rgb(255, 123, 0)"}}> 
                  Author :{" "} 
                  <span className="text"> 
                    {item.author} 
                  </span> 
                </h3> 
                <p>Di update : {" "}{item.publishedAt}</p>
                <p>{item.content}</p>
                <h2><a href={item.url}>More...</a></h2> 
                 
              </> 
            )} 
          </div> 
        ))} 
      </div> 

    </> 

  ); 
}; 
 
export default Detail;


















// fetch('https://newsapi.org/v2/top-headlines?country=id&q=Apple&from=2023-01-25&sortBy=popularity&apiKey=fee59b5927af41f7b93eaf275cba02a5')2
  // fetch('https://newsapi.org/v2/everything?q=Apple&from=2023-01-25&sortBy=popularity&apiKey=fee59b5927af41f7b93eaf275cba02a5')1