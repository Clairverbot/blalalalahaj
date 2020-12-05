import { Component } from "react";
import "../App.css";
import blahaj_percussion from "../assets/blahaj-percussion.png";
import blahaj_percussion_right from "../assets/blahaj-percussion-right.png";
import blahaj_ooh from "../assets/blahaj-ooh.png";
import blahaj_ooh_right from "../assets/blahaj-ooh-right.png";

class Sharks extends Component {
  render() {
    return (
      <div className="shark-container">
        <img
          src={blahaj_percussion}
          alt="percussion"
          className="shark-percussion"
        />
        <img src={blahaj_ooh} alt="ooh" className="shark-ooh" />
        <img src={blahaj_ooh} alt="ooh" className="shark-ooh" />
        <img src={blahaj_ooh_right} alt="ooh" className="shark-ooh" />
        <img src={blahaj_ooh_right} alt="ooh" className="shark-ooh" />
        <img
          src={blahaj_percussion_right}
          alt="percussion"
          className="shark-percussion"
        />
      </div>
    );
  }
}

export default Sharks;
