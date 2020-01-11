import React from 'react';
import { fetchPosts, fetchUser } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';

function ProfilePage() {
  return (
      <ProfileDetails />
  );
}

function ProfileDetails() {
  let [user, setUser] = React.useState(null);
  React.useEffect(() => {
    fetchUser().then(user => {
      setUser(user);
    })
  });
  if (!user) return <BarLoader />;
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline />
    </>
  )
}

function ProfileTimeline() {
  let [posts, setPosts] = React.useState([]);
  React.useEffect(() => {
    fetchPosts().then(posts => {
      setPosts(posts);
    })
  });
  if (!posts.length) return <BarLoader />;
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export const FetchOnRender = ProfilePage;
