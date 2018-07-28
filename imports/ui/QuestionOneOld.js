// import React from 'react';
// import ReactDOM from 'react-dom';
// import QuestionTwo from './QuestionTwo';
//
//
// export default class QuestionOne extends React.Component {
//   constructor(){
//     super();
//     this.state={
//       ageGroup:""
//     };
//     this.handleChange=this.handleChange.bind(this);
//     this.handleSubmit=this.handleSubmit.bind(this);
//   }
//   render() {
//     return (
//
//       <div>
//         <form className='questionList' onSubmit={this.handleSubmit}>
//             <p>1. what is your age group?</p>
//
//             <label className="checkBox">18-25
//               <input type="radio" value="18-25" checked={this.state.ageGroup==="18-25"} onChange={this.handleChange}/>
//
//             </label>
//
//             <label className="checkBox">26-35
//               <input type="radio" value="26-35" checked={this.state.ageGroup==="26-35"} onChange={this.handleChange}/>
//
//             </label>
//
//             <label className="checkBox">36-45
//               <input type="radio" value="36-45" checked={this.state.ageGroup==="36-45"} onChange={this.handleChange}/>
//
//             </label>
//
//             <button type="submit">Make your choice</button>
//           </form>
//
//         );
//   }
//
//
//   handleChange(event){
//     this.setState({
//       ageGroup:event.target.value
//     });
//   }
//
//
//   handleSubmit(event){
//     event.preventDefault();
//     alert(`you have chosen ${this.state.ageGroup} Age Group`);
//   }
// }
