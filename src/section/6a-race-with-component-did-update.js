import 'babel-polyfill';
import React, {useState, useEffect} from 'react';
import { fetchPosts, fetchUser } from '../util/fetch-profile-data';
import { BarLoader } from 'react-spinners';
import * as PropTypes from 'prop-types';


function App() {
  const [userId, setUserId] = useState(0);
  return (
    <>
      <button onClick={() => {
        let nextUserId = (userId + 1) % 4;
        setUserId(nextUserId);
      }}>Next
      </button>
      <br />
      <br />
      <ProfilePage userId={userId} />
    </>
  )
}

class ProfilePage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
  }
  componentDidMount() {
    this.fetchData(this.props.id);
  }
  componentDidUpdate(prevProps){
    if (prevProps.userId !== this.props.userId){
      this.fetchData(this.props.userId);
    }
  }
  async fetchData(userId){
    const user = await fetchUser(userId, Math.random() * 2000);
    this.setState({ user });
  }

  render() {
    const {user} = this.state;
    if (!user) return <BarLoader />;
    return (
      <>
        <h1>{user.name}</h1>
        <ProfileTimeline userId={this.props.userId} />
      </>
    );
  }
}

class ProfileTimeline extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: []
    }
  }
  componentDidMount() {
    this.fetchData(this.props.userId);
  }
  componentDidUpdate(prevProps) {
    if (prevProps.userId !== this.props.userId){
      this.fetchData(this.props.userId);
    }
  }
  async fetchData(userId){
    let posts = await fetchPosts(userId, Math.random() * 1000);
    this.setState({posts});
  }

  render() {
    const {posts} = this.state;
    if (!posts || !posts.length) return <BarLoader />;
    return (
      <ul>
        {posts.map(post => (
          <li key={post.id}>{post.text}</li>
        ))}
      </ul>
    );
  }
}


export const RaceWithComponentDidUpdate = App;