import React, { Component } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";
import Loading from "./Components/Loading";
import Login from "./Components/Login";
import Signup from "./Components/Signup";
import Logout from "./Components/Logout";
import MyPage from "./Pages/MyPage";
import Header from "./ReactRoute/Header";
import Home from "./Pages/Home";
import MyPageButton from "./Pages/MyPageButton";


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLogin: null,
      currentItem: {},
      searchValue: "",
    };
  }


  componentDidMount = () => {
    if (localStorage.getItem("token")) {
      this.setState({
        isLogin: true
      });
    } else {
      this.setState({
        isLogin: false
      });
    }
  };
  
  handleSearch = e => {
    if(e.key === 'Enter'){
      if( !e.target.value.length ){
        alert(' 지역을 입력하세요! ')
      }else{
        let data = e.target.value;
        e.target.value = '';
        this.setState({
          searchValue: data,
        });
     }
     console.log(e.target.value, 'e.target.value')
    }
  
    

    // if ( e.keyCode === 13 ) {
    //   console.log('hi')
    //   if( !e.target.value.length ){
    //     console.log('hi')
    //     alert(' 지역을 입력하세요! ')
    //   }else{ 
    //     let data = e.target.value;
    //     e.target.value = '';
    //     this.setState({
    //       searchValue: data,
    //     });
    //     console.log(this.state.searchValue, 'e.target')
    //   }
    // }
  };

  handleClickHome = (e) => {

  }

  changeIsLogin = value => {
    this.setState({
      searchValue: '',
      isLogin: value,
    });
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
        // console.log("json", json);
        this.setState({
          currentItem: json
        });
        document.querySelector(".my-page").style.display = "block";
        document.querySelector(".my-page-button").style.display = "block";
      })
      .catch(err => {
        return err;
      });
  };
  render() {
    if (this.state.isLogin === null) {
      return <Loading />;
    }
    return (
      <div className="App">
        <div className="js-Contents Contents">
          <Router>
            <div className="Nav">
              <Header
                isLogin={this.state.isLogin}
                changeIsLogin={this.changeIsLogin}
              />
              </div>
              
                {/* <Route exact path="/" render={() => <Home />} /> */}
                <Route
                  exact
                  path="/"
                  render={props => (
                    <Home
                      handleSearch={this.handleSearch}
                      searchValue={this.state.searchValue}
                      handleClickHome={this.handleClickHome}
                    />
                  )}
                />
                <Route
                  path="/login"
                  render={props => (
                    <Login
                      isLogin={this.state.isLogin}
                      changeIsLogin={this.changeIsLogin}
                    />
                  )}
                />
                <Route path="/signup" render={props => <Signup />} />
                <Route path="/logout" component={Logout} />
          </Router>
        </div>
        
        
        <div className="MyPageButton">
          <MyPageButton  currentItem={this.state.currentItem} getMyPageList={this.getMyPageList}/>
          <button className="my-page-button" onClick={this.getMyPageList}>
            MyPage
          </button>
          {/* <MyPage className="MyPage" currentItem={this.state.currentItem} /> */}
        </div>
      </div>
    );
  }
}

export default App;
