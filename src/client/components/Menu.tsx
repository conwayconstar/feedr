import React from 'react';
import { DietarySelection } from 'feedr';

export type MenuProps = {
  count: number;
  dietarySelection: DietarySelection;
};

const Menu: React.FC<MenuProps> = ({ count, dietarySelection }) => (
  <div className="menu-summary">
    <div className="container">
      <div className="row">
        <div className="col-6 menu-summary-left">
          <span className="count">{`${count} item${count !== 1 ? 's' : ''}`}</span>
        </div>
        <div className="col-6 menu-summary-right">
          {Object.keys(dietarySelection).map((dietary) => (
            <span key={dietary}>
              <span className="dietary-count">{`${dietarySelection[dietary]}x`}</span>
              <span className="dietary">{dietary}</span>
            </span>
          ))}
        </div>
      </div>
    </div>
  </div>
);

export default Menu;
