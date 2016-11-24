import React from 'react';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';

function resetState() {
  return {
    open: false,
    question: '',
    callback: undefined
  };
}

const DialogQuestion = React.createClass({
  getInitialState: function() {
    return resetState();
  },

  showQuestion(question, callback) {
    this.setState({
        question: question,
        open: true,
        callback: callback
    });
  },

  handleYes() {
    if (this.state.callback)
      this.state.callback();

    this.setState(resetState());
  },

  handleNo() {
    this.setState(resetState());
  },

  render() {
    return (
      <div>
        <Dialog
          actions={[
            <FlatButton
              label="Да"
              primary={true}
              onTouchTap={this.handleYes}
              onClick={this.handleYes}
            />,
            <FlatButton
              label="Нет"
              primary={true}
              onTouchTap={this.handleNo}
              onClick={this.handleNo}
            />,
          ]}
          title={this.props.title}
          maxWidth={this.props.maxWidth}
          modal={false}
          open={this.state.open}
          onRequestClose={this.handleNo}
        >
          {this.state.question}
        </Dialog>
      </div>
    );
  }
})

export default DialogQuestion;
