import React, { Component } from 'react'
import axios from 'axios'
//import Display from './components/Display'

class Dropdown extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             value : '',
             message: false,
             list: [],
             errorMsg: '',
             title : ''
        };
    }

    //for getting api using axios http library
    componentDidMount(){
        axios.get('https://data.askbhunte.com/api/v1/districts')
        .then(response => {
            this.setState({list: response.data})
        })
        .catch(error => {
            this.setState({errorMsg: 'Error'})
        })
    }

    

    //for submit button click //not working
    buttonhandler = (event) => {
        this.setState({
            list: event.target.value
        })
        axios.post('https://data.askbhunte.com/api/v1/districts',this.state)
        .then(response => {
            console.log(response)
        })
        .catch(error => {
            console.log(error)
        })
        this.setState({message: true})
        //console.log(`the button is clicked + ${this.state.value}`)
    }

    //for handling the change in the dropdown list
    clickHandler = (event) => {
        this.setState({value: event.target.value})
    }

    //for weather api //not working
    handleDropdownChange = (e) => {
        if(e.target.value !== ""){
            //e.target.value = 'dang';
            let apiUrl = 'https://data.askbhunte.com/api/v1/districts'+e.target.value;
            //let apiUrl = 'https://nepal-weather-api.herokuapp.com/api/?place=dang';
            axios.get(apiUrl)
        .then(response => {
            console.log(response);
            this.setState({list: response.data})
        })
        .catch(error => {
            this.setState({errorMsg: 'Error'})
        })
            //this.setState({ value: e.target.value });
        }
        
      }

      handleButton() {
      }
    
    render(){
        let districts = this.state.list.map(d => (
            <option value = {d.title}>{d.title}</option>
        ));

        return (
            <div>
                Pick your district:
                <select value={this.state.value} onChange={this.clickHandler}>
                    {districts}
                </select>
                <button onClick = {this.handleButton}>Submit</button>
                { <p>You selected {this.state.value}</p>}
                
            </div>
            
        );
    }

    }

export default Dropdown
