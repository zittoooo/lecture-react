import store from './js/store.js'

const TabType = {
  KEYWORD: "KEYWORD",
  HISTORY: "HISTROY",
};

const TabLabel = {
  [TabType.KEYWORD]: "추천 검색어",
  [TabType.HISTORY]: "최근 검색어",
};

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
      searchResult: [],
      submitted: false,
      selectedTab: TabType.KEYWORD
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit', this.state.searchKeyword);

    this.search(this.state.searchKeyword);
  }

  search(searchKeyword){
    const searchResult = store.search(searchKeyword);
    this.setState({
      searchResult,
      submitted: true,  // 검색을 하고나면 true로 변경
      });   // 상태 업데이트
  }

  handleReset() {
    // this.setState({searchKeyword: ""});
    this.setState(()=> {
      return {searchKeyword: "", submitted: false};
    }, ()=> {
      console.log('ToDo: handleReset', this.state.searchKeyword);
    });
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0 && this.state.submitted) {
      return this.handleReset();
    }

    this.setState({
      searchKeyword: event.target.value
    });
  }

  render() {
    const searchForm = (
      <form
        onSubmit={event => this.handleSubmit(event)}
        onReset={() => this.handleReset()}
      >
        <input
          type="text"
          placeholder="검색어를 입력하세요"
          autoFocus
          value={this.state.searchKeyword}
          onChange={event => this.handleChangeInput(event)}
        />
        {this.state.searchKeyword.length > 0 && (<button type="reset" className="btn-reset"></button>)}
      </form>
    );

    const searchResult = 
      this.state.searchResult.length > 0 ? (
        <ul className="result">
          {this.state.searchResult.map(item => {
            return (
              <li key={item.id}>
                <img src={item.imageUrl} alt={item.name}></img>
                <p>{item.name}</p>
              </li>
            )
          })}
        </ul>
      ) : (
          <div className="empty-box">검색 결과가 없습니다</div>
        );

    const tabs = (
      <>
        <ul className="tabs">
          {Object.values(TabType).map(tabType => {
            return <li className={this.state.selectedTab === tabType ? "active" : ""}
              onClick={() => this.setState({ selectedTab: tabType })}
              key={tabType}>{TabLabel[tabType]}</li>;
          })}
        </ul>
        {this.state.selectedTab === TabType.KEYWORD && <>TODO: 추천검색어</>}
        {this.state.selectedTab === TabType.HISTORY && <>TODO: 최근 검색어</>}
      </>
    );


    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
          {searchForm}
          <div className="content">
            {this.state.submitted ? searchResult : tabs}
          </div>
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));
