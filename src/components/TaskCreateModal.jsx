import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const TaskCreateModal = React.createClass({
  getInitialState: function() {
    return {
      text: ''
    };
  },

  handleClose() {
    const { onClose } = this.props;

    this.setState({ text: '' });

    if (onClose) {
      onClose();
    }
  },

  handleSubmit() {
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit({
        text: this.state.text
      });
    }

    this.setState({ text: '' });
  },

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  },

  render () {
    const { text } = this.state;
    const { isOpen } = this.props;

    return (
      <Dialog
        className="TaskCreateModal"
        contentStyle={{ maxWidth: 400 }}
        actions={[
          <FlatButton
            label='Отмена'
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            label='Добавить'
            disabled={!text}
            onTouchTap={this.handleSubmit}
          />
        ]}
        open={isOpen}
        onRequestClose={this.handleClose}
      >
        <h3 className="TaskCreateModal__modal-title">Добавить задачу</h3>
        <TextField
          ref={c => this.taskInput = c}
          value={text}
          onChange={this.handleTextChange}
          hintText='например: "купить бутылку молока"'
          floatingLabelText='Введите описание задачи'
        />
      </Dialog>
    );
  }
})

export default TaskCreateModal;
