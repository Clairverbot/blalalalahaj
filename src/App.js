import { Component } from "react";
import MIDISounds from "midi-sounds-react";
import "./App.css";
import Sharks from "./components/sharks";
import virtual_piano_sheets from "./assets/virtual-piano-sheets.json";

class App extends Component {
  constructor(props) {
    super(props);
    this.midiNotes = [];
    this.state = {
      status: "?",
      selectValue: 0,
    };
  }
  componentDidMount() {
    this.startListening();
    document.addEventListener("keydown", this.handleKeyDown.bind(this));
  }
  componentWillUnmount() {
    document.removeEventListener("keydown", this.handleKeyDown.bind(this));
  }
  handleKeyDown(e) {
    if (e.keyCode >= 49 && e.keyCode <= 57) {
      this.midiSounds.playChordNow(
        598,
        [this.calculateNote(parseInt(String.fromCharCode(e.keyCode)))],
        0.25
      );
      this.animateShark("shark-ooh", 3);
    } else if (e.keyCode === 48) {
      this.midiSounds.playChordNow(598, [this.calculateNote(10)], 0.25);
      this.animateShark("shark-ooh", 3);
    } else if (e.keyCode >= 65 && e.keyCode <= 90) {
      let char_arr = "qwertyuiopasdfghjklzxcvbnm".split("");
      let pos =
        char_arr.indexOf(String.fromCharCode(e.keyCode).toLowerCase()) + 11;
      this.midiSounds.playChordNow(598, [this.calculateNote(pos)], 0.25);
      this.animateShark("shark-ooh", 3);
    } else if (e.keyCode === 32) {
      this.midiSounds.playChordNow(1235, [70], 0.25);
      this.animateShark("shark-percussion", 1);
    }
  }
  calculateNote(num) {
    num = num - 1;
    let arr = [0, 2, 4, 5, 7, 9, 11];
    return 12 * (Math.floor(num / 7) + 0.5) + arr[num % 7];
  }
  animateShark(className, sharkNum) {
    const shark = document.getElementsByClassName(className);
    const i = Math.floor(Math.random() * (sharkNum + 1));
    shark.item(i).classList.add("jump");
    setTimeout(() => {
      shark.item(i).classList.remove("jump");
    }, 1000);
  }
  onMIDIOnStateChange(event) {
    this.setState({
      status:
        event.port.manufacturer +
        " " +
        event.port.name +
        " " +
        event.port.state,
    });
  }
  requestMIDIAccessSuccess(midi) {
    console.log(midi);
    var inputs = midi.inputs.values();
    for (
      var input = inputs.next();
      input && !input.done;
      input = inputs.next()
    ) {
      input.value.onmidimessage = this.midiOnMIDImessage.bind(this);
    }
    midi.onstatechange = this.onMIDIOnStateChange.bind(this);
  }
  requestMIDIAccessFailure(e) {
    console.log("requestMIDIAccessFailure", e);
    this.setState({ status: "MIDI Access Failure" });
  }
  startListening() {
    this.setState({ status: "waiting" });
    if (navigator.requestMIDIAccess) {
      navigator
        .requestMIDIAccess()
        .then(
          this.requestMIDIAccessSuccess.bind(this),
          this.requestMIDIAccessFailure.bind(this)
        );
    } else {
      this.setState({ status: "navigator.requestMIDIAccess undefined" });
    }
  }
  handleSelectChange(e) {
    this.setState({ selectValue: e.target.value });
  }
  render() {
    return (
      <div className="App">
        <header>
          <h1>🎶 Blalalalahaj 🦈</h1>
          <p>It Works like Virtual Piano, but with Blahajs</p>
        </header>
        <br />
        <Sharks />
        <select
          value={this.state.selectValue}
          onChange={(e) => this.handleSelectChange(e)}
        >
          {virtual_piano_sheets.map((data, i) => {
            return <option value={i}>{data.name}</option>;
          })}
        </select>
        <code
          //not dangerous in this case
          dangerouslySetInnerHTML={{
            __html: virtual_piano_sheets[this.state.selectValue].sheet,
          }}
        />
        <footer>
          <p>
            Created for SharkHacks 2020 🦈🎶
            <br />
            Love Sharks 🦈? Donate to
            <a href="https://www.sharktrust.org/Listing/Category/donate">
              Shark Trust
            </a>
            so that Blahajs and friends can continue singing 🎶
          </p>
          <MIDISounds
            ref={(ref) => (this.midiSounds = ref)}
            appElementName="root"
            instruments={[598, 1235]}
          />
        </footer>
      </div>
    );
  }
}

export default App;
