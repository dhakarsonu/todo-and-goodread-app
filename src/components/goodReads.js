import React, { Component } from 'react';
import '../styles/goodreads.css';
import fetchAPI from '../utils/helper';
import Book from './book';

const apiKey = "8g2Ric2Pf4Dczz0hNxgg";

class GoodReads extends Component {

    constructor(props){
      super(props);
      this.state = {
          books : [],
          searchText: "",
          error: "",
          fetchingData: false,
      }
      this.searchBooks = this.searchBooks.bind(this);
      this.page =1;
    }

    async searchBooks() {
        if(!this.state.searchText)
            return;

        this.setState({fetchingData:true});
       
        const requestUri = `https://cors-anywhere.herokuapp.com/` + `https://www.goodreads.com/search/index.xml?key=${apiKey}&q=${this.state.searchText}&page=${this.page}`
        const result = await fetchAPI(requestUri);
        this.parseXMLResponse(result);
    };



    // parse string xml received from goodreads api
    parseXMLResponse = response => {
        const parser = new DOMParser();
        const XMLResponse = parser.parseFromString(response, "text/xml");
        const parseError = XMLResponse.getElementsByTagName("parsererror");

        if (parseError.length) {
        this.setState({
            error: "Error while searching books!",
            fetchingData: false
        });
        } else {
            const XMLresults = new Array(...XMLResponse.getElementsByTagName("work"));
            const searchResults = XMLresults.map(result => this.XMLToJson(result));

            let totoalReuslts = XMLResponse.getElementsByTagName("total-results");
            totoalReuslts = totoalReuslts.length ? parseInt(totoalReuslts[0].innerHTML) : 0;
            let maxPage = parseInt(totoalReuslts/20);

            let resultStart = XMLResponse.getElementsByTagName("results-start");
            resultStart = resultStart.length ? resultStart[0].innerHTML : "";

            let resultEnd = XMLResponse.getElementsByTagName("results-end");
            resultEnd = resultEnd.length ? resultEnd[0].innerHTML : "";
            
            this.setState({ fetchingData: false, books : searchResults, totoalReuslts, maxPage,resultStart,resultEnd});

            console.log(this.state);
        }
    };

    // Function to convert simple XML document into JSON.
    XMLToJson = XML => {
        const allNodes = new Array(...XML.children);
        const jsonResult = {};
        allNodes.forEach(node => {
            if (node.children.length) {
            jsonResult[node.nodeName] = this.XMLToJson(node);
            } else {
            jsonResult[node.nodeName] = node.innerHTML;
            }
        });
        return jsonResult;
    };

    onTextChange = e => {
        this.setState({
          searchText: e.target.value
        });
    };

    onKeyUpHandler = e =>{
        if(e.keyCode === 13){
            e.target.nextElementSibling.click();
        }
    }

    renderLoader = () =>{
        if(!this.state.fetchingData)
            return "";

        return (
            <div className="loader">
                <img src="https://i.gifer.com/VAyR.gif"/>
            </div>
        );
    }

    pageInfo = () =>{
        if((!this.state.resultStart && !this.state.resultEnd) || this.state.resultEnd === "0")
            return "";

        return (
            <div className="page-info">
                <span>{this.state.resultStart} - {this.state.resultEnd}</span>
            </div>
        );
    };

    renderBooks = () =>{
        if(!this.state.books.length){
            return (
                <div className="empty-view">
                    <span>There is no books here, please search</span>
                </div>
            );
        }
        return this.state.books.map((book)=>{
            return <Book book={book} />
        })
    };
  
    render() {
      return (
        <div className="goodreads-wrapper">
          <header>
              <a href="/goodreads">Good Reads App</a>
              <div className="left">
                <input type="text" 
                    placeholder="Search Book" 
                    onChange={this.onTextChange}
                    onKeyUp={this.onKeyUpHandler}
                    value={this.state.searchText}
                />
                <button onClick= {
                    ()=>{this.page = 1; this.searchBooks();}
                }>Go</button>
              </div>
              <div className="right">
                <a href="#" onClick= {
                    ()=>{this.page = 1; this.searchBooks();}
                }>First</a>
                <a href="#" onClick= {
                    ()=>{
                        if(this.page === 1){
                            this.searchBooks();
                        }else{
                            this.page -= 1; 
                            this.searchBooks();
                        }
                    }
                }>Previous</a>
                <span>Page</span>
                <a href="#" onClick= {
                    ()=>{
                        if(this.page === this.state.maxPage){
                            this.searchBooks();
                        }else{
                            this.page += 1; 
                            this.searchBooks();
                        }
                    }
                }>Next</a>
                <a href="#" onClick= {
                    ()=>{this.page = this.state.maxPage; this.searchBooks();}
                }>Last</a>
                {
                    this.pageInfo()
                }
              </div>
          </header>
          <main>
            {
                this.renderBooks()
            }
            {
                this.renderLoader()
            }
          </main>
        </div>
      );
    }
  }
  
  export default GoodReads;