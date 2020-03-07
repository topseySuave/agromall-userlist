import React from 'react';  
import Axios from 'axios';
import queryString from 'query-string';
import Masonry from './Components/Masonry';
import Tile from './Components/Tile';
import RenderModal from './Components/RenderModal';
import Paginate from './Components/Pagination';
import './App.scss';
import AgromallLogo from './agromall-logo.png';

class App extends React.PureComponent{
  constructor(props) {
    super(props);

    this.brakePoints = [350, 500, 750];
    this.handleUserClick = this.handleUserClick.bind(this);
    this.getUsers = this.getUsers.bind(this);
    this.renderPagination = this.renderPagination.bind(this);

    this.state = {
      users: {},
      modalIsOpen: false,
      currentUser: {},
      currentPage: 1,
      pagination: {
        limit: 20,
        offset: 0,
        pageSize: 20,
        total: 0,
      },
    };
  }

  async getUsers () {
    const res = await Axios(`https://theagromall.com/api/v2/get-sample-farmers?page=${this.state.currentPage}&limit=${this.state.pagination.limit}`);
    return res.data;
  }

  async componentDidMount() {
    // parse the page param string to an object
    const params = queryString.parse(window.location.search);

    // // Update the current page when
    // // the params objects is available
    if (params.page) {
      this.setState({
        ...this.state,
        currentPage: parseInt(params.page, 10)
      }, async () => {
        const users = await this.getUsers();
        this.setState({
          ...this.state,
          users: users,
          pagination: { ...this.state.pagination, total: users.data.totalRec }
        });
    
        console.log(users);
      });
    } else {
      const users = await this.getUsers();
      this.setState({
        ...this.state,
        users: users,
        pagination: { ...this.state.pagination, total: users.data.totalRec }
      });
  
      console.log(users);
    }
  }

  handleUserClick(user) {
    this.setState({
      ...this.state,
      currentUser: user,
      modalIsOpen: !this.state.modalIsOpen
    });
  };

  handlePageChange(current) {
    const query = queryString.stringify({
      page: current
    });
    console.log('current ===> ', current);
    window.location.href = `/?${query}`;
  }

  renderPagination() {
    return (
      <div style={{
        alignContent: 'center',
        margin: '50px auto',
        width: '70%'
      }}>
        <Paginate
          pagination={this.state.pagination}
          currentPage={this.state.currentPage}
          handlePageChange={this.handlePageChange}
        />
      </div>
    );
  }

	render(){
		return (
			<div className="container">
				<div className="masonry-container">
					<center><img src={AgromallLogo} alt="Agromall" /></center>
          <h1><center>Farmers List</center></h1>
          {
            this.state.users.data ?
              <>
                {this.renderPagination()}
                <Masonry brakePoints={this.brakePoints}>
                {
                  this.state.users.data.farmers.map((user, i) => {
                    return <Tile
                      key={i}
                      imageData={user}
                      imageBaseUrl={this.state.users.data.imageBaseUrl}
                      handleUserClick={this.handleUserClick}
                    />
                  })
                }
              </Masonry>
            </> : 
            <p>Loading...</p>
          }
				</div>
        {this.state.modalIsOpen && 
        <RenderModal
          currentUser={this.state.currentUser}
          imageBaseUrl={this.state.users.data.imageBaseUrl}
          handleUserClick={this.handleUserClick}
        />}
			</div>
		)
	}
}

export default App;
