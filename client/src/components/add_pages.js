import React, { Component } from 'react';
import { add_new_page } from './UserFunctions';
import jwt_decode from 'jwt-decode';

class add_pages extends Component {
  constructor() {
    super();
    this.state = {
      title: '',
      content: '',
      img: null, // changed to null to handle file uploads
      errors: {}
    };

    this.onChange = this.onChange.bind(this);
    this.onFileChange = this.onFileChange.bind(this);
    this.onSubmit = this.onSubmit.bind(this);
  }

  componentDidMount() {
    if (localStorage.getItem('usertoken') !== null) {
      const token = localStorage.getItem('usertoken');
      const decoded = jwt_decode(token);
      this.setState({
        publisher_id: decoded.id
      });
    }
  }

  onChange(e) {
    this.setState({ [e.target.name]: e.target.value });
  }

  onFileChange(e) {
    this.setState({ img: e.target.files[0] });
  }

  onSubmit(e) {
    e.preventDefault();
    const formData = new FormData();
    formData.append('title', this.state.title);
    formData.append('content', this.state.content);
    formData.append('img', this.state.img);

    add_new_page(formData).then(res => {
      // this.props.history.push(`/login`);
    });
  }

  render() {
    if (localStorage.getItem('usertoken') !== null) {
      return (
        <div className="container">
          <div className="row">
            <div className="col-md-6 mt-5 mx-auto">
              <form noValidate onSubmit={this.onSubmit}>
                <h1 className="h3 mb-3 font-weight-normal">Add Pages</h1>
                <div className="form-group">
                  <label htmlFor="title">Title</label>
                  <input
                    type="text"
                    className="form-control"
                    name="title"
                    placeholder="Enter the title"
                    value={this.state.title}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="content">Content</label>
                  <input
                    type="text"
                    className="form-control"
                    name="content"
                    placeholder="Enter the content"
                    value={this.state.content}
                    onChange={this.onChange}
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="img">Image</label>
                  <input
                    type="file"
                    className="form-control"
                    name="img"
                    onChange={this.onFileChange}
                  />
                </div>
                <button
                  type="submit"
                  className="btn btn-lg btn-primary btn-block"
                >
                  Add Page
                </button>
              </form>
            </div>
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <h3 className=" font-style-bold text-center pt-5">Please Login</h3>
        </div>
      );
    }
  }
}

export default add_pages;