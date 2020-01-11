import { wrapPromise } from './wrap-promise';

const data = {
  user: {
    name: "Raj"
  },
  posts: [
    { id: 1, text: "Building Great User Experiences with Concurrent Mode and Suspense" },
    { id: 2, text: "Preparing for the Future with React Prereleases" },
    { id: 3, text: "Introducing the New React DevTools" },
    { id: 4, text: "React Conf recap: Hooks, Suspense, and Concurrent Rendering" }
  ]
};


export const fetchUser = () => new Promise((resolve => {
  console.log('fetching user...')
  setTimeout(() => {
    resolve(data.user)
  }, 2000);
}));

export const fetchPosts = () => new Promise((resolve => {
  console.log('fetching posts...')
  setTimeout(() => {
    resolve(data.posts)
  }, 4000);
}));

export function fetchProfileData() {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts();
  return {
    user:  wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

export function fetchProfileData2() {
  let userPromise = fetchUser();
  let postsPromise = fetchPosts();
  return {
    user:  userPromise,
    posts: postsPromise
  };
}

