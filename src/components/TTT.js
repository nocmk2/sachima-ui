import React, { useState, Suspense } from "react";
import Button from "@material-ui/core/Button";
import { fetchProfileData } from "../apis/suspenseApi";

const resource = fetchProfileData();

function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const user = resource.user.read();
  return <h1>{user.name}</h1>;
}

function ProfileTimeline() {
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
// TTT test1
const TTT = () => {
  const [c, setC] = useState(0);
  const step = 10;
  return (
    <>
      <Button onClick={() => setC(c + step)} style={{ color: "red" }}>
        {c}
      </Button>
      <Button onClick={() => setC(c - step)}>{c}</Button>
      <Suspense
        fallback={<h1>Loading profile...</h1>}
      >
        <ProfileDetails />
        <Suspense
          fallback={<h1>Loading posts...</h1>}
        >
          <ProfileTimeline />
        </Suspense>
      </Suspense>
    </>
  );
};

const BHoc = WrappedComponent => {
  const hocComponent = ({ ...props }) => {
    if (props.visible === false) return null;
    return (
      <>
        <div>123</div>
        <WrappedComponent {...props} />
      </>
    );
  };
  return hocComponent;
};

export default BHoc(TTT);
