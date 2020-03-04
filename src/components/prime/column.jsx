import React, { Component, PureComponent } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { colors } from '../../theme/theme';
import { 
    Card,
    Typography,
    Grid,
    Box,
} from '@material-ui/core';
import { Droppable } from 'react-beautiful-dnd';
import Item from './item';

const styles = theme => ({
    board: {
        flex: 1,
        display: 'flex',
        minHeight: '25vh',
        margin: '16px',
        flexDirection: 'column',
        transition: 'background-color 0.25s linear',
    },
    list: {
        flexGrow: 1,
        padding: '16px',
        minHeight: '10vh',
    },
    prime: {
        backgroundColor: colors.white,
        '&:hover': {
            backgroundColor: colors.lightred,
            '& .title': {
                color: colors.white
            },
            '& .icon': {
                color: colors.blue
            },
        },
        '& .title': {
            color: colors.blue
        },
        '& .icon': {
            color: colors.blue
        }
    },
    title: {
        display: 'flex',
        padding: '16px',
        paddingBottom: '0px',
        justifyContent: 'center',
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '8px'
        }
    },
});


class InnerList extends PureComponent {
    shouldComponentUpdate(nextProps) {
        if(nextProps.items === this.props.items) {
            return false;
        }
        return true;
    }

    render () {
        return (
            this.props.items.map((item, index) => (
            <Item key={item.id} item={item} index={index} />
        ))
        );
    }
}

class Column extends Component {
    render() {
        const { classes, t } = this.props;
        return(
            <Card className={`${classes.board} ${classes.prime}`}>
                <Typography variant={'h1'} className={`${classes.title} title`}>
                    {this.props.column.title}
                </Typography>
                <Droppable 
                    droppableId={this.props.column.id}
                    isDropDisabled={this.props.isDropDisabled}
                >
                    {(provided) => (
                        <>
                        <Box
                            className={classes.list}
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            <InnerList items={this.props.items} />
                            {provided.placeholder}
                        </Box>
                        </>
                    )}
                </Droppable>
            </Card>
        );
    }
}

export default withStyles(styles)(Column);