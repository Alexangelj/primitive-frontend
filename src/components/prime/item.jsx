import React, { Component } from 'react';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { 
    Card,
    Typography,
    Grid,
    Box
} from '@material-ui/core';
import { colors } from '../../theme/theme';
import { Draggable } from 'react-beautiful-dnd';


const styles = theme => ({
    root: {
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '16px',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    item: {
        flex: '1',
        height: '2.5vh',
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        borderRadius: '4px',
        padding: '24px',
        margin: '8px',
        cursor: 'pointer',
        transition: 'background-color 0.2s linear',
        [theme.breakpoints.up('sm')]: {
            height: '2.5vh',
            minWidth: '20%',
            minHeight: '2vh',
        },
    },
    prime: {
        backgroundColor: props => (props.isDragging ? colors.palered : colors.white),
        '&:hover': {
            backgroundColor: colors.lightblue,
            '& .title': {
                color: colors.blue
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
    },
    dragging: {
        opacity: 1,
        cursor: 'pointer',
        flex: 1,
        display: 'flex',
        width: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'column',
        margin: '16px',
        backgroundColor: colors.palered,
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    icon: {
        display: 'flex',
        paddingLeft: '70%',
    },
});


class Item extends Component {
    render() {
        const { classes, t } = this.props;

        return (
            <Draggable 
                draggableId={this.props.item.id} 
                index={this.props.index}
            >
                {(provided, snapshot) => (
                    <Box
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        ref={provided.innerRef}
                        isDragging={snapshot.isDragging}
                    >
                        <Card className={`${classes.item} ${classes.prime}`}>
                            <Typography variant={'h2'} className={`${classes.title}`}>
                                {this.props.item.content}
                            </Typography>
                            <Typography variant={'h3'} className={`${classes.icon}`}>
                                {this.props.item.type == 'asset' ? 'true' : 'false'}
                            </Typography>
                        </Card>
                    </Box>
                )}
            </Draggable>
        );
    }
}

export default (withRouter(withStyles(styles)(Item)));