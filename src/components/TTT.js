import React from "react";
import { useFetchProfileData } from "api/api";

function ProfileTimeline() {
  const [resource, refresher, count] = useFetchProfileData
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
