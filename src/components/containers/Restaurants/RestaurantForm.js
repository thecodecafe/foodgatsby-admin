import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { withStyles } from '@material-ui/core/styles';
import autobind from 'react-autobind';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import UploadIcon from '@material-ui/icons/CloudUpload';
import Typography from '@material-ui/core/Typography';
import GreyColor from '@material-ui/core/colors/grey';
import RedColor from '@material-ui/core/colors/red';
import Snackbar from '@material-ui/core/Snackbar';
import Slider from '@material-ui/lab/Slider';
import AvatarEditor from 'react-avatar-editor'
import CropIcon from '@material-ui/icons/Crop';
import DeleteIcon from '@material-ui/icons/Delete';
import CameraIcon from '@material-ui/icons/CameraAlt';
import Input from '@material-ui/core/Input';
import InputLabel from '@material-ui/core/InputLabel';
import FormControl from '@material-ui/core/FormControl';
import MaskedInput from 'react-text-mask';
import Validator from '../../../modules/validator';
import * as Rules from '../../../helpers/Rules';

/**
 * phone number mask, this should not be here
 */
const PhoneNumberMask = ({inputRef, ...props}) => (
    <MaskedInput
    {...props}
    ref={inputRef}
    mask={[/\d/, /\d/, /\d/, ' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, ' ', /\d/, /\d/, /\d/, /\d/]}
    showMask
    />
);

/**
 * Website ur mask
 */
// const WebsiteMask = ({inputRef, ...props}) => (
//     <MaskedInput
//     {...props}
//     ref={inputRef}
//     mask={['w', 'w', 'w', '.', /[a-z0-9]+/,  /\.[a-z]/]}
//     showMask
//     />
// );

/**
 * here we have the styles for the root component
 * @param {object} theme 
 */
const styles = theme => ({
    root: {
        zIndex: 1,
        overflow: 'hidden',
        position: 'relative',
        display: 'flex',
    },
    papers: Object.assign(theme.mixins.gutters(), {
        paddingTop: theme.spacing.unit * 2,
        paddingBottom: theme.spacing.unit * 2,
        marginBottom: 20
    }),
    logoContainer: {
        display: 'flex',
        flexDirection: 'column',
        height: 300,
        justifyContent: 'center',
        alignItems: 'center',
        position: 'relative'
    },
    logoInput: {
        position: 'absolute',
        left: 24,
        top: 24,
        bottom: 24,
        right: 24,
        width: 'calc(100% - 48px)',
        opacity: 0,
        zIndex: 20
    },
    logoGuide: {
        color: GreyColor[600],
        fontSize: 10,
        fontWeight: 'bold'
    },
    button: {
        margin: theme.spacing.unit,
    },
    buttonSm: {
        margin: theme.spacing.unit / 2,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    logoEditor: {
        position: 'relative',
        float: 'left'
    },
    logoEditorSliderContainer:{
        position: 'absolute',
        bottom: 10,
        left: 10,
        right: 10,
        display: 'flex'
    },
    logo: {
        width: '100%',
        height: 'auto'
    },
    changeLogoButton: {
        backgroundColor: 'rgba(255,255,255,0.4)',
        color: GreyColor[400],
        width: 72,
        height: 72,
    },
    error: {
        fontSize: 13,
        color: RedColor[600]
    },
    form: {
        width: '100%',
        paddingLeft: 5,
        paddingRight: 5,
        paddingTop: 5,
    },
    fieldcontainer: {
        width: '100%'
    },
    formControls: {
        width: '100%',
        margin: theme.spacing.unit,
    },
    buttonContainer: {
        textAlign: 'right',
        marginTop: 45,
        marginBottom: 50
    },
});

/**
 * component template
 */
let Template = ({fn, classes, snackMessage, cropImage, cropSize, form, rules, messages, saving, saveFailure, validationData}) => (
    <div className={classes.root}>
        {/* validator component */}
        <Validator rules={fn.rules()} 
            messages={fn.messages()} form={validationData} 
            onChange={fn.handleValidatorChange}/>
        <form className={classes.form} onSubmit={fn.handleOnSubmit}>
        <Grid container spacing={32}>
            {/* image selector */}
            <Grid item xs={3}>
                <Paper className={`${classes.papers} ${classes.logoContainer}`} elevation={2}>
                    
                    { !cropImage &&
                    <React.Fragment>
                        { form.logo &&
                        <React.Fragment>
                            <img src={form.logo} className={classes.logo}/>
                            <Toolbar style={{position:'absolute', textAlign: 'right'}} active='hover'>
                                <IconButton className={classes.changeLogoButton} elevation={2}>
                                    <CameraIcon style={{width: 48, height: 48}}/>
                                </IconButton>
                            </Toolbar>
                        </React.Fragment>
                        }

                        { !form.logo &&
                        <React.Fragment>
                            <Button variant="contained" color="default" className={classes.button}>
                                Select Logo <UploadIcon className={classes.rightIcon} />
                            </Button>
                            <Typography className={classes.logoGuide} align='center'>Dimension 300x300</Typography>
                        </React.Fragment>
                        }
                        
                        <input type='file' onChange={fn.handleSelectedLogo} className={`${classes.logoInput}`} />
                    </React.Fragment>
                    }

                    { cropImage && 
                    <div className={classes.logoEditor}>
                        <AvatarEditor image={cropImage} ref={(ref) => fn.setCropper(ref)}
                            width={285} height={285}  scale={cropSize} border={0}/>
                        <div className={classes.logoEditorSliderContainer}>
                            <Paper elevation={2} style={{flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                                <Slider value={cropSize} min={1} max={5} onChange={fn.handleCropScale} />
                                <IconButton className={classes.buttonSm} onClick={(event) => fn.handleCropButtonclick(event, 'crop')} 
                                    style={{width: 36, height: 36}} aria-label="Crop Image">
                                    <CropIcon style={{width: 18, height: 18}} color='primary' />
                                </IconButton>
                                <IconButton className={classes.buttonSm} onClick={(event) => fn.handleCropButtonclick(event, 'cancel')}
                                    style={{width: 36, height: 36}} aria-label="Crop Image">
                                    <DeleteIcon style={{width: 18, height: 18}} />
                                </IconButton>
                            </Paper>
                        </div>
                    </div>
                    }
                </Paper>
            </Grid>
            {/* restaurant basic info */}
            <Grid item xs={9}>
                <Paper className={classes.papers} elevation={2}>
                    <Grid container spacing={32}>
                        <Grid sm={12} item>
                            {/* restaurant name field */}
                            <FormControl className={classes.formControls} style={{marginTop: 15}} 
                                error={!fn.isValid('restaurant_name') && fn.isTouched('restaurant_name') && !fn.isFocused('restaurant_name')}>
                                <InputLabel htmlFor="restaurant_name">Restaurant Name</InputLabel>
                                <Input id='restaurant_name' fullWidth={true} value={form.restaurant_name} disabled={saving}
                                    type={'text'} onFocus={(event) => fn.handleOnFocus('restaurant_name', event)}
                                    onBlur={(event) => fn.handleOnBlur('restaurant_name', event)}
                                    onChange={(event) => fn.handleOnChange('restaurant_name', event)}/>
                                { fn.fieldError('restaurant_name') && <Typography className={classes.error}>{fn.fieldError('restaurant_name')}</Typography> }
                            </FormControl>
                        </Grid>

                        <Grid sm={6} item>
                            {/* email field */}
                            <FormControl className={classes.formControls} error={!fn.isValid('email') && fn.isTouched('email') && !fn.isFocused('email')}>
                                <InputLabel htmlFor="email">Email</InputLabel>
                                <Input id='email' fullWidth={true} value={form.email} disabled={saving}
                                    type={'text'} onFocus={(event) => fn.handleOnFocus('email', event)}
                                    onBlur={(event) => fn.handleOnBlur('email', event)}
                                    onChange={(event) => fn.handleOnChange('email', event)}/>
                                { fn.fieldError('email') && <Typography className={classes.error}>{fn.fieldError('email')}</Typography> }
                            </FormControl>
                        </Grid>

                        <Grid sm={6} item>
                            {/* phone field */}
                            <FormControl className={classes.formControls} error={!fn.isValid('phone') && fn.isTouched('phone') && !fn.isFocused('phone')}>
                                <InputLabel htmlFor="phone">Phone</InputLabel>
                                <Input id='phone' label='Phone Number' selected fullWidth={true} value={form.phone} disabled={saving}
                                    type={'text'} onFocus={(event) => fn.handleOnFocus('phone', event)}
                                    onBlur={(event) => fn.handleOnBlur('phone', event)}
                                    onChange={(event) => fn.handleOnChange('phone', event)}
                                    inputComponent={PhoneNumberMask}/>
                                { fn.fieldError('phone') && <Typography className={classes.error}>{fn.fieldError('phone')}</Typography> }
                            </FormControl>
                        </Grid>

                        <Grid sm={6} item>
                            {/* location */}
                            <FormControl className={classes.formControls}
                                error={!fn.isValid('location') && fn.isTouched('location') && !fn.isFocused('location')}>
                                <InputLabel htmlFor="location">Location</InputLabel>
                                <Input id='location' fullWidth={true} value={form.location} disabled={saving}
                                    type={'text'} onFocus={(event) => fn.handleOnFocus('location', event)}
                                    onBlur={(event) => fn.handleOnBlur('location', event)}
                                    onChange={(event) => fn.handleOnChange('location', event)}/>
                                { fn.fieldError('location') && <Typography className={classes.error}>{fn.fieldError('location')}</Typography> }
                            </FormControl>
                        </Grid>

                        <Grid sm={6} item>
                            {/* website field */}
                            <FormControl className={classes.formControls} error={!fn.isValid('website') && fn.isTouched('website') && !fn.isFocused('website')}>
                                <InputLabel htmlFor="website">Website</InputLabel>
                                <Input id='website' fullWidth={true} value={form.website} disabled={saving}
                                    type={'text'} onFocus={(event) => fn.handleOnFocus('website', event)}
                                    onBlur={(event) => fn.handleOnBlur('website', event)}
                                    onChange={(event) => fn.handleOnChange('website', event)}/>
                                { fn.fieldError('website') && <Typography className={classes.error}>{fn.fieldError('website')}</Typography> }
                            </FormControl>
                        </Grid>
                        <Grid sm={12} item>
                            <div style={{textAlign: 'right', marginBottom: 15}}>
                            <Button disabled={fn.disableButton()} type='submit' variant='contained' color='primary' className={classes.button}>Save</Button>
                            </div>
                        </Grid>
                    </Grid>
                </Paper>
            </Grid>
        </Grid>
        </form>
        {/* snackbar notification */}
        <Snackbar open={snackMessage !== null}
            autoHideDuration={4000}
            onClose={() => fn.toggleSnackBar(null) }
            message={<span id="add-restaurant-snack">{snackMessage}</span>}
            ContentProps={{ 'aria-describedby': 'add-restaurant-snack' }}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}/>
    </div>
);

/**
 * create styles and bind toapp template
 */
Template = withStyles(styles)(Template);

class RestaurantForm extends Component {
    state = {
        saving      : false,
        saveFailure : null,
        focused     : [],
        touched     : [],
        snackMessage: null,
        cropImage   : null,
        cropSize    : null,
        cropper     : null,
        form        : {
            logo: null,
            restaurant_name: '',
            phone: '234',
            fullname: '',
            website: 'www.',
            location: '',
            email: '',
        },
        validation  : { 
            fields: null, 
            valid: false
        },
    };

    constructor() {
        super();
        autobind(this);
    }

    render = () => <Template {...this.prps()} fn={this.fn()} />

    prps = () => ({
        validation    : this.state.validation,
        snackMessage  : this.state.snackMessage,
        cropImage     : this.state.cropImage,
        cropSize      : this.state.cropSize,
        form          : this.state.form,
        saving        : this.state.saving,
        saveFailure   : this.state.saveFailure,
        validationData: this.validationData()
    })

    fn = () => ({
        handleSelectedLogo   : this.handleSelectedLogo,
        toggleSnackBar       : this.toggleSnackBar,
        handleCropScale      : this.handleCropScale,
        handleCropButtonclick: this.handleCropButtonclick,
        setCropper           : this.setCropper,
        rules                : this.rules,
        messages             : this.messages,
        disableButton        : this.disableButton,
        isValid              : this.isValid,
        isTouched            : this.isTouched,
        isFocused            : this.isFocused,
        handleValidatorChange: this.handleValidatorChange,
        handleOnFocus        : this.handleOnFocus,
        handleOnBlur         : this.handleOnBlur,
        handleOnChange       : this.handleOnChange,
        handleOnSubmit       : this.handleOnSubmit,
        fieldError           : this.fieldError,
    })

    validationData = () => ({
        ...this.state.form,
        phone: this.state.form.phone.replace(/[^0-9]/mg, '')
    })

    rules = () => ({
        restaurant_name: {
            'required': Rules.required
        },
        phone: {
            'required': Rules.required,
            'phone'   : Rules.isPhone
        },
        fullname: {
            'required': Rules.required
        },
        website: {
            'url': (value) => Rules.sometimes(Rules.url, value)
        },
        location: {
            'required': Rules.required
        },
        email: {
            'required': Rules.required,
            'email'   : Rules.isEmail,
        }
    })

    messages = () => ({
        restaurant_name: {
            'required': 'The restaurant\'s name is required.'
        },
        phone: {
            'required': 'The phone number filed is required.',
            'phone'   : 'Please enter a valid phone number.',
        },
        fullname: {
            'required': 'Please enter the fullname of the rstaurant\'s representative.'
        },
        website: {
            'url': 'Please enter a valid url for the restaurant\'s website.'
        },
        location: {
            'required': 'Please specify the restaurant\'s location. '
        },
        email: {
            'required': 'Enter restaurant\'s email address',
            'email'   : 'Please enter a valid email address',
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
        return !this.state.validation.valid || this.state.saving;
    }

    handleValidatorChange = (validation) => {
        this.setState({validation})
    }

    handleOnFocus = (field) => {
        var {focused} = this.state;
        // add field to focused
        if(focused.indexOf(field) == -1){
            focused.push(field);
            // update component state
            this.setState({focused});
        }
    }

    handleOnBlur = (field) => {
        var {focused} = this.state;
        // add field to focused
        if(focused.indexOf(field) != -1){
            focused.splice(focused.indexOf(field), 1);
            // update component state
            this.setState({focused});
        }
    }

    handleOnChange = (field, event) => {
        var {form} = this.state;
        // update form
        var form = Object.assign({}, this.state.form);
        form[field] = event.target.value;
        // update component state
        this.setState({form});
        // add field to touched
        this.toggleToched(field);
    }

    toggleToched = (field, remove = false) => {
        var {touched} = this.state;
        if(remove && this.isTouched(field)){
            touched.splice(touched.indexOf(field, 1));
            this.setState({touched});
        }
        if(!remove && !this.isTouched(field)){
            touched.push(field);
            this.setState({touched});
        }
    }

    handleOnSubmit = (ev) => {
        ev.preventDefault();
        const { validation, form } = this.state;
        if(!validation.valid) return;
        // this.props.login(form);
    }

    toggleSnackBar = (message) => {
        this.setState({snackMessage: message});
    }

    handleSelectedLogo = (event) => {
        let file = event.target.files[0] || null;
        if(file){
            // check file type
            if(['image/png', 'image/jpg', 'image/jpeg', 'image/gif'].indexOf(file.type) == -1){
                this.toggleSnackBar('Please select an image.');
                return;
            }

            // check file size
            if(file.size / 1024 > 1024){
                this.toggleSnackBar('File size must be 1mb or less.');
                return;
            }

            // read file
            this.reader = new FileReader();
            this.reader.addEventListener('load', this.handleOnReaderLoad);
            this.reader.readAsDataURL(file);
        }
    }

    handleCropButtonclick = (event, action) => {
        switch(action){
            case 'cancel':
                this.setState({ cropImage: null });
            break;
            case 'crop':
                this.crop();
            break;
        }
    }

    handleOnReaderLoad = () => {
        let {form} = this.state;
        form.logo = null;
        this.setState({
            cropImage: this.reader.result, 
            cropSize : 1.2, 
            form     : form, 
            cropper  : null
        });
        this.toggleToched('logo', true);
    }

    handleCropScale = (events, value) => {
        this.setState({cropSize: value});
    }

    setCropper = (ref) => {
        if(this.state.cropper) return;
        this.setState({cropper: ref});
    }

    crop = () => {
        let { cropper, form } = this.state;
        if( cropper ){
            const canvas = cropper.getImageScaledToCanvas();
            form.logo = canvas.toDataURL();
            this.setState({form, cropImage: null});
            this.toggleToched('logo');
        }
    }
}

const mapStateToProps = ({}) => ({ 
    
});

export default connect(mapStateToProps)(withRouter(RestaurantForm));