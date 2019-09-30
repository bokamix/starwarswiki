import React, { Component } from "react";

import axios from "axios";


class AddListForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false,
      planets: [],
      
    };
    
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
   

   
  }


  open() {
    this.setState({ expanded: !this.state.expanded });
  }

  close() {
    this.setState({ expanded: !this.state.expanded });
  }






  render() {
    
    

    return (
        <>
    <div>Amaratnus</div>
    
        </>

    )
        
  }
}

export default AddListForm;
