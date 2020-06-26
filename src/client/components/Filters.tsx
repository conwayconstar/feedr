import React from 'react';

export type FiltersProps = {
  search: string | '';
  setSearch: (search: string) => void
};

const Filters: React.FC<FiltersProps> = ({ search, setSearch }) => (
  <div className="filters">
    <input
      className="form-control"
      placeholder="Name"
      value={search}
      onChange={({ target: { value } }) => setSearch(value)}
    />
  </div>
);

export default Filters;
