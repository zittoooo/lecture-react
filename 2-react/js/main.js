class App extends React.Component {
  constructor() {
    super();

    this.state = {
      searchKeyword: "",
    };
  }

  handleSubmit(event) {
    event.preventDefault();
    console.log('handleSubmit', this.state.searchKeyword);
  }

  handleReset(event) {
    // this.setState({searchKeyword: ""});

    this.setState(
      ()=> {
      return {searchKeyword: ""};
    }, ()=> {
      console.log('ToDo: handleReset', this.state.searchKeyword);
    });
  }

  handleChangeInput(event) {
    const searchKeyword = event.target.value;

    if (searchKeyword.length <= 0) {
      return this.handleReset();
    }

    this.setState({
      searchKeyword: event.target.value
    });
  }

  render() {
    // let resetButton = null;

    // if (this.state.searchKeyword.length > 0) {
    //   resetButton = <button type="reset" className="btn-reset"></button>
    // }

    return (
      <>
        <header>
          <h2 className="container">검색</h2>
        </header>
        <div className="container">
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
        </div>
      </>
    );
  }
}

ReactDOM.render(<App />, document.querySelector("#app"));