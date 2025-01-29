import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios';
import MyPost from '../../components/MyPost';
import CommentsForMyPost from "../../components/CommentsForMyPost"
import BoxShadowWrapper from '../../components/Wrapper';
import styles from "./MyPostPage.module.css"
import Loader from '../../components/Loader';

export default function MyPostPage({ changeModalLogin }) {
  const [my_posts, setMyposts] = useState(null);
  const [comments, setCommets] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getProfile() {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/my_posts', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Token ${token}`,
          },
        });

        setMyposts(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
        setError(error);
        changeModalLogin();
      }
    }
    getProfile();
  }, []);
  if (my_posts) {
    console.log(my_posts);
    my_posts.flatMap((post) => console.log(post[0]));
  }
  return (
    <div className={styles.container}>
      <Loader/>
      {my_posts
        ? my_posts.flatMap((post) => (
            <BoxShadowWrapper key={post[0].id}>
              <MyPost
                img={'http://127.0.0.1:8000' + post[0].image}
                title={post[0].title}
                text={post[0].text}
                date={post[0].create_date}
                update={post[0].update_date}
                likes={post[0].likes_count}
                dislikes={post[0].dislikes_count}
              />
              <CommentsForMyPost comments={post[0].comments}/>
            </BoxShadowWrapper>
          ))
        : <Loader />}
    </div>
  );
}
