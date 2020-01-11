import React, { Suspense, useState } from 'react';
import { fetchProfileData } from '../util/fetch-profile-data';
import {BarLoader} from 'react-spinners';


function App() {
  const [userId, setUserId] = useState(0);
  const [resource, setResource] = useState(fetchProfileData(0, 1000));
  return (
    <>
      <button onClick={() => {
        let nextUserId = (userId + 1) % 4;
        setUserId(nextUserId);
        setResource(fetchProfileData(nextUserId, 1000));
      }}>Next
      </button>
      <br />
      <br />
      <ProfilePage resource={resource} />
    </>
  )
}

function ProfilePage({resource}) {
  return (
    <Suspense fallback={<BarLoader />}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<BarLoader />}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
  );
}

function ProfileDetails({resource}) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({resource}) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

export const RaceWithSuspense = App;
