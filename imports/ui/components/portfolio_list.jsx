import React from 'react';
import { ListGroup, ListGroupItem } from 'react-bootstrap';


export const PortfolioListItem = ({ id, name, impact }) => (
  <ListGroupItem header={name} href={`/portfolio/${id}`}>
    {impact}
  </ListGroupItem>
);

export const PortfolioCategoryListItem = ({ name, portfolios }) => (
  <div>
    <div className="text-center">
      <h4>{ name }</h4>
    </div>
    <br />
    <div>
      { portfolios
        ? portfolios.map(p => <PortfolioListItem key={p._id} id={p._id} name={p.name} impact={p.impact} />)
        : ''
      }
    </div>
    <br />
    <hr />
  </div>
);

const PortfolioList = ({ currUser, getCategories }) => (
  <div>
    { currUser
      ? getCategories(currUser).map(c =>
        <PortfolioCategoryListItem key={c.name} name={c.name} portfolios={c.portfolios} />
      )
      : ''
    }
  </div>
);

export default PortfolioList;
