import React, { Component } from 'react';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/SearchBar';
import VideoList from  './components/VideoList';
import VideoDetail from  './components/VideoDetail';
import _ from 'lodash';

//fetch youTube api data
const API_KEY = 'AIzaSyB5c_VOafhM16vPC2zXuz6q0StSdgL1Flg';

//create a component
class App extends Component {
    constructor(props) {
        super(props);
        this.state = {
            videos: [], //array w/ a list of objects
            selectedVideo: null
        };

        this.videoSearch('messi');
    }

    /*downwards data flow means that only the most parent component in a application should be responsible for fetching data
     index.js is the most parent component we have here*/

    //video search()
    videoSearch(search) {
        YTSearch({key: API_KEY, term: search}, (data) =>{
            this.setState({
                videos: data,
                selectedVideo: data[0]
            });
            console.log(data);
        });
    }

    render() {
        /*Lodash contains several utilities methods, debounce is one of them.
         Debounce can throttle how often a function is called*/
        const userSearch = _.debounce((search) => {this.videoSearch(search)}, 500);
        return (
            <div>
                <SearchBar onSearchTermChange={userSearch}/>
                <VideoDetail video={this.state.selectedVideo}/>
                <VideoList
                    /*pass data from parent component to its child*/
                    videos={this.state.videos}
                    onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                />
            </div>
        )
    }
}

export default App;
