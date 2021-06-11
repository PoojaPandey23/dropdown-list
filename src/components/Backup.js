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
             errorMsg: ''
        };
    }

    componentDidMount(){
        axios.get('https://data.askbhunte.com/api/v1/districts')
        .then(response => {
            this.setState({list: response.data})
        })
        .catch(error => {
            this.setState({errorMsg: 'Error'})
        })
    }

    clickHandler = (event) => {
        this.setState({value: event.target.value})
    }
    
    // buttonhandler = (event) => {
    //     this.setState({
    //         list: event.target.value
    //     })
    //     // axios.post('https://data.askbhunte.com/api/v1/districts',this.state)
    //     // .then(response => {
    //     //     console.log(response)
    //     // })
    //     // .catch(error => {
    //     //     console.log(error)
    //     // })
    //     this.setState({message: true})
    //     //console.log(`the button is clicked + ${this.state.value}`)
    // }

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

    
    render(){
        let districts = this.state.list.map(d => (
            <option value = {d.id}>{d.title}</option>
        ));

        return (
            <div>
                Pick your district:
                <select value={this.state.value} onChange={this.clickHandler}>
                    {districts}
                </select>
                <button onClick = {this.buttonhandler}>Submit</button>
                {/* <button>Submit</button> */}
                {this.state.message && <p>You selected {this.state.value}</p>}
            </div>
        );
    }
            
    }

export default Dropdown


////////
    // render() {
    //     const {list} = this.state
    //     //let message

    //     return(
    //         <div>
    //             {/* <Display msg="Select"></Display> */}
    //             <label>Pick the state:
    //             <select value = {this.state.value} onChange={this.clickHandler}>
    //                 <option value ="state">Select the state</option>
    //                 <option value ="state1">State1</option>
    //                 <option value ="state2">State2</option>
    //                 <option value ="state3">State3</option>
    //                 <option value ="state4">State4</option>
    //                 <option value ="state5">State5</option>
    //             </select>
    //             </label>
    //             <button onClick={this.buttonhandler}>Submit</button>
    //             <div>
    //                 {
    //                     list.length?
    //                     list.map(post => <div key = {post.id}>{post.title}</div>):
    //                     null
    //                 }
    //                 console.log({this.list})
    //             </div>
                
    //             {/* if({this.state.value} == 'state'){
    //                 <div>You selected nothing</div>
    //             }
    //             else{
    //                 <div>{this.state.message && <p>You selected {this.state.value}</p>}</div>
    //             } */}
    //             {this.state.message && <p>You selected {this.state.value}</p>}
    //         </div>
    //     )
    ///////


    // <form>
            //     <label>Pick the state:
            //     <select value = {this.state.value} onChange={this.clickHandler}>
            //         <option value ="">Select the state</option>
            //         <option value ="state1">State1</option>
            //         <option value ="state2">State2</option>
            //         <option value ="state3">State3</option>
            //         <option value ="state4">State4</option>
            //         <option value ="state5">State5</option>
            //     </select>
            //     </label>
            //     </form>
