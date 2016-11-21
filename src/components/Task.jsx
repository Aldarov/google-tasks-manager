import React from 'react';

import Checkbox from 'material-ui/Checkbox';
import FlatButton from 'material-ui/FlatButton';
import RaisedButton from 'material-ui/RaisedButton';

import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';

import IconButton from 'material-ui/IconButton';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';


import './Task.scss';

const ENTER_KEY = 13;
const ESC_KEY = 27;

const Task = React.createClass({
  getInitialState: function() {
    return {
      isEditing: false
    };
  },

  handleEdit(e) {
    this.setState({ isEditing: true }, this.focusInput);
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
    this.input.focus();
  },

  handleKeyDown(e) {
    if (e.keyCode === ENTER_KEY) {
      this.saveTask();
    }

    if (e.keyCode === ESC_KEY) {
      this.cancelTask();
    }
  },

  saveTask() {
    this.props.onUpdate({ text: this.input.value });

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
          <input
            className="Task__input"
            type='text'
            defaultValue={this.props.text}
            ref={c => this.input = c}
            onKeyDown={this.handleKeyDown}
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
            <div className="TasksPage__title">{this.props.text}</div>
          </div>

          <IconMenu iconButtonElement={<IconButton><MoreVertIcon/></IconButton>}>
            <MenuItem onClick={this.handleEdit} >Редактировать</MenuItem>
            <MenuItem>Удалить</MenuItem>
          </IconMenu>
        </div>
    );
  }
});

export default Task;
