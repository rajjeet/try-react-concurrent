import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchUser } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';


function App() {
  const [userId, setUserId] = useState(0);
  return (
    <>
      <button onClick={() => {
        let nextUserId = (userId + 1) % 4;
        setUserId(nextUserId);
      }}>Next
      </button>
      <br />
      <br />
      <ProfilePage userId={userId} />
    </>
  )
}

function ProfilePage({ userId }) {
  let [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser(userId, Math.random() * 2000).then(user => {
      setUser(user);
    })
  }, [userId]);
  if (!user) return <BarLoader />;
  return (
    <>
      <h1>{user.name}</h1>
      <ProfileTimeline userId={userId} />
    </>
  )
}

function ProfileTimeline({ userId }) {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts(userId, Math.random() * 2000).then(posts => {
      setPosts(posts);
    })
  }, [userId]);
  if (!posts.length) return <BarLoader />;
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export const RaceWithUseEffectHooks = App;
