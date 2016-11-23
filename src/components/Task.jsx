import React from 'react';

import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';
import DatePicker from 'material-ui/DatePicker';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

import IntlPolyfill from 'intl';
import 'intl/locale-data/jsonp/ru-RU';
import moment from 'moment';

import './Task.scss';

const ENTER_KEY = 13;
const ESC_KEY = 27;

const Task = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false,
      text: this.props.task.text,
      notes: this.props.task.notes,
      due: this.props.task.due
    };
  },

  handleEdit(e) {
    this.setState({ isEditing: true }, this.focusInput);
  },

  handleDelete() {
    this.deleteTask();
  },

  handleCancel() {
    this.cancelTask();
  },

  handleSave() {
    this.saveTask();
  },

  handleCheck() {
    this.props.onStatusChange({
      isCompleted: !this.props.isCompleted
    });
  },

  focusInput() {
    this.inputText.focus();
  },

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.saveTask();
    }

    if (e.keyCode === ESC_KEY) {
      this.cancelTask();
    }
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

  saveTask() {
    this.props.onUpdate({
      text: this.state.text,
      notes: this.state.notes,
      due: this.state.due
    });

    this.setState({ isEditing: false });
  },

  deleteTask() {
    this.props.onDelete();

    this.setState({ isEditing: false });
  },

  cancelTask() {
    this.setState({ isEditing: false });
  },

  render () {
    return (
      this.state.isEditing
      ?
        <div className="Task editing">
          <TextField
            fullWidth
            hintText="Введите наименование задачи"
            ref={c => this.inputText = c}
            value={this.state.text}
            onChange={this.handleTextChange}
            onKeyDown={this.handleKeyDown}
          />
          <TextField
            fullWidth
            className="Task__notes"
            hintText="Введите описание задачи"
            multiLine={true}
            rows={3}
            ref={c => this.inputNotes = c}
            value={this.state.notes}
            onChange={this.handleNotesChange}
          />
          <DatePicker
            onChange={this.handleDueChange}
            value={this.state.due}
            hintText="Введите срок выполнения"
            autoOk={true}
            DateTimeFormat={IntlPolyfill.DateTimeFormat}
            locale="ru-Ru"
            okLabel="Ок"
            cancelLabel="Отмена"
          />
          <div className="Task__toolbar">
            <div>
              <RaisedButton primary onClick={this.handleSave} label='Сохранить' />
              <FlatButton onClick={this.handleCancel} label='Отмена'/>
            </div>
          </div>
        </div>
      :
        <div className="Task">
          <Checkbox
            className='Task__checkbox'
            checked={this.props.isCompleted}
            onCheck={this.handleCheck}
          />

          <div className="Task__text" onClick={this.handleEdit}>
            <div className="TasksPage__title">{this.props.task.text}</div>
          </div>

          <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}>
            <MenuItem onClick={this.handleEdit} >Редактировать</MenuItem>
            <MenuItem onClick={this.handleDelete}>Удалить</MenuItem>
          </IconMenu>
        </div>
    );
  }
});

export default Task;
