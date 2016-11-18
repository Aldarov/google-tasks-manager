import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';

const TaskListCreateModal = React.createClass({
  getInitialState: function() {
    return {
      name: ''
    };
  },

  handleClose() {
    const { onClose } = this.props;

    this.setState({ name: '' });

    if (onClose) {
      onClose();
    }
  },

  handleSubmit() {
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit({
        name: this.state.name
      });
    }

    this.setState({ name: '' });
  },

  handleTextChange(e) {
    this.setState({
      name: e.target.value
    });
  },

  render () {
    const { name } = this.state;
    const { isOpen } = this.props;

    return (
      <Dialog
        contentStyle={{ maxWidth: 400 }}
        actions={[
          <FlatButton
            label="Отмена"
            onTouchTap={this.handleClose}
          />,
          <FlatButton
            primary
            label="Сохранить"
            onTouchTap={this.handleSubmit}
            disabled={!name}
          />
        ]}
        open={isOpen}
        onRequestClose={this.handleClose}
        className="TaskListCreateModal"
      >
        <h3 className="TaskListCreateModal__modal-title">Добавление нового списка задач</h3>
        <TextField
          fullWidth
          ref={c => this.taskInput = c}
          value={name}
          onChange={this.handleTextChange}
          hintText="например, посмотреть фильмы"
          floatingLabelText='Введите имя списка задач'
        />
      </Dialog>
    );
  }
})

export default TaskListCreateModal;
