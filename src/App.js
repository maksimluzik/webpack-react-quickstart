import Videojs from "./components/Videojs";


const videoJsOptions = {
  autoplay: true,
  controls: true,
  aspectRatio: '16:9'
}

class App extends React.Component {
  render() {
    return (
      <Videojs { ...videoJsOptions } />
    )
  }
}

export default App
