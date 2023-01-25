import * as React from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import './Accordion.css'

export default function ControlledAccordions({posts}) {
  const [expanded, setExpanded] = React.useState(false);

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
        {posts.map((post, i) => (
           
            <Accordion key={i} expanded={expanded === i} onChange={handleChange(i)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography sx={{ width: '33%', flexShrink: 0 }}>
                    <h2>{post.title}</h2>
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {post.body}
                </Typography>
                </AccordionDetails>
            </Accordion>
        ) )}
    </>
  );
}
