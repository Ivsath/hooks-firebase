import React from "react";
import useAuth from "../Auth/useAuth";

function LinkList(props) {
  const user = useAuth();
  console.log(user);

  return <div>LinkList</div>;
}

export default LinkList;
