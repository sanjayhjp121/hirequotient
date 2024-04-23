import React, { useState, useEffect } from 'react';
import StyledAccordion from './components/AccordionComponent';
import StyledTableCell from './components/TableCellComponent';
import StyledTableRow from './components/TableRowComponent';
import StyledTableContainer from './components/TableContainerComponent';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import IconButton from '@mui/material/IconButton';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import Paper from '@mui/material/Paper';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import TableRow from '@mui/material/TableRow';

function groupByAssetClass(data) {
  return data.reduce((groups, item) => {
    const { asset_class } = item;
    if (!groups[asset_class]) {
      groups[asset_class] = [];
    }
    groups[asset_class].push(item);
    return groups;
  }, {});
}

function App() {
  const [data, setData] = useState([]);
  const [expanded, setExpanded] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://canopy-frontend-task.vercel.app/api/holdings');
        const jsonData = await response.json();
        const { payload } = jsonData;
        setData(payload);
        setExpanded(Object.fromEntries(Object.keys(groupByAssetClass(payload)).map(key => [key, false])));
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: 'Name Of The Holding', field: 'name' },
    { title: 'Ticker', field: 'ticker' },
    { title: 'Average Price', field: 'avg_price' },
    { title: 'Market Price', field: 'market_price' },
    { title: 'Latest Change Percentage', field: 'latest_chg_pct' },
    { title: 'Market Value In Base CCY', field: 'market_value_ccy' }
  ];

  const toggleExpand = (assetClass) => {
    setExpanded(prevState => ({
      ...prevState,
      [assetClass]: !prevState[assetClass]
    }));
  };

  const groupedData = groupByAssetClass(data);

  const renderColumns = (assetClassData) => {
    const assetClassColumns = columns.filter(column => {
      return assetClassData.some(row => row[column.field] !== null && row[column.field] !== undefined);
    });
    return assetClassColumns;
  };

  return (
    <>
      {Object.keys(groupedData).map((assetClass) => (
        <StyledAccordion key={assetClass} expanded={expanded[assetClass]} onChange={() => toggleExpand(assetClass)}>
          <AccordionSummary
            aria-controls={`${assetClass}-content`}
            id={`${assetClass}-header`}
          >
            <IconButton aria-label="expand row" size="small" isExpanded={expanded[assetClass]}>
              {expanded[assetClass] ? <KeyboardArrowDownIcon /> : <KeyboardArrowDownIcon />}
            </IconButton>
            {assetClass.toUpperCase()} ({groupedData[assetClass].length})
          </AccordionSummary>
          <AccordionDetails>
            <StyledTableContainer component={Paper}>
              <Table aria-label="customized table">
                <TableHead>
                  <TableRow>
                    {renderColumns(groupedData[assetClass]).map((column, index) => (
                      <StyledTableCell key={index}>{column.title}</StyledTableCell>
                    ))}
                  </TableRow>
                </TableHead>
                <TableBody>
                  {groupedData[assetClass].map((row, rowIndex) => (
                    <StyledTableRow key={rowIndex}>
                      {renderColumns(groupedData[assetClass]).map((column, columnIndex) => (
                        <StyledTableCell key={columnIndex} align="left" className={column.field === 'latest_chg_pct' && row[column.field] < 0 ? 'negative-value' : ''}>
                          {row[column.field]}
                        </StyledTableCell>
                      ))}
                    </StyledTableRow>
                  ))}
                </TableBody>
              </Table>
            </StyledTableContainer>
          </AccordionDetails>
        </StyledAccordion>
      ))}
    </>
  );
}

export default App;
