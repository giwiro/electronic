// @flow
import React, { Component } from 'react';
import styles from './style.css';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Button from 'material-ui/Button';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import type { ValidationType } from '../../utils/form';
import { validateSingle } from '../../utils/form';

export default class Login extends Component {
  props: {
    login: (username: string, password: string) => {},
    isAuth: boolean,
    user: any
  };
  onChange: Function;
  onSave: Function;

  constructor(props: any) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onSave = this.onSave.bind(this);
  }

  state = {
    usernameInput: {
      value: '',
      errors: undefined,
      pristine: true
    },
    passwordInput: {
      value: '',
      errors: undefined,
      pristine: true
    }
  };

  onSave(event: any) {
    event.preventDefault();
    const { usernameInput, passwordInput } = this.state;
    this.props.login(usernameInput.value, passwordInput.value);
  }

  onChange(validators: Array<ValidationType>, event: any) {
    const key = `${event.target.name}Input`;
    this.setState({
      [key]: {
        value: event.target.value,
        errors: validateSingle(validators, event.target.value),
        pristine: false
      }
    });
  }

  bindValidatorsToChanges(validators: Array<ValidationType>) {
    return this.onChange.bind(this, validators);
  }

  render() {
    const { usernameInput, passwordInput } = this.state;
    const { isAuth } = this.props;
    const disabled = !!usernameInput.errors || usernameInput.pristine ||
      !!passwordInput.errors || passwordInput.pristine;
    return (
      <section className={styles.main_wrap} >
        <div className={styles.draggable} />
        <section className={styles.form_wrap}>
          <AppBar position="static">
            <Toolbar>
              <Typography type="title" color="inherit">
                Login
              </Typography>
            </Toolbar>
          </AppBar>
          <form className={styles.form} onSubmit={this.onSave}>
            <TextField
              label="Username"
              name="username"
              error={!!usernameInput.errors}
              onChange={this.bindValidatorsToChanges(['required'])}
              disabled={isAuth}
              fullWidth
              autoFocus
            />
            <br /><br />
            <TextField
              label="Password"
              type="password"
              name="password"
              error={!!passwordInput.errors}
              onChange={this.bindValidatorsToChanges(['required'])}
              disabled={isAuth}
              fullWidth
            />
            <br /><br /><br /><br />
            <Button
              type="submit"
              className={styles.button}
              color="primary"
              disabled={disabled || isAuth}
              onClick={this.onSave}
              raised
            >Ingresar
            </Button>
          </form>
        </section>
      </section>
    );
  }
}
