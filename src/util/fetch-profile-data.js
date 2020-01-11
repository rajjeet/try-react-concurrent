import { wrapPromise } from './wrap-promise';

export function fetchUser(userId = 0, timeout = 3000) {
  console.log("fetch user " + userId + "...");
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched user " + userId);
      switch (userId) {
        case 0:
          resolve({
            name: "Ringo Starr [0]",
            id: 0
          });
          break;
        case 1:
          resolve({
            name: "George Harrison [1]",
            id: 1
          });
          break;
        case 2:
          resolve({
            name: "John Lennon [2]",
            id: 2
          });
          break;
        case 3:
          resolve({
            name: "Paul McCartney [3]",
            id: 3
          });
          break;
        default:
          throw Error("Unknown user.");
      }
    }, timeout);
  });
}

export function fetchPosts(userId = 0, timeout = 5000) {
  console.log(
    "fetch posts for " + userId + "..."
  );
  return new Promise(resolve => {
    setTimeout(() => {
      console.log("fetched posts for " + userId);
      switch (userId) {
        case 0:
          resolve([
            {
              id: 0,
              text:
                "I get by with a little help from my friends [0]"
            },
            {
              id: 1,
              text:
                "I'd like to be under the sea in an octupus's garden [0]"
            },
            {
              id: 2,
              text:
                "You got that sand all over your feet [0]"
            }
          ]);
          break;
        case 1:
          resolve([
            {
              id: 0,
              text:
                "Turn off your mind, relax, and float downstream [1]"
            },
            {
              id: 1,
              text: "All things must pass [1]"
            },
            {
              id: 2,
              text:
                "I look at the world and I notice it's turning [1]"
            }
          ]);
          break;
        case 2:
          resolve([
            {
              id: 0,
              text:
                "Living is easy with eyes closed [2]"
            },
            {
              id: 1,
              text:
                "Nothing's gonna change my world [2]"
            },
            {
              id: 2,
              text: "I am the walrus [2]"
            }
          ]);
          break;
        case 3:
          resolve([
            {
              id: 0,
              text: "Woke up, fell out of bed [3]"
            },
            {
              id: 1,
              text: "Here, there, and everywhere [3]"
            },
            {
              id: 2,
              text:
                "Two of us sending postcards, writing letters [3]"
            }
          ]);
          break;
        default:
          throw Error("Unknown user.");
      }
    }, timeout);
  });
}

export function fetchProfileData(userId = 0, timeout) {
  let userPromise = fetchUser(userId, timeout);
  let postsPromise = fetchPosts(userId, timeout);
  return {
    user:  wrapPromise(userPromise),
    posts: wrapPromise(postsPromise)
  };
}

