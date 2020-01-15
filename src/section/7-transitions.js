import React, { Suspense, useState, useTransition, useCallback, useEffect } from 'react';
import { fetchProfileData } from '../util/fetch-profile-data';
import { BarLoader, MoonLoader } from 'react-spinners';


function App() {
  const [userId, setUserId] = useState(0);
  const [resource, setResource] = useState(fetchProfileData(0, 1000));
  const [transitionTimeout, setTransitionTimeout] = useState(2000);
  const [apiFetchTime, setApiFetchTime] = useState(1000);
  const [showTransitionIndicator, setShowTransitionIndicator] = useState(false);

  const handleTransitionTimeoutChange = useCallback(event => {
    setTransitionTimeout(event.target.value);
  }, []);

  const handleApiFetchTime = useCallback(event => {
    setApiFetchTime(event.target.value);
  }, []);

  const handleTransitionIndicatorVisibility = useCallback(event => {
    setShowTransitionIndicator(event.target.checked);
  }, []);


  const [startTransition, isPending] = useTransition({ timeoutMs: transitionTimeout || 2000 });
  return (
    <>
      <p>It would be nice if we could “skip” it and wait for some content to load before transitioning to the new screen.</p>
      <button
        onClick={() => {
          let nextUserId = (userId + 1) % 4;
          startTransition(() => {
            setUserId(nextUserId);
            setResource(fetchProfileData(nextUserId, apiFetchTime));
          });
        }}
        disabled={isPending && showTransitionIndicator}
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
        <label>Show transition indicator:</label>
        <input value={showTransitionIndicator} type={"checkbox"}
               onChange={handleTransitionIndicatorVisibility} />
      </div>
      <div>
        <ProfilePage resource={resource} />
      </div>
      {isPending && showTransitionIndicator && <MoonLoader size={30} />}
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
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline({ resource }) {
  const posts = resource.posts.read();
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setSearchTerm("");
  }, [resource]);

  let handleSearchTermChange = useCallback(
    ({ target: { value } }) => setSearchTerm(value.trim()),
    []
  );

  return (
    <>
      <div>
        <label>Search:</label>
        <input value={searchTerm}
               onChange={handleSearchTermChange} />
      </div>
      <ul>
        {posts
          .filter(post => !searchTerm.length || post.text.toLowerCase().includes(searchTerm.toLowerCase()))
          .map(post => (
            <li key={post.id}>{post.text}</li>
          ))}
      </ul>
    </>
  );
}

export const Transitions = App;
