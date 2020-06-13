import React, { useContext, useEffect, useState } from "react";
import { FirebaseContext } from "../../firebase";
import LinkItem from "./LinkItem";

function LinkList(props) {
  const { firebase } = useContext(FirebaseContext);
  const [links, setLinks] = useState([]);

  useEffect(() => {
    const unsubscribe = getLinks();

    return () => unsubscribe();
    // eslint-disable-next-line
  }, []);

  function getLinks() {
    // firebase.db.collection("links").get();
    const unsubscribe = firebase.db
      .collection("links")
      .onSnapshot(handleSnapshot);

    return unsubscribe;
  }

  function handleSnapshot(snapshot) {
    const links = snapshot.docs.map((doc) => {
      return { id: doc.id, ...doc.data() };
    });

    setLinks(links);
  }

  return (
    <div>
      {links.map((link, index) => (
        <LinkItem
          key={link.id}
          showCount={true}
          link={link}
          index={index + 1}
        />
      ))}
    </div>
  );
}

export default LinkList;
