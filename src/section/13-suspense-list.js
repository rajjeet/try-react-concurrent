import React, { Suspense, SuspenseList, useState, useCallback, useEffect } from 'react';
import { fetchProfileData } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';


function App() {
  const [listType, setListType] = useState("forwards");
  const handleListSelection = useCallback(({ target: { value } }) => setListType(value), []);
  return (
    <>
      <div>
        <select onChange={handleListSelection}>
          <option value={"forwards"}>Forwards</option>
          <option value={"backwards"}>Backwards</option>
          <option value={"together"}>Together</option>
        </select>
      </div>
      <br />
      <ProfilePage listType={listType} />
    </>
  )
}

function ProfilePage({ listType }) {
  let [resourceA, setResourceA] = useState(fetchProfileData(0, listType === "backwards" ? 8000 : 1000));
  let [resourceB, setResourceB] = useState(fetchProfileData(0, 5000));
  let [resourceC, setResourceC] = useState(fetchProfileData(0, listType === "backwards" ? 1000 : 8000));
  useEffect(() => {

    setResourceA(fetchProfileData(0, listType === "backwards" ? 8000 : 1000));
    setResourceB(fetchProfileData(0, 5000));
    setResourceC(fetchProfileData(0, listType === "backwards" ? 1000 : 8000));
  }, [listType]);
  return (
    <SuspenseList revealOrder={listType} tail={"collapsed"}>
      <Suspense fallback={<BarLoader />}>
        <ProfileDetails resource={resourceA} />
      </Suspense>
      <br />
      <Suspense fallback={<BarLoader />}>
        <ProfileTimeline resource={resourceB} />
      </Suspense>
      <br />
      <Suspense fallback={<BarLoader />}>
        <ProfileTrivia resource={resourceC} />
      </Suspense>
    </SuspenseList>
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

export const SuspenseListPage = App;
