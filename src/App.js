import React, { Component, Fragment } from "react";
import "./App.css";
import MapHouse from "./Pages/MapHouse";
import MainSearch from "./Pages/MainSearch";
import MyPage from "./Pages/MyPage";
import ReactRouter from "./ReactRoutes/ReactRouter";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchValue: ""
    };
  }
  handleSearch = e => {
    if (e.key === "Enter") {
      this.setState({
        searchValue: e.target.value
      });
    }
  };
  getMyPageList = () => {
    var id = localStorage.getItem("token");
    fetch(`http://localhost:3000/mypage`, {
      headers: {
        "Content-Type": "application/json",
        authorization: id
      }
    })
      .then(response => {
        return response.json();
      })
      .then(json => {
        console.log("json", json);
        this.setState({
          currentItem: json
        });
        document.querySelector(".my-page").style.display = "block";
        document.querySelector(".my-page-button").style.display = "none";
      });
  };
  render() {
    return (
      <div>
        <ReactRouter />
        <MainSearch handleSearch={this.handleSearch} />

        {this.state.searchValue !== undefined ? (
          <MapHouse searchValue={this.state.searchValue} />
        ) : (
          false
        )}

        {/* <button className="my-page-button" onClick={this.getMyPageList}>
          MyPage
        </button>
        <MyPage currentItem={this.state.currentItem} /> */}
      </div>
    );
  }
}

export default App;
