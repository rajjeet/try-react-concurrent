import React, { Suspense, useState, useTransition, useCallback, useEffect } from 'react';
import { fetchProfileData } from '../util/fetch-profile-data';
import { BarLoader, HashLoader, MoonLoader } from 'react-spinners';
import { css } from '@emotion/core';

const spinnerCss = css`  
  animation: makeVisible 1s ease-in 1s forwards;
  opacity: 0;
  
  @keyframes makeVisible {
    to {
      opacity: 1;
    }
  }
`;

function App() {
  const [userId, setUserId] = useState(0);
  const [resource, setResource] = useState(fetchProfileData(0, 0));

  const [transitionTimeout, setTransitionTimeout] = useState(2000);
  const [apiFetchTime, setApiFetchTime] = useState(1000);

  const handleTransitionTimeoutChange = useCallback(event => {
    setTransitionTimeout(event.target.value);
  }, []);

  const handleApiFetchTime = useCallback(event => {
    setApiFetchTime(event.target.value);
  }, []);

  const [startTransition, isPending] = useTransition({ timeoutMs: transitionTimeout });
  return (
    <>
      <button
        onClick={() => {
          let nextUserId = (userId + 1) % 4;
          startTransition(() => {
            setUserId(nextUserId);
            setResource(fetchProfileData(nextUserId, apiFetchTime));
          });
        }}
        disabled={isPending}
      >Next
      </button>
      <div>
        <label>Transition timeout:</label>
        <input value={transitionTimeout} onChange={handleTransitionTimeoutChange} />
      </div>
      <div>
        <label>API fetch time:</label>
        <input value={apiFetchTime} onChange={handleApiFetchTime} />
      </div>
      <div>
        <ProfilePage resource={resource} />
      </div>
      {isPending && <HashLoader css={spinnerCss} size={30} />}
    </>
  )
}

function ProfilePage({ resource }) {
  return (
    <Suspense fallback={<BarLoader css={spinnerCss} />}>
      <ProfileDetails resource={resource} />
      <Suspense fallback={<BarLoader css={spinnerCss} />}>
        <ProfileTimeline resource={resource} />
      </Suspense>
    </Suspense>
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
      {posts
        .map(post => (
          <li key={post.id}>{post.text}</li>
        ))}
    </ul>
  );
}

export const DelayPendingIndicator = App;
