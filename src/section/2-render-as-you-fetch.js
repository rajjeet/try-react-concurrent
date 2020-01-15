import React, { Suspense, useState } from 'react';
import { fetchProfileData } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';

function ProfilePage() {
  let [resource] = useState(fetchProfileData());
  return (
    <>
      <p>Start fetching all the required data for the next screen as early as possible, and start
        rendering the new screen immediately — before we get a network response. As data streams in,
        React retries rendering components that still need data until they’re all ready.</p>
      <Suspense fallback={<BarLoader />}>
        <ProfileDetails resource={resource} />
        <Suspense fallback={<BarLoader />}>
          <ProfileTimeline resource={resource} />
        </Suspense>
      </Suspense>
    </>
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

export const RenderAsYouFetch = ProfilePage;
