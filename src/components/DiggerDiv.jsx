import "./diggerDiv.js";
import "./digger-div.css";
import { addLP } from "./diggerDiv.js";

function DiggerDiv() {
  return (
    <div>
      <button className='NavLinkButton' onClick={() => addLP(5)}>Get Diggin</button>
      <div className="diggerDiv" id="crate" onLoad={DiggerDiv}></div>
    </div>
  );
}

export default DiggerDiv;
