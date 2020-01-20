### Try React Concurrent Mode

```sh
npm install
npm start
```

### How Will React Concurrent Mode Change the Way Think and Write React
- stop splitting and nesting components just to orchestrate specific loading sequences
```jsx harmony




```
- component trees will be shorter in height but wider, making comprehension of code simpler
- manage less loading state and conditionals, lean components
- key skill 
    - what level in the component tree to start fetching and how much to fetch - depends on understanding the business case well
    - not enough mean too many loading sequences
    - too much meaning excessive and wasteful api calls that are never used
- changing the way loading is orchestration will take very less time, as a few lines of code
    - instead of creating new loading states and integrating them with other loading conditionals, we can simply move Components in and out of Suspense boundaries, and within components, we can move the setting of state in and out of useTransition constructs. 
    - encourage UI teams to think about modelling transitions rather than just finished screens  


 
