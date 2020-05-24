import React, { useState } from "react";
import { fetchProfileData } from "api/suspenseApi";

/**
 * Suspense fetch api
 */
const resource = fetchProfileData();
const Comp1 = () => {
  /**
   *  需要什么数据
   *
   *  */
  const [ts, setTs] = useState("12345554");
  const data = resource.roles.read();

  /**
   * 怎么渲染
   */
  return (
    // view tree
    <>
      <div>
        {/* data dependencies */}
        {ts}
      </div>
      <h2>{JSON.stringify(data)}</h2>
    </>
  );
};

export default Comp1;
