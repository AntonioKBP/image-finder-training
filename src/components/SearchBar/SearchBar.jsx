import PropTypes from 'prop-types';
import { useState } from 'react';
import { ReactComponent as Icon } from '../Icons/search.svg';

import { SearchButton, Form, Header, Input } from './SearchBar.styled';

export const SearchBar = ({ onSubmit }) => {
  const [value, setValue] = useState('');

  const handleChange = e => {
    const { value } = e.target;
    setValue(value);
  };

  const handleSubmit = e => {
    e.preventDefault();
    onSubmit(value);
    setValue('');
  };

  return (
    <Header>
      <Form onSubmit={handleSubmit}>
        <SearchButton type="submit">
          <span>
            <Icon />
          </span>
        </SearchButton>

        <Input
          type="text"
          autoComplete="off"
          autoFocus
          placeholder="Search images and photos"
          onChange={handleChange}
          name="name"
          value={value}
        />
      </Form>
    </Header>
  );
};

SearchBar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
