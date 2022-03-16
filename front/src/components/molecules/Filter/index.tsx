import React, {
  useState,
  useCallback,
  useRef,
  useEffect,
  ChangeEvent,
} from 'react';
import { DownOutlined } from '@ant-design/icons';

import {
  FilterWrap,
  FilterSelectorWrap,
  FilterSelector,
  FilterSelectorText,
  FilterArrrowWrap,
  FilterContent,
  CheckBoxGroup,
} from './style';
import { CheckBox } from '../../atoms';

const Filter = ({
  label,
  items,
  onChange,
  checkList,
}: {
  label: string;
  items: Array<{ value: string; text: string }>;
  onChange: (checked: boolean, value: string) => void;
  checkList: string[];
}) => {
  const filterEl = useRef<HTMLInputElement>(null);
  const filterSelectorEl = useRef<HTMLInputElement>(null);
  const [show, setShow] = useState(false);

  const onChangeShow = useCallback(() => {
    setShow((prev) => !prev);
  }, [show]);

  useEffect(() => {
    const handleFilterOff = (e: { target: Node | null }) => {
      if (
        show &&
        !filterSelectorEl.current?.contains(e?.target) &&
        !filterEl.current?.contains(e.target)
      ) {
        setShow(false);
      }
    };
    window.addEventListener('click', handleFilterOff as EventListener);
    return () => {
      window.removeEventListener('click', handleFilterOff as EventListener);
    };
  }, [show]);
  return (
    <FilterWrap>
      <FilterSelectorWrap ref={filterSelectorEl} onClick={onChangeShow}>
        <FilterSelector>
          <FilterSelectorText>{label}</FilterSelectorText>
        </FilterSelector>
        <FilterArrrowWrap>
          <DownOutlined />
        </FilterArrrowWrap>
      </FilterSelectorWrap>
      <FilterContent show={show} ref={filterEl}>
        <CheckBoxGroup>
          {items.map((item, i) => (
            <CheckBox
              // eslint-disable-next-line react/no-array-index-key
              key={i}
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

export default Filter;
