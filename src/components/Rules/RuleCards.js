import React, { useContext } from "react";
import Add from '@material-ui/icons/Add';
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import Card from "@material-ui/core/Card";
import Grow from "@material-ui/core/Grow";
import Button from "@material-ui/core/Button";
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import { ctx } from './Rules'
// import { connect } from "react-redux";
const useStyles = makeStyles(theme => ({
    things: {
        margin: theme.spacing(1),
        height: 140,
        width: 180
    },
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        '& > *': {
            margin: theme.spacing(1),
            width: theme.spacing(16),
            height: theme.spacing(16),
        }
    },
    overlay: {
        position: 'absolute',
        top: '20px',
        left: '20px',
        color: 'white',
        // fontSize: 31
        // zIndex: 2000
    },
    media: {
        // height: 240,
        // paddingTop: '56.25%', // 16:9,
        // zIndex: 1000
    },
    svg: {
        width: 100,
        height: 100
    },
    polygon: {
        fill: theme.palette.common.white,
        stroke: theme.palette.divider,
        strokeWidth: 1
    },
    newBtn: {
        border: '2px dotted',
        color: 'gray'
    }
}));

const RuleCards = ({ datas }) => {
    const { dispatch } = useContext(ctx)

    const classes = useStyles();

    const handleAddClick = () => {
        console.log('add rule~')
        dispatch({ type: "ADD_RULE" })
    }
    // const [checked, setChecked] = React.useState(true);
    // const [elevation, setElevation] = React.useState(4);
    return (
        <div className={classes.root}>
            {
                datas.map((el, index) =>
                    <Grow
                        key={index}
                        in={true} //{el.checked}
                        style={{ transformOrigin: "0 0 0" }}
                        {...(true ? { timeout: index * 500 } : {})}
                    >
                        <Card
                            elevation={18}
                            className={classes.things}
                            onClick={() => { console.log('you clicked score card') }}
                        >
                            <CardActionArea>
                                <CardMedia
                                    className={classes.media}
                                    component="img"
                                    alt={`${el.name} ${el.version}`}
                                    // children={<h2>1111 eff1</h2>}
                                    height="240"
                                    image={process.env.PUBLIC_URL + `img/tech${index}.jpg`}
                                    title={`${el.name} ${el.version}`}
                                />
                                <Typography className={classes.overlay}>
                                    {`${el.name} ${el.version}`}
                                </Typography>
                            </CardActionArea>
                        </Card>
                    </Grow >
                ) // end map
            }
            <Button
                className={classes.newBtn}
                variant="outlined"
                startIcon={<Add />}
                onClick={handleAddClick}
            > </Button>
        </div>

    );
};

export default RuleCards;
