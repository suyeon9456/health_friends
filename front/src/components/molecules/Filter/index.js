import React, { useState, useCallback } from 'react';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';

import { FilterWrap, FilterSelectorWrap, FilterSelector, FilterSelectorText, FilterArrrowWrap, FilterContent, CheckBoxGroup } from './style';
import { CheckBox } from '../../atoms';

const Filter = ({ label, value, items, onChange, checkList }) => {
  const [show, setShow] = useState(false);

  const onChangeShow = useCallback(() => {
    setShow((prev) => !prev);
  }, [show]);
  return (
    <FilterWrap>
      <FilterSelectorWrap onClick={onChangeShow}>
        <FilterSelector>
          <FilterSelectorText>
            {label}
          </FilterSelectorText>
        </FilterSelector>
        <FilterArrrowWrap>
          <DownOutlined />
        </FilterArrrowWrap>
      </FilterSelectorWrap>
      <FilterContent show={show}>
        <CheckBoxGroup>
          {items.map((item) => (
            <CheckBox
              key={item.value}
              label={item.text}
              value={item.value}
              checked={checkList.includes(item.value)}
              onChange={(e) => onChange(e.currentTarget.checked, item.value)}
            />
          ))}
        </CheckBoxGroup>
      </FilterContent>
    </FilterWrap>
  );
};

Filter.propTypes = {
  label: PropTypes.string,
  value: PropTypes.string,
  items: PropTypes.array,
  onChange: PropTypes.func,
  checkList: PropTypes.array,
};

export default Filter;
