import React from 'react';
import './App.css';
import { MenuHookInterface } from 'feedr';
import Menu from './components/Menu';
import Filters from './components/Filters';
import useMenu from './hooks/useMenu';
import Item from './components/Item';
import Loading from './components/Loading';
import Error from './components/Error';

const App: React.FC = () => {
  const {
    loading,
    items,
    menu,
    toggleItem,
    search,
    setSearch,
    error,
    dietarySelection,
  } : MenuHookInterface = useMenu();

  if (error) return <Error error={error} />;

  if (loading) return <Loading />;

  return (
    <div className="wrapper">
      <Menu count={menu.length} dietarySelection={dietarySelection} />
      <div className="container menu-builder">
        <div className="row">
          <div className="col-4">
            <Filters search={search} setSearch={setSearch} />
            <ul className="item-picker">
              {items.map((item) => (
                <Item key={item.id} item={item} toggleItem={toggleItem} />
              ))}
            </ul>
          </div>
          <div className="col-8">
            <h2>Menu preview</h2>
            <ul className="menu-preview">
              {menu.map((item) => (
                <Item key={item.id} item={item} toggleItem={toggleItem} menu />
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
