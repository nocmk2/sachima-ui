import React, { useState, Suspense } from "react";
import Button from "@material-ui/core/Button";
import { fetchProfileData } from "apis/suspenseApi";
import LinearProgress from '@material-ui/core/LinearProgress';
import CircularProgress from '@material-ui/core/CircularProgress';
import ErrorBoundary from './ErrorBoundary'
import Error from './Error'


const resource = fetchProfileData();
function ProfileDetails() {
  // Try to read user info, although it might not have loaded yet
  const users = resource.users.read()

  const roles = resource.roles.read()
  const objects = resource.objects.read()
  const userrole = resource.userrole.read()
  const roleobject = resource.roleobject.read()
  return (
    <>
      <h1>{JSON.stringify(users)}</h1>
      <h1>{JSON.stringify(roles)}</h1>
      <h1>{JSON.stringify(objects)}</h1>
      <h1>{JSON.stringify(userrole)}</h1>
      <h1>{JSON.stringify(roleobject)}</h1>
    </>
  )
    ;
}

function ProfileTimeline() {
  // Try to read posts, although they might not have loaded yet
  const roles = resource.roles.read();
  return (
    <ul>
      {roles.map(r => (
        <li key={r.id}>{r.id}  {r.name}</li>
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
      <ErrorBoundary fallback={<Error />}>
        <Suspense
          fallback={<LinearProgress color="primary" />}
        >
          <ProfileDetails />
          <Suspense
            fallback={<CircularProgress />}
          >
            <ProfileTimeline />
          </Suspense>
        </Suspense>
      </ErrorBoundary>
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
