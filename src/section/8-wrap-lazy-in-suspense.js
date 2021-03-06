import React, { Suspense, useState } from 'react';
import { fetchProfileData } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';

function ProfilePage() {
  let [resource] = useState(fetchProfileData());
  return (
    <>
      <p>Instead of making the transition shorter, we can “disconnect” the slow component from the
        transition by wrapping it in Suspense</p>
      <Suspense fallback={<BarLoader />}>
        <ProfileDetails resource={resource} />
        <Suspense fallback={<BarLoader />}>
          <ProfileTimeline resource={resource} />
        </Suspense>
        <Suspense fallback={<BarLoader />}>
          <ProfileTrivia resource={resource} />
        </Suspense>
      </Suspense>
    </>
  );
}

function ProfileDetails({ resource }) {
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  return (
    <ul>
      {posts.map(post => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}

function ProfileTrivia({ resource }) {
  const trivia = resource.trivia.read();
  return (
    <>
      <h2>Fun Facts</h2>
      <ul>
        {trivia.map(fact => (
          <li key={fact.id}>{fact.text}</li>
        ))}
      </ul>
    </>
  );
}

export const WrapLazyInSuspense = ProfilePage;
