import React from 'react';
import { fetchPosts, fetchUser } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';

function ProfilePage() {
  let [user, setUser] = React.useState(null);
  let [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
     fetchUser()
      .then(user => setUser(user));
    fetchPosts()
      .then(posts => setPosts(posts));
  }, []);
  return (
      <ProfileDetails user={user} posts={posts} />
  );
}

function ProfileDetails({user, posts}) {
  if (!user) return <BarLoader />;
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline posts={posts} />
    </>
  )
}

function ProfileTimeline({posts}) {
  if (!posts.length) return <BarLoader />;
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export const FetchThenRender = ProfilePage;
