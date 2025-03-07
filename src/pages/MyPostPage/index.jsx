import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios';
import MyPost from '../../components/MyPost';
import CommentsForMyPost from '../../components/CommentsForMyPost';
import styles from './MyPostPage.module.css';
import Loader from '../../components/Loader';
import CreatePost from '../../components/CreatePost';
import CreateComment from '../../components/CreateComment';

export default function MyPostPage({ changeModalLogin }) {
  const [my_posts, setMyposts] = useState(null);
  const [changePosts, setChangePosts] = useState(true);
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

        setMyposts(response.data.reverse());
      } catch (error) {
        console.log(error);
        setError(error);
        changeModalLogin();
      }
    }
    getProfile();
  }, [changePosts]);
  return (
    <div className={styles.container}>
      <CreatePost newPost={setChangePosts} changePosts={changePosts} />
      <div className={styles.post_list}>
        {my_posts ? (
          my_posts.flatMap((post) => (
            <div className={styles.post_list}>
              <MyPost
                key={post[0].id}
                id={post[0].id}
                img={'http://127.0.0.1:8000' + post[0].image}
                title={post[0].title}
                text={post[0].text}
                date={post[0].create_date}
                update={post[0].update_date}
                likes={post[0].likes_count}
                dislikes={post[0].dislikes_count}
                author_username={post[0].author_username}
                photo={post[0].photo}
                newPost={setChangePosts}
                changePosts={changePosts}
              />
              <div className={styles.comments}>
                <CreateComment id={post[0].id} newComment={setChangePosts} changePosts={changePosts} />
                <CommentsForMyPost
                  comments={post[0].comments.reverse()}
                  id={post[0].id}
                />
              </div>
            </div>
          ))
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}
