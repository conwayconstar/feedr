import React from 'react';
import { Item as ItemType } from 'feedr';

export type ItemProps = { item: ItemType, menu?: boolean, toggleItem: (item: ItemType) => void; };

const Item: React.FC<ItemProps> = ({
  item, menu, toggleItem,
}) => {
  const handleClick = () => toggleItem(item);

  return (
    <>
      <li className="item" onClick={!menu ? handleClick : undefined}>
        <h2>{item.name}</h2>
        <p>
          {item.dietaries.map(((dietary) => (
            <span className="dietary" key={dietary}>{dietary}</span>
          )))}
        </p>
        {menu && (
        <button
          type="button"
          className="remove-item"
          onClick={handleClick}
        >
          x
        </button>
        )}
      </li>
    </>
  );
};

export default Item;
