import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import DeleteIcon from '@material-ui/icons/Delete';
import FilterListIcon from '@material-ui/icons/FilterList';
import AddIcon from '@material-ui/icons/Add';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';
import { lighten } from '@material-ui/core/styles/colorManipulator';
import autobind from 'react-autobind';
import Content from '../../presentation/Content';
import PageHeading from '../../presentation/PageHeading';

let counter = 0;
function createData(name, email, phone, date) {
  counter += 1;
  return { id: counter, name, email, phone, date};
}

function getSorting(order, orderBy) {
  return order === 'desc'
    ? (a, b) => (b[orderBy] < a[orderBy] ? -1 : 1)
    : (a, b) => (a[orderBy] < b[orderBy] ? -1 : 1);
}

const columnHeading = [
  { id: 'name', numeric: false, colSpan: 1, disablePadding: true, label: 'Name' },
  { id: 'email', numeric: false, colSpan: 1, disablePadding: false, label: 'Email Address' },
  { id: 'phone', numeric: false, colSpan: 1, disablePadding: false, label: 'Phone Number' },
  { id: 'date', numeric: false, colSpan: 1, disablePadding: false, label: 'Registeration Date' },
];

class EnhancedTableHead extends Component {
  createSortHandler = property => event => {
    this.props.onRequestSort(event, property);
  };

  render() {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;
    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={numSelected === rowCount}
              onChange={onSelectAllClick}
              color={'primary'}
            />
          </TableCell>
          {columnHeading.map(column => {
            return (
            <TableCell
                key={column.id}
                numeric={column.numeric}
                padding={column.disablePadding ? 'none' : 'default'}
                sortDirection={orderBy === column.id ? order : false}
                colSpan={column.colSpan}>
                <Tooltip
                  title="Sort"
                  placement={column.numeric ? 'bottom-end' : 'bottom-start'}
                  enterDelay={300}>
                    <TableSortLabel
                        active={orderBy === column.id}
                        direction={order}
                        onClick={this.createSortHandler(column.id)}>
                        {column.label}
                    </TableSortLabel>
                </Tooltip>
              </TableCell>
            );
          }, this)}
        </TableRow>
      </TableHead>
    );
  }
}
EnhancedTableHead.propTypes = {
  numSelected: PropTypes.number.isRequired,
  onRequestSort: PropTypes.func.isRequired,
  onSelectAllClick: PropTypes.func.isRequired,
  order: PropTypes.string.isRequired,
  orderBy: PropTypes.string.isRequired,
  rowCount: PropTypes.number.isRequired,
};

const toolbarStyles = theme => ({
  root: {
    paddingRight: theme.spacing.unit,
  },
  highlight:
    theme.palette.type === 'light'
      ? {
          color: theme.palette.secondary.main,
          backgroundColor: lighten(theme.palette.primary.light, 0.85),
        }
      : {
          color: theme.palette.text.primary,
          backgroundColor: theme.palette.secondary.dark,
        },
  spacer: {
    flex: '1 1 100%',
  },
  actions: {
    color: theme.palette.text.primary,
  },
  title: {
    flex: '0 0 auto',
  },
});
let EnhancedTableToolbar = props => {
  const { numSelected, classes, handleActionClick } = props;

  return (
    <Toolbar
      className={classNames(classes.root, {
        [classes.highlight]: numSelected > 0,
      })}
    >
      <div className={classes.title}>
        {numSelected > 0 &&
          <Typography color="primary" variant="subheading"> {numSelected} selected </Typography>
        }
      </div>
      <div className={classes.spacer} />

      {/* action buttons */}
      <div className={classes.actions}>
        {numSelected > 0 ? (
        <Tooltip title="Delete">
            <IconButton aria-label="Delete"
                onClick={(event) => handleActionClick(event, 'delete')}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
        ) : (
        <Toolbar>
            <Tooltip title="Filter list">
                <IconButton aria-label="Filter list"
                     onClick={(event) => handleActionClick(event, 'filter')}>
                    <FilterListIcon />
                </IconButton>
            </Tooltip>
        </Toolbar>
        )}
      </div>
    </Toolbar>
  );
};
EnhancedTableToolbar.propTypes = {
  classes: PropTypes.object.isRequired,
  numSelected: PropTypes.number.isRequired,
};
EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

/**
 * here we have the styles for the user template component
 * @param {object} theme 
 */
const styles = theme => ({
    root: {
        width: '100%'
    },
    table: {
        minWidth: 1020,
    },
    tableWrapper: {
        overflowX: 'auto',
    },
});
let Template = ({fn, classes, data, order, orderBy, selected, rowsPerPage, page}) => (
    <div>
      <PageHeading title='Users' subtitle='View and manage registered users' />
      <Content>
        <Paper className={classes.root}>
        {/* enhanced custom table header see code above  */}
        <EnhancedTableToolbar numSelected={selected.length} handleActionClick={fn.handleActionClick}/>

        <div className={classes.tableWrapper}>
            {/* users list table */}
          <Table className={classes.table} aria-labelledby="tableTitle">
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={fn.handleSelectAllClick}
              onRequestSort={fn.handleRequestSort}
              rowCount={data.length}
            />
            {/* table body containing the users in rows */}
            <TableBody>
              {data.map(n => {
                  const isSelected = fn.isSelected(n.id);
                  return (
                    <TableRow
                      hover
                      onClick={event => fn.handleSelectUser(event, n.id)}
                      role="checkbox"
                      aria-checked={isSelected}
                      tabIndex={-1}
                      key={n.id}
                      selected={isSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox onClick={event => fn.handleClick(event, n.id)} checked={isSelected} color={'primary'} />
                      </TableCell>
                      <TableCell colSpan={1} component="th" scope="row" padding="none">
                        {n.name}
                      </TableCell>
                      <TableCell colSpan={1} component="th" scope="row">{n.email}</TableCell>
                      <TableCell colSpan={1} component="th" scope="row">{n.phone}</TableCell>
                      <TableCell colSpan={1} component="th" scope="row">{n.date}</TableCell>
                    </TableRow>
                  );
                })}
            </TableBody>
          </Table>
        </div>
        {/* table pagination for the users list */}
        <TablePagination
          component="div"
          count={data.length}
          rowsPerPage={rowsPerPage}
          page={page}
          rowsPerPageOptions={[50, 75]}
          backIconButtonProps={{
            'aria-label': 'Previous Page',
          }}
          nextIconButtonProps={{
            'aria-label': 'Next Page',
          }}
          onChangePage={fn.handleChangePage}
          onChangeRowsPerPage={fn.handleChangeRowsPerPage}
        />
      </Paper>
      </Content>
    </div>
);
/**
 * create styles and bind toapp template
 */
Template = withStyles(styles)(Template);

/**
 * Users list component component
 */
class Users extends Component {
    state = {
        order: 'asc',
        orderBy: 'name',
        selected: [],
        data: [
            createData('Daniel Barde', 'mrbarde2k@gmail.com', 2347059538781, '25th May 2018'),
            createData('Peter Jericho', 'peteJ@gmail.com', 2348089704793, '9th April 2018'),
            createData('Bojack Horseman', 'horsing.around@gmail.com', 2348089704793, '22nd February 2018'),
            createData('Rick Sanchez', 'rick.sanchez@gmail.com', 2348089704793, '1st January 2018'),
            createData('Morty', 'morty@gmail.com', 2348089704793, '6th May 2018'),
            createData('Goku', 'goku@gmail.com', 2348089704793, '15th March 2018'),
            createData('Naruto', 'naruto@gmail.com', 2348089704793, '21st April 2018'),
            createData('Bon Jovi', 'bon.jovi@gmail.com', 2348089704793, '19th June 2018'),
        ],
        page: 0,
        rowsPerPage: 50,
    };

    constructor(){
        super()
        autobind(this);
    }

    render = () => <Template {...this.prps()} fn={this.fn()} />

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';
    
        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }
    
        this.setState({ order, orderBy });
      };
    
    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState(state => ({ selected: state.data.map(n => n.id) }));
            return;
        }
        this.setState({ selected: [] });
    };
    
    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];
    
        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
            );
        }
    
        this.setState({ selected: newSelected });
    };
    
    handleChangePage = (event, page) => {
        this.setState({ page });
    };
    
    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    handleSelectUser = (event, userId) => {
        // go to user info page
    };

    handleActionClick = (event, action) => {
        switch(action){
            case 'delete':
            break;
            case 'filter':
            break;
        }
    };
    
    isSelected = id => this.state.selected.indexOf(id) !== -1;

    fn = () => ({
        handleSelectAllClick    : this.handleSelectAllClick,
        handleRequestSort       : this.handleRequestSort,
        handleClick             : this.handleClick,
        handleChangePage        : this.handleChangePage,
        handleChangeRowsPerPage : this.handleChangeRowsPerPage,
        isSelected              : this.isSelected,
        handleSelectUser : this.handleSelectUser ,
        handleActionClick       : this.handleActionClick
    })

    prps = () => ({
        order       : this.state.order,
        orderBy     : this.state.orderBy,
        selected    : this.state.selected,
        data        : this.state.data.sort(getSorting(this.state.order, this.state.orderBy))
                        .slice(this.state.page * this.state.rowsPerPage, this.state.page * this.state.rowsPerPage + this.state.rowsPerPage),
        page        : this.state.page,
        rowsPerPage : this.state.rowsPerPage,
        classes     : this.props.classes,
    })
}

const mapStateToProps = (state) => ({ 
    // states go here
});

export default connect(mapStateToProps)(withRouter(Users));