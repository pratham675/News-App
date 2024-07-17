import React, { Component } from "react";
import NewsItem from "./NewsItem";
import PropTypes from "prop-types";

export class News extends Component {
  static defaultProps = {
    country: "in",
    pageSize: 8,
    category: "general",
  };
  static propTypes = {
    country: PropTypes.string,
    pageSize: PropTypes.number,
    category: PropTypes.string,
  };
  constructor() {
    super();
    this.state = {
      articles: [],
      loading: false,
      page: 1,
    };
  }

  async componentDidMount() {
    let url = `https://newsapi.org/v2/top-headlines?country=${this.props.country}&category=${this.props.category}&apiKey=75f3e4ca2d1641ad88854df373db88e8&page=1&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({
      articles: parsedData.articles,
      totalResults: parsedData.totalResults,
    });
  }

  handleNextClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=75f3e4ca2d1641ad88854df373db88e8&page=${
      this.state.page + 1
    }&pageSize=${this.props.pageSize}`;

    if (
      this.state.page + 1 >
      Math.ceil(this.state.totalResults / this.props.pageSize)
    ) {
    } else {
      let data = await fetch(url);
      let parsedData = await data.json();
      console.log(parsedData);
      this.setState({ articles: parsedData.articles });
      this.setState({
        page: this.state.page + 1,
      });
    }
  };

  handlePrevClick = async () => {
    let url = `https://newsapi.org/v2/top-headlines?country=${
      this.props.country
    }&category=${
      this.props.category
    }&apiKey=75f3e4ca2d1641ad88854df373db88e8&page=${
      this.state.page - 1
    }&pageSize=${this.props.pageSize}`;
    let data = await fetch(url);
    let parsedData = await data.json();
    console.log(parsedData);
    this.setState({ articles: parsedData.articles });
    this.setState({
      page: this.state.page - 1,
    });
  };
  render() {
    return (
      <div className="container my-3">
        <h1 className="text-center">MonkeyNews - Top Headlines</h1>

        <div className="row">
          {this.state.articles.map((element) => {
            return (
              <div className="col-md-4" key={element.url}>
                <NewsItem
                  title={element.title ? element.title.slice(0, 45) : ""}
                  description={
                    element.description ? element.description.slice(0, 88) : ""
                  }
                  imageUrl={element.urlToImage}
                  newsUrl={element.url}
                />
              </div>
            );
          })}
          <div className="container d-flex justify-content-between">
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={this.handlePrevClick}
              disabled={this.state.page <= 1}
            >
              <i class="bi bi-arrow-left"></i>
              Previous
            </button>
            <button
              type="button"
              className="btn btn-outline-dark"
              onClick={this.handleNextClick}
              disabled={
                this.state.page + 1 >
                Math.ceil(this.state.totalResults / this.props.pageSize)
              }
            >
              Next
              <i className="bi bi-arrow-right"></i>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default News;
