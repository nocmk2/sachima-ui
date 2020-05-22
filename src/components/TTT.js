import React, { useState, Suspense } from "react";
import Button from "@material-ui/core/Button";
import { fetchProfileData } from "apis/suspenseApi";

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
      <h5>{JSON.stringify(users)}</h5>
      <h5>{JSON.stringify(roles)}</h5>
      <h5>{JSON.stringify(objects)}</h5>
      <h5>{JSON.stringify(userrole)}</h5>
      <h5>{JSON.stringify(roleobject)}</h5>
    </>
  )
}

function ProfileTimeline() {

  // Try to read posts, although they might not have loaded yet
  const roles = resource.roles.read();

  return (
    <ul>
      {roles.map(r => (
        <li key={r.id}>{r.id}  {r.name}</li>
      ))}
      {/* 12444 */}
    </ul>
  );
}


const TTT = () => {
  return (
    <>
      {/* <ErrorBoundary fallback={<Error />}> */}
      {/* <ProfileDetails /> */}
      <ProfileTimeline />
      {/* </ErrorBoundary> */}
    </>
  );
};

// const BHoc = WrappedComponent => {
//   const hocComponent = ({ ...props }) => {
//     if (props.visible === false) return null;
//     return (
//       <>
//         <div>123</div>
//         <WrappedComponent {...props} />
//       </>
//     );
//   };
//   return hocComponent;
// };

export default TTT;
