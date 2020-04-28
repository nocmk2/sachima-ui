import React from "react";
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
// import { connect } from "react-redux";

const LearnCard = ({ datas }) => {
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
        }
    }));

    const classes = useStyles();
    // const [checked, setChecked] = React.useState(true);
    // const [elevation, setElevation] = React.useState(4);
    return (
        <div className={classes.root}>
            {
                datas.map((el, index) =>
                    // console.log(el);
                    (
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
                                {/* {el.title} */}
                                <CardActionArea>
                                    <CardMedia
                                        className={classes.media}
                                        component="img"
                                        alt={el.title}
                                        // children={<h2>1111 eff1</h2>}
                                        height="240"
                                        image={process.env.PUBLIC_URL + 'img/tech9.jpg'}
                                        title={el.title}
                                    />
                                    <Typography className={classes.overlay}>
                                        {el.title}
                                    </Typography>
                                </CardActionArea> }

                            {/* <Button>{el.title}</Button> */}
                            </Card>
                        </Grow >
                    )
                )
            }
        </div >

    );
};

export default LearnCard;
