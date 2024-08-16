import React, { Component } from 'react';
import DataTable from 'react-data-table-component';
import axios from 'axios';

class PagesTable extends Component {
  constructor() {
    super();
    this.state = {
      pages: [],
      filteredPages: [],
      loading: true,
      searchQuery: ''
    };

    this.handleSearch = this.handleSearch.bind(this);
    this.handleEdit = this.handleEdit.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
  }

  componentDidMount() {
    axios.get('http://localhost:5000/users/all-pages')
      .then(res => {
        this.setState({
          pages: res.data,
          filteredPages: res.data,
          loading: false
        });
      })
      .catch(err => {
        console.error(err);
        this.setState({ loading: false });
      });
  }

  handleSearch(event) {
    const query = event.target.value.toLowerCase();
    this.setState({ searchQuery: query });

    const filteredPages = this.state.pages.filter(page => {
      return (
        page.title.toLowerCase().includes(query) ||
        page.content.toLowerCase().includes(query) ||
        page.img.toLowerCase().includes(query)
      );
    });

    this.setState({ filteredPages });
  }

  handleEdit(id) {
    console.log(`Edit page with ID: ${id}`);
    // Here you can add the logic to navigate to an edit page or open an edit modal
  }

  handleDelete(id) {
    if (window.confirm("Are you sure you want to delete this page?")) {
      axios.delete(`http://localhost:5000/users/delete-page/${id}`)
        .then(res => {
          this.setState({
            pages: this.state.pages.filter(page => page.id !== id),
            filteredPages: this.state.filteredPages.filter(page => page.id !== id)
          });
        })
        .catch(err => {
          console.error(err);
        });
    }
  }

  render() {
    const columns = [
      {
        name: 'ID',
        selector: row => row.id,
        sortable: true,
      },
      {
        name: 'Title',
        selector: row => row.title,
        sortable: true,
      },
      {
        name: 'Content',
        selector: row => row.content,
        sortable: true,
      },
      {
        name: 'Image',
        selector: row => row.img,
        cell: row => <img src={`http://localhost:5000/uploads/${row.img}`} alt={row.title} width="50" />,
      },
      {
        name: 'Actions',
        cell: row => (
          <div>
            <button
              className="btn btn-warning btn-sm mr-2"
              onClick={() => this.handleEdit(row.id)}
            >
              Edit
            </button>
            <button
              className="btn btn-danger btn-sm"
              onClick={() => this.handleDelete(row.id)}
            >
              Delete
            </button>
          </div>
        ),
        ignoreRowClick: true,
        allowOverflow: true,
        button: true,
      }
    ];

    return (
      <div className="container mt-5">
        <h1 className="text-center mb-4">Pages Data Table</h1>
        <div className="form-group mb-4">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            value={this.state.searchQuery}
            onChange={this.handleSearch}
          />
        </div>
        <DataTable
          columns={columns}
          data={this.state.filteredPages}
          progressPending={this.state.loading}
          pagination
        />
      </div>
    );
  }
}

export default PagesTable;
