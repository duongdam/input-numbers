import React from "react";
import { ReactComponent as NumCalendar } from "./numMonitor.svg";
import { ReactComponent as FontIcon } from "./font.svg";
import { ReactComponent as IdentityImage } from "./hubman.svg";

import { CLFInputNumber } from "input-numbers";

const App = () => {
  const [value, setValue] = React.useState(1);

  return (
    <div style={{ textAlign: "center" }}>
      For Example:
      <br />
      Step 1
      <CLFInputNumber
        imgComponent={<NumCalendar />}
        min={1}
        max={9999}
        value={value}
        callBack={(e) => {
          setValue(e);
        }}
        color={"red"}
        maxWidth={"250px"}
        width={"100%"}
        height={"35px"}
        marginIMG={"0px 10px"}
        marginButton={"10px auto"}
        // autoFocus={true}
      />

      Step 1.5
      <CLFInputNumber
        imgComponent={<FontIcon />}
        value={3}
        step={1.5}
        color={"blue"}
      />

      Step 2
      <CLFInputNumber
        imgComponent={<IdentityImage />}
        value={7}
        step={2}
      />

      Step 2 with no img
      <CLFInputNumber
        value={7}
        step={2}
      />

    </div>
  );
}

export default App;
