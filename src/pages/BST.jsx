import React, { useState } from "react";
import * as d3 from "d3";
import Sidebar from "../components/sidebar";

function BST() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div>
        <form>
          <label>Enter a number:</label>
            <input type="number" step="1" />
        </form>
      </div>
    </>
  );
}

export default BST;
