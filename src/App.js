import React, {Component} from 'react';
import './App.css';
import Caption from './Caption.js';
import 'react-bootstrap';
import { Preloader, Oval } from 'react-preloader-icon';

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          memes: []
      };
  }
  componentDidMount() {
      const apiUrl = 'https://api.imgflip.com/get_memes';
      fetch(apiUrl, {method: "GET"})
          .then((response) => response.json())
          .then((data) => {
              const dataAsArray = Object.keys(data.data.memes).map((cid) => data.data.memes[cid]);
              //console.log(dataAsArray);
              let captions = [];
              dataAsArray.forEach(meme => {
                  captions.push(<Caption link={meme.url} name={meme.name} key={meme.id}></Caption>);
              });
              this.setState({
                  memes: [...captions]
              })
              console.log(this.state.memes.length);
          });
  }

  render() {
    return (
        <div className={"App"}>
            <h1>There's {this.state.memes.length} available memes</h1>
            {
                this.state.memes.length  === 0 ?
                    <div className={"Loading"}>
                        <Preloader
                        use={Oval}
                        size={100}
                        strokeWidth={10}
                        strokeColor="#F0AD4E"
                        duration={800}
                        />
                    </div>
                    :
            <div className="d-flex align-content-between flex-wrap my-3">
                <div className="row" style={{minWidth: "100%"}}>
                    {this.state.memes}
                </div>
            </div>
            }
        </div>
    );
  }
}

export default App;
