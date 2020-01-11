import React from 'react';
import { fetchPosts, fetchUser } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';

function ProfilePage() {
  let [user, setUser] = React.useState(null);
  let [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    Promise.all([fetchUser(), fetchPosts()])
      .then(([user, posts]) => {
        setUser(user);
        setPosts(posts);
      })
  }, []);
  return (
    <>
      <ProfileDetails user={user} />
      <br/>
      <ProfileTimeline posts={posts} />
    </>
  );
}

function ProfileDetails({ user }) {
  if (!user) return <BarLoader />;
  return (
      <h1>{user.name}</h1>
  )
}

function ProfileTimeline({ posts }) {
  if (!posts.length) return <BarLoader />;
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export const FetchThenRenderAll = ProfilePage;
