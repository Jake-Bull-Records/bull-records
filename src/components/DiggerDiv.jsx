import "./DiggerDiv.js";
import "./DiggerDiv.css";
import { addLP } from "./DiggerDiv.js";

function DiggerDiv() {
  return (
    <div>
      <button onClick={() => addLP(5)}>Get Diggin</button>
      <div className="diggerDiv" id="crate" onLoad={DiggerDiv}></div>
    </div>
  );
}

export default DiggerDiv;
