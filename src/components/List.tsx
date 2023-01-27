import React, { useEffect, useState } from 'react';
import { Divider, List, Skeleton, Avatar } from 'antd';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useNavigate } from "react-router-dom";

interface DataType {
  title: string;
  urlToImage: string;
  description: string;
}

const ListArticle: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<DataType[]>([]);


  const navigate = useNavigate();


  const loadMoreData = () => {
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
    loadMoreData();
  }, []);

  return (

<>
<h2 className='App'>top-headlines <span className='color'>news</span>this week</h2>

<div
  id="scrollableDiv"
  style={{
    background: '#EAF5BC',
    padding: '0 16px',
    marginTop: '70px',
    border: '1px solid rgba(140, 140, 140, 0.35)',
    borderRadius: '30px'

  }}
>
  <InfiniteScroll
    dataLength={data.length}
    next={loadMoreData}
    hasMore={data.length < 50}
    loader={<Skeleton avatar paragraph={{ rows: 1 }} active />}
    endMessage={<Divider plain>It is all, nothing more 🤐</Divider>}
    scrollableTarget="scrollableDiv"
  >
    <List
      dataSource={data}
      renderItem={(item) => (
        <List.Item  key={item.title}>
          <List.Item.Meta
            avatar={<Avatar className='asset' src={item.urlToImage} />}
            title={<h3 className='logo'  onClick={() => navigate(`/detail/${item.title}`)}>{item.title}</h3>}
            description={item.description}
          />
        </List.Item>
      )}
    />
  </InfiniteScroll>
</div>
</>


  );
};

export default ListArticle;