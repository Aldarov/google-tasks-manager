import React from 'react';

import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';

import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/ru-RU';

import './TaskCreateModal.scss';

function resetState() {
  return {
    text: "",
    notes: "",
    due: {}
  };
}

const TaskCreateModal = React.createClass({
  getInitialState: function() {
    return resetState();
  },

  handleClose() {
    const { onClose } = this.props;

    this.setState(resetState());

    if (onClose) {
      onClose();
    }
  },

  handleSubmit() {
    const { onSubmit } = this.props;

    if (onSubmit) {
      onSubmit({
        text: this.state.text,
        notes: this.state.notes,
        due: this.state.due
      });
    }

    this.setState(resetState());
  },

  handleTextChange(e) {
    this.setState({
      text: e.target.value
    });
  },

  handleNotesChange(e) {
    this.setState({
      notes: e.target.value
    });
  },

  handleDueChange(e, d) {
    this.setState({
      due: d
    });
  },

  render () {
    const { text, notes, due } = this.state;
    const { isOpen } = this.props;

    return (
      <Dialog
        contentStyle={{ maxWidth: 600 }}
        actions={[
          <FlatButton
            label='Добавить'
            disabled={!text}
            onTouchTap={this.handleSubmit}
          />,
          <FlatButton
            label='Отмена'
            onTouchTap={this.handleClose}
          />
        ]}
        open={isOpen}
        autoScrollBodyContent={true}
        onRequestClose={this.handleClose}
      >
        <div className="TaskCreateModal">
          <h3 className="TaskCreateModal__modal-title">Добавить задачу</h3>
          <TextField
            fullWidth
            hintText="Введите наименование задачи"
            floatingLabelText="Задача"
            ref={c => this.inputText = c}
            value={this.state.text}
            onChange={this.handleTextChange}
          />
          <TextField
            fullWidth
            floatingLabelText="Описание задачи"
            hintText="Введите описание задачи"
            multiLine={true}
            rows={1}
            ref={c => this.inputNotes = c}
            value={this.state.notes}
            onChange={this.handleNotesChange}
          />
          <DatePicker
            onChange={this.handleDueChange}
            value={this.state.due}
            floatingLabelText="Срок выполнения"
            hintText="Введите срок выполнения"
            autoOk={true}
            DateTimeFormat={IntlPolyfill.DateTimeFormat}
            locale="ru-Ru"
            okLabel="Ок"
            cancelLabel="Отмена"
          />
        </div>
      </Dialog>
    );
  }
})

export default TaskCreateModal;
