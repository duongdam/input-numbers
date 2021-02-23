import React from "react";
import { ReactComponent as NumCalendar } from "./numMonitor.svg";
import { ReactComponent as FontIcon } from "./font.svg";
import { ReactComponent as IdentityImage } from "./hubman.svg";

import { CLFInputNumber } from "input-numbers";
import "input-numbers/dist/index.css";

const App = () => {
  const [value, setValue] = React.useState(1);

  return (
    <>
      For Example:
      <CLFInputNumber
        imgComponent={<NumCalendar />}
        min={1}
        max={9999}
        value={value}
        callBack={(e) => {
          setValue(e);
        }}
        color={"red"}
        maxWidth={250}
        width={"100%"}
        height={35}
        marginIMG={"0px 10px"}
        marginButton={"10px auto"}
        // autoFocus={true}
      />

      <CLFInputNumber
        imgComponent={<FontIcon />}
        value={3}
        step={1.5}
        color={"blue"}
      />

      <CLFInputNumber
        imgComponent={<IdentityImage />}
        value={7}
        step={2}
      />

    </>
  );
};

export default App;
