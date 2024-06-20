import React from 'react';
import { connect } from 'react-redux';

class ComB extends React.Component {
  render() {
    return (
      <div>
        {this.props.count}
      </div>
    );
  }
}
const mapStateToProps = (state:any) => {
    return state
}
export default connect(mapStateToProps,null)(ComB)