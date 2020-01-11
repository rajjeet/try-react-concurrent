// Suspense integrations like Relay implement
// a contract like this to integrate with React.
// Real implementations can be significantly more complex.
// Don't copy-paste this into your project!
export function wrapPromise(promise) {
  let status = "pending";
  let result;
  let suspender = promise.then(
    resolve => {
      status = "success";
      result = resolve;
    },
    reject => {
      status = "error";
      result = reject;
    }
  );
  return {
    read() {
      if (status === "pending") {
        throw suspender;
      } else if (status === "error") {
        throw result;
      } else if (status === "success") {
        return result;
      }
    }
  };
}


