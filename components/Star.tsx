import Tooltip from "@material-ui/core/Tooltip";
import StarIcon from "@material-ui/icons/Star";
import StarBorderIcon from "@material-ui/icons/StarBorder";
import { Box, Typography } from "@material-ui/core";
import { useState, useEffect } from "react";

import { getDatabase, update, ref, onValue } from "firebase/database";

const Star = ({ user, school, course }) => {
  const [star, setStar] = useState([]);
  const [isStared, setIsStared] = useState<boolean>();

  const db = getDatabase();

  const getStar = async () => {
    const starCountRef = ref(db, `${school}/${course}`);
    onValue(starCountRef, (snapshot) => {
      if (snapshot.exists()) {
        const { star } = snapshot.val();
        setStar(star);
      }
    });
  };

  useEffect(() => {
    getStar();
  }, [isStared]);

  useEffect(() => {
    if (user != undefined) {
      setIsStared(star?.includes(user));
      console.log(isStared);
    }
  }, [star]);

  const handleStar = async () => {
    if (isStared && user) {
      setIsStared(false);
      const updates = {};
      const removeStar = star.filter((item) => item != user);
      updates[`${school}/${course}/star`] = [removeStar];
      update(ref(db), updates);
      setStar(removeStar);
    }
    if (!isStared && user) {
      setIsStared(true);
      const updates = {};
      updates[`${school}/${course}/star`] = [...star, user];
      update(ref(db), updates);
    }
  };

  return (
    <Tooltip title={user ? "" : "You must signed in to star a material"} arrow>
      <Box
        border="1px solid lightgray"
        width="fit-content"
        mr='1rem'
        borderRadius="10px"
        fontSize="1.1rem"
        fontWeight="600"
        onClick={handleStar}
        alignItems="center"
        p="4px"
        display="flex"
        className="pointer"
      >
        <Box display="flex" alignItems="center" p="0 3px">
          <Box mr="5px">{isStared ? <StarIcon /> : <StarBorderIcon />}</Box>

          <Box borderRight="1px solid lightgray" pr="7px">
            <Typography>{isStared ? "Unstar" : "Star"}</Typography>
          </Box>
        </Box>
        <Box p="0 5px">
          <Typography>{star.length}</Typography>
        </Box>
      </Box>
    </Tooltip>
  );
};

export default Star;
