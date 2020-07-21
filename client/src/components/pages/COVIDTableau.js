import React, { useEffect, useRef } from 'react';
import Navbar from '../layout/Navbar';
import MenuBar from './blog/MenuBar';

import 'bootstrap/dist/css/bootstrap.min.css';

const { tableau } = window;

const COVIDTableau = () => {

  const ref = useRef(null)
  const url = 'https://public.tableau.com/views/CoronavirusCovid-19DailyIndicators-OptimizedforDesktop/CoronavirusDailyIndicatorsDashboard?:embed=y&:display_count=y&:origin=viz_share_link'

  function initViz() {
    new tableau.Viz(ref.current, url);
  }

  // On ComponentDidMount
  useEffect(() => {

    // Scroll to top.
    window.scrollTo(0, 1);

    initViz()
  }, []);

  return (
    <div className='container'>
      <MenuBar />
      <Navbar />
      <h1>Coronavirus (COVID-19) global data tracker</h1>
      <h4>This coronavirus tracker visualises Johns Hopkins University data to help you stay on top of key COVID-19 metrics. You can use this dashboard to track global and US-specific case data, including totals, the spread of COVID-19 and outbreaks around the world. This dashboard will be updated daily.</h4>
      <p>Click {' '} <a
        href='https://www.tableau.com/en-gb/covid-19-coronavirus-data-resources/global-tracker'
      >
        here
      </a>{' '} to see other cool Tableau Dashboards
      </p>
      <div ref={ref}></div>
    </div>
  );
};

export default COVIDTableau;
