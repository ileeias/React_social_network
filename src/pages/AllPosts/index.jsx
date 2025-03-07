import { useEffect, useState } from 'react';
import { axiosInstance } from '../../services/axios';
import Post from '../../components/Post';
import CommentsForPost from '../../components/CommentsForMyPost';
import styles from './AllPosts.module.css';
import Loader from '../../components/Loader';
import CreateComment from '../../components/CreateComment';

export default function AllPosts({ changeModalLogin }) {
  const [posts, setPosts] = useState(null);
  const [changePosts, setChangePosts] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    async function getPosts() {
      try {
        const token = localStorage.getItem('token');
        const response = await axiosInstance.get('/all_posts', {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Authorization: `Token ${token}`,
          },
        });

        setPosts(response.data.reverse());
      } catch (error) {
        console.log(error);
        setError(error);
        changeModalLogin();
      }
    }
    getPosts();
  }, [changePosts]);
  return (
    <div className={styles.container}>
      <div className={styles.post_list}>
        {posts ? (
          posts.flatMap((post) => (
            <div className={styles.post_list}>
              <Post
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
                <CommentsForPost
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
