import React, { Suspense, useState } from 'react';
import { fetchProfileData } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';

let t0 = null;
function App() {
  const [userId, setUserId] = useState(0);
  const [resource, setResource] = useState(fetchProfileData(0));
  return (
    <>
      <button onClick={() => {
        let nextUserId = (userId + 1) % 4;
        setUserId(nextUserId);
        t0 = performance.now();
        setResource(fetchProfileData(nextUserId));
      }}>Next
      </button>
      <br />
      <br />
      <ProfilePage resource={resource} />
    </>
  )
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<BarLoader />}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<BarLoader />}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({ resource }) {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name} ({Math.round(performance.now() - t0) - 3000})</h1>;
}

function ProfileTimeline({ resource }) {
  // Try to read posts, although they might not have loaded yet
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export const FetchEarly = App;
