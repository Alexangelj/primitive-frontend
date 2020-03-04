import React, { Component, PureComponent } from 'react';
import Item from './item';
import { withRouter } from "react-router-dom";
import { withStyles } from '@material-ui/core/styles';
import { 
    Card,
    Typography,
    Grid,
    Box
} from '@material-ui/core';
import { colors } from '../../theme/theme';

import { DragDropContext } from 'react-beautiful-dnd';
import initialData from './constants';
import Column from './column';

const styles = theme => ({
    root: {
        flex: 1,
        display: 'flex',
        width: '100%',
        height: '100vh',
        justifyContent: 'left',
        alignItems: 'center',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    boards: {
        flex: 1,
        display: 'flex',
        width: '80%',
        height: '100vh',
        flexDirection: 'column',
        [theme.breakpoints.up('sm')]: {
            flexDirection: 'row',
        }
    },
    prime: {
        backgroundColor: colors.white,
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
        padding: '24px',
        paddingBottom: '0px',
        [theme.breakpoints.up('sm')]: {
            paddingBottom: '24px'
        }
    },
});


class InnerList extends PureComponent {
    shouldComponentUpdate(nextProps) {
        if(
            nextProps.column === this.props.column &&
            nextProps.itemMap === this.props.itemMap &&
            nextProps.index === this.props.index
        ) {
            return false;
        }
        return true;
    }

    render() {
        const { column, itemMap, index, isDropDisabled } = this.props;
        const items = column.itemIds.map(itemId => itemMap[itemId]);
        return <Column key={column.id} column={column} items={items} isDropDisabled={isDropDisabled} />;
    }
}

class Prime extends Component {
    constructor(props){
        super()
        this.state = initialData;
    
    }

    onDragStart = start => {
        const homeIndex = this.state.columnOrder.indexOf(start.source.droppableId);
        const homeType = start.draggableId;
        this.setState({
            homeIndex,
            homeType,
        });


        //for(let i = 0; i <= this.state.columns['board'].itemIds.length; i++) {
        //    console.log(
        //        this.state.columns['board'].itemIds.length, 
        //        i, 
        //        this.state.columns['board'].itemIds,);
        //    if(i == 0) {
        //        const disable = true;
        //        this.setState({
        //            disable
        //        });
        //    }
        //}
        if(this.state.columns['board'].itemIds.length > 0) {
            console.log(
                this.state.columns['board'].itemIds.length,
                this.state.columns['board'].itemIds,
            );
            let len = this.state.columns['board'].itemIds.length;
            for(var i = 0; i < len; i++) {
                if(
                    (this.state.columns['board'].itemIds[i]).substring(0,5)
                    == 
                    (start.draggableId).substring(0,5)
                ) {
                    if(this.state.columns['board'].itemIds[i] != start.draggableId) {
                        console.log('SET TO FALSE');
                        const disable = true;
                        const amount = 1;
                        this.setState({
                            disable,
                            amount
                        });
                    }
                }
            }
        }
    };

    onDragUpdate = () => {

    };

    onDragEnd = result => {
        this.setState({
            homeIndex: null,
            homeType: null,
            disable: null,
            amount: null,
        });

        const { destination, source, draggableId } = result;

        if(!destination) {
            return;
        }

        if(
            destination.droppableId === source.droppableId &&
            destination.index === source.index
        ) {
            return;
        }

        const start = this.state.columns[source.droppableId];
        const finish = this.state.columns[destination.droppableId];

        if(start === finish) {
            const newItemIds = Array.from(start.itemIds);
            newItemIds.splice(source.index, 1);
            newItemIds.splice(destination.index, 0, draggableId);

            const newColumn = {
                ...start,
                itemIds: newItemIds,
            };

            const newState = {
                ...this.state,
                columns: {
                    ...this.state.columns,
                    [newColumn.id]: newColumn,
                },
            };

            this.setState(newState);
            return;
        }

        const startItemIds = Array.from(start.itemIds);
        startItemIds.splice(source.index, 1);
        const newStart = {
            ...start,
            itemIds: startItemIds,
        };

        const finishItemIds = Array.from(finish.itemIds);
        finishItemIds.splice(destination.index, 0, draggableId);
        const newFinish = {
            ...finish,
            itemIds: finishItemIds,
        };

        const newState = {
            ...this.state,
            columns: {
                ...this.state.columns,
                [newStart.id]: newStart,
                [newFinish.id]: newFinish,
            },
        };
        this.setState(newState);

        if(draggableId) {
            if((draggableId).substring(0,5) == 'asset') {
                console.log('Set ASSET to False');
                this.setState({
                    asset: true,
                });
            }
        }
        

    };
    
    render() {
        const { classes, t } = this.props;
        return (
            <DragDropContext 
                onDragStart={this.onDragStart}
                onDragEnd={this.onDragEnd}
            >
                <Box className={classes.boards}>
                    {this.state.columnOrder.map((columnId, index) => {
                        const column = this.state.columns[columnId];
                        const type = this.state.homeType;
                        
                        console.log(this.state.amount, 'amount', this.state.disable, 'disable')
                        const isDropDisabled = this.state.amount > 0;
                        return (
                            <InnerList
                                key={column.id}
                                column={column}
                                itemMap={this.state.items}
                                index={index}
                                isDropDisabled={this.state.disable}
                            />
                        );
                    })}
                </Box>
            </DragDropContext>
        )
        
    }
}

export default (withRouter(withStyles(styles)(Prime)));