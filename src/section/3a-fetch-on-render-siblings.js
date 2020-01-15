import React, { useState, useEffect } from 'react';
import { fetchPosts, fetchUser } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';

function ProfilePage() {
  return (
    <>
      <p>Instead of a parent-child hierarchy, a sibling relationship helps improve load times.</p>
      <ProfileDetails />
      <br />
      <ProfileTimeline />
    </>
  );
}

function ProfileDetails() {
  let [user, setUser] = useState(null);
  useEffect(() => {
    fetchUser().then(user => {
      setUser(user);
    })
  }, []);
  if (!user) return <BarLoader />;
  return (
    <>
      <h1>{user.name}</h1>
    </>
  )
}

function ProfileTimeline() {
  let [posts, setPosts] = useState([]);
  useEffect(() => {
    fetchPosts().then(posts => {
      setPosts(posts);
    })
  }, []);
  if (!posts.length) return <BarLoader />;
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export const FetchOnRenderSiblings = ProfilePage;
