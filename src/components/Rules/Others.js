import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DataSrcSetter from './DataSrcSetter';

const useStyles = makeStyles((theme) => ({
    root: {
        width: '100%',
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        flexBasis: '33.33%',
        flexShrink: 0,
    },
    secondaryHeading: {
        fontSize: theme.typography.pxToRem(15),
        color: theme.palette.text.secondary,
    },
}));

const Others = props => {
    const classes = useStyles();
    const [expanded, setExpanded] = React.useState(false);

    const handleChange = (panel) => (event, isExpanded) => {
        setExpanded(isExpanded ? panel : false);
    };
    const menus = [
        { name: 'datasrc', cnname: '设置数据源', comp: <DataSrcSetter data={props.data.datasrc} /> },
        { name: 'datatarget', cnname: '设置结果存储表', comp: <DataSrcSetter data={props.data.datatarget} /> },
        { name: 'colname', cnname: '设置评分结果字段名', comp: <DataSrcSetter data={props.data.colname} /> },
        { name: 'rulers', cnname: '设置评分标尺（刻度）', comp: <DataSrcSetter data={props.data.rulers} /> },
        { name: 'catalog', cnname: '设置变量分组比例', comp: <DataSrcSetter data={props.data.catalog} /> },
    ]

    return (
        <div className={classes.root}>
            {menus.map((m, i) =>
                <ExpansionPanel key={i} expanded={expanded === `panel${i}`} onChange={handleChange(`panel${i}`)}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>{m.cnname}</Typography>
                        <Typography className={classes.secondaryHeading}>{m.name}</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        {/* <Typography>
                            Nulla facilisi. Phasellus sollicitudin nulla et quam mattis feugiat. Aliquam eget
                        maximus est, id dignissim quam. </Typography> */}
                        {m.comp}
                    </ExpansionPanelDetails>
                </ExpansionPanel>
            )
            }
        </div>
    );
}

export default Others
