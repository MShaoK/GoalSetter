import React, { useEffect } from "react"
import styled from "styled-components";
import { makeStyles } from '@material-ui/core/styles';

//components
import PageLayout from '../components/PageLayout';
import Tasks from "../components/Tasks"

//hooks
import useApplicationData from "../components/hooks/useApplicationData"

const useStyles = makeStyles({
  root: {
    // background: 'linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)',
    // border: 0,
    // borderRadius: 3,
    // boxShadow: '0 3px 5px 2px rgba(255, 105, 135, .3)',
    // color: 'white',
    // height: 48,
    // padding: '0 30px',
  },

});

const HomePageLayout = styled(PageLayout)`
    margin: 0px auto 0 auto;
    backgroundColor: green;
    border: solid;
`;

const HomePage = () => {
  const classes = useStyles();

  const { state, fetchData } = useApplicationData()
  const { projectsList, tasksList} = state;

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <PageLayout>
      <header>
        <h1>Tasks</h1>
      </header>

      <section className={classes.root}>
        <Tasks  projectsList={projectsList} tasksList={tasksList}/>
      </section>
    </PageLayout>
  )
};

export default HomePage;
