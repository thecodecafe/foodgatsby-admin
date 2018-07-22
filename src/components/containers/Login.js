import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import LinearProgress from '@material-ui/core/LinearProgress';
import grey from '@material-ui/core/colors/grey';
import red from '@material-ui/core/colors/red';
import { connect } from 'react-redux';
import Validator from '../../modules/validator';
import * as Rules from '../../helpers/Rules';
import { bindActionCreators } from 'redux';
import { ActionCreators } from '../../data/actionCreators';
const logo = require('../../assets/logo.png');

const styles = theme => ({
    root: {
        display: 'flex',
        justifyContent: 'center',
        height: '100%',
        overflow: 'auto'
    },
    content: {
        marginTop: 100,
        width: '100%',
        maxWidth: 450
    },
    title: {
        fontSize: 18,
        marginTop: 20
    },
    fieldset: {
        border: 'none !important',
        padding: 0,
        margin: 0
    },
    fieldcontainer: {
        width: '100%'
    },
    formControls: {
        width: '100%',
        marginTop: 30
    },
    buttonContainer: {
        textAlign: 'right',
        marginTop: 45,
        marginBottom: 50
    },
    copyright: {
        fontSize: 13,
        color: grey[500],
        textAlign: 'center',
        padding: 15,
        marginBottom: 20
    },
    brandContainer: {
        width: '100%',
        textAlign: 'left',
        marginBottom: 0
    },
    brand: {
        display: 'inline-block',
        width: 150,
        marginTop: 50
    },
    error: {
        fontSize: 13,
        color: red[600]
    }
});

let Template = ({fn, classes, auth, showPassword, form, date}) => (
    <div className={`${classes.root}`}>
        {/* validator component */}
        <Validator rules={fn.rules()} 
            messages={fn.messages()} form={form} 
            onChange={fn.handleValidatorChange}/>

        {/* centralized content */}
        <div className={classes.content}>
            <form onSubmit={fn.handleOnSubmit}>
            <fieldset className={classes.fieldset} >
            <Card>
                {/* linear progresh displays when login starts */}
                { auth.isFetching && <LinearProgress color='primary' /> }
                <CardContent>
                    {/* brand */}
                    <div className={` ${classes.brandContainer}`}>
                        <img src={logo} className={` ${classes.brand}`}/>
                    </div>

                    {/* form title */}
                    <Typography className={classes.title}>Sign into your account</Typography>
                    { auth.failed && typeof auth.message == 'string' && 
                        <Typography className={classes.error}>{ auth.message }</Typography> }
                    
                    {/* email field */}
                    <FormControl disabled={auth.isFetching} className={classes.formControls} error={!fn.isValid('email') && fn.isTouched('email') && !fn.isFocused('email')}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <Input id='email' fullWidth={true} value={form.email}
                            type='text' onFocus={(event) => fn.handleOnFocus('email', event)} 
                            onBlur={(event) => fn.handleOnBlur('email', event)}
                            onChange={(event) => fn.handleOnChange('email', event)}/>
                        { fn.fieldError('email') && <Typography className={classes.error}>{fn.fieldError('email')}</Typography> }
                    </FormControl>

                    {/* password field */}
                    <FormControl disabled={auth.isFetching} className={classes.formControls} error={!fn.isValid('password') && fn.isTouched('password') && !fn.isFocused('password')}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <Input id='password' fullWidth={true} value={form.password}
                            type={showPassword ? 'text' : 'password'} onFocus={(event) => fn.handleOnFocus('password', event)}
                            onBlur={(event) => fn.handleOnBlur('password', event)}
                            onChange={(event) => fn.handleOnChange('password', event)}
                            endAdornment={(
                                <InputAdornment position="end">
                                    <IconButton
                                    disabled={auth.isFetching}
                                    aria-label="Toggle password visibility"
                                    onClick={fn.handleClickShowPassword}>
                                    {showPassword ? <VisibilityOff /> : <Visibility />}
                                    </IconButton>
                                </InputAdornment>
                            )}/>
                        { fn.fieldError('password') && <Typography className={classes.error}>{fn.fieldError('password')}</Typography> }
                    </FormControl>

                    {/* sign in button */}
                    <div className={classes.buttonContainer}>
                        <Button disabled={fn.disableButton()} variant='contained' color='primary' type='submit'>Sign In</Button>
                    </div>
                </CardContent>
            </Card>
            </fieldset>
            </form>
            {/* copyright */}
            <Typography className={classes.copyright}>
                &copy; {date.getFullYear()} FoodGatsby Ltd.
            </Typography>
        </div>
    </div>  
);
Template = withStyles(styles)(Template)

class Login extends Component {
    state = {
        validation: {
            valid: false,
            fields: null
        },
        focused: [],
        touched: [],
        form: {
            email: '',
            password: '',
        },
        showPassword: false
    };

    render = () => <Template {...this.prps()} fn={this.fn()} />

    prps = () => ({
        validation   : this.state.validation,
        form         : this.state.form,
        showPassword : this.state.showPassword,
        auth         : this.props.auth,
        date         : new Date
    })

    fn = () => ({
        rules                   : this.rules,
        messages                : this.messages,
        disableButton           : this.disableButton,
        isValid                 : this.isValid,
        isTouched               : this.isTouched,
        isFocused               : this.isFocused,
        handleValidatorChange   : this.handleValidatorChange,
        handleOnFocus           : this.handleOnFocus,
        handleOnBlur            : this.handleOnBlur,
        handleOnChange          : this.handleOnChange,
        handleOnSubmit          : this.handleOnSubmit,
        fieldError              : this.fieldError,
        handleClickShowPassword : this.handleClickShowPassword,
    })

    rules = () => ({
        email: {
            'required': Rules.required,
            'email': Rules.isEmail,
        },
        password: {
            'required': Rules.required
        }
    })

    messages = () => ({
        email: {
            'required': 'Enter your email address',
            'email': 'Please enter a valid email address',
        },
        password: {
            'required': 'Enter your password'
        }
    })

    fieldError = (field) => {
        const { validation } = this.state;
        const { classes } = this.props;
        if(this.isValid(field)) return false;
        if(this.isFocused(field)) return false;
        if(!this.isTouched(field)) return false;
        return validation.fields[field]['error'];
    }

    isValid = (field) => {
        const { validation } = this.state;
        if(!validation || !validation.fields) return true;
        if(!validation.fields[field]) return true;
        return validation.fields[field]['valid'] ? true : false;
    }

    isTouched = (field) => {
        return this.state.touched.indexOf(field) != -1;
    }

    isFocused = (field) => {
        return this.state.focused.indexOf(field) != -1;
    }

    disableButton = () => {
        return !this.state.validation.valid || this.props.auth.isFetching;
    }

    handleValidatorChange = (validation) => {
        this.setState({validation})
    }

    handleOnFocus = (field) => {
        var {focused} = this.state;
        // add field to focused
        if(focused.indexOf(field) == -1){
            focused.push(field);
        }
        // update component state
        this.setState({focused});
    }

    handleOnBlur = (field) => {
        var {focused} = this.state;
        // add field to focused
        if(focused.indexOf(field) != -1){
            focused.splice(focused.indexOf(field), 1);
        }
        // update component state
        this.setState({focused});
    }

    handleOnChange = (field, event) => {
        var {form, touched} = this.state;
        // add field to touched
        if(!this.isTouched(field)){
            touched.push(field);
        }
        // update form
        var form = Object.assign({}, this.state.form);
        form[field] = event.target.value;
        // update component state
        this.setState({form, touched});
    }

    handleClickShowPassword = () => {
        this.setState(state => ({ showPassword: !state.showPassword }));
    }

    handleOnSubmit = (ev) => {
        ev.preventDefault();
        const { validation, form } = this.state;
        if(!validation.valid) return;
        this.props.login(form);
    }
}

const mapStateToProps = ({ auth }) => {
    return { auth };
}

const mapDispatchToProps = (dispatch) => {
    return bindActionCreators({
        login: ActionCreators.login
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Login));