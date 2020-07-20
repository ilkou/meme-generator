import React, {Component} from 'react';
import './App.css';
import Caption from './Caption.js';
import 'react-bootstrap';
import { Preloader, Oval } from 'react-preloader-icon';

let reached_memes = 20;

class App extends Component {
  constructor(props) {
      super(props);
      this.state = {
          data: [],
          memes: []
      };
      this.onScroll = this.onScroll.bind(this);
  }
  componentDidMount() {
      const apiUrl = 'https://api.imgflip.com/get_memes';
      fetch(apiUrl, {method: "GET"})
          .then((response) => response.json())
          .then((data) => {
              const dataAsArray = Object.keys(data.data.memes).map((cid) => data.data.memes[cid]);
              //console.log(dataAsArray);
              let captions = [];
              for (let i = 0; i < reached_memes; i++) {
                  let meme = dataAsArray[i];
                  captions.push(<Caption link={meme.url} name={meme.name} key={meme.id}></Caption>);
              }
              // dataAsArray.forEach(meme => {
              //     captions.push(<Caption link={meme.url} name={meme.name} key={meme.id}></Caption>);
              // });
              this.setState({
                  data: [...dataAsArray],
                  memes: [...captions]
              });
              console.log(this.state.memes.length);
          });
  }
  onScroll() {
      if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          let captions = [];
          for (let i = reached_memes; i < reached_memes + 10 && i < 100; i++) {
              let meme = this.state.data[i];
              captions.push(<Caption link={meme.url} name={meme.name} key={meme.id}></Caption>);
          }
          this.setState((prevState) => {
              return {
                  data: prevState.data,
                  memes: prevState.memes.concat(captions)
              }
          });
          reached_memes += 10;
          if (reached_memes >= 100)
              window.removeEventListener('scroll',this.onScroll);
          //or u can show loading spinner and make fetch request to api
      }
  }
  componentWillMount() {
      window.addEventListener('scroll', this.onScroll);
  }
  componentWillUnmount() {
      window.removeEventListener('scroll',this.onScroll);
  }

  render() {
      return (
        <div className={"App"}>
            <h1>There's {this.state.memes.length} available memes</h1>
            <small>scroll down for more :)</small>
            {
                this.state.memes.length  === 0 ?
                    <div className={"Loading"}>
                        <Preloader
                        use={Oval}
                        size={100}
                        strokeWidth={10}
                        strokeColor="#333333"
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
            <small> {this.state.memes.length  === this.state.data.length ? "no more memes :) be creative and create one !" : ""}</small>
        </div>
    );
  }
}

export default App;
