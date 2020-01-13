import React, { Suspense, useState } from 'react';
import { fetchProfileData } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';

export function ProfilePage() {
  let [resource] = useState(fetchProfileData());
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
  return <h1>{user.name}</h1>;
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
