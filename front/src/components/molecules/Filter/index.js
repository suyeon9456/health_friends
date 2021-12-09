import React, { useState, useCallback, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import { DownOutlined } from '@ant-design/icons';

import { FilterWrap, FilterSelectorWrap, FilterSelector, FilterSelectorText, FilterArrrowWrap, FilterContent, CheckBoxGroup } from './style';
import { CheckBox } from '../../atoms';

const Filter = ({ label, items, onChange, checkList }) => {
  const filterEl = useRef();
  const filterSelectorEl = useRef();
  const [show, setShow] = useState(false);

  const handleFilterOff = useCallback((e) => {
    console.log('e: ', e);
    // console.log('123456789', filterEl.current.contains(e.target));
    console.log('show: ', show);
    if (show && !filterSelectorEl.current.contains(e.target) && !filterEl.current.contains(e.target)) {
      console.log('test', show);
      setShow(false);
    }
  }, [show]);
  const onChangeShow = useCallback(() => {
    console.log('???????????????');
    setShow((prev) => !prev);
  }, [show]);

  useEffect(() => {
    window.addEventListener('click', handleFilterOff);
    return () => {
      window.removeEventListener('click', handleFilterOff);
    };
  }, []);
  return (
    <FilterWrap>
      <FilterSelectorWrap ref={filterSelectorEl} onClick={onChangeShow}>
        <FilterSelector>
          <FilterSelectorText>
            {label}
          </FilterSelectorText>
        </FilterSelector>
        <FilterArrrowWrap>
          <DownOutlined />
        </FilterArrrowWrap>
      </FilterSelectorWrap>
      <FilterContent show={show} ref={filterEl}>
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
  items: PropTypes.array,
  onChange: PropTypes.func,
  checkList: PropTypes.array,
};

export default Filter;
