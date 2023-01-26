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
    <div className="posts-container">
        {posts.map((post, i) => (
           
            <Accordion className="posts" key={i} expanded={expanded === i} onChange={handleChange(i)}>
                <AccordionSummary
                expandIcon={<ExpandMoreIcon />}
                aria-controls="panel1bh-content"
                id="panel1bh-header"
                >
                <Typography variant="h2">
                    {post.title}
                </Typography>
                </AccordionSummary>
                <AccordionDetails>
                <Typography>
                    {post.body}
                </Typography>
                </AccordionDetails>
            </Accordion>
        ) )}
    </div>
  );
}
